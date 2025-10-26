// app/api/gossip/generate/route.js - WORKING VERSION WITHOUT CRON SECRET
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
  ],
  newPlayer: [
    "A fresh face has joined our chronicles! How delightfully promising!",
    "Someone new is making their first choices in history. How will they fare?",
    "A newcomer walks the halls of time. Will they rise to greatness or fall to folly?"
  ],
  activePlayer: [
    "Someone has been quite busy rewriting history! Such dedication to the craft!",
    "A particular player seems unable to stop their temporal adventures. Addicted, perhaps?",
    "One does wonder if a certain chronicler has forgotten what daylight looks like!"
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
    indecisive: 'amusing',
    newPlayer: 'intriguing',
    activePlayer: 'impressive'
  };
  return severityMap[type] || 'intriguing';
}

async function analyzePlayerBehavior(user, userProgress) {
  const stats = user.profile?.stats || {};
  const gossipItems = [];
  
  console.log('Analyzing user:', user.username, 'Stats:', stats);
  
  // New player (just started)
  if (stats.totalChoices >= 1 && stats.totalChoices <= 5) {
    gossipItems.push(generateGossipItem('newPlayer'));
  }
  
  // Active player (many choices)
  if (stats.totalChoices > 15) {
    gossipItems.push(generateGossipItem('activePlayer'));
  }
  
  // Achievement hunter (unlocked endings)
  if (stats.endingsUnlocked?.length >= 2) {
    gossipItems.push(generateGossipItem('achievementHunter'));
  }
  
  // Binge player (finished multiple stories)
  if (stats.storiesFinished >= 2) {
    gossipItems.push(generateGossipItem('bingePlayer'));
  }
  
  // Speed runner (many choices but few finishes)
  if (stats.totalChoices > 20 && stats.storiesFinished < 2) {
    gossipItems.push(generateGossipItem('speedRunner'));
  }
  
  // Indecisive (started many but finished few)
  if (stats.storiesStarted >= 3 && stats.storiesFinished < 1) {
    gossipItems.push(generateGossipItem('indecisive'));
  }
  
  // Calculate stats for betrayal/compassion
  if (userProgress.length > 0) {
    let loyaltySum = 0;
    let compassionSum = 0;
    let loyaltyCount = 0;
    let compassionCount = 0;
    
    userProgress.forEach(p => {
      if (p.stats) {
        if (p.stats.statName1 !== undefined) {
          loyaltySum += p.stats.statName1;
          loyaltyCount++;
        }
        if (p.stats.statName2 !== undefined) {
          compassionSum += p.stats.statName2;
          compassionCount++;
        }
      }
    });
    
    const avgLoyalty = loyaltyCount > 0 ? loyaltySum / loyaltyCount : 50;
    const avgCompassion = compassionCount > 0 ? compassionSum / compassionCount : 50;
    
    console.log('Avg loyalty:', avgLoyalty, 'Avg compassion:', avgCompassion);
    
    if (loyaltyCount > 3 && avgLoyalty < 40) {
      gossipItems.push(generateGossipItem('highBetrayal'));
    }
    
    if (compassionCount > 3 && avgCompassion < 40) {
      gossipItems.push(generateGossipItem('lowCompassion'));
    }
  }
  
  console.log(`Generated ${gossipItems.length} gossip items for ${user.username}`);
  return gossipItems;
}

export async function POST(request) {
  try {
    console.log('Gossip generation started (manual trigger)');
    
    const users = await getCollection('users');
    const progress = await getCollection('progress');
    const gossip = await getCollection('gossip');
    
    // Get ALL users with at least 1 choice
    const activeUsers = await users.find({
      'profile.stats.totalChoices': { $gte: 1 }
    }).toArray();
    
    console.log(`Found ${activeUsers.length} active users`);
    
    const allGossipItems = [];
    
    for (const user of activeUsers) {
      const userProgress = await progress.find({
        userId: user._id
      }).toArray();
      
      console.log(`User ${user.username} has ${userProgress.length} progress entries`);
      
      const gossipItems = await analyzePlayerBehavior(user, userProgress);
      allGossipItems.push(...gossipItems);
    }
    
    console.log(`Generated ${allGossipItems.length} total gossip items`);
    
    // If no gossip generated, create some generic ones
    if (allGossipItems.length === 0) {
      console.log('No gossip generated, adding generic items');
      allGossipItems.push(generateGossipItem('newPlayer'));
      allGossipItems.push(generateGossipItem('activePlayer'));
    }
    
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
      
      console.log(`Stored ${itemsToStore.length} gossip items`);
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
