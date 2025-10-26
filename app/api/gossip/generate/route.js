// app/api/gossip/generate/route.js - COMPLETE FIXED VERSION WITH CRON SECRET
import { NextResponse } from 'next/server';
import { getCollection } from '@/lib/db';

const GOSSIP_TEMPLATES = {
  highBetrayal: [
    "A certain player has betrayed more allies than kept promises... Loyalty appears to be a foreign concept to this particular soul.",
    "Whispers suggest someone's loyalty stat is so low, even Caesar's conspirators would blush!",
    "My dear readers, it appears we have a serial betrayer among us. Trust is clearly not their strong suit."
  ],
  lowCompassion: [
    "Sources report a player faced the plague with all the compassion of a stone wall. Hearts of ice, indeed!",
    "One wonders if a certain individual even possesses a heart... Their compassion is notably absent.",
    "A player has been spotted making choices so cold, winter itself takes notes!"
  ],
  highSurvival: [
    "Survival at any cost seems to be someone's motto. One questions what principles remain...",
    "A player has survived every scenario, though their methods are... questionable at best.",
    "Self-preservation taken to new heights! Or should we say, new lows?"
  ],
  achievementHunter: [
    "My, my! Someone is collecting endings like a dragon hoards gold. Impressive dedication!",
    "A player has unlocked more endings than most have seen. Quite the completionist!",
    "Achievement hunting taken to aristocratic levels! This one leaves no stone unturned."
  ],
  bingePlayer: [
    "Someone completed three stories in one day! The dedication! The stamina! The time management questions!",
    "A player has been binge-reading history like it's the latest scandal sheet. Insatiable!",
    "Someone's devotion to our chronicles is as intense as a debutante's first season!"
  ],
  speedRunner: [
    "Someone rushes through history faster than a scandal spreads through high society!",
    "A player treats epic tales like racing competitions. Where's the savoring of narrative, dear?",
    "Speed over substance seems to be someone's philosophy. How terribly modern."
  ],
  indecisive: [
    "A player has restarted stories more times than a society lady changes gowns for a ball!",
    "Commitment issues, perhaps? Someone cannot seem to finish what they start.",
    "One player's journey resembles a leaf in the wind—direction entirely optional!"
  ]
};

function generateGossipItem(type) {
  const templates = GOSSIP_TEMPLATES[type];
  const template = templates[Math.floor(Math.random() * templates.length)];
  
  return {
    text: template,
    type: type,
    severity: getSeverity(type),
    timestamp: new Date(),
    anonymous: true
  };
}

function getSeverity(type) {
  const severityMap = {
    highBetrayal: 'scandalous',
    lowCompassion: 'scandalous',
    highSurvival: 'intriguing',
    achievementHunter: 'impressive',
    bingePlayer: 'impressive',
    speedRunner: 'curious',
    indecisive: 'amusing'
  };
  return severityMap[type] || 'intriguing';
}

async function analyzePlayerBehavior(user, userProgress) {
  const stats = user.profile?.stats || {};
  const gossipItems = [];
  
  console.log('Analyzing user:', user.username, 'Stats:', stats);
  
  // Calculate average stats from progress
  let totalStats = { stat1: 0, stat2: 0, stat3: 0 };
  let statCounts = { stat1: 0, stat2: 0, stat3: 0 };
  
  userProgress.forEach(p => {
    if (p.stats) {
      // Handle different stat naming patterns
      ['statName1', 'statName2', 'statName3', 'loyalty', 'morality', 'compassion', 'faith', 'humanity'].forEach(statKey => {
        if (p.stats[statKey] !== undefined) {
          totalStats.stat1 += p.stats[statKey];
          statCounts.stat1++;
        }
      });
    }
  });
  
  const avgStat1 = statCounts.stat1 > 0 ? totalStats.stat1 / statCounts.stat1 : 50;
  
  console.log('Average stat1:', avgStat1, 'from', statCounts.stat1, 'measurements');
  
  // High betrayal detection (low loyalty stat)
  if (stats.totalChoices > 10 && avgStat1 < 35) {
    gossipItems.push(generateGossipItem('highBetrayal'));
  }
  
  // Low compassion detection
  if (stats.totalChoices > 10 && avgStat1 < 30) {
    gossipItems.push(generateGossipItem('lowCompassion'));
  }
  
  // Achievement hunter (many endings)
  if (stats.endingsUnlocked?.length >= 3) {
    gossipItems.push(generateGossipItem('achievementHunter'));
  }
  
  // Binge player (many stories finished)
  if (stats.storiesFinished >= 2) {
    gossipItems.push(generateGossipItem('bingePlayer'));
  }
  
  // Speed runner (many choices but few finishes)
  if (stats.totalChoices > 30 && stats.storiesFinished < 2) {
    gossipItems.push(generateGossipItem('speedRunner'));
  }
  
  // Indecisive (many starts, few finishes)
  if (stats.storiesStarted > 3 && stats.storiesFinished < 2) {
    gossipItems.push(generateGossipItem('indecisive'));
  }
  
  return gossipItems;
}

export async function POST(request) {
  try {
    // CHECK FOR CRON SECRET - THIS IS THE NEW PART
    const { searchParams } = new URL(request.url);
    const cronSecret = searchParams.get('cron_secret');
    
    // Only allow requests with correct secret (from Vercel cron) or from localhost dev
    const expectedSecret = process.env.CRON_SECRET || 'dev-secret-change-in-production';
    if (cronSecret !== expectedSecret) {
      console.log('Unauthorized gossip generation attempt');
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    console.log('Gossip generation started');
    
    const users = await getCollection('users');
    const progress = await getCollection('progress');
    const gossip = await getCollection('gossip');
    
    // Get all users with activity
    const activeUsers = await users.find({
      'profile.stats.totalChoices': { $gt: 5 }
    }).toArray();
    
    console.log(`Found ${activeUsers.length} active users`);
    
    const allGossipItems = [];
    
    for (const user of activeUsers) {
      // Get user's progress
      const userProgress = await progress.find({
        userId: user._id
      }).toArray();
      
      console.log(`User ${user.username} has ${userProgress.length} progress entries`);
      
      const gossipItems = await analyzePlayerBehavior(user, userProgress);
      allGossipItems.push(...gossipItems);
    }
    
    console.log(`Generated ${allGossipItems.length} total gossip items`);
    
    // Clear old gossip (keep last 50)
    const oldGossip = await gossip.find({}).sort({ createdAt: -1 }).skip(50).toArray();
    if (oldGossip.length > 0) {
      await gossip.deleteMany({
        _id: { $in: oldGossip.map(g => g._id) }
      });
    }
    
    // Store new gossip items (limit to 20)
    if (allGossipItems.length > 0) {
      const itemsToStore = allGossipItems.slice(0, 20);
      
      await gossip.insertMany(itemsToStore.map(item => ({
        ...item,
        createdAt: new Date(),
        edition: new Date().toISOString().split('T')[0]
      })));
    }
    
    return NextResponse.json({
      success: true,
      gossipGenerated: allGossipItems.length,
      activeUsers: activeUsers.length,
      message: `Generated ${allGossipItems.length} gossip items from ${activeUsers.length} users`
    });
    
  } catch (error) {
    console.error('Gossip generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate gossip', details: error.message },
      { status: 500 }
    );
  }
}
