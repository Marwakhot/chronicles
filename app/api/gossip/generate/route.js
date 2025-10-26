// app/api/gossip/generate/route.js - EXPANDED GOSSIP VERSION
import { NextResponse } from 'next/server';
import { getCollection } from '@/lib/db';

const GOSSIP_TEMPLATES = {
  highBetrayal: [
    "A certain player has betrayed more allies than kept promises... Loyalty appears to be a foreign concept to this particular soul.",
    "Whispers suggest someone's loyalty stat is so low, even Caesar's conspirators would blush!",
    "My dear readers, it appears we have a serial betrayer among us. Trust is clearly not their strong suit.",
    "One player switches allegiances more frequently than a weathervane in a storm! Principles? What principles?",
    "A particular chronicle-walker has made backstabbing into an art form. Machiavelli would be proud!",
    "Someone's word is worth less than a Roman denarius from the reign of Nero. Trust at your own peril!"
  ],
  lowCompassion: [
    "Sources report a player faced the plague with all the compassion of a stone wall. Hearts of ice, indeed!",
    "One wonders if a certain individual even possesses a heart... Their compassion is notably absent.",
    "A player has been spotted making choices so cold, winter itself takes notes!",
    "Dear readers, someone treats human suffering like a minor inconvenience. One's blood runs cold!",
    "A chronicler walks past suffering without a glance. Even the most hardened would pause!",
    "One player's empathy could fit in a thimble with room to spare. Shocking, truly shocking!"
  ],
  highSurvival: [
    "Survival at any cost seems to be someone's motto. One questions what principles remain...",
    "A player has survived every scenario, though their methods are... questionable at best.",
    "Self-preservation taken to new heights! Or should we say, new lows?",
    "One player treats every situation like a sinking ship—and they're hoarding the lifeboats!",
    "Someone's survival instinct is so sharp, they'd abandon their own shadow if it slowed them down!",
    "A chronicler survives while others perish. Coincidence? This columnist thinks not!"
  ],
  highHeroism: [
    "My word! Someone consistently chooses danger over safety. Brave or foolhardy? You decide!",
    "A player rushes toward danger while others flee. One must admire the courage, if not the sense!",
    "Someone throws themselves into peril with alarming regularity. A death wish or nobility?",
    "Dear readers, a chronicler makes sacrifice look fashionable. How terribly heroic!",
    "One player's bravery borders on recklessness. We salute you... from a safe distance!"
  ],
  manipulator: [
    "Someone plays all sides like a master chess player. Cunning or duplicitous? Perhaps both!",
    "A player's political maneuvering would make Renaissance princes envious!",
    "One chronicler excels at telling people what they wish to hear. Sincerity? Doubtful!",
    "Someone navigates moral dilemmas like a snake through grass—smoothly and with questionable intent!"
  ],
  peacemaker: [
    "A player consistently seeks compromise when others reach for swords. How refreshingly civilized!",
    "Someone attempts diplomacy in the most violent scenarios. Optimistic or delusional?",
    "One chronicler believes every conflict has a peaceful solution. Reality begs to differ!",
    "Dear readers, someone thinks all problems can be solved with conversation. Adorably naive!"
  ],
  achievementHunter: [
    "My, my! Someone is collecting endings like a dragon hoards gold. Impressive dedication!",
    "A player has unlocked more endings than most have seen. Quite the completionist!",
    "Achievement hunting taken to aristocratic levels! This one leaves no stone unturned.",
    "Someone pursues every possible outcome with obsessive fervor. Dedication or madness?",
    "A chronicler has seen more endings than a Victorian novel series. Voracious!"
  ],
  bingePlayer: [
    "Someone completed three stories in one day! The dedication! The stamina! The time management questions!",
    "A player has been binge-reading history like it's the latest scandal sheet. Insatiable!",
    "Someone's devotion to our chronicles is as intense as a debutante's first season!",
    "One reader devours stories faster than society devours gossip! Remarkable appetite!",
    "A player treats our chronicles like a buffet. One wonders about their other obligations!"
  ],
  speedRunner: [
    "Someone rushes through history faster than a scandal spreads through high society!",
    "A player treats epic tales like racing competitions. Where's the savoring of narrative, dear?",
    "Speed over substance seems to be someone's philosophy. How terribly modern.",
    "One chronicles through centuries in minutes! Life is not a race, darling!",
    "A player skips through moral dilemmas like skipping stones. Missing the point entirely!"
  ],
  indecisive: [
    "A player has restarted stories more times than a society lady changes gowns for a ball!",
    "Commitment issues, perhaps? Someone cannot seem to finish what they start.",
    "One player's journey resembles a leaf in the wind—direction entirely optional!",
    "Someone restarts more often than they complete. Decision paralysis or perfectionism?",
    "A chronicler treats the restart button like a security blanket. Finish something, dear!"
  ],
  darkPath: [
    "Someone consistently chooses the darkest options available. One raises an eyebrow!",
    "A player's moral compass points firmly toward chaos. Concerning, truly!",
    "One chronicler explores humanity's worst impulses with disturbing enthusiasm!",
    "Someone seems to collect bad endings like macabre trophies. Unsettling!"
  ],
  virtuousPath: [
    "A player chooses virtue with such consistency, one suspects they're a saint in disguise!",
    "Someone's moral fiber could serve as a textbook example. Impressively principled!",
    "One chronicler walks the high road so faithfully, they must have blisters!",
    "A player's ethics are so pure, they practically glow. Nauseating or admirable? Both!"
  ],
  ruleBreaker: [
    "Someone consistently defies authority in every scenario. Rebel without a pause!",
    "A player treats rules like suggestions. Anarchy in chronicle form!",
    "One chronicler's anti-establishment choices are remarkably consistent. Revolutionary!",
    "Someone questions authority so reflexively, one wonders about their childhood!"
  ],
  conformist: [
    "A player follows orders so obediently, drill sergeants would weep with joy!",
    "Someone never met a rule they didn't love. How delightfully predictable!",
    "One chronicler's conformity is so absolute, one forgets choices exist!",
    "A player walks the path of least resistance with religious devotion!"
  ],
  romanticFool: [
    "Someone prioritizes love over survival in every scenario. How charmingly suicidal!",
    "A player's romantic choices would make even poets roll their eyes!",
    "One chronicler treats history like a romance novel. Reality disagrees!",
    "Someone believes love conquers all. History suggests otherwise, dear!"
  ],
  newPlayer: [
    "A fresh face has joined our chronicles! How delightfully promising!",
    "Someone new is making their first choices in history. How will they fare?",
    "A newcomer walks the halls of time. Will they rise to greatness or fall to folly?",
    "Fresh blood graces our pages! One does hope they survive the experience!",
    "A new chronicler emerges! Let us watch their journey with interest!"
  ],
  activePlayer: [
    "Someone has been quite busy rewriting history! Such dedication to the craft!",
    "A particular player seems unable to stop their temporal adventures. Addicted, perhaps?",
    "One does wonder if a certain chronicler has forgotten what daylight looks like!",
    "A player haunts our chronicles like a particularly persistent ghost!",
    "Someone's dedication to our tales borders on obsessive. Flattering, really!"
  ],
  mysteriousStranger: [
    "A shadowy figure makes choices but never finishes stories. Intriguing!",
    "Someone samples every tale but commits to none. Commitment issues manifest!",
    "One player dips their toe in every timeline but never dives in. Curious behavior!",
    "A mysterious chronicler visits often but leaves no trace. How enigmatic!"
  ],
  nightOwl: [
    "Someone makes their most questionable decisions at 3 AM. Sleep deprivation or preference?",
    "A player's late-night choices are notably more chaotic than their daytime ones!",
    "One chronicler burns the midnight oil with concerning frequency. Rest, dear!",
    "Someone's nocturnal adventures through history raise eyebrows and questions!"
  ],
  comeback: [
    "A player returns after months of absence! Like a phoenix, but with more questionable decisions!",
    "Someone who vanished has returned to our chronicles. What prompted this resurrection?",
    "A long-absent chronicler reappears! One wonders what drew them back!",
    "Like a bad penny, a player returns! Welcome back, we suppose!"
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
    darkPath: 'scandalous',
    highSurvival: 'intriguing',
    manipulator: 'intriguing',
    mysteriousStranger: 'intriguing',
    nightOwl: 'intriguing',
    achievementHunter: 'impressive',
    bingePlayer: 'impressive',
    highHeroism: 'impressive',
    virtuousPath: 'impressive',
    speedRunner: 'curious',
    indecisive: 'curious',
    ruleBreaker: 'curious',
    conformist: 'curious',
    peacemaker: 'amusing',
    romanticFool: 'amusing',
    newPlayer: 'intriguing',
    activePlayer: 'impressive',
    comeback: 'curious'
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
  if (stats.totalChoices > 20) {
    gossipItems.push(generateGossipItem('activePlayer'));
  }
  
  // Achievement hunter (unlocked many endings)
  if (stats.endingsUnlocked?.length >= 3) {
    gossipItems.push(generateGossipItem('achievementHunter'));
  }
  
  // Binge player (finished multiple stories)
  if (stats.storiesFinished >= 3) {
    gossipItems.push(generateGossipItem('bingePlayer'));
  }
  
  // Speed runner (many choices but few finishes)
  if (stats.totalChoices > 25 && stats.storiesFinished < 2) {
    gossipItems.push(generateGossipItem('speedRunner'));
  }
  
  // Indecisive (started many but finished few)
  if (stats.storiesStarted >= 4 && stats.storiesFinished < 2) {
    gossipItems.push(generateGossipItem('indecisive'));
  }
  
  // Comeback player (check last activity)
  if (userProgress.length > 0) {
    const lastProgress = userProgress.reduce((latest, current) => {
      return new Date(current.lastUpdated) > new Date(latest.lastUpdated) ? current : latest;
    });
    const daysSinceLastActivity = (Date.now() - new Date(lastProgress.lastUpdated)) / (1000 * 60 * 60 * 24);
    
    if (daysSinceLastActivity > 30 && daysSinceLastActivity < 90) {
      gossipItems.push(generateGossipItem('comeback'));
    }
  }
  
  // Calculate stats for betrayal/compassion/survival
  if (userProgress.length >= 3) {
    let stat1Sum = 0;  // loyalty/solidarity/duty/faith
    let stat2Sum = 0;  // compassion/courage/morality/survival
    let stat3Sum = 0;  // survival/influence/truth
    let stat1Count = 0;
    let stat2Count = 0;
    let stat3Count = 0;
    
    userProgress.forEach(p => {
      if (p.stats) {
        if (p.stats.statName1 !== undefined && p.stats.statName1 !== null) {
          stat1Sum += p.stats.statName1;
          stat1Count++;
        }
        if (p.stats.statName2 !== undefined && p.stats.statName2 !== null) {
          stat2Sum += p.stats.statName2;
          stat2Count++;
        }
        if (p.stats.statName3 !== undefined && p.stats.statName3 !== null) {
          stat3Sum += p.stats.statName3;
          stat3Count++;
        }
      }
    });
    
    const avgStat1 = stat1Count > 0 ? stat1Sum / stat1Count : 50;
    const avgStat2 = stat2Count > 0 ? stat2Sum / stat2Count : 50;
    const avgStat3 = stat3Count > 0 ? stat3Sum / stat3Count : 50;
    
    console.log('Avg stat1:', avgStat1, 'Avg stat2:', avgStat2, 'Avg stat3:', avgStat3);
    
    // High betrayal (low loyalty)
    if (stat1Count >= 3 && avgStat1 < 35) {
      gossipItems.push(generateGossipItem('highBetrayal'));
    }
    
    // Low compassion
    if (stat2Count >= 3 && avgStat2 < 35) {
      gossipItems.push(generateGossipItem('lowCompassion'));
    }
    
    // High survival (prioritizing survival)
    if (stat3Count >= 3 && avgStat3 > 65) {
      gossipItems.push(generateGossipItem('highSurvival'));
    }
    
    // High heroism (low survival, high duty/loyalty)
    if (stat3Count >= 3 && avgStat3 < 35 && stat1Count >= 3 && avgStat1 > 60) {
      gossipItems.push(generateGossipItem('highHeroism'));
    }
    
    // Manipulator (moderate all stats - playing all sides)
    if (stat1Count >= 3 && avgStat1 > 40 && avgStat1 < 60 && 
        stat2Count >= 3 && avgStat2 > 40 && avgStat2 < 60) {
      gossipItems.push(generateGossipItem('manipulator'));
    }
    
    // Dark path (low on multiple stats)
    if (stat1Count >= 3 && avgStat1 < 35 && stat2Count >= 3 && avgStat2 < 35) {
      gossipItems.push(generateGossipItem('darkPath'));
    }
    
    // Virtuous path (high on multiple good stats)
    if (stat1Count >= 3 && avgStat1 > 70 && stat2Count >= 3 && avgStat2 > 70) {
      gossipItems.push(generateGossipItem('virtuousPath'));
    }
    
    // Rule breaker (low loyalty/duty but high in other areas)
    if (stat1Count >= 3 && avgStat1 < 35 && stat2Count >= 3 && avgStat2 > 60) {
      gossipItems.push(generateGossipItem('ruleBreaker'));
    }
    
    // Conformist (high loyalty, moderate everything else)
    if (stat1Count >= 3 && avgStat1 > 75) {
      gossipItems.push(generateGossipItem('conformist'));
    }
  }
  
  // Mysterious stranger (many starts, no finishes)
  if (stats.storiesStarted >= 5 && stats.storiesFinished === 0) {
    gossipItems.push(generateGossipItem('mysteriousStranger'));
  }
  
  console.log(`Generated ${gossipItems.length} gossip items for ${user.username}`);
  return gossipItems;
}

export async function POST(request) {
  try {
    console.log('Gossip generation started');
    
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
      
      const gossipItems = await analyzePlayerBehavior(user, userProgress);
      allGossipItems.push(...gossipItems);
    }
    
    console.log(`Generated ${allGossipItems.length} total gossip items`);
    
    // If no gossip generated, create some generic ones
    if (allGossipItems.length === 0) {
      allGossipItems.push(generateGossipItem('newPlayer'));
      allGossipItems.push(generateGossipItem('activePlayer'));
    }
    
    // Clear ALL old gossip before adding new
    await gossip.deleteMany({});
    
    // Store new gossip items (limit to 30 for variety)
    if (allGossipItems.length > 0) {
      // Shuffle for randomness
      const shuffled = allGossipItems.sort(() => Math.random() - 0.5);
      const itemsToStore = shuffled.slice(0, 30);
      
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
