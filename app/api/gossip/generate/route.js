// app/api/gossip/generate/route.js
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

async function analyzePlayerBehavior(user) {
  const stats = user.profile?.stats || {};
  const gossipItems = [];
  
  // High betrayal detection (low loyalty across stories)
  if (stats.totalChoices > 10) {
    const progress = await getCollection('progress');
    const userProgress = await progress.find({ 
      userId: user._id 
    }).toArray();
    
    let avgLoyalty = 0;
    let loyaltyCount = 0;
    
    userProgress.forEach(p => {
      if (p.stats?.loyalty !== undefined) {
        avgLoyalty += p.stats.loyalty;
        loyaltyCount++;
      }
      if (p.stats?.statName1 !== undefined) {
        avgLoyalty += p.stats.statName1;
        loyaltyCount++;
      }
    });
    
    if (loyaltyCount > 0) {
      avgLoyalty = avgLoyalty / loyaltyCount;
      if (avgLoyalty < 30) {
        gossipItems.push(generateGossipItem('highBetrayal'));
      }
    }
  }
  
  // Low compassion detection
  if (stats.totalChoices > 10) {
    const progress = await getCollection('progress');
    const userProgress = await progress.find({ 
      userId: user._id 
    }).toArray();
    
    let avgCompassion = 0;
    let compassionCount = 0;
    
    userProgress.forEach(p => {
      if (p.stats?.compassion !== undefined) {
        avgCompassion += p.stats.compassion;
        compassionCount++;
      }
      if (p.stats?.humanity !== undefined) {
        avgCompassion += p.stats.humanity;
        compassionCount++;
      }
      if (p.stats?.statName2 !== undefined) {
        avgCompassion += p.stats.statName2;
        compassionCount++;
      }
    });
    
    if (compassionCount > 0) {
      avgCompassion = avgCompassion / compassionCount;
      if (avgCompassion < 25) {
        gossipItems.push(generateGossipItem('lowCompassion'));
      }
    }
  }
  
  // Achievement hunter
  if (stats.endingsUnlocked?.length >= 5) {
    gossipItems.push(generateGossipItem('achievementHunter'));
  }
  
  // Binge player
  if (stats.storiesFinished >= 3) {
    gossipItems.push(generateGossipItem('bingePlayer'));
  }
  
  // Speed runner
  if (stats.totalChoices > 50 && stats.storiesFinished < 2) {
    gossipItems.push(generateGossipItem('speedRunner'));
  }
  
  // Indecisive
  if (stats.storiesStarted > 5 && stats.storiesFinished < 2) {
    gossipItems.push(generateGossipItem('indecisive'));
  }
  
  return gossipItems;
}

export async function POST(request) {
  try {
    const users = await getCollection('users');
    const gossip = await getCollection('gossip');
    
    // Get all users with activity
    const activeUsers = await users.find({
      'profile.stats.totalChoices': { $gt: 5 }
    }).toArray();
    
    console.log(`Found ${activeUsers.length} active users`);
    
    const allGossipItems = [];
    
    for (const user of activeUsers) {
      const gossipItems = await analyzePlayerBehavior(user);
      allGossipItems.push(...gossipItems);
    }
    
    // Store gossip items (limit to 10)
    if (allGossipItems.length > 0) {
      const itemsToStore = allGossipItems.slice(0, 10);
      
      await gossip.insertMany(itemsToStore.map(item => ({
        ...item,
        createdAt: new Date(),
        edition: new Date().toISOString().split('T')[0]
      })));
    }
    
    return NextResponse.json({
      success: true,
      gossipGenerated: allGossipItems.length,
      message: `Generated ${allGossipItems.length} gossip items`
    });
    
  } catch (error) {
    console.error('Gossip generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate gossip' },
      { status: 500 }
    );
  }
}
