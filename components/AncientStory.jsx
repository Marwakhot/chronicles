import React, { useState } from 'react';
import { ArrowLeft, Scroll, Heart, Skull, Crown, AlertTriangle } from 'lucide-react';

const AncientStory = ({ onBack }) => {
  const [currentScene, setCurrentScene] = useState('intro');
  const [choices, setChoices] = useState([]);
  const [stats, setStats] = useState({
    loyalty: 50,
    morality: 50,
    influence: 30
  });

  const updateStats = (statChanges) => {
    setStats(prev => ({
      loyalty: Math.max(0, Math.min(100, prev.loyalty + (statChanges.loyalty || 0))),
      morality: Math.max(0, Math.min(100, prev.morality + (statChanges.morality || 0))),
      influence: Math.max(0, Math.min(100, prev.influence + (statChanges.influence || 0)))
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
      title: "The Ides of March Approach",
      date: "March 14, 44 BCE",
      text: "You are Marcus Junius, a mid-ranking senator in the Roman Republic. The marble halls of the Senate echo with whispered conspiracies. Julius Caesar has declared himself Dictator Perpetuo—dictator for life. Some call it the death of the Republic; others see it as necessary stability after years of civil war.\n\nYour old friend Gaius Cassius Longinus approaches you in the Forum, his face grave. 'Marcus,' he whispers urgently, 'walk with me. We must speak privately.' His hand rests on your shoulder, and you notice the tension in his grip.\n\nThe afternoon sun casts long shadows across the ancient stones. Whatever Cassius has to say, you sense it will change everything.",
      choices: [
        {
          text: "Walk with Cassius and hear what he has to say",
          next: "conspiracy_revealed",
          stats: { loyalty: -5 }
        },
        {
          text: "Politely decline and distance yourself from political intrigue",
          next: "avoid_conspiracy",
          stats: { morality: 5, loyalty: 10 }
        },
        {
          text: "Agree, but remain cautious and non-committal",
          next: "cautious_approach",
          stats: { influence: 5 }
        }
      ]
    },

    conspiracy_revealed: {
      title: "The Plot Unfolds",
      date: "March 14, 44 BCE - Evening",
      text: "In the shadowed colonnade of the Temple of Saturn, Cassius reveals the conspiracy. 'Caesar has become a tyrant,' he says, his voice barely above a whisper. 'Tomorrow, on the Ides of March, we will restore the Republic. Brutus has joined us—even he, whom Caesar loves as a son.'\n\nHe produces a list of names. You recognize many: Brutus, Casca, Cimber, and over sixty others. 'We need men of principle, Marcus. Men who remember what Rome once was. Will you stand with us?'\n\nYour heart pounds. This is treason—or is it patriotism? Caesar has brought peace, but at what cost to Roman liberty?",
      choices: [
        {
          text: "Join the conspiracy—the Republic must be preserved",
          next: "join_conspirators",
          stats: { loyalty: -20, morality: 10, influence: 15 }
        },
        {
          text: "Refuse and warn Caesar of the plot",
          next: "warn_caesar",
          stats: { loyalty: 30, morality: -15, influence: -10 }
        },
        {
          text: "Tell Cassius you need time to consider such a grave decision",
          next: "delay_decision",
          stats: { influence: 5 }
        }
      ]
    },

    avoid_conspiracy: {
      title: "The Path of Caution",
      date: "March 14, 44 BCE - Evening",
      text: "You politely excuse yourself from Cassius, citing pressing family matters. His eyes show disappointment, but he nods curtly. As you walk away, you feel the weight of unspoken words.\n\nThat evening, your wife Claudia confronts you. 'I saw you with Cassius. Everyone knows something is brewing. The household slaves whisper of omens—owls hooting at noon, a lioness whelping in the streets. Whatever is coming, Marcus, our family will be caught in it.'\n\nShe grips your arm. 'You must choose a side, or we will be crushed between them.'",
      choices: [
        {
          text: "Decide to seek an audience with Caesar and pledge your loyalty",
          next: "pledge_to_caesar",
          stats: { loyalty: 25, influence: 10 }
        },
        {
          text: "Try to warn both sides and mediate peace",
          next: "attempt_mediation",
          stats: { morality: 15, influence: -5 }
        },
        {
          text: "Prepare to leave Rome with your family until the crisis passes",
          next: "flee_rome_early",
          stats: { loyalty: -10, morality: 5 }
        }
      ]
    },

    cautious_approach: {
      title: "A Dangerous Dance",
      date: "March 14, 44 BCE - Evening",
      text: "You walk with Cassius, listening carefully but committing to nothing. He speaks of tyranny, of stolen liberty, of senators reduced to mere ornaments in Caesar's court. His passion is evident, his arguments compelling.\n\n'Think on it, Marcus,' he concludes. 'But decide quickly. Tomorrow, the Republic will be reborn—with or without you.' He clasps your arm in the Roman fashion and disappears into the gathering dusk.\n\nAt home, you find a sealed letter on your writing table. The wax bears Caesar's personal seal. Inside, a brief message: 'Marcus Junius, attend me at the Senate tomorrow. I have a proposal that will elevate your family's position. Your friend, Caesar.'",
      choices: [
        {
          text: "Attend the Senate tomorrow and see how events unfold",
          next: "attend_senate",
          stats: { influence: 10 }
        },
        {
          text: "Send word to Caesar warning him of danger",
          next: "warn_caesar",
          stats: { loyalty: 20, morality: -10 }
        },
        {
          text: "Go to Cassius and pledge yourself to the conspiracy",
          next: "late_joining",
          stats: { loyalty: -15, morality: 5, influence: 10 }
        }
      ]
    },

    delay_decision: {
      title: "The Night Before",
      date: "March 14, 44 BCE - Late Evening",
      text: "Cassius's face darkens. 'Time is a luxury we don't have, Marcus. By dawn, our course is set.' He leaves you standing alone in the temple shadows.\n\nYou return home, mind racing. Your servant informs you that a messenger from Caesar arrived earlier with an invitation to tomorrow's Senate session. The two forces pull at you—old republican ideals versus loyalty to a man who has shown you favor.\n\nYour young son asks why you look troubled. You realize whatever you decide will shape his future, and Rome's.",
      choices: [
        {
          text: "Stay home tomorrow and avoid the Senate entirely",
          next: "stay_home",
          stats: { morality: -5, influence: -10 }
        },
        {
          text: "Go to Caesar early in the morning and warn him",
          next: "early_warning",
          stats: { loyalty: 25, morality: 5 }
        },
        {
          text: "Attend the Senate and watch events unfold without taking sides",
          next: "attend_senate",
          stats: { influence: 5 }
        }
      ]
    },

    join_conspirators: {
      title: "Blood on the Senate Floor",
      date: "March 15, 44 BCE - The Senate",
      text: "The morning arrives heavy with fate. You take your place among the conspirators, a concealed dagger beneath your toga. Caesar enters, magnificent in his purple-trimmed toga, greeting senators by name. He sees you and smiles—a genuine smile of friendship.\n\nTillius Cimber approaches Caesar with a petition. It's the signal. Casca strikes first, but his blade only grazes Caesar's neck. Suddenly, all of you are upon him—a storm of daggers in the sacred Senate chamber.\n\nCaesar fights back, but there are too many. He pulls his toga over his head as the blades fall. You hold your dagger, the moment frozen. Your hand shakes.",
      choices: [
        {
          text: "Strike Caesar—complete what you've committed to",
          next: "strike_caesar",
          stats: { loyalty: -30, morality: -20, influence: 20 }
        },
        {
          text: "Step back and refuse to strike",
          next: "refuse_strike",
          stats: { loyalty: -10, morality: 15, influence: -15 }
        },
        {
          text: "Try to stop the assassination",
          next: "stop_assassination",
          stats: { loyalty: 20, morality: 20, influence: -25 }
        }
      ]
    },

    warn_caesar: {
      title: "The Warning",
      date: "March 15, 44 BCE - Dawn",
      text: "You send an urgent message to Caesar's residence, requesting an immediate private audience. Within an hour, you're admitted to his presence. Caesar, still in his sleeping robes, listens intently as you reveal the conspiracy.\n\nHis face remains impassive as you name names: Brutus, Cassius, Casca. When you finish, he's silent for a long moment. 'Brutus?' he finally says, pain evident in his voice. 'Even Brutus?'\n\nHe stands, walking to the window. 'You've shown great courage in coming to me, Marcus. But tell me—why should I trust that this isn't itself a trap? How do I know you're not leading me to a different danger?'",
      choices: [
        {
          text: "Offer to stand beside Caesar at the Senate as proof of your loyalty",
          next: "prove_loyalty",
          stats: { loyalty: 20, influence: 15 }
        },
        {
          text: "Suggest Caesar skip the Senate session entirely",
          next: "suggest_absence",
          stats: { morality: 10, influence: 10 }
        },
        {
          text: "Urge Caesar to arrest the conspirators immediately",
          next: "urge_arrests",
          stats: { loyalty: 15, morality: -15, influence: 5 }
        }
      ]
    },

    pledge_to_caesar: {
      title: "An Audience with Caesar",
      date: "March 15, 44 BCE - Early Morning",
      text: "You arrive at Caesar's home at first light. His guards recognize you and allow you entry. Caesar is breaking his fast, surrounded by maps and correspondence.\n\n'Marcus Junius,' he greets you warmly. 'You honor me with such an early visit. Come, share wine with me.' His openness and trust make what you must tell him even harder.\n\nYou kneel before him. 'Divine Caesar, I come with urgent news. There are those who plot against your life. The Senate meeting today—'",
      choices: [
        {
          text: "Tell him everything you know about the conspiracy",
          next: "full_confession",
          stats: { loyalty: 30, morality: 10 }
        },
        {
          text: "Warn him vaguely without naming names to protect yourself",
          next: "vague_warning",
          stats: { loyalty: 15, morality: -5, influence: 5 }
        }
      ]
    },

    attempt_mediation: {
      title: "The Mediator's Folly",
      date: "March 15, 44 BCE - Dawn",
      text: "You spend the night drafting messages to both Caesar and Brutus, attempting to broker peace. Perhaps if both sides understand the other's concerns, bloodshed can be avoided.\n\nBut your messenger returns from Brutus with a curt reply: 'There can be no peace with tyranny.' Your message to Caesar goes unanswered—he's already left for the Senate.\n\nYou rush to the Senate yourself, hoping to intercede, but you're too late. As you enter the portico, you hear shouts and the clash of steel from within.",
      choices: [
        {
          text: "Rush inside to try to stop the violence",
          next: "too_late_intervention",
          stats: { morality: 15, influence: -10 }
        },
        {
          text: "Stay outside—you've done what you could",
          next: "witness_aftermath",
          stats: { morality: 5 }
        }
      ]
    },

    flee_rome_early: {
      title: "The Road South",
      date: "March 15, 44 BCE - Dawn",
      text: "By first light, you're on the Via Appia with your family and most portable valuables. Rome recedes behind you. Your wife asks no questions—she trusts your judgment.\n\nMidday, you encounter a messenger riding hard toward Rome. He recognizes you. 'Senator! Have you heard? Caesar is dead! Murdered in the Senate! The city is in chaos!'\n\nYour wife clutches your arm. Your decision has saved your family from whatever bloodletting follows.",
      choices: [
        {
          text: "Continue south to your estate in Campania and wait out the chaos",
          next: "ending_exile_safe",
          stats: { influence: -15 }
        },
        {
          text: "Return to Rome to help restore order",
          next: "return_to_chaos",
          stats: { influence: 10, morality: 10 }
        }
      ]
    },

    attend_senate: {
      title: "Observer at History's Crossroads",
      date: "March 15, 44 BCE - The Senate",
      text: "You arrive at the Senate early, taking a seat where you can observe. The conspirators are already present, their tension palpable. Caesar arrives, and the session begins normally.\n\nThen Tillius Cimber approaches with a petition. You recognize the signal from Cassius's description. Your heart races. This is the moment. You could still shout a warning, or you could remain silent and let history unfold.",
      choices: [
        {
          text: "Shout a warning to Caesar",
          next: "last_minute_warning",
          stats: { loyalty: 25, morality: 15 }
        },
        {
          text: "Remain silent and watch",
          next: "silent_witness",
          stats: { morality: -10 }
        },
        {
          text: "Leave the chamber immediately before violence begins",
          next: "exit_before_murder",
          stats: { morality: 5, influence: -5 }
        }
      ]
    },

    late_joining: {
      title: "Midnight Oath",
      date: "March 15, 44 BCE - Just After Midnight",
      text: "You find Cassius at his home, surrounded by the other conspirators. Brutus is there, his face grave but determined. When you declare your allegiance, Brutus clasps your arm.\n\n'Welcome, Marcus,' he says. 'We act not from hatred, but from love of Rome. Remember that when dawn comes.'\n\nThey give you a dagger and explain the plan. In a few hours, you will help change history.",
      choices: [
        {
          text: "Steel yourself for what must be done",
          next: "join_conspirators",
          stats: { loyalty: -20, morality: 5 }
        },
        {
          text: "Have second thoughts and slip away to warn Caesar",
          next: "betrayal_of_conspirators",
          stats: { loyalty: 20, morality: 10, influence: 15 }
        }
      ]
    },

    stay_home: {
      title: "A Coward's Safety",
      date: "March 15, 44 BCE - Your Home",
      text: "You feign illness and stay home. Your wife knows you're lying but says nothing. Through the morning, you pace your atrium, wondering what's happening at the Senate.\n\nNear midday, your steward bursts in. 'Master! Caesar is dead! Murdered by senators! The city is erupting!'\n\nYou sink into your chair. You chose safety, but at what cost? The Republic—or what remains of it—has been reborn in blood, and you played no part.",
      choices: [
        {
          text: "Wait at home to see which side prevails",
          next: "ending_neutral_survivor",
          stats: { influence: -20 }
        },
        {
          text: "Go to the Forum to show support for whichever side wins",
          next: "opportunist_path",
          stats: { morality: -15, influence: 10 }
        }
      ]
    },

    early_warning: {
      title: "Dawn Warning",
      date: "March 15, 44 BCE - Caesar's Home",
      text: "You arrive before dawn, demanding to see Caesar urgently. He receives you in his private study, Calpurnia his wife present. She has been urging him not to go to the Senate—her dreams have been filled with omens.\n\nWhen you reveal the conspiracy, naming Brutus, Calpurnia gasps. Caesar goes pale but then hardens. 'Brutus...?' he whispers. Then, louder: 'I will not cower from traitors. I will go to the Senate and face them.'",
      choices: [
        {
          text: "Beg him to stay home and let you handle the arrests",
          next: "convince_caesar_stay",
          stats: { loyalty: 20, influence: 15 }
        },
        {
          text: "Offer to accompany him as a bodyguard",
          next: "prove_loyalty",
          stats: { loyalty: 25, morality: 10 }
        }
      ]
    },

    strike_caesar: {
      title: "The Die is Cast",
      date: "March 15, 44 BCE - Aftermath",
      text: "Your blade joins the others. Caesar's blood stains the Senate floor, pooling around the base of Pompey's statue—bitter irony. Twenty-three wounds. When it's done, there's only silence and the metallic smell of blood.\n\nBrutus tries to address the remaining senators, but they flee in horror. You stand among the conspirators, looking at what you've done. The man who conquered Gaul, who crossed the Rubicon, lies broken on the marble.\n\nCassius grips your shoulder. 'We must move quickly. The people must understand we've saved the Republic.' But through the doors, you hear screams, confusion, anger.\n\nMark Antony's voice rings out in the distance: 'Murder! Caesar is murdered!'",
      choices: [
        {
          text: "Stay with the conspirators and address the people",
          next: "address_people_conspirator",
          stats: { influence: 10 }
        },
        {
          text: "Flee Rome before Antony rallies Caesar's supporters",
          next: "flee_rome_conspirator",
          stats: { loyalty: -10 }
        }
      ]
    },

    refuse_strike: {
      title: "The Reluctant Conspirator",
      date: "March 15, 44 BCE - Aftermath",
      text: "You step back, unable to strike. The others don't notice in the chaos—they're too focused on their grim task. Caesar falls, and you watch, frozen, as the life leaves him.\n\nWhen it's over, Brutus sees you standing apart, your dagger still clean. Understanding flashes in his eyes—disappointment, or perhaps respect? You'll never know.\n\nThe conspirators raise their bloodied daggers and rush into the Forum, crying 'Liberty! Freedom! Tyranny is dead!' But the crowd's reaction is not what they expected. Many weep for Caesar. Some look murderous.\n\nYou are caught between two worlds: neither fully conspirator nor loyal Caesar supporter.",
      choices: [
        {
          text: "Leave Rome immediately with your family",
          next: "flee_rome_neutral",
          stats: { morality: 10, influence: -10 }
        },
        {
          text: "Try to help Brutus and Cassius explain their actions",
          next: "help_explain",
          stats: { loyalty: -10, influence: 5 }
        },
        {
          text: "Denounce the conspirators publicly to save yourself",
          next: "denounce_conspirators",
          stats: { loyalty: 15, morality: -20, influence: 10 }
        }
      ]
    },

    stop_assassination: {
      title: "The Defender",
      date: "March 15, 44 BCE - The Senate",
      text: "As the daggers flash, you throw yourself between Caesar and the conspirators. 'No!' you shout. 'Traitors!'\n\nYour action gives Caesar crucial seconds. He draws a stylus and fights back. But there are too many. A blade catches your shoulder, burning pain. Another slashes across your face.\n\nYou and Caesar fight together, back to back, but it's hopeless. The conspirators overwhelm you both. As you fall, bleeding, you see Caesar collapse beside you. He reaches for your hand.\n\n'You... tried, Marcus,' he gasps. 'Tell them... tell them I loved Rome...'\n\nYou lose consciousness as shouts and running feet echo around you.",
      choices: [
        {
          text: "Survive your wounds and recover",
          next: "wounded_survivor",
          stats: { loyalty: 35, influence: 20 }
        }
      ]
    },

    prove_loyalty: {
      title: "Standing Guard",
      date: "March 15, 44 BCE - The Senate",
      text: "You accompany Caesar to the Senate, staying close. As the session begins, you notice Cassius watching you with hatred in his eyes. Cimber approaches Caesar with his petition, and you recognize the signal.\n\nYou step between Caesar and Casca as the first blade flashes. 'Traitors!' you shout. Your warning gives Caesar precious seconds. He draws a stylus from his writing tablet—his only weapon—and fights back.\n\nBut there are too many conspirators. You feel a blade slice across your arm. Caesar is struck repeatedly despite your efforts. As he falls, he looks at you with gratitude.\n\n'You tried, Marcus,' he gasps. 'Remember... remember the Republic we both loved...'\n\nHe dies as you hold him, while conspirators flee the chaos they've created.",
      choices: [
        {
          text: "Rally Caesar's supporters and pursue the conspirators",
          next: "rally_caesarians",
          stats: { loyalty: 30, influence: 20 }
        },
        {
          text: "Protect Caesar's body until Mark Antony arrives",
          next: "protect_body",
          stats: { loyalty: 25, morality: 15 }
        }
      ]
    },

    suggest_absence: {
      title: "Caesar's Pride",
      date: "March 15, 44 BCE - Morning",
      text: "Caesar listens to your suggestion but shakes his head. 'Marcus, if I show fear now, I show weakness. A leader who hides from threats is no leader at all.'\n\nCalpurnia enters, having heard your conversation. 'Please, husband,' she begs. 'My dreams—'\n\n'Dreams and omens,' Caesar interrupts gently. 'I make my own fate.' He turns to you. 'But your loyalty is noted, Marcus. Come with me to the Senate. If there's danger, I'll have one friend at my side.'",
      choices: [
        {
          text: "Accompany Caesar as his guardian",
          next: "prove_loyalty",
          stats: { loyalty: 25 }
        },
        {
          text: "Try one more time to convince him to stay",
          next: "final_plea",
          stats: { morality: 15 }
        }
      ]
    },

    urge_arrests: {
      title: "The Crackdown",
      date: "March 15, 44 BCE - Morning",
      text: "Caesar considers your advice. 'Arrest them? That would certainly end the threat.' He calls for the Praetorian commander. 'Round up these men. Bring them to me in chains.'\n\nWithin hours, the conspirators are seized. Brutus is brought before Caesar, who looks at him with profound sadness. 'Even you, Brutus? I who loved you as a son?'\n\nBrutus meets his gaze steadily. 'I love Rome more than I fear death. Kill me and make yourself the tyrant you claim not to be.'\n\nCaesar turns to you. 'What should be their fate, Marcus? You uncovered this plot. You decide.'",
      choices: [
        {
          text: "Recommend execution—they plotted murder and must pay",
          next: "execute_conspirators",
          stats: { loyalty: 30, morality: -25 }
        },
        {
          text: "Suggest exile—spare their lives but remove the threat",
          next: "exile_conspirators",
          stats: { loyalty: 20, morality: 10 }
        },
        {
          text: "Urge mercy and reconciliation—they acted from love of Rome",
          next: "mercy_path",
          stats: { morality: 25, influence: 15 }
        }
      ]
    },

    full_confession: {
      title: "The Complete Truth",
      date: "March 15, 44 BCE - Morning",
      text: "You tell Caesar everything—every name, every detail of the plot. His face darkens as you speak, especially when you mention Brutus.\n\n'My own Brutus,' he murmurs. 'I raised him, loved him as my own son.' He stands abruptly. 'They will not get the chance. Marcus, you've saved my life. You'll be rewarded handsomely.'\n\nHe immediately orders the arrest of all conspirators. By midday, they're in chains. Rome is abuzz with news of the foiled assassination.",
      choices: [
        {
          text: "Accept Caesar's gratitude and your reward",
          next: "rewarded_loyalist",
          stats: { loyalty: 35, influence: 25 }
        },
        {
          text: "Ask Caesar to show mercy to the conspirators",
          next: "plea_for_mercy",
          stats: { morality: 20, loyalty: 10 }
        }
      ]
    },

    vague_warning: {
      title: "Half-Truths",
      date: "March 15, 44 BCE - Morning",
      text: "You warn Caesar of danger without specifics, protecting yourself from potential backlash. 'There are whispers, Divine Caesar. Perhaps it would be wise to postpone today's Senate session.'\n\nCaesar studies you carefully. 'You're hiding something, Marcus. Who threatens me?' When you hesitate, his expression hardens. 'I see. You play both sides. That's dangerous in times like these.'\n\nBefore you can explain, a messenger arrives: 'Caesar! The Senate awaits!' He leaves without another word to you, your warning ineffective.",
      choices: [
        {
          text: "Follow him to the Senate and try to protect him anyway",
          next: "failed_protection",
          stats: { loyalty: 10, morality: 5 }
        },
        {
          text: "Stay behind—you tried your best",
          next: "stay_home",
          stats: { morality: -10 }
        }
      ]
    },

    too_late_intervention: {
      title: "Blood Already Spilled",
      date: "March 15, 44 BCE - The Senate",
      text: "You burst into the Senate chamber to find Caesar already fallen, blood pooling beneath him. The conspirators stand frozen, some still gripping their daggers. When they see you, panic flashes across their faces.\n\nBrutus steps forward, hands raised. 'Marcus, we've freed Rome from tyranny. Join us in celebrating the Republic's rebirth!'\n\nBut you see only Caesar's body. The man who brought you into the Senate, who showed you favor, lies murdered. The conspirators watch your reaction carefully, hands moving to their weapons.",
      choices: [
        {
          text: "Condemn them loudly and rush to find Mark Antony",
          next: "ally_with_antony",
          stats: { loyalty: 30, influence: 15 }
        },
        {
          text: "Express sympathy for their cause to protect yourself",
          next: "false_sympathy",
          stats: { morality: -20, influence: 10 }
        },
        {
          text: "Turn and leave in silence, choosing no side",
          next: "witness_aftermath",
          stats: { morality: -5 }
        }
      ]
    },

    witness_aftermath: {
      title: "The Spectator",
      date: "March 15, 44 BCE - Afternoon",
      text: "You remain outside as chaos erupts within the Senate. Senators flee in terror. Then the conspirators emerge, daggers still bloody, crying 'Freedom! Liberty!'\n\nThe crowd's reaction is mixed. Some cheer, but many look horrified. You spot Mark Antony arriving with armed men, his face a mask of rage when he learns what happened.\n\nYou witnessed history but took no part in it. Now you must decide what that means for your future.",
      choices: [
        {
          text: "Approach Mark Antony and offer testimony about what you know",
          next: "testify_to_antony",
          stats: { loyalty: 15, influence: 10 }
        },
        {
          text: "Leave Rome quietly before you're associated with either side",
          next: "ending_exile_safe",
          stats: { influence: -15 }
        }
      ]
    },

    last_minute_warning: {
      title: "The Desperate Shout",
      date: "March 15, 44 BCE - The Senate",
      text: "'Caesar! Beware!' you shout as Cimber grabs Caesar's toga. Your warning comes just in time—Caesar dodges Casca's first strike, which only grazes his neck.\n\nThe Senate erupts in chaos. Some senators flee, others watch in horror. You rush to Caesar's side as the conspirators hesitate, their surprise attack foiled.\n\nCassius glares at you with pure hatred. 'Traitor!' he screams. The conspirators must choose—press the attack or flee now that the element of surprise is lost.",
      choices: [
        {
          text: "Stand with Caesar and fight the conspirators",
          next: "fight_conspirators",
          stats: { loyalty: 35, influence: 20 }
        },
        {
          text: "Grab Caesar and try to escape the chamber",
          next: "escape_attempt",
          stats: { loyalty: 25, morality: 15 }
        }
      ]
    },

    silent_witness: {
      title: "The Weight of Silence",
      date: "March 15, 44 BCE - The Senate",
      text: "You watch in frozen horror as the assassination unfolds. Caesar fights desperately, calling out names—even Brutus. 'Et tu, Brute?' His final words echo through the chamber.\n\nTwenty-three times the daggers fall. When it's over, Caesar lies dead, and you remain in your seat, neither defender nor assassin. Just a witness to murder.\n\nBrutus looks directly at you, blood on his hands. 'You saw, Marcus. Tell them we did this for Rome.' But you cannot speak. Your silence is its own choice—and it will define you.",
      choices: [
        {
          text: "Leave Rome immediately, haunted by your inaction",
          next: "ending_haunted",
          stats: { morality: -15, influence: -20 }
        },
        {
          text: "Stay and claim you were forced to watch against your will",
          next: "claim_coercion",
          stats: { morality: -20, influence: 5 }
        }
      ]
    },

    exit_before_murder: {
      title: "The Coward's Exit",
      date: "March 15, 44 BCE - Outside the Senate",
      text: "You stand and walk out just as Cimber approaches Caesar. The other senators give you strange looks—do they suspect you know something?\n\nOutside, you hear the commotion begin. Shouts, the sound of struggle, then screams. You know what's happening inside. You could have stopped it. You could have at least tried.\n\nWhen the conspirators emerge, bloody daggers raised, you're standing right there. Brutus sees you. 'Marcus. You knew, didn't you? Yet you said nothing. That makes you complicit.'",
      choices: [
        {
          text: "Deny everything and act shocked",
          next: "deny_knowledge",
          stats: { morality: -25, influence: -10 }
        },
        {
          text: "Admit you suspected but couldn't choose a side",
          next: "admit_paralysis",
          stats: { morality: -10 }
        }
      ]
    },

    betrayal_of_conspirators: {
      title: "The Double Agent",
      date: "March 15, 44 BCE - Before Dawn",
      text: "You slip away from Cassius's house and run through the dark streets to Caesar's residence. The guards stop you, but you insist it's urgent.\n\nCaesar receives you immediately. When you reveal that you infiltrated the conspiracy and have all the names, his face shows both relief and calculation.\n\n'You've done Rome a great service, Marcus,' he says. 'Cassius, Brutus, and how many others?' He calls for his guards. 'Arrest them all. Bring them to me in chains.'\n\nBy sunrise, the conspiracy is broken, its members imprisoned. You've chosen your side decisively.",
      choices: [
        {
          text: "Accept Caesar's rewards and your place as his most loyal supporter",
          next: "ending_caesars_right_hand",
          stats: { loyalty: 40, influence: 30 }
        },
        {
          text: "Ask Caesar to spare Brutus, despite everything",
          next: "plead_for_brutus",
          stats: { morality: 15, loyalty: 10 }
        }
      ]
    },

    convince_caesar_stay: {
      title: "Calpurnia's Plea Succeeds",
      date: "March 15, 44 BCE - Morning",
      text: "Your pleading, combined with Calpurnia's tears, finally breaks through Caesar's pride. 'Very well,' he sighs. 'I will send word that I am unwell. The Senate can wait.'\n\nHe sends Mark Antony to inform the Senate. Within hours, soldiers begin arresting the conspirators. Brutus and Cassius are brought before Caesar in chains.\n\nBrutus looks at you with contempt. 'You've made him a king, Marcus. History will judge you.'\n\nBut Caesar lives, the conspiracy is crushed, and you've secured your family's future.",
      choices: [
        {
          text: "Stand by your decision—Caesar's life was worth saving",
          next: "ending_caesar_lives",
          stats: { loyalty: 35, morality: 15 }
        }
      ]
    },

    address_people_conspirator: {
      title: "The Forum Speech",
      date: "March 15, 44 BCE - The Forum",
      text: "You stand with Brutus and Cassius before the Roman people. The crowd is hostile, confused, grieving. Brutus speaks eloquently about liberty, about tyranny, about saving the Republic.\n\nFor a moment, it seems to work. Some in the crowd cheer. But then Mark Antony arrives with Caesar's body. He asks permission to speak at the funeral. Against Cassius's advice, Brutus agrees.\n\nAntony's speech destroys everything. 'Friends, Romans, countrymen...' He shows Caesar's bloody toga, reads his will leaving gardens and money to the people. The crowd becomes a mob, screaming for the blood of the conspirators.\n\nYou must flee Rome or die.",
      choices: [
        {
          text: "Flee east with Brutus and Cassius to raise an army",
          next: "ending_philippi",
          stats: { loyalty: -20 }
        },
        {
          text: "Try to surrender and beg for mercy from Antony",
          next: "beg_mercy",
          stats: { morality: -10, influence: -20 }
        }
      ]
    },

    flee_rome_conspirator: {
      title: "The Flight East",
      date: "March-April, 44 BCE",
      text: "You flee with Brutus and Cassius, abandoning Rome to avoid the mob's rage. Mark Antony's speech has turned the entire city against you.\n\nIn the East, you help raise legions to fight for the Republic's restoration. For two years, you prepare for the final confrontation. Your family is safe in Greece, but you know this can only end one way.\n\nAt Philippi, you face Antony and Octavian's forces. The battle is brutal.",
      choices: [
        {
          text: "Fight to the end for the Republic's ideals",
          next: "ending_philippi",
          stats: { loyalty: -15, morality: 10 }
        }
      ]
    },

    rally_caesarians: {
      title: "The Avenger",
      date: "March 15-20, 44 BCE",
      text: "You become one of Mark Antony's chief lieutenants in the hunt for Caesar's assassins. Your testimony about the murder—how you tried to save Caesar—makes you a hero to his supporters.\n\nAntony's famous funeral speech turns the mob against the conspirators. Brutus and Cassius flee Rome. Civil war looms.\n\nOctavian, Caesar's adopted heir, arrives in Rome. He's only eighteen but carries himself with unexpected authority. 'You defended my father,' he says when you meet. 'I will not forget this.'\n\nYears of war follow. But you've chosen your side, and history will remember you as one of Caesar's most loyal defenders.",
      isEnding: true,
      outcome: "You became a trusted general under Mark Antony and later served Octavian (Augustus). Your family prospered under the new Empire. You never forgot the blood spilled that day, but you took pride in your loyalty. History remembers you as a defender of Caesar, a man who chose friendship over political advantage. You died honored, your children senators in the new order."
    },

    protect_body: {
      title: "The Faithful Guardian",
      date: "March 15-20, 44 BCE",
      text: "You guard Caesar's body until Mark Antony arrives with his soldiers. Your loyalty is noted and rewarded. Antony embraces you, tears streaming down his face.\n\n'You alone tried to save him,' Antony says. 'Rome needs more men like you.'\n\nYou help arrange Caesar's funeral. Antony's speech ignites the city. The conspirators flee for their lives. Civil war erupts, but you've secured your family's future on the winning side.\n\nYears later, when Augustus (the former Octavian) becomes the first Emperor, he grants your family senatorial estates. Your grandson asks you about that day.\n\n'I couldn't save him,' you say. 'But I could honor his memory. Sometimes that's all we can do.'",
      isEnding: true,
      outcome: "You lived to old age, respected as a man of principle who stayed loyal when tested. Your family thrived under the new Empire. Augustus himself attended your funeral, calling you 'the last true friend of Caesar.' You never regretted your choice, though you mourned the Republic's death. Your descendants served as senators for generations."
    },

    flee_rome_neutral: {
      title: "The Exile's Path",
      date: "March-April, 44 BCE",
      text: "You gather your family and most valuable possessions, fleeing Rome under cover of darkness. You travel to your cousin's villa in Greece, far from the coming storm.\n\nNews reaches you slowly. Mark Antony's speech. The proscriptions. The civil war. Names you know—friends, colleagues—appear on death lists. Some support Antony and Octavian; others back Brutus and Cassius.\n\nYour wife asks, 'Did we make the right choice?' You watch your children playing in the Greek sunshine, safe from Roman politics.\n\n'We survived,' you answer. 'Perhaps that's enough.'",
      isEnding: true,
      outcome: "You lived quietly in Greece, never returning to Rome. Your children grew up far from politics, learning Greek philosophy instead of Roman intrigue. You missed the life you knew, but you never regretted saving your family from the bloodshed. Some called you a coward; others, wise. You died peacefully in your sleep at seventy, surrounded by grandchildren who never knew war."
    },

    help_explain: {
      title: "The Defender of Tyrannicide",
      date: "March 15-20, 44 BCE",
      text: "You stand with Brutus and Cassius, trying to explain their actions to the Roman people. You speak of liberty, of republican ideals, of the dangers of autocracy.\n\nBut Mark Antony's funeral speech overwhelms your efforts. The crowd turns violent. You flee with the conspirators, branded a traitor despite never striking a blow.\n\nIn exile, you become a writer, penning treatises on tyranny and freedom. Your works will survive you, debated for centuries.",
      choices: [
        {
          text: "Continue to Philippi and the final battle",
          next: "ending_philippi",
          stats: { morality: 10 }
        }
      ]
    },

    denounce_conspirators: {
      title: "The Turncoat",
      date: "March 15, 44 BCE - The Forum",
      text: "In the Forum, before the confused and angry crowd, you raise your voice: 'Citizens! I infiltrated the conspiracy to protect Caesar! I stand before you with clean hands!'\n\nYou name every conspirator you know. Mark Antony listens intently, then embraces you publicly. 'This man is a hero!' he declares.\n\nBut the conspirators know the truth. Brutus escapes, but not before sending you a message: 'I thought you a man of principle, Marcus. I was wrong. Live with your choice.'\n\nYou receive rewards—land, appointments, gold. But at night, you see Caesar's face as he died, and Brutus's look of betrayal. Your children will be wealthy.\n\nYou will never sleep easily again.",
      isEnding: true,
      outcome: "You prospered materially but paid the price in reputation and conscience. Some praised your 'cleverness'; others whispered 'traitor.' You died wealthy but haunted, never certain you made the right choice. Your children inherited your fortune but not your peace of mind. History records you as one who saved himself by sacrificing others."
    },

    wounded_survivor: {
      title: "Scars of Honor",
      date: "March 15, 44 BCE - Aftermath",
      text: "You wake days later, bandaged and in pain. Mark Antony himself sits by your bedside. 'You fought beside Caesar,' he says. 'You took blades meant for him. Rome will remember this.'\n\nYour wounds mark you as a hero. When you can walk again, Antony takes you to meet Octavian. The young man studies your scars and nods approvingly.\n\n'My father chose his friends well,' Octavian says. 'When this is over, you will have whatever position you desire.'\n\nThe civil war rages, but your loyalty has secured your family's future for generations.",
      isEnding: true,
      outcome: "You became a living symbol of loyalty to Caesar. Your scars were your badge of honor. Augustus granted you a governorship, and your family became one of the most powerful in the Empire. You lived to see peace restored to Rome, knowing you'd stood on the right side of history. Your tomb reads: 'He stood with Caesar when it mattered most.'"
    },

    ending_exile_safe: {
      title: "The Quiet Life",
      date: "44-30 BCE",
      text: "You remain in Campania throughout the civil wars. News reaches you of battles, proscriptions, and political upheaval. Friends die on both sides.\n\nWhen Augustus finally brings peace, you're too old and too removed to matter anymore. You live comfortably but irrelevantly, a footnote to history.\n\nYour grandchildren ask what you did during the great upheaval. 'I kept your grandmother safe,' you tell them. 'I chose family over glory.'\n\nIt's enough. It has to be.",
      isEnding: true,
      outcome: "You lived a long, quiet life away from the violence that consumed Rome. Your family prospered modestly. You never became famous, never held great office, but you survived when many died. Sometimes wisdom is knowing when to step away. You died peacefully, content with your choices, even if history forgot your name."
    },

    return_to_chaos: {
      title: "Into the Storm",
      date: "March 15, 44 BCE - Afternoon",
      text: "You turn your family around and ride back to Rome. The city is in chaos—mobs in the streets, buildings burning, blood on the Senate steps.\n\nYou find Mark Antony organizing Caesar's loyalists. When you offer your services, he accepts immediately. 'I need men of action,' he says. 'The conspirators have fled, but this is only beginning.'\n\nYou've chosen to be part of history rather than hide from it.",
      choices: [
        {
          text: "Serve Antony loyally in the coming civil war",
          next: "ending_antonys_man",
          stats: { loyalty: 25, influence: 20 }
        }
      ]
    },

    opportunist_path: {
      title: "The Political Survivor",
      date: "March 15-20, 44 BCE",
      text: "You go to the Forum and gauge the crowd's mood. When Antony's speech turns them against the conspirators, you loudly denounce Brutus and Cassius—even though you took no action to help Caesar.\n\nAntony notices you and calls you forward. You claim you suspected the plot but feared to act. It's a lie, but delivered convincingly.\n\nYou receive modest rewards and appointments. You've survived by reading the political winds, but everyone knows what you are. Your advancement has limits—no one truly trusts an opportunist.",
      isEnding: true,
      outcome: "You lived comfortably but never rose to greatness. Everyone knew you were a political chameleon, changing colors with the times. You held minor offices, made careful alliances, and died respected but not loved. Your legacy is one of survival through adaptability—admired by pragmatists, scorned by idealists."
    },

    ending_neutral_survivor: {
      title: "The Fence-Sitter",
      date: "44-30 BCE",
      text: "You wait at home, watching to see which faction prevails. When Antony and Octavian win, you cautiously approach them with offers of support.\n\nThey accept, but you're never given important positions. Your refusal to choose sides when it mattered marked you as unreliable.\n\nYou live comfortably but without influence. Your children inherit wealth but not respect. You're the man who watched history happen from the sidelines.",
      isEnding: true,
      outcome: "You survived by refusing to commit, but survival was all you achieved. History doesn't remember you, and your contemporaries viewed you with contempt. Your family was safe and wealthy, but bore the stain of your cowardice. On your deathbed, you wondered if safety was worth the cost of honor."
    },

    ally_with_antony: {
      title: "Antony's Witness",
      date: "March 15-20, 44 BCE",
      text: "You find Mark Antony and tell him everything you saw. Your testimony helps him understand the conspiracy's full scope. He uses your account in his funeral speech, making you a witness to history.\n\nAntony rewards your loyalty with appointments and land. You become part of his inner circle as he consolidates power with Octavian.\n\nWhen the final confrontation with the conspirators comes at Philippi, you're there—not as a soldier, but as a reminder of what they did.",
      isEnding: true,
      outcome: "You lived as a respected member of the new regime. Your testimony against the conspirators secured your position. You served under Augustus and saw the birth of the Empire. Your family thrived. You never forgot Caesar's murder, and you made sure Rome didn't either. You died honored, your account of that day preserved for history."
    },

    false_sympathy: {
      title: "The Liar's Survival",
      date: "March 15-20, 44 BCE",
      text: "You tell the conspirators you understand their motives, even admire their courage. They believe you—for a time.\n\nBut when Antony's speech turns the tide, you quietly switch sides. You deny ever supporting them, but rumors persist.\n\nYou survive, but with a reputation for dishonesty. Both sides distrust you. You live in a twilight of suspicion, never fully accepted anywhere.",
      isEnding: true,
      outcome: "You survived through lies and deception, but paid the price in reputation. No faction fully trusted you. You lived comfortably but anxiously, always worried someone would reveal your duplicity. Your children changed their family name to escape association with you. You died alone, a cautionary tale about the cost of integrity."
    },

    testify_to_antony: {
      title: "The Reliable Witness",
      date: "March 15-20, 44 BCE",
      text: "You approach Mark Antony and offer to testify about what you know of the conspiracy. Your information helps him identify all the conspirators and their supporters.\n\nYour testimony is used in Antony's political maneuvering. You're rewarded with a modest position in the new administration.\n\nYou chose involvement over isolation, testimony over silence. It's a middle path—neither heroic nor cowardly—but it's yours.",
      isEnding: true,
      outcome: "You lived as a reliable but unremarkable member of the new order. Your testimony helped, but you weren't central to events. You held minor offices, lived comfortably, and died respected if not renowned. Your family prospered modestly. You took no great risks but shirked no responsibilities. A balanced life in unbalanced times."
    },

    fight_conspirators: {
      title: "The Defender's Stand",
      date: "March 15, 44 BCE - The Senate",
      text: "You grab a ceremonial staff and stand with Caesar against the conspirators. Your intervention turns the assassination attempt into a brawl. Caesar fights alongside you, his military training evident even at fifty-five.\n\nBut you're outnumbered. A blade finds your side, burning pain. Caesar takes multiple wounds. As more conspirators pour in, it becomes clear this can't be won.\n\nYet your defense has given time for help to arrive. Mark Antony and his guards burst into the chamber. The conspirators flee, leaving Caesar badly wounded but alive—barely.",
      choices: [
        {
          text: "Stay with Caesar as healers attend him",
          next: "caesar_survives_wounded",
          stats: { loyalty: 40 }
        }
      ]
    },

    escape_attempt: {
      title: "The Failed Escape",
      date: "March 15, 44 BCE - The Senate",
      text: "You grab Caesar's arm and try to pull him toward the exit. 'We must go!' you shout. Caesar resists for a moment, then sees the conspiracy's scope and follows.\n\nYou make it halfway to the door before the conspirators swarm you. There are too many. They separate you from Caesar, and you watch helplessly as they drag him down.\n\nYou're wounded but not killed—they're focused on Caesar. You collapse, bleeding, as Caesar falls to their blades. Your escape attempt failed, but at least you tried.",
      choices: [
        {
          text: "Survive and recover from your wounds",
          next: "wounded_survivor",
          stats: { loyalty: 30, morality: 15 }
        }
      ]
    },

    claim_coercion: {
      title: "The Coward's Defense",
      date: "March 15-16, 44 BCE",
      text: "You claim the conspirators forced you to watch, threatened you into silence. Some believe you; others don't.\n\nMark Antony questions you personally. He sees through your lies but decides you're too pathetic to matter. 'You're free to go,' he says with contempt. 'Rome has enough real traitors to punish.'\n\nYou keep your life and property, but lose all respect. People point at you in the Forum, whispering. Your family bears the shame of your cowardice.",
      isEnding: true,
      outcome: "You lived, but at the cost of all dignity. Everyone knew you for a coward. Your business dealings suffered as no one wanted to associate with you. Your children were denied good marriages. You died unmourned, your name a synonym for spinelessness. Sometimes survival isn't enough."
    },

    deny_knowledge: {
      title: "The Desperate Lie",
      date: "March 15, 44 BCE",
      text: "'I knew nothing!' you protest. 'I left because I felt ill!' But your timing is too suspicious, your acting too poor.\n\nThe conspirators see through you. So does the arriving Mark Antony. Both sides view you as untrustworthy.\n\nIn the chaos that follows, you're caught between factions. Your lie satisfies no one.",
      choices: [
        {
          text: "Flee Rome to escape both sides' wrath",
          next: "ending_exile_disgraced",
          stats: { morality: -25, influence: -25 }
        }
      ]
    },

    admit_paralysis: {
      title: "The Paralyzed Senator",
      date: "March 15, 44 BCE",
      text: "You admit the truth: you suspected something but couldn't bring yourself to choose a side. You were paralyzed by indecision.\n\nBrutus looks at you with pity and contempt. 'Then you're worse than a traitor, Marcus. You're nothing at all.'\n\nMark Antony, arriving with guards, hears your confession. He dismisses you with disgust. 'Go home. You're not worth punishing.'\n\nYou've revealed yourself as morally bankrupt—capable of neither loyalty nor principle.",
      isEnding: true,
      outcome: "You lived but were permanently diminished. Your confession of moral paralysis haunted you. No one trusted you with anything important. You withdrew from public life, living off inherited wealth. Your memoir, written decades later, tried to justify your inaction. No one read it. You died forgotten, a cautionary tale about the necessity of courage in crisis moments."
    },

    ending_caesars_right_hand: {
      title: "Caesar's Most Trusted",
      date: "44-30 BCE",
      text: "Your infiltration of the conspiracy and betrayal of it makes you Caesar's most trusted advisor. He lives, the conspirators are executed or exiled, and you rise to unprecedented power.\n\nYou help Caesar consolidate control, becoming his right hand in reshaping Rome. When he officially becomes Emperor in all but name, you're the second most powerful man in Rome.\n\nYears later, Caesar tells you: 'Rome stands because you had the courage to betray traitors. Never doubt you did right.'\n\nBut sometimes, late at night, you think of Brutus's face when he was arrested. He'd called you friend once.",
      isEnding: true,
      outcome: "You became one of the most powerful men in Roman history, Caesar's closest advisor until his natural death twenty years later. You helped build the Empire, reformed the Senate, and secured peace. Your family ruled provinces for generations. History remembers you as Caesar's savior. Only you remember the men you betrayed, and wonder if they were as wrong as you told yourself they were."
    },

    plead_for_brutus: {
      title: "Mercy for the Betrayer",
      date: "March 15, 44 BCE - Morning",
      text: "You kneel before Caesar. 'Divine Caesar, I ask clemency for Brutus. He acted from misguided principle, not malice. He loves Rome—wrongly, perhaps, but genuinely.'\n\nCaesar is silent for a long time. Finally: 'You risk much for him, Marcus. Why?'\n\n'Because mercy is strength, Caesar. Execute him and you prove his point—that you're a tyrant. Spare him and you prove your greatness.'\n\nCaesar considers, then nods. 'Brutus will be exiled, not executed. But the others must face justice.' He looks at you. 'Your mercy may be a mistake, but I'll honor it.'",
      isEnding: true,
      outcome: "Caesar lived and reigned for fifteen more years. Brutus lived in exile in Athens, teaching philosophy. He never forgave you for saving his life through 'betrayal.' Caesar's mercy, counseled by you, became legendary. You rose high in his administration, known as the voice of reason and compassion. You died honored, having saved both Caesar and his would-be assassin. History judges you kindly."
    },

    ending_caesar_lives: {
      title: "The Empire is Born Differently",
      date: "44-30 BCE",
      text: "Caesar lives, and the Republic dies more slowly but just as surely. Without the martyrdom of assassination, Caesar consolidates power through administration rather than revenge.\n\nYou become one of his key advisors, helping shape the transition from Republic to Empire. It's gentler than it might have been, though no less complete.\n\nWhen Caesar dies peacefully in his bed at seventy-one, having named Octavian his heir, you're at his side. 'You saved my life, Marcus,' he says. 'Which gave me time to build something lasting.'\n\nYou look at the Rome he's leaving behind—stable, prosperous, at peace—and wonder if you did the right thing.",
      isEnding: true,
      outcome: "You helped birth the Roman Empire without the bloody civil wars that history might have seen. Caesar's peaceful reign and transition created stability. You lived to old age, serving three Emperors. Your family became one of Rome's greatest. Yet you always wondered: did you save Rome, or kill the Republic? Perhaps both. History remembers you fondly, but you died uncertain."
    },

    ending_philippi: {
      title: "The Last Republicans",
      date: "October 42 BCE - Philippi",
      text: "At Philippi, you stand with Brutus and Cassius against Antony and Octavian. The battle rages for days. You fight bravely, believing in the Republic even as it dies around you.\n\nWhen defeat becomes certain, Brutus finds you. 'It seems our Republic died with Caesar after all,' he says sadly. 'At least we tried, Marcus. History may judge us harshly, but we acted for Rome.'\n\nThat night, rather than face capture and humiliation, you follow Brutus's example. Your last thought is of Rome—not Caesar's Rome, but the Republic that once was.",
      isEnding: true,
      outcome: "You died believing in republican ideals, loyal to the end. History debates whether you were a hero or a fool. Some call you a defender of liberty; others, a traitor and murderer. Your name became synonymous with the eternal question: when is killing a tyrant justified? There's no simple answer. You chose principle over survival, and history will forever argue about whether you were right."
    },

    beg_mercy: {
      title: "The Prisoner's Plea",
      date: "March 15, 44 BCE - Afternoon",
      text: "You throw yourself at Mark Antony's feet, begging for mercy. 'I was forced! I never wanted this!' you cry.\n\nAntony looks down at you with disgust. 'You helped murder Caesar, then beg for your life? You have no honor.'\n\nHe orders you imprisoned. Your trial is quick, your execution quicker. Your last words are pleas for mercy that go unheard.\n\nYou die as you lived in those final moments—without dignity or courage.",
      isEnding: true,
      outcome: "You were executed as a conspirator, but history remembers you with particular contempt. Not for the assassination, but for your cowardice afterward. Your name became a byword for disgraceful behavior. Your family disowned you, changing their name. You died unloved and unmourned, a footnote marked by shame."
    },

    ending_haunted: {
      title: "The Haunted Exile",
      date: "44-20 BCE",
      text: "You flee Rome and never return. You settle in a remote Greek island, trying to forget what you saw and what you failed to do.\n\nBut Caesar's face haunts your dreams. You see him falling, over and over, while you sit frozen. You hear his voice: 'Marcus, why didn't you help me?'\n\nYou never marry, never return to public life. Your family's money sustains you, but nothing brings peace. You die alone, tormented by your inaction.",
      isEnding: true,
      outcome: "Your silence condemned you more than action could have. You lived in self-imposed exile, haunted by your failure to choose. Your family eventually forgot you. You left no mark on history—just a lesson about the cost of moral cowardice. Sometimes the worst choice is refusing to make one."
    },

    final_plea: {
      title: "The Final Warning",
      date: "March 15, 44 BCE - Morning",
      text: "You block Caesar's path. 'Please, listen to Calpurnia and to me. Just this once, choose safety over pride!'\n\nCaesar studies your face and sees genuine fear there. Calpurnia is weeping. Finally, his resolve breaks.\n\n'Very well,' he sighs. 'I will stay home today. But this hesitation must never be known.'\n\nHe sends Antony to dismiss the Senate. Within hours, the conspirators are identified and arrested. Caesar lives, Rome continues, and you've altered history with a single plea.",
      choices: [
        {
          text: "Accept your role as Caesar's savior",
          next: "ending_caesar_lives",
          stats: { loyalty: 35, influence: 25 }
        }
      ]
    },

    execute_conspirators: {
      title: "Justice Through Blood",
      date: "March 15, 44 BCE - Afternoon",
      text: "You recommend execution. Caesar nods grimly. 'So be it. They plotted my death; they'll face their own.'\n\nThe executions are public and brutal. Brutus dies last, looking at Caesar with such disappointment that even Caesar flinches.\n\n'You've become what they feared,' Brutus says before the axe falls.\n\nCaesar lives and rules, but the executions taint his reign. You've helped create a tyrant, and everyone knows it. Your loyalty is rewarded with position, but you're feared rather than respected.",
      isEnding: true,
      outcome: "You lived wealthy and powerful, but your name became associated with Caesar's darkest deeds. You were the advisor who counseled blood over mercy. When Caesar eventually fell to other plotters years later, you were among the first killed in revenge. History remembers you as a warning: power gained through cruelty rarely lasts."
    },

    exile_conspirators: {
      title: "Merciful Banishment",
      date: "March 15-20, 44 BCE",
      text: "You recommend exile. Caesar agrees, though some advisors counsel death.\n\nThe conspirators are stripped of citizenship and property, then sent to distant corners of the Empire. Brutus goes to Athens, where he teaches philosophy and writes bitter tracts against tyranny.\n\nCaesar's mercy, counseled by you, enhances his reputation. He lives another twelve years, dying peacefully. Your advice shaped a gentler transition to Empire.",
      isEnding: true,
      outcome: "You became known as Caesar's conscience, the voice of mercy in his court. Your counsel created a more humane reign. When Caesar died naturally, the transition to Octavian was peaceful. You lived honored, your family prospered, and you died knowing you'd chosen both loyalty and humanity. History remembers you as the man who proved power could be wielded with mercy."
    },

    mercy_path: {
      title: "Reconciliation",
      date: "March 15-20, 44 BCE",
      text: "You urge Caesar to show mercy and seek reconciliation. 'They acted from love of Rome, however misguided. Punish them with your forgiveness, not your sword.'\n\nCaesar is moved by your words. He pardons the conspirators publicly, embracing even Brutus. The gesture stuns Rome.\n\nSome call it weakness, but most see magnanimity. Caesar's mercy becomes legendary. He rules without the taint of revenge, and the Republic's transition to Empire is gentler than it might have been.\n\nBrutus serves Caesar loyally afterward, though you can see the internal struggle in his eyes. You've saved lives and perhaps Rome's soul.",
      isEnding: true,
      outcome: "Your counsel of mercy changed history. Caesar's forgiveness became the defining moment of his reign. When he died peacefully years later, even his former enemies mourned. You served as a senior advisor, known for wisdom and compassion. Your family became synonymous with honorable service. You died celebrated, having proved that mercy can be stronger than vengeance."
    },

    rewarded_loyalist: {
      title: "Caesar's Gratitude",
      date: "March 15-30, 44 BCE",
      text: "Caesar showers you with honors—land, titles, a position in his inner council. You become one of the most powerful men in Rome.\n\nThe conspirators are executed swiftly. Their properties are distributed among Caesar's loyalists, including you. You grow wealthy beyond imagination.\n\nBut sometimes, walking through your new estates, you wonder about the cost. Brutus died cursing Caesar as a tyrant. Was he wrong?\n\nYou live lavishly, but certain questions haunt you in quiet moments.",
      isEnding: true,
      outcome: "You lived in luxury and power, rewarded handsomely for your loyalty. Your family became one of Rome's greatest dynasties. But the question of whether you served Rome or tyranny never quite left you. You died wealthy and honored, though philosophical debates about your choices continue through history. You chose security over principle—history will argue forever whether you were right."
    },

    plea_for_mercy: {
      title: "The Merciful Advocate",
      date: "March 15, 44 BCE - Afternoon",
      text: "Despite everything, you ask Caesar to spare the conspirators. 'They acted from principle, misguided though it was. Show Rome you're greater than revenge.'\n\nCaesar is surprised but considers your words. 'You saved my life, yet ask me to spare those who would have taken it?'\n\n'I ask you to be remembered for mercy, not vengeance,' you reply.\n\nCaesar exiles the conspirators rather than executing them. Your counsel shapes his legacy as a merciful ruler.",
      isEnding: true,
      outcome: "Your advocacy for mercy defined Caesar's later reign. He became known for clemency, and his rule was gentler because of your influence. You served as his most trusted advisor, balancing power with compassion. When he died peacefully, you helped ensure a smooth transition. Your legacy is one of loyalty combined with humanity—a rare and admirable combination."
    },

    failed_protection: {
      title: "Too Little, Too Late",
      date: "March 15, 44 BCE - The Senate",
      text: "You follow Caesar to the Senate, determined to protect him despite your vague warning. But you arrive just as the attack begins.\n\nYou try to fight your way to Caesar, but the conspirators block you. By the time you reach him, he's already fallen. You hold his hand as he dies.\n\n'I tried to warn you,' you whisper. But Caesar is beyond hearing.\n\nMark Antony finds you there, covered in Caesar's blood. Your effort was genuine, if inadequate.",
      choices: [
        {
          text: "Dedicate yourself to avenging Caesar",
          next: "rally_caesarians",
          stats: { loyalty: 30, morality: 10 }
        }
      ]
    },

    caesar_survives_wounded: {
      title: "The Long Recovery",
      date: "March 15-April, 44 BCE",
      text: "Caesar survives his wounds, though he's never quite the same. He walks with a limp, his left arm weakened. But he lives, thanks to your intervention.\n\nThe conspirators are hunted down. Some escape; others are caught and executed. Caesar becomes more cautious, more guarded. The man you saved is harder than the one before.\n\n'You gave me life, Marcus,' he tells you, 'but they took something else from me—my faith in Rome.'\n\nYou've saved Caesar but couldn't save his trust in humanity.",
      isEnding: true,
      outcome: "Caesar lived another decade, ruling with iron control. Your intervention saved his life but created a more authoritarian regime. You served loyally but saw the cost of survival—Caesar's idealism died with Brutus's betrayal, even if his body didn't. You died honored but troubled, wondering if the man you saved was worth the Republic you lost."
    },

    ending_antonys_man: {
      title: "Antony's Lieutenant",
      date: "44-30 BCE",
      text: "You serve Mark Antony faithfully through the civil wars. You're there at Philippi when the conspirators are defeated. You're there when Antony meets Cleopatra.\n\nWhen Antony's alliance with Octavian fractures, you must choose again. You stay with Antony, following him to Egypt and eventual defeat at Actium.\n\nYou die in Alexandria, loyal to the end, as Antony's cause crumbles. Your loyalty was absolute, even in defeat.",
      isEnding: true,
      outcome: "You chose loyalty over pragmatism, staying with Antony even when his cause was lost. History remembers you as faithful but perhaps foolish. Your family lost its position after Actium, though Octavian eventually pardoned your children. You died honorably, if on the losing side, proving that loyalty isn't always rewarded but remains valuable nonetheless."
    },

    ending_exile_disgraced: {
      title: "The Disgraced Exile",
      date: "44-35 BCE",
      text: "You flee to the eastern provinces, but your reputation follows. No one trusts you. You're the man who knew of the plot, did nothing, then lied about it.\n\nYou live in poverty and obscurity, your family name ruined. Former friends refuse to acknowledge you. You die unmourned and unremembered, a cautionary tale about dishonor.",
      isEnding: true,
      outcome: "Your dishonesty destroyed you more completely than choosing either side would have. You died in exile, poor and despised. Your children changed their names to escape association with you. History barely records your existence—just a footnote about cowardice and lies. Sometimes the only thing worse than being on the wrong side is being on no side at all."
    }
  };

  const currentSceneData = scenes[currentScene];

  if (!currentSceneData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-950 via-stone-900 to-black flex items-center justify-center">
        <div className="text-white text-center p-8">
          <Skull className="w-16 h-16 text-amber-400 mx-auto mb-4" />
          <p className="text-xl mb-4">Scene not found: {currentScene}</p>
          <button 
            onClick={onBack} 
            className="px-6 py-3 bg-amber-700 hover:bg-amber-600 rounded-lg transition-all"
          >
            Return to Timeline
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-950 via-stone-900 to-black relative overflow-hidden">
      {/* Decorative Roman elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 text-9xl">🏛️</div>
        <div className="absolute bottom-10 right-10 text-9xl">⚔️</div>
        <div className="absolute top-1/2 left-1/4 text-6xl">🦅</div>
      </div>

      {/* Stats Panel */}
      <div className="fixed top-4 right-4 bg-stone-900/90 backdrop-blur-sm border-2 border-amber-800/60 rounded-lg p-4 z-20 w-64">
        <h3 className="text-amber-400 font-serif font-bold mb-3 text-center">Your Standing</h3>
        
        <div className="space-y-3">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-amber-300 text-sm flex items-center gap-2">
                <Crown className="w-4 h-4" />
                Loyalty to Caesar
              </span>
              <span className="text-amber-200 text-sm font-bold">{stats.loyalty}%</span>
            </div>
            <div className="w-full bg-stone-800 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-red-600 to-amber-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${stats.loyalty}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-amber-300 text-sm flex items-center gap-2">
                <Heart className="w-4 h-4" />
                Moral Integrity
              </span>
              <span className="text-amber-200 text-sm font-bold">{stats.morality}%</span>
            </div>
            <div className="w-full bg-stone-800 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-600 to-cyan-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${stats.morality}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-amber-300 text-sm flex items-center gap-2">
                <Scroll className="w-4 h-4" />
                Political Influence
              </span>
              <span className="text-amber-200 text-sm font-bold">{stats.influence}%</span>
            </div>
            <div className="w-full bg-stone-800 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${stats.influence}%` }}
              />
            </div>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-amber-800/40">
          <p className="text-amber-400/70 text-xs text-center italic">
            Your choices shape history
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-8 max-w-4xl">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-amber-300 hover:text-amber-100 transition-colors mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Return to Timeline</span>
        </button>

        {/* Story Card */}
        <div className="bg-stone-900/80 backdrop-blur-sm border-2 border-amber-800/60 rounded-lg overflow-hidden shadow-2xl">
          {/* Header */}
          <div className="bg-gradient-to-r from-red-900 to-amber-900 p-6 border-b-2 border-amber-800/60">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <Scroll className="w-8 h-8 text-amber-300" />
                <div>
                  <h2 className="text-3xl font-serif font-bold text-amber-300">
                    {currentSceneData.title}
                  </h2>
                  <p className="text-amber-400/80 text-sm italic">{currentSceneData.date}</p>
                </div>
              </div>
              {currentSceneData.isEnding && (
                <div className="flex items-center gap-2 bg-amber-700/30 px-3 py-1 rounded-full">
                  <Skull className="w-4 h-4 text-amber-300" />
                  <span className="text-amber-300 text-sm font-bold">Ending</span>
                </div>
              )}
            </div>
          </div>

          {/* Story Text */}
          <div className="p-8">
            <div className="prose prose-invert max-w-none">
              {currentSceneData.text.split('\n\n').map((paragraph, index) => (
                <p key={index} className="text-amber-100 text-lg leading-relaxed mb-4 font-serif">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Ending Outcome */}
            {currentSceneData.isEnding && currentSceneData.outcome && (
              <div className="mt-8 p-6 bg-amber-900/20 border-2 border-amber-700/50 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-6 h-6 text-amber-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-amber-300 font-serif font-bold text-xl mb-2">Your Legacy</h3>
                    <p className="text-amber-200 leading-relaxed">
                      {currentSceneData.outcome}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Choices */}
            {!currentSceneData.isEnding && currentSceneData.choices && (
              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-2 text-amber-400 font-serif font-bold">
                  <span className="text-lg">Choose your path:</span>
                </div>
                {currentSceneData.choices.map((choice, index) => (
                  <button
                    key={index}
                    onClick={() => makeChoice(choice.next, choice.text, choice.stats)}
                    className="w-full text-left p-5 bg-gradient-to-r from-stone-800/50 to-amber-950/30 hover:from-amber-900/40 hover:to-red-900/40 border-2 border-amber-800/40 hover:border-amber-600 rounded-lg transition-all duration-300 group"
                  >
                    <p className="text-amber-200 group-hover:text-amber-100 font-serif leading-relaxed">
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
                    setStats({ loyalty: 50, morality: 50, influence: 30 });
                  }}
                  className="flex-1 px-6 py-3 bg-amber-700 hover:bg-amber-600 text-white font-serif font-semibold rounded-lg transition-all duration-300"
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

        {/* Choice History (if any choices made) */}
        {choices.length > 0 && !currentSceneData.isEnding && (
          <div className="mt-6 bg-stone-900/60 backdrop-blur-sm border border-amber-800/40 rounded-lg p-4">
            <h3 className="text-amber-400 font-serif font-bold mb-3 text-sm">Your Journey So Far:</h3>
            <div className="space-y-2">
              {choices.map((choice, index) => (
                <div key={index} className="flex items-start gap-2">
                  <span className="text-amber-600 text-xs mt-1">▸</span>
                  <p className="text-amber-300/70 text-xs">{choice}</p>
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

export default AncientStory;
