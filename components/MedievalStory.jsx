import React, { useState } from 'react';
import { ArrowLeft, Heart, Skull, Cross, AlertTriangle, Users } from 'lucide-react';

const MedievalStory = ({ onBack }) => {
  const [currentScene, setCurrentScene] = useState('intro');
  const [choices, setChoices] = useState([]);
  const [stats, setStats] = useState({
    faith: 50,
    compassion: 50,
    survival: 50
  });

  const updateStats = (statChanges) => {
    setStats(prev => ({
      faith: Math.max(0, Math.min(100, prev.faith + (statChanges.faith || 0))),
      compassion: Math.max(0, Math.min(100, prev.compassion + (statChanges.compassion || 0))),
      survival: Math.max(0, Math.min(100, prev.survival + (statChanges.survival || 0)))
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
      title: "The Pestilence Arrives",
      date: "Spring, 1348 - Village of Ashford, England",
      text: "You are Eleanor, a healer in the village of Ashford. For generations, your family has tended to the sick, mixing herbs and saying prayers. Your mother taught you the old ways before she died last winter.\n\nThis morning, a merchant arrived from Bristol with terrible news. 'The Death has come,' he gasped, fevered and covered in black swellings. 'It's in London. It's in Southampton. Entire villages—gone.'\n\nNow he lies in your cottage, dying. The priest, Father Benedict, refuses to give him last rites, terrified of contagion. Your young apprentice Sarah looks to you with fear in her eyes.\n\nThrough your window, you see villagers gathering in the square, panic spreading faster than any disease. You must decide how to face what's coming.",
      choices: [
        {
          text: "Care for the merchant despite the danger - your calling is to heal",
          next: "care_for_merchant",
          stats: { compassion: 15, survival: -10 }
        },
        {
          text: "Quarantine him outside the village and let nature take its course",
          next: "quarantine_merchant",
          stats: { survival: 15, compassion: -10 }
        },
        {
          text: "Flee the village with Sarah before the plague spreads",
          next: "flee_village",
          stats: { survival: 20, faith: -15, compassion: -5 }
        },
        {
          text: "Call a village meeting to organize a coordinated response",
          next: "village_meeting",
          stats: { compassion: 10, faith: 5 }
        }
      ]
    },

    care_for_merchant: {
      title: "The Healer's Duty",
      date: "Spring, 1348 - Your Cottage",
      text: "You send Sarah to fetch water and herbs while you tend to the merchant. His skin burns with fever. The buboes under his arms are black and swollen, weeping fluid. He speaks in delirium about ships from the East, rats in the cargo holds, and death following the trade routes.\n\nYou mix a poultice of yarrow and garlic, though you know it's likely futile. Still, you've sworn to help those who suffer. As you work, you notice a small swelling beginning under your own arm.\n\nThe merchant dies at sunset, crying out for his wife and children. Father Benedict arrives, finally willing to perform the burial rites—but only if the body is burned.\n\nSarah discovers your swelling and goes pale. 'Mistress Eleanor... you're infected.'",
      choices: [
        {
          text: "Isolate yourself immediately to protect Sarah and the village",
          next: "self_isolate",
          stats: { compassion: 15, survival: -5 }
        },
        {
          text: "Continue your work while you still can - people will need healers",
          next: "continue_healing",
          stats: { compassion: 20, faith: 10, survival: -15 }
        },
        {
          text: "Seek help from the priest - perhaps faith can save you",
          next: "seek_priest",
          stats: { faith: 15, survival: 5 }
        }
      ]
    },

    quarantine_merchant: {
      title: "Harsh Necessity",
      date: "Spring, 1348 - Edge of Village",
      text: "You and several villagers drag the merchant to a hut on the village outskirts. He pleads for mercy, but you lock the door and post a guard. 'No one enters,' you command. 'Bring him water, nothing more.'\n\nThe merchant's screams echo through the night. By morning, he's dead. You order the hut burned with his body inside.\n\nThe village is horrified by your actions, but also relieved. You've shown leadership in crisis. Father Benedict approaches you: 'Eleanor, the Bishop has sent word. The plague is spreading. We must prepare. Will you help organize our defenses?'\n\nBut three days later, a child in the village develops fever and buboes. The Death is already here.",
      choices: [
        {
          text: "Organize strict quarantine measures for infected households",
          next: "strict_quarantine",
          stats: { survival: 20, compassion: -10 }
        },
        {
          text: "Focus on caring for the sick with Sarah's help",
          next: "care_for_sick",
          stats: { compassion: 20, faith: 5 }
        },
        {
          text: "It's too late - flee with your family before it spreads further",
          next: "late_flight",
          stats: { survival: 15, faith: -10 }
        }
      ]
    },

    flee_village: {
      title: "The Road North",
      date: "Spring-Summer, 1348 - The King's Highway",
      text: "You and Sarah flee at dawn, taking only what you can carry. Other villagers try to stop you—'Coward!' they shout—but you push past them.\n\nOn the road north, you encounter other refugees. A family begs you for help with their sick daughter, recognizing you as a healer. But helping means exposure and delay.\n\nYou pass through abandoned villages, bodies left unburied. Churches overflow with the dying. The plague moves faster than you can run.\n\nA monastery looms ahead, its gates still open. The monks are taking in refugees, but it's crowded and disease surely hides within those walls.",
      choices: [
        {
          text: "Seek shelter at the monastery - you need rest and food",
          next: "monastery_refuge",
          stats: { faith: 15, survival: -5 }
        },
        {
          text: "Continue north to the wild lands where fewer people mean less disease",
          next: "wilderness_survival",
          stats: { survival: 20, faith: -5 }
        },
        {
          text: "Help the family's sick daughter - you're still a healer",
          next: "roadside_healing",
          stats: { compassion: 20, survival: -10 }
        }
      ]
    },

    village_meeting: {
      title: "Council of the Frightened",
      date: "Spring, 1348 - Village Square",
      text: "You call the village together. Fifty faces look to you—farmers, craftsmen, the baker, the blacksmith. Fear hangs thick in the air.\n\n'The pestilence is coming,' you announce. 'But together, we can prepare. We need plans for quarantine, for care of the sick, for maintaining order.'\n\nThe blacksmith, Thomas, stands. 'My brother in London wrote before he died. He said to avoid the sick, burn the bodies, and pray. That's all we can do.'\n\nFather Benedict speaks: 'This is God's judgment on our sins. We must repent and seek divine mercy.'\n\nThe village looks to you. They need leadership, but what kind?",
      choices: [
        {
          text: "Organize practical measures - quarantine, hygiene, care for the sick",
          next: "practical_leadership",
          stats: { survival: 15, compassion: 10 }
        },
        {
          text: "Support Father Benedict's call for prayer and penance",
          next: "religious_leadership",
          stats: { faith: 20, compassion: 5 }
        },
        {
          text: "Suggest the village seal itself off - no one in or out",
          next: "seal_village",
          stats: { survival: 20, compassion: -10 }
        }
      ]
    },

    self_isolate: {
      title: "The Lonely Vigil",
      date: "Spring, 1348 - The Quarantine Hut",
      text: "You walk to the same hut where the merchant died. Sarah weeps as you lock yourself inside. Through the small window, you can see the village continuing its life.\n\nThe fever comes in waves. The buboes grow larger, more painful. You drink the water Sarah leaves outside your door, but you're weakening.\n\nOn the third day, a miracle: the fever breaks. The swellings begin to drain and heal. You've heard of this—some survive the plague. Perhaps one in ten.\n\nBy the seventh day, you're weak but recovering. You emerge to find the village transformed. Half the population shows symptoms. They need you now more than ever.",
      choices: [
        {
          text: "Use your immunity to care for the sick without fear",
          next: "immune_healer",
          stats: { compassion: 25, faith: 10, survival: 15 }
        },
        {
          text: "Leave the village - you've survived, save yourself",
          next: "survivor_departs",
          stats: { survival: 20, compassion: -20 }
        }
      ]
    },

    continue_healing: {
      title: "Service Until the End",
      date: "Spring-Summer, 1348 - Your Cottage",
      text: "Despite your infection, you continue treating patients. Sarah stays by your side, risking exposure. Together, you tend to the growing number of sick.\n\nYour cottage becomes a hospital. Bodies pile faster than they can be buried. You work through fever and pain, mixing remedies, offering comfort, holding hands as people die.\n\nSarah contracts the plague. You care for her as she cared for you, but she's young and strong. She survives.\n\nYou don't. On a warm June morning, you die in Sarah's arms, having saved dozens of lives at the cost of your own.",
      isEnding: true,
      outcome: "You died serving others, a healer to the end. Sarah survived and continued your work, teaching others your methods. The village never forgot your sacrifice. Years later, they built a shrine in your memory. Of the 200 villagers, 140 died—but many more would have perished without your care. Your compassion in the face of death became legend, inspiring healers for generations. You chose love over fear, and that choice echoed through history."
    },

    seek_priest: {
      title: "The Comfort of Faith",
      date: "Spring, 1348 - The Church",
      text: "Father Benedict receives you reluctantly, staying several paces back. You kneel before the altar, praying for deliverance.\n\n'God is testing us,' the priest says. 'If you survive, it's His will. If you die, you'll be cleansed of sin.'\n\nYou pray for three days, taking only water. The fever rages, and the buboes swell painfully. On the third night, in delirium, you see visions—your mother, saints, and angels.\n\nYou wake on the fourth morning to find the fever broken. The swellings are draining. Father Benedict declares it a miracle, proof of God's mercy.",
      choices: [
        {
          text: "Dedicate your survival to serving God and the sick",
          next: "faithful_healer",
          stats: { faith: 25, compassion: 15 }
        },
        {
          text: "Use your survival as proof of God's favor to lead the village spiritually",
          next: "spiritual_leader",
          stats: { faith: 30, survival: 10 }
        }
      ]
    },

    strict_quarantine: {
      title: "The Iron Will",
      date: "Summer, 1348 - Village of Ashford",
      text: "You enforce brutal quarantine measures. Infected families are sealed in their homes, food left at their doors. Guards patrol to prevent escape. Some houses fall silent within days.\n\nThe villagers hate you, but they obey. Your measures slow the spread. Where other villages lose nine in ten, Ashford loses only half.\n\nBut the cost is terrible. You hear the screams of the sealed families. Children crying for their dead mothers. A father begging to be let out to bury his wife.\n\nYou stay strong, even as your own heart breaks. This is survival, you tell yourself. This is leadership.",
      choices: [
        {
          text: "Maintain the harsh measures until the plague passes",
          next: "harsh_survival",
          stats: { survival: 25, compassion: -20 }
        },
        {
          text: "Show mercy and allow proper burials and care",
          next: "merciful_turn",
          stats: { compassion: 15, survival: -10 }
        }
      ]
    },

    care_for_sick: {
      title: "The Healer's Calling",
      date: "Summer, 1348 - Village of Ashford",
      text: "You and Sarah move from house to house, tending the sick. You mix remedies, clean wounds, offer comfort. Most die anyway, but not alone.\n\nThe plague ravages the village. Of 200 souls, only 50 remain by autumn. You work until you can barely stand.\n\nOne night, Sarah develops fever. You care for her with desperate intensity, applying every remedy you know. For three days, she lingers between life and death.\n\nShe survives. So do you, though you're exhausted and scarred by what you've witnessed.",
      choices: [
        {
          text: "Continue healing in other plague-stricken villages",
          next: "wandering_healer",
          stats: { compassion: 25, faith: 10 }
        },
        {
          text: "Stay and help rebuild Ashford",
          next: "rebuild_ashford",
          stats: { compassion: 15, survival: 10 }
        }
      ]
    },

    late_flight: {
      title: "Flight from Death",
      date: "Summer, 1348 - The Road",
      text: "You flee with your few possessions, but the plague has spread faster than you imagined. Every village you reach is infected or abandoned.\n\nYou survive on foraged food and water from streams. Other refugees eye you suspiciously—everyone fears infection.\n\nYou eventually find a remote valley, untouched by plague. A small community of refugees has gathered here, led by a monk who fled his monastery.",
      choices: [
        {
          text: "Join the refugee community and start anew",
          next: "refugee_community",
          stats: { survival: 20, faith: 5 }
        },
        {
          text: "Live alone in the wilderness to avoid all contact",
          next: "hermit_ending",
          stats: { survival: 25, compassion: -15, faith: -10 }
        }
      ]
    },

    monastery_refuge: {
      title: "Sacred Walls, Shared Death",
      date: "Summer, 1348 - St. Cuthbert's Monastery",
      text: "The monastery takes you in. Fifty monks and over a hundred refugees crowd the halls. The monks share their food and pray constantly.\n\nBut plague has already entered these walls. Within a week, the infirmary overflows. Monks die alongside peasants. The Abbot falls ill.\n\nYou help the monk-healers, using your knowledge. They're grateful for your skills. Brother Thomas asks: 'Will you stay and help us serve the sick? We're losing brothers every day.'",
      choices: [
        {
          text: "Stay and serve as a healer alongside the monks",
          next: "monastery_healer",
          stats: { compassion: 20, faith: 15 }
        },
        {
          text: "Leave before the infection spreads further",
          next: "leave_monastery",
          stats: { survival: 15, faith: -10 }
        }
      ]
    },

    wilderness_survival: {
      title: "The Wild Lands",
      date: "Summer-Autumn, 1348 - The Northern Forests",
      text: "You and Sarah travel far from civilization, surviving on hunting and foraging. You encounter no plague here—but also no people, no help, no comfort.\n\nWinter approaches. You need better shelter. In the distance, you see smoke from what might be a village or could be another group of survivors.",
      choices: [
        {
          text: "Investigate the smoke and seek community",
          next: "find_survivors",
          stats: { compassion: 10, survival: 5 }
        },
        {
          text: "Build a shelter here and survive alone through winter",
          next: "winter_alone",
          stats: { survival: 20, compassion: -10 }
        }
      ]
    },

    roadside_healing: {
      title: "Mercy on the Road",
      date: "Summer, 1348 - The King's Highway",
      text: "You stop to help the sick girl. She has the plague—unmistakable buboes and fever. Her parents weep with gratitude that someone would help.\n\nYou mix what remedies you can with roadside herbs. The girl worsens, then stabilizes. Against all odds, she begins to recover.\n\nThe family insists you stay with them. Their village, they say, needs healers desperately. 'Please,' the father begs. 'We lost our wise woman. Save our children.'",
      choices: [
        {
          text: "Go with them and serve as the village healer",
          next: "new_village_healer",
          stats: { compassion: 25, faith: 10 }
        },
        {
          text: "Continue your flight—you've helped enough",
          next: "continue_flight",
          stats: { survival: 15, compassion: -5 }
        }
      ]
    },

    practical_leadership: {
      title: "Organization and Discipline",
      date: "Summer, 1348 - Village of Ashford",
      text: "You organize the village with military precision. Infected families are isolated but cared for. You establish teams for water, food, and body disposal. Hygiene is enforced.\n\nYour practical approach saves lives. The village loses fewer than other settlements. But some resent your authority. Thomas the blacksmith challenges you: 'Who made you lord over us?'\n\nFather Benedict supports you, seeing results, but worries about neglecting spiritual matters.",
      choices: [
        {
          text: "Maintain your practical focus—it's working",
          next: "practical_success",
          stats: { survival: 25, compassion: 10 }
        },
        {
          text: "Balance practical measures with spiritual comfort",
          next: "balanced_approach",
          stats: { survival: 15, compassion: 15, faith: 15 }
        }
      ]
    },

    religious_leadership: {
      title: "Faith in Dark Times",
      date: "Summer, 1348 - Village of Ashford",
      text: "You support Father Benedict's spiritual approach. The village prays constantly, fasts, and does penance. Processions carry holy relics through the streets.\n\nBut the plague doesn't care about prayers. People die just as quickly. Some begin to lose faith. Others become more fanatical.\n\nA group of flagellants arrives, whipping themselves bloody and crying for God's mercy. They say only extreme penance will end the plague.",
      choices: [
        {
          text: "Join the flagellants in their extreme penance",
          next: "flagellant_path",
          stats: { faith: 30, survival: -15 }
        },
        {
          text: "Reject the flagellants and combine prayer with practical care",
          next: "practical_faith",
          stats: { faith: 15, compassion: 15, survival: 10 }
        }
      ]
    },

    seal_village: {
      title: "The Sealed Village",
      date: "Summer, 1348 - Village of Ashford",
      text: "The village barricades itself. No one enters, no one leaves. Guards patrol with weapons. You've created a prison to survive.\n\nBut plague was already inside. It spreads through the sealed village like fire. With no escape, families huddle together, spreading infection faster.\n\nThe sealed village becomes a tomb. Bodies pile in the streets. The guards abandon their posts. Chaos reigns.",
      choices: [
        {
          text: "Break quarantine and flee while you still can",
          next: "escape_sealed_village",
          stats: { survival: 20, faith: -15 }
        },
        {
          text: "Stay and try to maintain order and care for survivors",
          next: "last_stand",
          stats: { compassion: 20, faith: 10, survival: -10 }
        }
      ]
    },

    immune_healer: {
      title: "The Touched One",
      date: "Summer-Autumn, 1348 - Village of Ashford",
      text: "Your immunity makes you miraculous in villagers' eyes. You move among the sick without fear, offering care and comfort.\n\nSarah assists you, and miraculously, she also survives infection. Together, you save many lives through careful nursing and herbal remedies.\n\nBy autumn, the plague has passed. Of 200 villagers, 80 survive. You're hailed as a hero, blessed by God.\n\nOther villages send for you. Your reputation as a healer who survived the Death spreads throughout England.",
      choices: [
        {
          text: "Travel to help other plague-stricken villages",
          next: "ending_legendary_healer",
          stats: { compassion: 30, faith: 15 }
        },
        {
          text: "Stay in Ashford and help rebuild",
          next: "ending_ashford_rebuilder",
          stats: { compassion: 20, survival: 15 }
        }
      ]
    },

    survivor_departs: {
      title: "The Survivor's Guilt",
      date: "Summer, 1348 - Leaving Ashford",
      text: "You leave the dying village behind. Sarah follows reluctantly. 'They need you,' she protests. But you've survived, and that's enough.\n\nYou travel to York, where the plague hasn't yet arrived. You establish yourself as a healer, never mentioning Ashford.\n\nBut guilt haunts you. Every night, you see the faces of those you abandoned. You drink to forget, but the memories persist.",
      isEnding: true,
      outcome: "You survived but lost your soul in the process. You lived another thirty years as a competent but haunted healer. Your skills saved lives, but you never forgave yourself for abandoning Ashford. On your deathbed, you confessed your shame to a priest, weeping for forgiveness. Your legacy is complicated—a skilled healer who chose survival over duty. History doesn't record your name, but your descendants carry the burden of your choice."
    },

    faithful_healer: {
      title: "God's Instrument",
      date: "Summer-Autumn, 1348 - Village of Ashford",
      text: "You dedicate your miraculous survival to serving God and the sick. You work tirelessly, seeing your immunity as a divine gift.\n\nFather Benedict calls you 'Saint Eleanor,' though you protest the title. The villagers come to see your touch as blessed.\n\nYou save many through nursing care, herbal remedies, and faith. By autumn, the plague recedes. You've helped save dozens of lives.",
      isEnding: true,
      outcome: "You became known as the 'Blessed Healer of Ashford.' Your combination of medical knowledge and deep faith made you legendary. You lived another forty years, training apprentices in both healing arts and spiritual care. The Church considered your beatification, though it was never formal. You died peacefully at 65, surrounded by three generations of healers you'd trained. Your methods—combining hygiene, herbcraft, and faith—became a model for medieval medicine. You proved that science and spirituality could work together to serve humanity."
    },

    spiritual_leader: {
      title: "The Prophet of Ashford",
      date: "Summer-Autumn, 1348 - Village of Ashford",
      text: "You use your survival as proof of divine favor. You lead prayer services, interpret omens, and offer spiritual guidance. The village sees you as holy.\n\nFather Benedict is conflicted—grateful for your help but wary of your growing influence. You're not ordained, yet people listen to you more than him.\n\nYou guide the village through the plague with a mix of faith and practical wisdom. Your leadership saves many lives, though you credit God entirely.",
      isEnding: true,
      outcome: "You became a spiritual leader, though never officially recognized by the Church. Your influence grew beyond Ashford. People came from distant villages to hear you speak. You performed no miracles, but your survival and wisdom made you revered. You lived modestly, refusing all wealth, and died at 58. Later generations debated whether you were a saint or simply a wise woman. Either way, your leadership during the darkest time gave people hope, and that was miracle enough."
    },

    harsh_survival: {
      title: "The Iron Rule",
      date: "Autumn, 1348 - Village of Ashford",
      text: "You maintain strict quarantine despite the suffering it causes. Families die alone in sealed homes. The survivors hate you, but they live.\n\nWhen the plague finally passes, 100 of 200 villagers survive—far better than most places. But the cost was terrible.\n\nAt the first harvest after the plague, Thomas the blacksmith confronts you publicly. 'You saved our bodies but killed our souls. You let children die alone. You're no healer—you're a tyrant.'\n\nThe village is divided between those grateful for survival and those who can't forgive your methods.",
      isEnding: true,
      outcome: "You lived another twenty years in Ashford, respected but not loved. Your methods saved lives, but at a moral cost you never quite reconciled. You trained no apprentices—no one wanted to learn your cruel mercy. On your deathbed, you wondered if compassion might have saved as many while preserving humanity. Your legacy is debated: pragmatic hero or heartless survivor? History offers no clear answer. You made an impossible choice in impossible times, and lived with the consequences."
    },

    merciful_turn: {
      title: "Compassion Returns",
      date: "Autumn, 1348 - Village of Ashford",
      text: "You soften your measures, allowing families to care for their dying with dignity. You help with burials and comfort the grieving.\n\nMore die from the relaxed quarantine, but those who survive are grateful. The village remains a community, not just a collection of survivors.\n\nSarah catches plague from an infected family but survives. You nurse her through it, and your bond deepens.",
      isEnding: true,
      outcome: "You found balance between survival and humanity. Ashford lost 130 of its 200 people—more than with strict quarantine, but the survivors remained human. You became the village's heart, respected and loved. You trained Sarah as your successor. Together, you rebuilt Ashford into a thriving community. You died at 62, honored by three generations. Your lesson: survival without compassion isn't truly surviving. Your name became synonymous with wise, merciful leadership in crisis."
    },

    wandering_healer: {
      title: "The Road of Service",
      date: "Autumn 1348 - Spring 1350 - The Kingdom",
      text: "You and Sarah travel from village to village, offering healing to plague survivors. You teach hygiene, mix remedies, and comfort the dying.\n\nYou see England transformed—villages emptied, fields untended, churches abandoned. But wherever you go, you bring hope.\n\nYou contract plague twice more and survive both times. Your immunity becomes legendary. Some call you blessed, others cursed. You don't care—you just keep healing.",
      isEnding: true,
      outcome: "You became one of medieval England's most famous healers, the 'Wandering Angel' of plague chronicles. You and Sarah walked thousands of miles over fifteen years, teaching your methods. Your observations about hygiene and contagion were centuries ahead of their time. You died at 45, collapsing on a roadside after treating a sick child. That child survived and became a healer in your honor. You saved thousands of lives and trained hundreds of healers. Your legacy lived on in every person they saved."
    },

    rebuild_ashford: {
      title: "Roots in Ash",
      date: "Autumn 1348 - 1365 - Village of Ashford",
      text: "You stay in Ashford and lead its rebuilding. With most of the population dead, survivors must work together. You organize farming, repair buildings, and care for orphans.\n\nSlowly, the village heals. You marry Thomas the blacksmith, and together you rebuild not just homes but community. You train new healers, teaching everything your mother taught you.\n\nAshford becomes known as a model of post-plague recovery. Other villages send representatives to learn from you.",
      isEnding: true,
      outcome: "You transformed from healer to leader, from survivor to architect of renewal. Ashford thrived under your guidance, becoming prosperous again within a generation. You had four children, all trained in healing or trade. You died at 68, having seen Ashford grow from ruins to a thriving market town. Your gravestone reads: 'Eleanor the Healer—She rebuilt what death destroyed.' Your descendants led Ashford for generations, carrying your wisdom forward."
    },

    refugee_community: {
      title: "New Beginnings",
      date: "Winter 1348 - 1360 - The Valley",
      text: "You join the refugee community in the hidden valley. Fifty souls, all fleeing plague. Together, you build a new settlement, free from the Death.\n\nYou serve as the community's healer. The monk, Brother Paul, provides spiritual guidance. Slowly, you create a new society from the ruins of the old.\n\nYou never return to Ashford. You never know its fate. But here, in this valley, you're safe.",
      isEnding: true,
      outcome: "You lived to 61 in the valley community, which grew to 200 souls by your death. You married a widowed farmer and had two children. The valley was eventually 'discovered' by the outside world, but by then, it was an established village named Haven. You never knew if you were a coward for fleeing or wise for surviving. Your descendants still live in Haven today, and local legend says it was founded by 'Eleanor the Wise,' who led refugees to safety during the great plague."
    },

    hermit_ending: {
      title: "Solitude",
      date: "1348-1358 - The Deep Woods",
      text: "You leave Sarah at the monastery and vanish into the wilderness alone. You survive by hunting and foraging, avoiding all human contact.\n\nFor ten years, you live as a hermit. You see no plague, but also no people, no community, no purpose beyond survival.\n\nOne day, you find Sarah again—now a grown woman, married, with children. She forgives your abandonment and begs you to return to civilization.\n\nBut you've been alone too long. You return to your hermitage and die there, forgotten.",
      isEnding: true,
      outcome: "You survived but lost everything that makes life worth living. You died alone at 52, your body not found for months. Sarah mourned you, though she never understood your choice. Your story became a cautionary tale about the cost of extreme self-preservation. You won survival but lost your humanity. In the end, you were more dead than those who died among loved ones during the plague."
    },

    monastery_healer: {
      title: "Sister Eleanor",
      date: "Summer 1348 - 1370 - St. Cuthbert's Monastery",
      text: "You stay at the monastery, working alongside the monks. You take informal vows and dedicate your life to healing. Sarah joins you, and together you establish a proper infirmary.\n\nThree-quarters of the monastery dies, including the Abbot. Brother Thomas becomes the new Abbot and formalizes your position. You're not truly a nun, but you live as one.\n\nFor twenty years, you serve the sick. The plague returns in waves—1361, 1368—but you're always there, immune and tireless.",
      isEnding: true,
      outcome: "You became 'Sister Eleanor,' though never formally ordained. Your infirmary at St. Cuthbert's became famous throughout England. You trained dozens of monk-healers, creating a legacy of medical care. You died at 62, peacefully in your sleep, surrounded by the monks you'd served with for decades. The monastery erected a statue in your honor. You proved that dedication to healing transcends gender and formal religious status. Your methods saved thousands and influenced monastic medicine for centuries."
    },

    leave_monastery: {
      title: "The Coward's Flight Again",
      date: "Summer 1348 - The Road",
      text: "You leave the monastery before dawn, unable to face more death. Sarah follows, disappointed in your cowardice.\n\nYou travel aimlessly, always fleeing, never helping. The plague follows you everywhere. You see England transform into a land of ghosts.\n\nEventually, you reach a port and consider fleeing to Ireland or Scotland. But plague has spread there too. There's nowhere left to run.",
      choices: [
        {
          text: "Board a ship to Ireland and hope for the best",
          next: "ending_ship_fate",
          stats: { survival: 10, faith: -15 }
        },
        {
          text: "Accept that you can't outrun death and face it with courage",
          next: "acceptance_ending",
          stats: { faith: 15, compassion: 10 }
        }
      ]
    },

    find_survivors: {
      title: "The Forest Community",
      date: "Autumn 1348 - Winter 1349 - The Northern Woods",
      text: "You find a small group of survivors—families who fled the plague. They've built crude shelters and are struggling to survive the coming winter.\n\nThey welcome you eagerly when they learn you're a healer. Together, you survive the harsh winter, hunting and rationing food.\n\nBy spring, two-thirds of the group has survived. You've formed bonds, shared stories, and created a makeshift community.",
      choices: [
        {
          text: "Stay with this community and build a permanent settlement",
          next: "forest_settlement",
          stats: { compassion: 20, survival: 15 }
        },
        {
          text: "Return to civilization now that plague has passed",
          next: "return_civilization",
          stats: { faith: 10, survival: 10 }
        }
      ]
    },

    winter_alone: {
      title: "The Solitary Winter",
      date: "Winter 1348-1349 - The Northern Woods",
      text: "You and Sarah build a sturdy shelter and survive on stored food and hunting. The winter is brutal. Sarah develops a fever—not plague, but pneumonia.\n\nWithout proper medicine, you nurse her with what herbs you can find. For two weeks, she hovers between life and death.\n\nShe survives, but barely. When spring comes, you're both weakened and realize you can't survive another winter alone.",
      choices: [
        {
          text: "Return to civilization and offer your healing services",
          next: "return_as_healer",
          stats: { compassion: 15, survival: 10 }
        },
        {
          text: "Continue living in the wilderness, better prepared this time",
          next: "wilderness_life",
          stats: { survival: 20, compassion: -10 }
        }
      ]
    },

    new_village_healer: {
      title: "Healer of Brookhaven",
      date: "Summer 1348 - 1365 - Village of Brookhaven",
      text: "You settle in Brookhaven and become their healer. The village loses many to plague, but your care saves countless lives.\n\nYou marry a widowed carpenter and raise his children alongside Sarah, whom you've adopted as your own. The village thrives under your care.\n\nWhen plague returns in 1361, you're ready. Your preparations save Brookhaven from the worst of it.",
      isEnding: true,
      outcome: "You lived a long, fulfilling life in Brookhaven, dying at 70. You saved hundreds of lives across two plague outbreaks. Your adopted daughter Sarah became a renowned healer, spreading your methods across England. Brookhaven erected a memorial well in your honor, which still stands today. You proved that one person's compassion and skill can change a community's fate. Your legacy lived on through Sarah and her students, forming a lineage of healers that lasted generations."
    },

    continue_flight: {
      title: "Always Running",
      date: "Summer 1348 - Winter 1349 - Various Locations",
      text: "You continue fleeing from place to place, helping briefly but never staying. Sarah grows resentful of the constant travel.\n\n'We could make a difference if we stayed somewhere,' she argues. But you're too afraid, too traumatized by what you've seen.\n\nEventually, Sarah leaves you to return to one of the villages you'd helped. You continue alone, a perpetual refugee.",
      isEnding: true,
      outcome: "You died at 48 on a roadside, alone and unmourned. Your constant flight saved your life but cost you everything else. Sarah went on to become a successful healer, but she never spoke of you with warmth. You're remembered, if at all, as a cautionary tale: survival means nothing without purpose or connection. You lived longer than many plague victims, but you never truly lived at all."
    },

    practical_success: {
      title: "The Pragmatic Leader",
      date: "Autumn 1348 - 1360 - Village of Ashford",
      text: "Your practical measures work. Ashford survives with lower mortality than surrounding villages. You become the de facto leader, organizing not just disease response but reconstruction.\n\nYou're not loved, but you're respected. The village prospers under your firm leadership. Father Benedict calls you 'God's instrument of practical mercy.'\n\nYou train others in your methods, creating a manual of plague response that spreads to other villages.",
      isEnding: true,
      outcome: "You became one of medieval England's most effective crisis leaders. Your methods were studied and copied. You lived to 65, dying of natural causes after seeing Ashford grow more prosperous than before the plague. Your treatise on plague management, dictated to a monk, influenced public health practices for centuries. You proved that rational, organized responses save lives even in supernatural-seeming crises. History remembers you as ahead of your time—a scientific mind in a mystical age."
    },

    balanced_approach: {
      title: "Mind, Body, and Spirit",
      date: "Autumn 1348 - 1363 - Village of Ashford",
      text: "You balance practical disease control with spiritual comfort. You organize quarantines while ensuring families can pray together. You enforce hygiene while respecting religious rituals.\n\nYour balanced approach resonates with villagers. Ashford maintains both its health and its soul. Father Benedict becomes your close ally.\n\nWhen plague returns in 1361, your combined practical and spiritual approach proves even more effective.",
      isEnding: true,
      outcome: "You created a model of holistic crisis response that became famous throughout medieval England. You lived to 72, training generations of healers who understood that people need both medicine and meaning. The 'Ashford Method' combined hygiene, nursing care, and spiritual support. You proved that faith and science aren't enemies but allies. Your legacy influenced both medical and religious communities for centuries, showing that the best healing addresses the whole person."
    },

    flagellant_path: {
      title: "The Blood of Penance",
      date: "Summer 1348 - Autumn 1348 - Various Locations",
      text: "You join the flagellants, believing extreme penance will end the plague. You whip yourself bloody, march from town to town, and cry for God's mercy.\n\nBut the plague doesn't stop. If anything, the flagellants spread it faster by traveling. You become ill—not with plague, but with infected wounds from your self-flagellation.\n\nAs you lie dying from blood poisoning, you realize your mistake. Faith doesn't require self-destruction.",
      isEnding: true,
      outcome: "You died at 35, a victim of misguided faith. The flagellant movement was later condemned by the Church as heretical and harmful. Your story became a warning about the dangers of religious extremism. Sarah, who didn't follow you, survived and spoke sadly of your fate. You meant well but confused suffering with holiness. Your death taught others that God doesn't demand self-destruction. Sometimes the truest faith is simply caring for those who suffer, not adding to the world's pain."
    },

    practical_faith: {
      title: "Faithful Pragmatism",
      date: "Summer 1348 - 1365 - Village of Ashford",
      text: "You reject the flagellants' extremism but maintain deep faith. You pray while practicing hygiene. You trust God while using medicine. You see faith and reason as partners, not enemies.\n\nFather Benedict supports this balanced approach. Together, you lead Ashford through the plague with both spiritual comfort and practical care.\n\nThe village survives better than most, and its faith remains intact.",
      isEnding: true,
      outcome: "Your synthesis of faith and practicality became a model for religious communities. You lived to 68, honored by both the Church and medical practitioners. You wrote devotional texts that included practical health advice, revolutionary for their time. You proved that trusting God doesn't mean ignoring reason. Your legacy influenced how religious communities approached disease for centuries, showing that faith works best when combined with action and knowledge."
    },

    escape_sealed_village: {
      title: "Breaking Quarantine",
      date: "Summer 1348 - The Road",
      text: "You break through the barricades at night, fleeing the dying village. Others follow your example. The quarantine collapses completely.\n\nYou escape but carry guilt. Your actions may have sealed Ashford's fate. You wander England, never settling, haunted by what you've done.",
      isEnding: true,
      outcome: "You survived to 55 but never found peace. Your decision to break quarantine haunted you. Ashford was nearly wiped out after the barricades fell. You lived as a wanderer, never building connections, always running from your guilt. On your deathbed, you confessed to a priest who said, 'God forgives, but can you forgive yourself?' You couldn't. Your story teaches that survival at any cost may cost too much. Sometimes the weight of living is heavier than the release of dying with integrity."
    },

    last_stand: {
      title: "Until the End",
      date: "Summer-Autumn 1348 - Village of Ashford",
      text: "You stay in the sealed village despite the chaos. You care for the sick, comfort the dying, and maintain what order you can.\n\nOf 200 villagers, only 25 survive. You're among them, having contracted and survived plague. The village is devastated but not destroyed.\n\nYou spend the rest of your life rebuilding Ashford, never forgetting those you couldn't save.",
      isEnding: true,
      outcome: "You became the heart of Ashford's survival and renewal. The 25 survivors looked to you for leadership. Over twenty years, you helped rebuild the village to 150 people. You died at 64, exhausted but satisfied. Every survivor told their children about Eleanor who stayed when she could have fled. A small chapel was built in your memory. You proved that sometimes the greatest courage is simply staying when others run, caring when others abandon. Your name became synonymous with steadfast compassion."
    },

    ending_legendary_healer: {
      title: "The Angel of the Plague Years",
      date: "1348-1363 - Throughout England",
      text: "For fifteen years, you and Sarah travel throughout England, healing wherever you're needed. You become legendary—the healer who cannot die, blessed by God, touched by angels.\n\nYou see England transform. Villages emptied and refilled. Society reorganized. Survivors adapting to a new world.\n\nYou collapse while treating a sick child in Yorkshire. Your body, worn by fifteen years of constant service, simply gives out.",
      isEnding: true,
      outcome: "You died at 45, but your legend lived forever. Chronicles called you 'Eleanor the Blessed' or 'The Angel of Mercy.' You saved thousands, trained hundreds of healers, and changed how England responded to disease. Sarah compiled your teachings into a manual used for centuries. Churches claimed you performed miracles. You probably didn't—you just cared deeply and worked tirelessly. But maybe that's the real miracle: choosing to serve others even when death surrounds you. You proved that one person's compassion can echo through history."
    },

    ending_ashford_rebuilder: {
      title: "The Heart of Ashford",
      date: "1348-1380 - Village of Ashford",
      text: "You dedicate your life to rebuilding Ashford. You marry, have children, train healers, and help the village prosper again. You never forget the dead, building a memorial chapel where each victim's name is recorded.\n\nAshford becomes a symbol of recovery and resilience. Other villages send representatives to learn from your rebuilding efforts.\n\nYou die at 72, surrounded by three generations of your family.",
      isEnding: true,
      outcome: "You transformed Ashford from a plague-stricken village into a thriving community. Your leadership combined practical wisdom, deep compassion, and unwavering commitment. The memorial chapel you built became a pilgrimage site. Your descendants included healers, leaders, and teachers who carried your values forward. You proved that communities can recover from even the worst disasters with the right leadership. Your gravestone reads: 'Eleanor—She stayed when others fled, healed when others despaired, built when others abandoned hope.' That epitaph tells everything about your character and legacy."
    },

    ending_ship_fate: {
      title: "The Ship of Fools",
      date: "Autumn 1348 - Irish Sea",
      text: "You board a ship to Ireland, hoping to outrun the plague. But disease is already aboard. Passengers sicken within days.\n\nThe ship is refused entry at every port. You drift for weeks, the living barely outnumbering the dead. Food runs out.\n\nYou survive by drinking rainwater and eating what little remains, but you contract plague from the crowded, filthy conditions.",
      isEnding: true,
      outcome: "You died at sea, your body committed to the waves. The 'plague ship' became a ghost story sailors told for centuries. Your desperate flight ended in precisely what you'd tried to escape. Sarah, who stayed in England, survived and lived a productive life. Your story became a cautionary tale: you cannot outrun destiny, only face it with courage or cowardice. You chose flight and found death anyway. Perhaps staying and helping would have given your death meaning. As it was, you died alone, afraid, and unmourned—a tragic end to a promising healer."
    },

    acceptance_ending: {
      title: "The Final Choice",
      date: "Autumn 1348 - Port Town",
      text: "You abandon plans to flee. Instead, you find a plague-stricken port town and offer your services as a healer. Sarah joins you, relieved you've finally found courage.\n\nYou work for three months, caring for the sick. You contract plague but survive. Sarah also survives.\n\nWhen the plague passes, you've saved dozens of lives and found peace.",
      isEnding: true,
      outcome: "You lived to 58, spending the rest of your life as a respected healer. Your decision to stop running and start serving marked the real beginning of your life. You trained Sarah and others, creating a network of healers. You died peacefully, surrounded by friends and former patients. Your earlier flights were forgiven—everyone understood fear. But your final choice to serve rather than flee defined you. Your epitaph reads: 'Eleanor—She ran until she found the courage to stand.' That transformation from fear to courage inspired others for generations."
    },

    forest_settlement: {
      title: "The Hidden Village",
      date: "1349-1370 - The Forest",
      text: "You help establish a permanent forest settlement. Over twenty years, it grows from 30 refugees to 150 people. You serve as healer, midwife, and counselor.\n\nThe settlement thrives in isolation, creating new traditions from survivors of a dozen villages. You marry a widowed farmer and raise his children.\n\nYou die peacefully at 65, having helped create a new community from plague's refugees.",
      isEnding: true,
      outcome: "The forest settlement eventually became the town of Greenvale. Your contribution as founder and healer was never forgotten. The town still celebrates 'Eleanor's Day' annually, honoring your memory. You proved that from tragedy can come new beginnings. Your descendants filled Greenvale for generations. You died knowing you'd helped birth a community that would outlive you by centuries. Your legacy wasn't just healing individuals but helping create something lasting and good from the ashes of catastrophe."
    },

    return_civilization: {
      title: "The Homecoming",
      date: "Spring 1349 - Kingdom of England",
      text: "You return to civilization to find England transformed. Labor shortages have empowered the surviving peasants. Old social orders are crumbling. It's a new world.\n\nYou settle in a recovering town and establish yourself as a healer. Your experience treating plague victims makes you valuable.\n\nYou live comfortably, training apprentices and serving your community.",
      isEnding: true,
      outcome: "You lived to 60, dying of natural causes. You were a respected community member, your forest survival seen as admirably resourceful rather than cowardly. You trained a dozen apprentices who spread throughout England. You witnessed and participated in the social changes the plague brought—rising wages, increased mobility, questioning of old authorities. You died knowing you'd adapted and contributed to a changing world. Your story showed that survivors could rebuild better lives from plague's ruins."
    },

    return_as_healer: {
      title: "The Winter Survivor Returns",
      date: "Spring 1349 - 1365 - Recovered England",
      text: "You return to civilization after your harsh winter and offer your healing services. Towns are desperate for healers, having lost so many.\n\nYou settle in a market town and thrive. Your wilderness survival skills and medical knowledge make you invaluable.\n\nYou marry, have children, and live a full life.",
      isEnding: true,
      outcome: "You lived to 63, a successful healer and respected community member. Your wilderness experience taught you resilience that served you throughout life. You never forgot the harsh winter that nearly killed you and Sarah, and you never took comfort or community for granted again. You raised four children, all taught basic healing skills. Your family prospered in post-plague England's new social order. You died content, knowing you'd turned fear and flight into a productive life of service."
    },

    wilderness_life: {
      title: "The Forest Hermit",
      date: "1349-1362 - The Northern Woods",
      text: "You and Sarah choose to remain in the wilderness, better prepared after learning from your mistakes. You build a proper cabin, store food efficiently, and live off the land.\n\nFor thirteen years, you live in near-isolation, seeing other humans perhaps twice a year. Sarah grows resentful of the isolation.\n\nWhen you're 48, Sarah leaves to return to civilization. You choose to stay, too settled in your solitary ways.",
      isEnding: true,
      outcome: "You died alone at 55, your body discovered months later by hunters. Sarah, who built a successful life as a healer, always regretted leaving you but couldn't convince you to return. Your choice of total isolation over human connection was seen as tragic. You survived the plague only to die alone in self-imposed exile. Your story became a local legend—a warning about choosing survival over living, isolation over community, safety over meaning. You won the battle against plague but lost the war for a meaningful life."
    }
  };

  const currentSceneData = scenes[currentScene];

  if (!currentSceneData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-950 via-stone-900 to-black flex items-center justify-center">
        <div className="text-white text-center p-8">
          <Skull className="w-16 h-16 text-purple-400 mx-auto mb-4" />
          <p className="text-xl mb-4">Scene not found: {currentScene}</p>
          <button 
            onClick={onBack} 
            className="px-6 py-3 bg-purple-700 hover:bg-purple-600 rounded-lg transition-all"
          >
            Return to Timeline
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-stone-900 to-black relative overflow-hidden">
      {/* Decorative medieval elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 text-9xl">⚕️</div>
        <div className="absolute bottom-10 right-10 text-9xl">☨</div>
        <div className="absolute top-1/2 right-1/4 text-6xl">🕯️</div>
      </div>

      {/* Stats Panel */}
      <div className="fixed top-4 right-4 bg-stone-900/90 backdrop-blur-sm border-2 border-purple-800/60 rounded-lg p-4 z-20 w-64">
        <h3 className="text-purple-400 font-serif font-bold mb-3 text-center">Your Spirit</h3>
        
        <div className="space-y-3">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-purple-300 text-sm flex items-center gap-2">
                <Cross className="w-4 h-4" />
                Faith
              </span>
              <span className="text-purple-200 text-sm font-bold">{stats.faith}%</span>
            </div>
            <div className="w-full bg-stone-800 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${stats.faith}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-purple-300 text-sm flex items-center gap-2">
                <Heart className="w-4 h-4" />
                Compassion
              </span>
              <span className="text-purple-200 text-sm font-bold">{stats.compassion}%</span>
            </div>
            <div className="w-full bg-stone-800 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-rose-600 to-red-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${stats.compassion}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-purple-300 text-sm flex items-center gap-2">
                <Users className="w-4 h-4" />
                Will to Survive
              </span>
              <span className="text-purple-200 text-sm font-bold">{stats.survival}%</span>
            </div>
            <div className="w-full bg-stone-800 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-green-600 to-emerald-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${stats.survival}%` }}
              />
            </div>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-purple-800/40">
          <p className="text-purple-400/70 text-xs text-center italic">
            In darkness, who will you be?
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-8 max-w-4xl">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-purple-300 hover:text-purple-100 transition-colors mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Return to Timeline</span>
        </button>

        {/* Story Card */}
        <div className="bg-stone-900/80 backdrop-blur-sm border-2 border-purple-800/60 rounded-lg overflow-hidden shadow-2xl">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-900 to-indigo-900 p-6 border-b-2 border-purple-800/60">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <Heart className="w-8 h-8 text-purple-300" />
                <div>
                  <h2 className="text-3xl font-serif font-bold text-purple-300">
                    {currentSceneData.title}
                  </h2>
                  <p className="text-purple-400/80 text-sm italic">{currentSceneData.date}</p>
                </div>
              </div>
              {currentSceneData.isEnding && (
                <div className="flex items-center gap-2 bg-purple-700/30 px-3 py-1 rounded-full">
                  <Skull className="w-4 h-4 text-purple-300" />
                  <span className="text-purple-300 text-sm font-bold">Ending</span>
                </div>
              )}
            </div>
          </div>

          {/* Story Text */}
          <div className="p-8">
            <div className="prose prose-invert max-w-none">
              {currentSceneData.text.split('\n\n').map((paragraph, index) => (
                <p key={index} className="text-purple-100 text-lg leading-relaxed mb-4 font-serif">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Ending Outcome */}
            {currentSceneData.isEnding && currentSceneData.outcome && (
              <div className="mt-8 p-6 bg-purple-900/20 border-2 border-purple-700/50 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-6 h-6 text-purple-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-purple-300 font-serif font-bold text-xl mb-2">Your Legacy</h3>
                    <p className="text-purple-200 leading-relaxed">
                      {currentSceneData.outcome}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Choices */}
            {!currentSceneData.isEnding && currentSceneData.choices && (
              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-2 text-purple-400 font-serif font-bold">
                  <span className="text-lg">Choose your path:</span>
                </div>
                {currentSceneData.choices.map((choice, index) => (
                  <button
                    key={index}
                    onClick={() => makeChoice(choice.next, choice.text, choice.stats)}
                    className="w-full text-left p-5 bg-gradient-to-r from-stone-800/50 to-purple-950/30 hover:from-purple-900/40 hover:to-indigo-900/40 border-2 border-purple-800/40 hover:border-purple-600 rounded-lg transition-all duration-300 group"
                  >
                    <p className="text-purple-200 group-hover:text-purple-100 font-serif leading-relaxed">
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
                    setStats({ faith: 50, compassion: 50, survival: 50 });
                  }}
                  className="flex-1 px-6 py-3 bg-purple-700 hover:bg-purple-600 text-white font-serif font-semibold rounded-lg transition-all duration-300"
                >
                  Play Again
                </button>
                <button
                  onClick={onBack}
                  className="flex-1 px-6 py-3 bg-stone-700 hover:bg-stone-600 text-white font-serif font-semibold rounded-lg transition-all duration-300"
                >
                  Choose Different Timeline
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Choice History */}
        {choices.length > 0 && !currentSceneData.isEnding && (
          <div className="mt-6 bg-stone-900/60 backdrop-blur-sm border border-purple-800/40 rounded-lg p-4">
            <h3 className="text-purple-400 font-serif font-bold mb-3 text-sm">Your Journey So Far:</h3>
            <div className="space-y-2">
              {choices.map((choice, index) => (
                <div key={index} className="flex items-start gap-2">
                  <span className="text-purple-600 text-xs mt-1">▸</span>
                  <p className="text-purple-300/70 text-xs">{choice}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Crimson+Text:ital,wght@0,400;0,600;1,400&display=swap');
      `}</style>
    </div>
  );
};

export default MedievalStory;
