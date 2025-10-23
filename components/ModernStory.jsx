import React, { useState } from 'react';
import { ArrowLeft, Zap, Heart, AlertTriangle, Shield, Radio } from 'lucide-react';

const ModernStory = ({ onBack }) => {
  const [currentScene, setCurrentScene] = useState('intro');
  const [choices, setChoices] = useState([]);
  const [stats, setStats] = useState({
    duty: 50,
    survival: 50,
    truth: 50
  });

  const updateStats = (statChanges) => {
    setStats(prev => ({
      duty: Math.max(0, Math.min(100, prev.duty + (statChanges.duty || 0))),
      survival: Math.max(0, Math.min(100, prev.survival + (statChanges.survival || 0))),
      truth: Math.max(0, Math.min(100, prev.truth + (statChanges.truth || 0)))
    }));
  };

  const makeChoice = (nextScene, choiceText, statChanges = {}) => {
    setChoices([...choices, choiceText]);
    updateStats(statChanges);
    setCurrentScene(nextScene);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scenes = {
    intro: {
      title: "Night Shift",
      date: "April 26, 1986, 1:23 AM - Chernobyl Nuclear Power Plant",
      text: "You are Aleksei Volkov, a nuclear engineer working the night shift at Reactor 4 of the Chernobyl Nuclear Power Plant. The spring air is cool as you walk through the facility, the hum of turbines a familiar lullaby.\n\nYour colleague Viktor rushes toward you, his face pale. 'Aleksei! The safety test—something is wrong. The power is dropping too fast. Deputy Chief Engineer Dyatlov is ordering us to continue anyway.'\n\nThrough the observation window, you can see the control room operators frantically adjusting controls. The reactor is becoming unstable during what should have been a routine safety test. Your dosimeter begins clicking faster than normal.\n\nYou have minutes, maybe seconds, to act. The decisions you make tonight will affect thousands of lives—including your own.",
      choices: [
        {
          text: "Rush to the control room and demand they abort the test immediately",
          next: "demand_abort",
          stats: { duty: 15, truth: 10, survival: -5 }
        },
        {
          text: "Call the shift supervisor and report the irregularities through proper channels",
          next: "proper_channels",
          stats: { duty: 10, survival: 5 }
        },
        {
          text: "Try to manually intervene with the reactor controls yourself",
          next: "manual_intervention",
          stats: { duty: 20, survival: -10 }
        },
        {
          text: "Evacuate the immediate area and sound the alarm",
          next: "sound_alarm",
          stats: { survival: 15, duty: -5, truth: 10 }
        }
      ]
    },

    demand_abort: {
      title: "Confrontation",
      date: "April 26, 1986, 1:23 AM - Control Room",
      text: "You burst into the control room. Deputy Chief Engineer Dyatlov spins around, his face red with anger. 'Get out, Volkov! This is a controlled test!'\n\n'The reactor is unstable!' you shout over the alarms. 'We need to abort NOW!'\n\nDyatlov steps toward you menacingly. 'Are you questioning my authority? I will have you fired—'\n\nThe explosion cuts him off. A massive shockwave throws you against the wall. When you look up, the ceiling is gone. You can see stars through a hole where Reactor 4 roof used to be. A pillar of light—beautiful and terrible—shoots into the night sky.\n\nThe core is exposed. You are staring at an open nuclear reactor.",
      choices: [
        {
          text: "Help evacuate the control room personnel immediately",
          next: "evacuate_control",
          stats: { duty: 15, survival: 10 }
        },
        {
          text: "Try to assess the damage and report to Moscow",
          next: "assess_damage",
          stats: { truth: 15, duty: 10 }
        },
        {
          text: "Look for survivors in the destroyed reactor hall",
          next: "search_survivors",
          stats: { duty: 20, survival: -15 }
        }
      ]
    },

    evacuate_control: {
      title: "Chaos and Command",
      date: "April 26, 1986, 1:30 AM - Chernobyl Plant",
      text: "You help drag injured operators from the control room. Several are badly burned, others bleeding from flying debris. Your dosimeter is clicking like a Geiger counter in a nightmare.\n\nOutside, firefighters are arriving. You grab the fire chief. 'The reactor core is exposed! Your men need radiation protection!'\n\nHe looks at you, confused. 'We are here for a building fire. We were not told about radiation.'\n\nYou watch in horror as firefighters in regular gear run toward the burning reactor building. They are running to their deaths and do not even know it.",
      choices: [
        {
          text: "Force the firefighters back and explain the radiation danger",
          next: "warn_firefighters",
          stats: { truth: 20, duty: 10 }
        },
        {
          text: "Help coordinate the evacuation of plant workers",
          next: "coordinate_evacuation",
          stats: { duty: 20, survival: 5 }
        },
        {
          text: "Find a vehicle and drive to Pripyat to warn the city",
          next: "warn_pripyat",
          stats: { truth: 15, duty: 10, survival: -5 }
        }
      ]
    },

    warn_firefighters: {
      title: "The Dangerous Truth",
      date: "April 26, 1986, 2:00 AM - Plant Grounds",
      text: "You grab the fire chief physically. 'Listen to me! That is not a normal fire. The reactor core is exposed. Your men need full radiation protection!'\n\nHe stares at you. 'We do not have radiation gear. We are firefighters.'\n\n'Then you need to pull back and wait for proper equipment!'\n\nBut firefighters are already on the roof, spraying water on burning graphite. They are heroic and doomed. Some turn back on your warning. Others ignore you and keep fighting the fire.\n\nYou have saved some lives, but not all.",
      isEnding: true,
      outcome: "You managed to convince about twenty firefighters to evacuate, saving their lives. Those who stayed on the roof died within weeks from acute radiation syndrome. Your warning was ignored by many, but the twenty who listened survived and later thanked you personally. You absorbed significant radiation during your time at the plant and developed health problems, but lived to age 64. You spent the rest of your life advocating for nuclear safety and proper emergency protocols. At your funeral, several of the firefighters you saved attended and spoke about how your insistence saved their lives. Your grave marker reads: 'He spoke truth when others wanted silence. Twenty families have him to thank.'"
    },

    coordinate_evacuation: {
      title: "Order from Chaos",
      date: "April 26, 1986, 3:00 AM - Plant Administration",
      text: "You take charge of evacuation coordination. Workers are sent to hospitals. Buses arrive. You organize it all with calm efficiency.\n\nBut officials keep telling you to downplay the danger. 'Do not cause panic,' they say. 'It is under control.'\n\nYou know it is not under control. You know Pripyat should be evacuated immediately. But if you insist too loudly, they will remove you from coordination duty.",
      choices: [
        {
          text: "Work within the system while pushing for more action",
          next: "work_within_system",
          stats: { duty: 15, truth: 5, survival: 10 }
        },
        {
          text: "Publicly demand immediate city evacuation",
          next: "public_demand",
          stats: { truth: 25, duty: 10, survival: -5 }
        }
      ]
    },

    work_within_system: {
      title: "The Pragmatist",
      date: "April 26-27, 1986 - Chernobyl Area",
      text: "You work within the Soviet system, pushing for action without being labeled a panic-monger. You carefully word reports, emphasize safety precautions rather than evacuation, use technical language to communicate urgency.\n\nYour approach works slowly. By 36 hours post-explosion, Pripyat is finally evacuated. It is later than ideal, but your steady pressure helped make it happen without getting you removed.\n\nYou have navigated the system successfully, though many received unnecessary radiation exposure due to the delays.",
      isEnding: true,
      outcome: "You lived to 68, your moderate radiation exposure causing health problems but not destroying you. Your pragmatic approach saved lives while working within an impossible system. You became a senior safety advisor and helped reform Soviet nuclear protocols. When the USSR collapsed, you drafted Ukraine independence nuclear safety legislation. You trained hundreds of engineers in both technical skills and how to navigate bureaucracy for safety. At your retirement, colleagues said you taught them that sometimes the best way to fight a corrupt system is from within, using its own rules against it. You died respected by both reformers and pragmatists. Your legacy is that incremental change, while frustrating, can save lives when revolutionary change is impossible."
    },

    public_demand: {
      title: "The Public Confrontation",
      date: "April 26, 1986, 8:00 AM - Government Meeting",
      text: "In a meeting with local officials, you stand up and loudly demand immediate evacuation of Pripyat. 'Every hour we wait, children are breathing radioactive iodine! Pregnant women are being exposed! This is criminal negligence!'\n\nThe room goes silent. Officials are shocked by your insubordination.\n\nYou are immediately removed from the meeting and placed under guard. But your outburst gets through to someone—evacuation planning accelerates.",
      isEnding: true,
      outcome: "You spent seven months in detention before being released during glasnost reforms. Your public confrontation, while costing you freedom, accelerated the Pripyat evacuation by crucial hours. Medical studies later showed that even a few hours made significant difference in radiation exposure, especially for children. You lived to 66, dying of radiation-related cancer. After your release, you became a democracy activist and helped draft post-Soviet nuclear safety laws. At your funeral, a woman brought her now-adult daughter: 'He was arrested for demanding we be evacuated. We got out six hours earlier because of his outburst. My daughter is healthy because he refused to be silent.' Your grave bears the inscription: 'He chose truth over freedom, and saved children in the process.'"
    },

    warn_pripyat: {
      title: "Racing Against Radiation",
      date: "April 26, 1986, 2:30 AM - Road to Pripyat",
      text: "You drive toward Pripyat, the city of 50,000 sleeping just three kilometers from the burning reactor. The night is eerily beautiful—you can see the glow of ionized air reflecting off clouds.\n\nIn Pripyat, people are sleeping. Some early risers are starting their day. No one knows they are being irradiated. The radiation plume is drifting directly over the city.\n\nYou need to warn them, but how? And will anyone believe you?",
      choices: [
        {
          text: "Go door-to-door in apartment buildings warning residents",
          next: "door_to_door",
          stats: { truth: 20, duty: 15, survival: -10 }
        },
        {
          text: "Try to reach the city emergency broadcast system",
          next: "emergency_broadcast",
          stats: { truth: 25, duty: 15 }
        }
      ]
    },

    door_to_door: {
      title: "The Midnight Warning",
      date: "April 26, 1986, 3:00 AM - 6:00 AM - Pripyat",
      text: "You go door-to-door in apartment buildings, waking families. 'There has been a nuclear accident. You need to leave. Now. Do not pack. Just go.'\n\nSome believe you. Others think you are crazy or drunk. But hundreds of families evacuate hours before the official order. You save those lives.\n\nBy dawn, you have absorbed significant radiation from being in Pripyat contaminated air, but you have warned as many as you could reach.",
      isEnding: true,
      outcome: "You developed radiation sickness but survived. Hundreds of families who heeded your warning avoided the worst exposure. For years, you were vilified by authorities as a panic-monger. You lost your engineering license and worked menial jobs. But in 2001, fifteen years later, a group of Pripyat survivors found you. They brought their healthy children and grandchildren—healthy because their families evacuated early thanks to you. They honored you as their savior. You cried for an hour. You lived to 71, never wealthy, never officially recognized, but knowing you saved hundreds of lives. At your funeral, over 200 people came—families you had warned that night. Your headstone reads: 'He woke them from sleep and saved them from death.' No official medal could mean more."
    },

    emergency_broadcast: {
      title: "The Voice on the Radio",
      date: "April 26, 1986, 4:00 AM - Pripyat Radio Station",
      text: "You break into Pripyat radio station and force your way onto the emergency broadcast system. Your voice echoes through apartments across the city:\n\n'This is an emergency! There has been a catastrophic accident at the nuclear plant. Radiation levels are dangerous. Evacuate immediately. This is not a drill!'\n\nYou repeat the message for ten minutes before authorities cut the power and arrest you. But thousands heard your warning. Many evacuated immediately.\n\nYou are charged with inciting panic and undermining state authority.",
      isEnding: true,
      outcome: "You were prosecuted but the trial became international news. Your broadcast warning, though unauthorized, saved thousands of lives by prompting early evacuation. Under intense international pressure, charges were dropped after six months. You lived to 71, celebrated in the West and eventually vindicated in Ukraine after independence. Your emergency broadcast recording is preserved in museums and played annually on the Chernobyl memorial day. Radiation experts estimate your ten-minute broadcast reduced radiation exposure for 5,000-10,000 people. At your funeral, survivors filled a cathedral. One man said: 'I heard his voice on the radio that morning. I thought he was crazy. But I grabbed my children and left anyway. They are alive because he broke the law to tell the truth.' Your legacy: sometimes breaking unjust rules is the highest form of duty."
    },

    proper_channels: {
      title: "Too Late",
      date: "April 26, 1986, 1:23 AM - Administrative Office",
      text: "You reach for the phone to call the shift supervisor. As you dial, you hear Viktor screaming from the control room. The phone explodes in your hand as the building shakes violently.\n\nThe blast wave shatters windows. You drop to the floor as glass rains down. When you stand, you see the night sky through what used to be solid concrete walls. The reactor building is gone—just a gaping hole spewing radioactive fire into the atmosphere.\n\nYour dosimeter is screaming. The radiation levels are off the scale. By following protocol, you have lost precious seconds. Now you must act.",
      choices: [
        {
          text: "Run to find survivors and help with evacuation",
          next: "help_evacuate",
          stats: { duty: 15, survival: 5 }
        },
        {
          text: "Get to a phone that works and alert Moscow immediately",
          next: "alert_moscow",
          stats: { truth: 20, duty: 10 }
        }
      ]
    },

    help_evacuate: {
      title: "The Exodus Begins",
      date: "April 26, 1986, 2:00 AM - Plant Grounds",
      text: "You coordinate the evacuation of workers. Buses arrive to take people to Pripyat hospital. Many are already showing signs of radiation sickness—nausea, vomiting, strange sunburn-like marks.\n\nA plant manager approaches you. 'Volkov, we need to minimize panic. Tell everyone it is under control. Just a small fire.'\n\nBut you know the truth. This is not under control. The exposed reactor is pumping radiation into the air with every second. Pripyat is three kilometers away, and the wind is blowing toward the city. 50,000 people are sleeping, unaware.",
      choices: [
        {
          text: "Obey orders and downplay the disaster",
          next: "follow_orders",
          stats: { duty: 10, truth: -20, survival: 5 }
        },
        {
          text: "Tell workers the truth about the radiation danger",
          next: "tell_truth",
          stats: { truth: 25, duty: -5 }
        }
      ]
    },

    follow_orders: {
      title: "The Obedient Servant",
      date: "April 26, 1986, 4:00 AM - Plant Administration",
      text: "You tell workers what you are ordered to say. 'It is under control. Minor fire. No danger.' Some believe you. Others see the fear in your eyes and know you are lying.\n\nPripyat remains unaware. The radiation plume continues drifting over the sleeping city. Children will play outside today in contaminated air. Pregnant women will breathe radioactive iodine.\n\nYou followed orders, but people will die because of your compliance.",
      isEnding: true,
      outcome: "You lived to 69, dying of natural causes. You were promoted after Chernobyl, rewarded for your loyalty. But you were also investigated after the Soviet collapse, accused of complicity in the cover-up. No criminal charges stuck, but your reputation was destroyed. Your children stopped speaking to you when they learned what you had done. 'How many children got cancer because you lied?' your daughter asked. You had no answer. You died wealthy but alone, your medals in a box, unopened. Your obituary mentioned your engineering career but not Chernobyl—your family request. Your gravestone bears just your name and dates, nothing else. In the end, all your compliance bought you was a longer life devoid of meaning, wealth without respect, survival without honor. You lived, but you never recovered your soul."
    },

    tell_truth: {
      title: "The Whistleblower",
      date: "April 26, 1986, 4:00 AM - Plant Grounds",
      text: "You gather workers and tell them the unfiltered truth. 'The reactor core is exposed. Radiation levels are off the scale. If you have family in Pripyat, get them out now.'\n\nSome workers immediately leave to evacuate their families. Officials arrive, furious. 'Volkov! You are spreading panic! You are fired! Arrested!'\n\nBut the truth is out. Word spreads through unofficial channels. Some families evacuate on their own, hours before the official evacuation.",
      isEnding: true,
      outcome: "You were arrested and spent eight months in detention before being released during glasnost. Your truth-telling, while costing you freedom, saved hundreds of lives. Families who evacuated early based on warnings from workers you told had significantly less radiation exposure. You lived to 68, your health compromised by radiation and detention but your conscience clear. After release, you became a nuclear safety advocate and democracy activist. When Ukraine gained independence, you were honored as a Hero of Ukraine. At your funeral, dozens of families attended—people whose early evacuation you had facilitated. One woman said: 'My husband came home that morning and said we had to leave immediately. His supervisor had told the truth. We left before the official order. My children are healthy because someone was brave enough to tell the truth.' Your epitaph: 'He chose honor over orders.'"
    },

    alert_moscow: {
      title: "The First Call",
      date: "April 26, 1986, 1:45 AM - Administration Building",
      text: "You find a working phone and dial Moscow. After several attempts, you reach the Ministry of Energy.\n\n'This is Engineer Volkov at Chernobyl. We have had a catastrophic failure. The reactor core is exposed. I repeat—the core is exposed.'\n\nSilence. Then: 'That is impossible. RBMK reactors cannot explode.'\n\n'I am looking at it right now!' you shout. 'The building is destroyed. We need immediate evacuation of Pripyat and—'\n\nThe line goes dead. You do not know if they heard you or if they believe you. But you have done your duty to report the truth.",
      isEnding: true,
      outcome: "Your call, though initially dismissed, was logged and later became crucial evidence. You were one of the first to report the true scale of the disaster to Moscow. You absorbed moderate radiation and lived to 65, dying of radiation-related cancer. Your call logs were used in later investigations to show that authorities knew the danger level early but chose to downplay it. You testified at the trial of plant officials, your phone call records proving they had been warned. You became a consultant on nuclear emergency communications, helping design better reporting protocols worldwide. At your funeral, an investigator spoke: 'Volkov made the call that should have saved thousands. That it was ignored is not his failure—it is the system failure he spent his life fighting to fix.' Your legacy is better emergency communication systems in nuclear facilities globally."
    },

    manual_intervention: {
      title: "Heroic Failure",
      date: "April 26, 1986, 1:23 AM - Reactor Hall",
      text: "You sprint down to the reactor hall, your dosimeter already clicking furiously. The radiation levels are dangerously high, but you know the controls that might stabilize the reaction.\n\nAs you reach for the emergency shutdown, the reactor explodes. The force lifts you off your feet and throws you twenty meters. You land hard, your leg shattered.\n\nThrough the pain and smoke, you see the core exposed above you, glowing with an otherworldly blue light. Graphite blocks rain down around you. Your dosimeter has stopped working—you have exceeded its maximum reading.\n\nYou are trapped in the most radioactive place on Earth.",
      choices: [
        {
          text: "Crawl toward the exit despite your injuries",
          next: "crawl_to_safety",
          stats: { survival: 20, duty: -5 }
        },
        {
          text: "Try to shut down nearby systems to prevent further damage",
          next: "shutdown_systems",
          stats: { duty: 25, survival: -20 }
        }
      ]
    },

    crawl_to_safety: {
      title: "The Longest Journey",
      date: "April 26, 1986, 1:45 AM - Reactor Building",
      text: "You drag yourself across the floor, your broken leg screaming with each movement. The radiation burns your skin like invisible fire. You can taste metal—a sign of acute radiation exposure.\n\nIt takes twenty minutes to crawl fifty meters. When you finally collapse outside, rescuers find you. Your hair is already falling out.\n\nAt the hospital, doctors are overwhelmed. 'You have absorbed at least 400 rem,' the doctor says quietly. 'Possibly much more. We will do everything we can.'\n\nYou survived, but at what cost?",
      isEnding: true,
      outcome: "You survived your radiation exposure after months of treatment, but with permanent health damage. You lived to 58, dying of radiation-related cancer. Those 22 years mattered. You testified at the trial of plant officials. You became an advocate for Chernobyl victims, helping secure compensation and medical care for thousands. You wrote a memoir that became required reading for nuclear engineers worldwide. Your children graduated university, and you met your grandchildren. At your funeral, one of the medics who rescued you spoke: 'He crawled through hell with a broken leg and radiation cooking him from inside. Then he spent 22 years helping others who suffered like he did. That second act was as heroic as the first.' Your epitaph: 'He crawled from death, then spent his life helping others survive.'"
    },

    shutdown_systems: {
      title: "Final Service",
      date: "April 26, 1986, 1:50 AM - Reactor Building",
      text: "Despite your broken leg and the impossible radiation, you drag yourself to the emergency cooling controls. If you can activate them, you might prevent the other three reactors from failing.\n\nYour hands shake as you work the controls. Blood drips from your nose—radiation sickness is already setting in. But the pumps activate. You have done it.\n\nYou never make it out. Rescuers find your body the next day, still at the controls. You absorbed over 2000 rem. But Reactors 1, 2, and 3 remain stable.",
      isEnding: true,
      outcome: "You died within hours, but your final act prevented a disaster that could have been ten times worse. If the other reactors had failed, half of Europe might have become uninhabitable. The Soviet government never acknowledged your heroism—your death was listed as an industrial accident. But decades later, when the full truth emerged, you were recognized as one of the unsung heroes of Chernobyl. Your family erected a private memorial: 'He stayed when others ran, worked when dying, and saved thousands he would never meet.' The highest honor is that your story is now taught to every nuclear engineer—a reminder that duty sometimes demands everything. Your sacrifice prevented a continental catastrophe."
    },

    sound_alarm: {
      title: "The Warning",
      date: "April 26, 1986, 1:23 AM - Emergency Station",
      text: "You slam your hand on the facility-wide alarm. Klaxons blare throughout the complex. Workers start evacuating, confused but moving.\n\nThen the explosion hits. Even from the emergency station, the shockwave knocks you down. The lights flicker and die. Emergency lighting casts everything in red.\n\nYour early warning has given people precious seconds. You see workers streaming out of the building. But you also see Dyatlov and others still trapped near the control room.\n\nYour dosimeter shows dangerous levels, even here.",
      choices: [
        {
          text: "Continue evacuating workers—save as many as you can",
          next: "mass_evacuation",
          stats: { duty: 15, survival: 10 }
        },
        {
          text: "Go back for the people trapped near the explosion",
          next: "rescue_trapped",
          stats: { duty: 25, survival: -15 }
        }
      ]
    },

    mass_evacuation: {
      title: "The Shepherd",
      date: "April 26, 1986, 2:30 AM - Plant Grounds",
      text: "You organize the evacuation with military precision. Workers stream out in orderly lines. You are the last to leave, making sure no one is left behind in the immediate area.\n\nBy dawn, most workers are safe, though many have absorbed dangerous doses. Your own dosimeter shows 75 rem—enough to cause radiation sickness, but survivable with treatment.\n\nThe authorities arrive and put you in charge of initial response coordination. They value your firsthand knowledge, even if they do not want to hear the full truth of how bad it is.",
      isEnding: true,
      outcome: "You lived to 64, dying of radiation-related cancer. Your immediate evacuation leadership saved hundreds of lives in the first hours of the disaster. You continued as a coordinator for the initial response, helping establish safety zones and decontamination procedures. Your methodical approach became a model for nuclear emergency response worldwide. You trained emergency responders, consulted internationally, and helped draft evacuation protocols still used today. At your funeral, the Ukrainian emergency management director said: 'In absolute chaos, Volkov created order. His evacuation procedures that night saved lives and became the template we still follow.' You proved that calm leadership in crisis matters as much as any dramatic sacrifice. Your name appears on the Chernobyl memorial as one who served with honor."
    },

    rescue_trapped: {
      title: "Back Into Hell",
      date: "April 26, 1986, 2:00 AM - Near Control Room",
      text: "You run back into the damaged building. The radiation is intense—your dosimeter maxes out immediately. You find three operators trapped by debris.\n\nIt takes thirty minutes to free them. Every second costs you years of life. Your skin is already reddening, your body absorbing a lethal dose.\n\nBut you get them out. All three survive because you went back.",
      isEnding: true,
      outcome: "You died on May 18, 1986, after 22 days of deterioration in Moscow Hospital Number 6. But the three people you rescued all survived and lived full lives. You absorbed over 600 rem—a certainly fatal dose. But your rescue gave three families their fathers back. At your funeral, the three men you saved stood together and spoke: 'Aleksei Volkov ran into radiation that he knew would kill him to save us. He had seconds to decide between his life and ours. He chose ours without hesitation.' You were posthumously awarded the Order of Lenin. The three men you saved visit your grave together every year on the anniversary. Your sacrifice was absolute, your courage undeniable, your humanity unforgettable."
    },

    assess_damage: {
      title: "The Impossible Truth",
      date: "April 26, 1986, 1:35 AM - Outside Reactor 4",
      text: "You step outside and immediately wish you had not. The roof of Reactor 4 is completely gone. A pillar of ionized air glows blue-white, shooting radioactive particles into the atmosphere.\n\nYour dosimeter reads 3.6 roentgen. Then it stops working—you have exceeded its maximum range. The actual reading could be a hundred times higher.\n\nGraphite from the reactor core is scattered everywhere, each piece lethally radioactive. You see chunks glowing red-hot on the ground. Workers are picking them up with their bare hands, not understanding what they are touching.\n\nYou need to document this for Moscow, but staying here means absorbing a lethal dose.",
      choices: [
        {
          text: "Take photographs and measurements for an accurate report",
          next: "document_disaster",
          stats: { truth: 25, duty: 15, survival: -15 }
        },
        {
          text: "Stop workers from handling radioactive debris",
          next: "stop_workers",
          stats: { duty: 15, survival: 5 }
        }
      ]
    },

    document_disaster: {
      title: "The Record Keeper",
      date: "April 26, 1986, 3:00 AM - Disaster Site",
      text: "You photograph everything with a camera from the administration building. The destroyed reactor. The scattered graphite. The exposed core. Each photo exposes you to massive doses of radiation, but you need this evidence.\n\nYou take measurements where your instruments still work. You document exactly what happened and when. This data could save lives and prevent future accidents—if it is believed.\n\nBy the time you finish, you have absorbed over 300 rem. Fatal doses of radiation, but your documentation is complete.",
      isEnding: true,
      outcome: "You survived your radiation exposure after months of treatment, but with permanent health damage. You lived to 59, dying of radiation-related cancer. But your evidence became crucial in the government response and in later prosecutions. Your photographs are now in museums, your measurements in scientific papers. You testified at the trials of plant officials, your documentation helping convict those truly responsible. Gorbachev later said your evidence convinced him of the scale of the catastrophe. You were posthumously declared a Hero of the Soviet Union in 1991. Your legacy is the truth you documented at the cost of your own health. Every nuclear safety protocol written since references your work."
    },

    stop_workers: {
      title: "Saving the Ignorant",
      date: "April 26, 1986, 2:45 AM - Plant Grounds",
      text: "You run to workers picking up graphite blocks with their bare hands. 'Stop! That is reactor fuel! Each piece is lethal!'\n\nSome listen. Others think you are hysterical. One worker dismisses you: 'It is just graphite. It is barely warm.'\n\n'It is killing you!' you shout. 'Right now, as you hold it!'\n\nYou manage to prevent some exposures, but not all. And each moment you spend in this contaminated area adds to your own dose.",
      isEnding: true,
      outcome: "You lived to 62, dying of radiation-related cancer. But the workers you stopped from handling reactor debris survived with far less exposure than they would have received. An estimated 30-40 workers avoided lethal doses because of your warnings. You spent the rest of your life as a safety consultant, teaching about radiation dangers. Your story is used in training programs worldwide to show the importance of immediate intervention in radiation emergencies. At your funeral, several of the workers you saved attended. One brought a photo of his grandchildren: 'I would have picked up that graphite. Volkov stopped me. These children exist because he knew the danger and had the courage to act.' Your legacy is lives saved through knowledge courageously applied."
    },

    search_survivors: {
      title: "Into Hell",
      date: "April 26, 1986, 1:40 AM - Reactor Hall",
      text: "You enter what remains of the reactor building. The heat is overwhelming. Your shoes stick to melted asphalt. The air itself seems to glow.\n\nYou find Viktor. He is pinned under debris, badly burned but conscious. 'Aleksei... I cannot feel my legs. Leave me.'\n\n'Never,' you say, pulling at the concrete.\n\nThen you see Operator Akimov and Toptunov deeper in the hall, trying to manually lower the control rods. They are already ghost men—they have absorbed fatal doses, but they keep working.\n\nYour dosimeter is dead. You are receiving a lethal dose with every second you stay here.",
      choices: [
        {
          text: "Save Viktor and get him out immediately",
          next: "save_viktor",
          stats: { duty: 20, survival: -10 }
        },
        {
          text: "Help Akimov and Toptunov with the control rods first",
          next: "help_operators",
          stats: { duty: 30, survival: -25 }
        }
      ]
    },

    save_viktor: {
      title: "Brothers Keeper",
      date: "April 26, 1986, 2:00 AM - Reactor Building",
      text: "You pull at the debris pinning Viktor. Your strength is fading from radiation sickness already setting in, but you will not leave him.\n\nAfter twenty agonizing minutes, you free him. You drag him outside, both of you leaving a trail of blood. Medics rush him to an ambulance.\n\n'You saved me,' he gasps. 'But Aleksei... your face...'\n\nYou touch your face and your hand comes away bloody. Radiation burns. You have absorbed a fatal dose.",
      isEnding: true,
      outcome: "You died on May 24, 1986, after weeks of agony in Moscow Hospital Number 6. Viktor survived and lived another 40 years, dying of natural causes at 73. He named his son after you and told your story to anyone who would listen. He testified about your courage at official inquiries. He fought for your recognition as a hero. At your funeral, Viktor spoke through tears: 'Aleksei knew he was absorbing a lethal dose. He pulled me free anyway. Every day of my life since has been a gift from him.' Viktor visited your grave weekly until his own death. Your sacrifice for friendship became legendary among Chernobyl survivors. Your name is inscribed on the memorial as one who died saving others."
    },

    help_operators: {
      title: "The Ghost Men",
      date: "April 26, 1986, 2:10 AM - Reactor Hall",
      text: "You help Akimov and Toptunov manually lower the control rods. All three of you know you are dead men—you have absorbed doses that guarantee death within weeks.\n\nBut if you can stabilize what is left, maybe you can prevent it from getting worse. Your hands bleed as you work the manual controls. The heat is unbearable.\n\n'It is not responding,' Akimov says, his voice defeated. 'There is nothing left to control. The core is gone.'\n\nYou have given your life trying to fix the unfixable. But you tried.",
      isEnding: true,
      outcome: "You died three weeks later in Moscow Hospital Number 6, alongside Akimov and Toptunov. The three of you absorbed the highest doses of anyone who lived long enough to reach a hospital—over 1600 rem each. Your bodies broke down cell by cell while doctors could only watch. But your attempt to manually control the reactor, futile though it was, showed extraordinary courage. Years later, you were posthumously awarded the Order of the Red Banner. Your widows received the medals, and your story became a symbol of duty beyond reason, sacrifice beyond hope. You died trying to save a reactor that was already destroyed, but your courage saved something more important—the idea that some duties transcend even certain death."
    }
  };

  const currentSceneData = scenes[currentScene];

  if (!currentSceneData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-blue-900 to-black flex items-center justify-center">
        <div className="text-white text-center p-8">
          <AlertTriangle className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
          <p className="text-xl mb-4">Scene not found: {currentScene}</p>
          <button 
            onClick={onBack} 
            className="px-6 py-3 bg-blue-700 hover:bg-blue-600 rounded-lg transition-all"
          >
            Return to Timeline
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-blue-900 to-black relative overflow-hidden">
      {/* Decorative nuclear elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 text-9xl">⚛️</div>
        <div className="absolute bottom-10 right-10 text-9xl">☢️</div>
        <div className="absolute top-1/2 right-1/4 text-6xl">⚡</div>
      </div>

      {/* Stats Panel */}
      <div className="fixed top-4 right-4 bg-gray-900/90 backdrop-blur-sm border-2 border-blue-800/60 rounded-lg p-4 z-20 w-64">
        <h3 className="text-blue-400 font-serif font-bold mb-3 text-center">Your Character</h3>
        
        <div className="space-y-3">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-blue-300 text-sm flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Sense of Duty
              </span>
              <span className="text-blue-200 text-sm font-bold">{stats.duty}%</span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-600 to-cyan-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${stats.duty}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-blue-300 text-sm flex items-center gap-2">
                <Heart className="w-4 h-4" />
                Will to Survive
              </span>
              <span className="text-blue-200 text-sm font-bold">{stats.survival}%</span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-green-600 to-emerald-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${stats.survival}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-blue-300 text-sm flex items-center gap-2">
                <Radio className="w-4 h-4" />
                Commitment to Truth
              </span>
              <span className="text-blue-200 text-sm font-bold">{stats.truth}%</span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-yellow-600 to-orange-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${stats.truth}%` }}
              />
            </div>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-blue-800/40">
          <p className="text-blue-400/70 text-xs text-center italic">
            Every second counts
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-8 max-w-4xl">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-blue-300 hover:text-blue-100 transition-colors mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Return to Timeline</span>
        </button>

        {/* Story Card */}
        <div className="bg-gray-900/80 backdrop-blur-sm border-2 border-blue-800/60 rounded-lg overflow-hidden shadow-2xl">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-900 to-gray-900 p-6 border-b-2 border-blue-800/60">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <Zap className="w-8 h-8 text-yellow-300" />
                <div>
                  <h2 className="text-3xl font-serif font-bold text-blue-300">
                    {currentSceneData.title}
                  </h2>
                  <p className="text-blue-400/80 text-sm italic">{currentSceneData.date}</p>
                </div>
              </div>
              {currentSceneData.isEnding && (
                <div className="flex items-center gap-2 bg-blue-700/30 px-3 py-1 rounded-full">
                  <AlertTriangle className="w-4 h-4 text-yellow-300" />
                  <span className="text-blue-300 text-sm font-bold">Ending</span>
                </div>
              )}
            </div>
          </div>

          {/* Story Text */}
          <div className="p-8">
            <div className="prose prose-invert max-w-none">
              {currentSceneData.text.split('\n\n').map((paragraph, index) => (
                <p key={index} className="text-blue-100 text-lg leading-relaxed mb-4">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Ending Outcome */}
            {currentSceneData.isEnding && currentSceneData.outcome && (
              <div className="mt-8 p-6 bg-blue-900/20 border-2 border-blue-700/50 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-blue-300 font-serif font-bold text-xl mb-2">Your Legacy</h3>
                    <p className="text-blue-200 leading-relaxed">
                      {currentSceneData.outcome}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Choices */}
            {!currentSceneData.isEnding && currentSceneData.choices && (
              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-2 text-blue-400 font-bold">
                  <span className="text-lg">Choose your action:</span>
                </div>
                {currentSceneData.choices.map((choice, index) => (
                  <button
                    key={index}
                    onClick={() => makeChoice(choice.next, choice.text, choice.stats)}
                    className="w-full text-left p-5 bg-gradient-to-r from-gray-800/50 to-blue-950/30 hover:from-blue-900/40 hover:to-gray-900/40 border-2 border-blue-800/40 hover:border-blue-600 rounded-lg transition-all duration-300 group"
                  >
                    <p className="text-blue-200 group-hover:text-blue-100 leading-relaxed">
                      {choice.text}
                    </p>
                    {choice.stats && Object.keys(choice.stats).length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {Object.entries(choice.stats).map(([stat, value]) => (
                          value !== 0 && (
                            <span 
                              key={stat}
                              className={`text-xs px-2 py-1 rounded-full ${
                                value > 0 
                                  ? 'bg-green-900/40 text-green-300' 
                                  : 'bg-red-900/40 text-red-300'
                              }`}
                            >
                              {stat.charAt(0).toUpperCase() + stat.slice(1)}: {value > 0 ? '+' : ''}{value}
                            </span>
                          )
                        ))}
                      </div>
                    )}
                  </button>
                ))}
              </div>
            )}

            {/* Ending Actions */}
            {currentSceneData.isEnding && (
              <div className="mt-8 flex gap-4">
                <button
                  onClick={() => {
                    setCurrentScene('intro');
                    setChoices([]);
                    setStats({ duty: 50, survival: 50, truth: 50 });
                  }}
                  className="flex-1 px-6 py-3 bg-blue-700 hover:bg-blue-600 text-white font-semibold rounded-lg transition-all duration-300"
                >
                  Play Again
                </button>
                <button
                  onClick={onBack}
                  className="flex-1 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg transition-all duration-300"
                >
                  Choose Different Timeline
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Choice History */}
        {choices.length > 0 && !currentSceneData.isEnding && (
          <div className="mt-6 bg-gray-900/60 backdrop-blur-sm border border-blue-800/40 rounded-lg p-4">
            <h3 className="text-blue-400 font-bold mb-3 text-sm">Your Decisions:</h3>
            <div className="space-y-2">
              {choices.map((choice, index) => (
                <div key={index} className="flex items-start gap-2">
                  <span className="text-blue-600 text-xs mt-1">▸</span>
                  <p className="text-blue-300/70 text-xs">{choice}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModernStory;
