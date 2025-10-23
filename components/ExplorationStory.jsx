import React, { useState } from 'react';
import { ArrowLeft, Compass, Heart, Skull, AlertTriangle, Ship } from 'lucide-react';

const ExplorationStory = ({ onBack }) => {
  const [currentScene, setCurrentScene] = useState('intro');
  const [choices, setChoices] = useState([]);
  const [stats, setStats] = useState({
    loyalty: 50,
    humanity: 50,
    survival: 50
  });

  const updateStats = (statChanges) => {
    setStats(prev => ({
      loyalty: Math.max(0, Math.min(100, prev.loyalty + (statChanges.loyalty || 0))),
      humanity: Math.max(0, Math.min(100, prev.humanity + (statChanges.humanity || 0))),
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
      title: "The Call to Adventure",
      date: "February 1519 - Seville, Spain",
      text: "You are María Catalina de Santos, a young woman with an extraordinary gift for languages. Born to a Spanish merchant and a Moorish mother, you speak Spanish, Arabic, Latin, and Portuguese fluently. Your father taught you reading and writing—rare for a woman—before he died, leaving you with little prospects.\n\nNow, Hernán Cortés is assembling an expedition to the New World. Word has spread that he needs translators. You've heard stories of gold, of strange peoples, of a new world waiting to be discovered. But you've also heard whispers of violence, slavery, and destruction following in the wake of conquest.\n\nYour mother clutches your hand. 'Do not go, María. These expeditions bring only death. Stay here, marry the baker's son, live a quiet life.'\n\nBut the baker's son is cruel, and a quiet life means a slow death of a different kind. The ship leaves in two days.",
      choices: [
        {
          text: "Join the expedition—adventure and opportunity await",
          next: "join_expedition",
          stats: { survival: 10, loyalty: 10 }
        },
        {
          text: "Refuse and stay in Spain—safety over adventure",
          next: "stay_spain",
          stats: { survival: 20, loyalty: -10, humanity: -5 }
        },
        {
          text: "Join, but vow to protect indigenous peoples from harm",
          next: "join_protector",
          stats: { humanity: 20, loyalty: -10 }
        },
        {
          text: "Join solely to chronicle the truth of what happens",
          next: "join_chronicler",
          stats: { humanity: 10, survival: 5 }
        }
      ]
    },

    stay_spain: {
      title: "The Baker's Wife",
      date: "1519-1547 - Seville, Spain",
      text: "You marry the baker's son. He is indeed cruel. He drinks, strikes you, and gambles away money. You bear three children. Two die in infancy. Your mother passes away in 1523.\n\nIn 1526, you hear news: Cortés conquered the Aztec Empire. Stories of gold and glory fill the taverns. The baker's son curses you: 'We could have been rich if you'd gone! Useless woman!'\n\nYou live 28 more years of quiet misery. When you die at 47, the baker's son remarries within a month. Your one surviving child doesn't attend your funeral.",
      isEnding: true,
      outcome: "You chose safety and found only suffering. The New World's dangers might have killed you, but staying killed your spirit over decades instead. Your life was long but empty, filled with small cruelties that accumulated into a crushing weight. You died unmourned and unmemorable, your gifts wasted, your potential unrealized. Sometimes the safe choice is the most dangerous of all—not to your body, but to your soul. You survived, but you never truly lived."
    },

    join_expedition: {
      title: "The Voyage Begins",
      date: "March 1519 - Atlantic Ocean",
      text: "You board the Santa María de la Concepción with 500 soldiers, sailors, and adventurers. Cortés himself interviews you, impressed by your linguistic abilities.\n\n'You will be invaluable, Señorita Santos,' he says. 'We go to bring civilization and Christianity to savages. Your languages will help us communicate God's word.'\n\nDuring the voyage, you befriend a sailor named Diego who speaks quietly of his doubts. 'My cousin sailed with Columbus. He says the conquest of Hispaniola was butchery, not civilization. Entire peoples enslaved or killed.'\n\nYou also meet Father Olmedo, the expedition chaplain, who seems genuinely concerned with saving souls. And Cortés's second-in-command, Pedro de Alvarado, whose cruelty is already legendary.\n\nAs land appears on the horizon, you must decide what kind of person you will be in this new world.",
      choices: [
        {
          text: "Align yourself with Cortés—loyalty to the expedition",
          next: "align_cortes",
          stats: { loyalty: 20, humanity: -10 }
        },
        {
          text: "Befriend Father Olmedo—perhaps faith can temper conquest",
          next: "ally_olmedo",
          stats: { humanity: 15, loyalty: 10 }
        },
        {
          text: "Trust Diego and the common sailors—learn truth from below",
          next: "ally_sailors",
          stats: { humanity: 10, loyalty: -5 }
        }
      ]
    },

    join_protector: {
      title: "The Protector's Vow",
      date: "March-April 1519 - Yucatan Coast",
      text: "You join the expedition with a secret vow to protect indigenous peoples where you can. When you land on the Yucatan coast, you meet the Maya people for the first time.\n\nThey're wary but not hostile. Through gestures and your Arabic (which shares some sounds with their language), you begin to communicate. They offer food. Some Spanish soldiers want to take it by force anyway.\n\nCortés orders restraint—for now. 'We need information more than we need enemies,' he says pragmatically.\n\nYou meet a Maya woman named Ix Chel who seems to understand your intentions. She teaches you words in her language. You're learning fast.\n\nBut Cortés is growing impatient. He wants to move inland toward the great cities. The Maya are divided—some want to trade, others to resist. Your translations could tip the balance toward peace or war.",
      choices: [
        {
          text: "Translate faithfully but advocate loudly for peaceful trade",
          next: "advocate_peace",
          stats: { humanity: 20, loyalty: -10 }
        },
        {
          text: "Mistranslate slightly to prevent conflict",
          next: "mistranslate_peace",
          stats: { humanity: 15, loyalty: -20, survival: -10 }
        },
        {
          text: "Warn the Maya privately of Spanish intentions",
          next: "warn_maya",
          stats: { humanity: 25, loyalty: -30, survival: -15 }
        }
      ]
    },

    join_chronicler: {
      title: "The Observer",
      date: "April 1519 - Yucatan Coast",
      text: "You join determined to record the truth, whatever it may be. You keep a secret journal, writing in a cipher mixing Spanish and Arabic script that most Spaniards cannot read.\n\nThe first encounters with the Maya are tense but not violent. You record everything: the Spanish demands, the Maya responses, the growing cultural misunderstandings.\n\nCortés notices your constant writing. 'What are you recording, Señorita Santos?'\n\n'Just language notes, Captain. To improve my translations.'\n\nHe seems satisfied, but Pedro de Alvarado eyes you suspiciously. 'Women and their secrets,' he mutters.\n\nYour truthful chronicling may endanger you, but history deserves an honest account.",
      choices: [
        {
          text: "Continue honest chronicling despite the danger",
          next: "continue_chronicle",
          stats: { humanity: 15, survival: -10 }
        },
        {
          text: "Keep two journals—one truthful, one for Spanish eyes",
          next: "double_journal",
          stats: { humanity: 10, survival: 10 }
        }
      ]
    },

    align_cortes: {
      title: "The Conquistador's Translator",
      date: "April-May 1519 - March Inland",
      text: "You ally yourself with Cortés. His charisma is undeniable, his vision grand. He speaks of bringing civilization, Christianity, and glory to Spain. Part of you wants to believe him.\n\nAs you march inland, you translate his demands to increasingly larger indigenous settlements: 'Submit to the Spanish Crown and the Christian God, and you will be treated well. Resist, and face consequences.'\n\nMany submit out of fear. Cortés is pleased with your work. 'You have a gift, María. You will be remembered as the tongue that conquered an empire.'\n\nBut you see what follows submission: natives forced into labor, their gold confiscated, their temples defaced. When you translate Cortés's reassurances to worried chiefs, you know they are lies.\n\nIn Cempoala, a Totonac chief tells you through tears that he hopes the Spanish will free them from Aztec tribute. You don't tell him the Spanish tribute will be worse.",
      choices: [
        {
          text: "Continue serving Cortés—you've come too far to turn back",
          next: "serve_cortes",
          stats: { loyalty: 25, humanity: -20 }
        },
        {
          text: "Begin to have doubts about your role",
          next: "growing_doubts",
          stats: { humanity: 10, loyalty: -5 }
        },
        {
          text: "Secretly start helping indigenous peoples where possible",
          next: "secret_helper",
          stats: { humanity: 20, loyalty: -10, survival: -5 }
        }
      ]
    },

    ally_olmedo: {
      title: "Faith and Conquest",
      date: "April-June 1519 - Inland March",
      text: "Father Olmedo becomes your mentor. Unlike many conquistadors, he genuinely cares about converting souls, not just extracting gold. He learns indigenous languages with you, trying to explain Christianity in terms natives might understand.\n\n'God loves all His children,' Olmedo tells a Totonac priest through your translation. 'Even those who have not yet heard His word.'\n\nThe priest responds thoughtfully: 'We have heard many gods speak. How do we know yours is the true voice?'\n\nIt's a good question. Olmedo actually considers it rather than dismissing it. You're translating a genuine theological dialogue, not just demands and threats.\n\nBut Cortés and the other conquistadors grow impatient with Olmedo's gentle approach. 'We need submission, not debate,' Alvarado snarls. You're caught between faith and force.",
      choices: [
        {
          text: "Support Olmedo's gentle conversion methods",
          next: "gentle_conversion",
          stats: { humanity: 20, loyalty: 5 }
        },
        {
          text: "Admit faith cannot justify conquest",
          next: "reject_mission",
          stats: { humanity: 25, loyalty: -15 }
        }
      ]
    },

    ally_sailors: {
      title: "Truth from Below",
      date: "April-July 1519 - The March Continues",
      text: "Diego and the common sailors tell you what the officers won't. They speak of previous expeditions: the systematic enslavement of Caribbean natives, Columbus's brutal governance of Hispaniola, the near-extinction of the Taíno people.\n\n'The captains talk of glory and God,' Diego says quietly. 'But I've seen men torch villages for sport, enslave children, and laugh about it. This isn't Christian conquest—it's butchery with a cross painted on.'\n\nYou're learning that the official narrative Cortés promotes bears little resemblance to the reality common soldiers witness. Your role as translator makes you complicit in atrocities you're only beginning to understand.\n\nWhen you translate Cortés's promises of peace and prosperity, you know you're lying. The question is whether to keep lying or risk everything to tell the truth.",
      choices: [
        {
          text: "Keep translating but document the truth secretly",
          next: "secret_documentation",
          stats: { humanity: 15, survival: -5 }
        },
        {
          text: "Begin warning indigenous peoples privately",
          next: "warn_natives",
          stats: { humanity: 25, loyalty: -25, survival: -15 }
        },
        {
          text: "Confront Cortés about the contradictions",
          next: "confront_cortes",
          stats: { humanity: 15, loyalty: -10, survival: -10 }
        }
      ]
    },

    serve_cortes: {
      title: "The Loyal Servant",
      date: "July-November 1519 - The March to Tenochtitlan",
      text: "You serve Cortés loyally through the long march inland. Your translations facilitate alliances with Tlaxcalans (enemies of the Aztecs), smooth over cultural misunderstandings, and help Cortés navigate the complex political landscape of Mesoamerica.\n\nYou're present when Cortés meets Moctezuma II, emperor of the Aztecs. The meeting is tense but peaceful. You translate the elaborate speeches, the gift exchanges, the cautious diplomacy.\n\nCortés treats you well, grants you gold and status. You're becoming wealthy from this conquest. You have a house built for you in Veracruz. Common soldiers salute you.\n\nBut at night, you dream of the villages burned, the temples destroyed, the people enslaved. You're complicit in it all.",
      isEnding: true,
      outcome: "You served Cortés loyally through the conquest of Mexico. You became wealthy, respected among the Spanish, and lived comfortably. You married a Spanish officer and had children. You died at 58, wealthy and honored. But you never forgot what you helped enable. In your final years, you endowed a hospital for indigenous peoples, trying to balance the scales. Your children inherited your wealth but not your guilt. History remembers you as Cortés's translator, the woman whose words opened an empire to conquest. Some call you a facilitator of genocide. Others say you were a product of your time. Your private journals, discovered centuries later, revealed your internal torment. You gained the world but never recovered your soul."
    },

    growing_doubts: {
      title: "Conscience Awakens",
      date: "August-October 1519 - Doubts Multiply",
      text: "You continue serving Cortés, but doubts multiply with each atrocity witnessed. The massacre at Cholula particularly haunts you—thousands killed in a single day because Cortés suspected a plot.\n\nYou translated Cortés's justifications to the surviving Cholulan leaders. You saw their faces. They knew you were complicit.\n\nFather Olmedo finds you weeping that night. 'I helped murder them,' you sob. 'My words helped Cortés convince them to gather where his soldiers could slaughter them.'\n\n'You're not responsible for men's evil,' Olmedo says, but his voice lacks conviction. He's struggling with the same questions.\n\n'What should I do, Father?'\n\n'I don't know. Pray. Seek guidance. Perhaps... perhaps record what truly happened, so future generations can learn from these sins.'",
      choices: [
        {
          text: "Begin secretly documenting atrocities",
          next: "document_atrocities",
          stats: { humanity: 20, loyalty: -10, survival: -5 }
        },
        {
          text: "Continue serving but refuse to translate lies anymore",
          next: "truth_only",
          stats: { humanity: 15, loyalty: -5, survival: -10 }
        },
        {
          text: "Desert the expedition and warn the Aztecs",
          next: "warn_aztecs",
          stats: { humanity: 30, loyalty: -35, survival: -20 }
        }
      ]
    },

    secret_helper: {
      title: "The Underground Resistance",
      date: "September-November 1519 - Dual Life",
      text: "You serve Cortés publicly while helping indigenous peoples secretly. You warn villages of planned raids, mistranslate occasionally to buy them time, and pass information to resistance leaders.\n\nIt's exhausting and dangerous. Pedro de Alvarado suspects something but can't prove it. You're constantly watched.\n\nIn Tenochtitlan, you make contact with Aztec nobles who oppose Moctezuma's accommodation of the Spanish. They want to expel the invaders. You could help them.\n\nBut helping them means the Spanish—including people you've befriended like Diego and Father Olmedo—will likely die. Can you betray your own people to save another?",
      choices: [
        {
          text: "Help the Aztec resistance plan an uprising",
          next: "help_aztec_resistance",
          stats: { humanity: 25, loyalty: -30, survival: -15 }
        },
        {
          text: "Try to broker peace between both sides",
          next: "broker_peace",
          stats: { humanity: 20, loyalty: 5 }
        },
        {
          text: "Continue small acts of kindness without major betrayal",
          next: "small_kindnesses",
          stats: { humanity: 15, survival: 10 }
        }
      ]
    },

    advocate_peace: {
      title: "The Voice for Peace",
      date: "May-July 1519 - Negotiations",
      text: "You translate faithfully but use every opportunity to advocate for peaceful solutions. When Cortés threatens force, you soften his words slightly. When native leaders offer compromise, you emphasize their reasonableness.\n\nIt works—sometimes. Several communities submit peacefully that might have resisted. Lives are saved. But Cortés notices your advocacy.\n\n'You're soft with them, María,' he says. 'That's dangerous. They respect only strength.'\n\n'They respect fairness, Captain. Force makes enemies. Trade makes allies.'\n\nCortés considers this. He's pragmatic above all. 'Continue. But if your peaceful approach fails, we do things my way.'\n\nYou've bought time, but haven't stopped the conquest. Just made it slightly less bloody. Is that enough?",
      choices: [
        {
          text: "Continue the patient approach—every life saved matters",
          next: "patient_peace",
          stats: { humanity: 20, loyalty: 10 }
        },
        {
          text: "Escalate to more direct resistance",
          next: "active_resistance",
          stats: { humanity: 25, loyalty: -20, survival: -15 }
        }
      ]
    },

    mistranslate_peace: {
      title: "Dangerous Deception",
      date: "May-June 1519 - Playing Both Sides",
      text: "You begin deliberately mistranslating to prevent violence. When Cortés orders 'Submit or die,' you say 'The strangers request an alliance.' When native leaders refuse Spanish demands, you tell Cortés they're 'considering' his offer.\n\nIt works—for a while. Several potential battles are avoided. Communities that would have been destroyed remain intact.\n\nBut Pedro de Alvarado is learning some native languages. One day, he catches a discrepancy. 'That's not what the chief said. You're lying.'\n\nCortés confronts you privately. 'María, I've trusted you. Have you been mistranslating?'\n\nYou could deny it, but he'll watch you closely now. Or confess and hope for mercy. Or flee tonight before they imprison you.",
      choices: [
        {
          text: "Confess and plead for understanding",
          next: "confess_mistranslation",
          stats: { humanity: 15, loyalty: -15, survival: -5 }
        },
        {
          text: "Deny everything and be more careful",
          next: "deny_continue",
          stats: { survival: 5, humanity: 10, loyalty: -10 }
        },
        {
          text: "Flee to a native village tonight",
          next: "desert_expedition",
          stats: { humanity: 20, loyalty: -30, survival: -10 }
        }
      ]
    },

    warn_maya: {
      title: "The Betrayer",
      date: "May 1519 - Secret Warning",
      text: "You warn Ix Chel and her people. 'The Spanish have guns that thunder like gods. They want your gold and will take it by force if necessary. They've destroyed entire peoples in the islands. Unite with other cities. Resist them.'\n\nIx Chel believes you. She spreads word to allied settlements. The Maya begin organizing resistance. They won't submit easily.\n\nBut someone sees you meeting with Ix Chel. Within days, Cortés knows. He has you arrested.\n\n'Treason,' he says coldly. 'You've endangered the entire expedition. The penalty is death.'\n\nFather Olmedo pleads for your life. Diego and other sailors who knew your conscience also speak up. Cortés is conflicted—he needs your translation skills, but can't ignore betrayal.\n\n'You will live,' he finally decides. 'But in chains. And you will translate exactly what I say, or I'll burn native villages until you comply.'",
      choices: [
        {
          text: "Submit and translate in chains",
          next: "translation_captive",
          stats: { survival: 10, humanity: -10 }
        },
        {
          text: "Refuse and accept execution",
          next: "martyrdom",
          stats: { humanity: 30, survival: -100 }
        },
        {
          text: "Agree but plan escape",
          next: "plan_escape",
          stats: { survival: 15, humanity: 10, loyalty: -20 }
        }
      ]
    },

    continue_chronicle: {
      title: "The Truth Keeper",
      date: "June-August 1519 - Recording History",
      text: "You continue recording everything honestly: the violence, the cultural destruction, the broken promises, but also acts of kindness, moments of genuine connection, and the complexity of conquest.\n\nYour journal grows into something extraordinary—a firsthand account of conquest from someone who speaks both languages and understands both cultures. You record massacres but also native resistance. Spanish cruelty but also the systems that produce it.\n\nPedro de Alvarado grows increasingly suspicious. One night, he searches your belongings. He finds your journal but cannot read your cipher.\n\n'What is this?' he demands, bringing it to Cortés.\n\nCortés looks at the strange script—mixing Spanish, Arabic, and now Nahuatl characters. 'Explain this, María.'",
      choices: [
        {
          text: "Claim it's a prayer journal in Arabic",
          next: "claim_prayers",
          stats: { survival: 15, humanity: 10 }
        },
        {
          text: "Admit you're recording history honestly",
          next: "admit_chronicle",
          stats: { humanity: 20, loyalty: -10, survival: -10 }
        },
        {
          text: "Offer to read it to Cortés—but lie about contents",
          next: "lie_about_journal",
          stats: { survival: 10, humanity: -5 }
        }
      ]
    },

    double_journal: {
      title: "The Careful Chronicler",
      date: "June-September 1519 - Dual Accounts",
      text: "You maintain two journals. One records events from the Spanish perspective—heroic conquistadors bringing civilization to savages. This one you leave visible for anyone to read.\n\nThe other, hidden in your personal effects and written in cipher, records the truth: the massacres, the broken treaties, the deliberate cultural destruction, the humanity of the indigenous peoples.\n\nYour double life is exhausting but seems to work. Cortés occasionally reads your visible journal and approves. 'You capture our noble purpose well, María.'\n\nYou're preserving truth while surviving. But the longer you maintain the deception, the harder it becomes to remember which version is real.",
      choices: [
        {
          text: "Continue the dual journals throughout the conquest",
          next: "dual_chronicle_continues",
          stats: { humanity: 15, survival: 15 }
        },
        {
          text: "Focus on the truth journal—it matters more",
          next: "prioritize_truth",
          stats: { humanity: 20, survival: -5 }
        }
      ]
    },

    gentle_conversion: {
      title: "The Missionary",
      date: "July-December 1519 - Faith Over Force",
      text: "You support Father Olmedo's gentle conversion approach. Together, you create the first Nahuatl-Spanish catechism, teaching Christianity through dialogue rather than force.\n\nSome indigenous people genuinely convert, drawn by Christianity's message of universal love. Others just pretend to avoid punishment. You try to tell the difference.\n\nBut Cortés grows impatient. After the Cholula massacre, he summons you and Olmedo. 'Your gentle methods haven't prevented conspiracy. From now on, we convert by the sword if necessary.'\n\nOlmedo protests. Cortés dismisses him. Your experiment in compassionate conquest is over. Now you must decide: continue serving a mission you know is corrupted, or take a stand?",
      choices: [
        {
          text: "Continue serving, preserving what compassion you can",
          next: "preserve_compassion",
          stats: { humanity: 15, loyalty: 10 }
        },
        {
          text: "Speak out against forced conversion",
          next: "oppose_forced_conversion",
          stats: { humanity: 25, loyalty: -15, survival: -10 }
        }
      ]
    },

    reject_mission: {
      title: "The Lost Faith",
      date: "August 1519 - Crisis of Belief",
      text: "You tell Father Olmedo you can no longer justify conquest, even for religious conversion. 'God cannot want us to murder and enslave to spread His word. If our faith requires this, then our faith is wrong.'\n\nOlmedo is shaken but not angry. 'María, I struggle with the same questions. But what can we do? We are here. The conquest happens whether we participate or not. At least our participation might reduce cruelty.'\n\n'Or make it possible,' you counter. 'Without translators, without priests blessing it, perhaps the conquest would fail.'\n\n'Perhaps. But we would still fail the souls we might have saved.'\n\nIt's an impossible dilemma. You part ways with Olmedo, though remain friends. But now you must decide your own path.",
      choices: [
        {
          text: "Stay but work to undermine conquest from within",
          next: "internal_sabotage",
          stats: { humanity: 20, loyalty: -20, survival: -10 }
        },
        {
          text: "Leave the expedition entirely",
          next: "abandon_expedition",
          stats: { humanity: 15, loyalty: -25, survival: -5 }
        }
      ]
    },

    secret_documentation: {
      title: "The Secret Historian",
      date: "August-November 1519 - Recording Truth",
      text: "You keep detailed secret records of everything: massacres, broken treaties, cultural destruction, but also moments of genuine human connection and indigenous agency.\n\nYour documentation is comprehensive and damning. If it ever reaches Spain, it could discredit the entire conquest.\n\nBut Pedro de Alvarado grows suspicious of your constant note-taking. He searches your belongings during the march. He finds your hidden journal.\n\nHe brings it to Cortés. 'The woman is recording our methods. This could destroy us if it reaches the king.'\n\nCortés reads your journal, his face darkening. 'María, this is treason. You've documented things that... that are best forgotten.'",
      choices: [
        {
          text: "Defend your right to record history honestly",
          next: "defend_chronicle",
          stats: { humanity: 25, loyalty: -20, survival: -15 }
        },
        {
          text: "Agree to destroy it and stop recording",
          next: "destroy_journal",
          stats: { survival: 15, humanity: -15 }
        },
        {
          text: "Claim it's fiction, stories not facts",
          next: "claim_fiction",
          stats: { survival: 10, humanity: 5 }
        }
      ]
    },

    warn_natives: {
      title: "The Warning Voice",
      date: "September 1519 - Dangerous Information",
      text: "You begin warning indigenous leaders privately about Spanish tactics. 'They say they come in peace but always demand submission. They speak of converting you but destroy your temples. They promise partnership but take your gold and your freedom.'\n\nSome leaders believe you. Others think you're a Spanish trick. But word spreads. When Cortés arrives at new settlements, they're prepared, wary, sometimes hostile.\n\nCortés notices the changed reception. 'Something has alerted them. We have a spy.'\n\nPedro de Alvarado begins investigating. Diego warns you: 'They're watching everyone. Be careful, María.'",
      choices: [
        {
          text: "Stop warning natives to avoid detection",
          next: "stop_warnings",
          stats: { survival: 15, humanity: -10 }
        },
        {
          text: "Continue despite the danger",
          next: "continue_warnings",
          stats: { humanity: 25, survival: -20 }
        },
        {
          text: "Desert to the natives before being caught",
          next: "desert_expedition",
          stats: { humanity: 20, loyalty: -30, survival: -10 }
        }
      ]
    },

    confront_cortes: {
      title: "Speaking Truth to Power",
      date: "October 1519 - The Confrontation",
      text: "You request a private audience with Cortés. In his tent, you speak plainly:\n\n'Captain, the common soldiers speak of atrocities that contradict your stated mission. Villages burned, peoples enslaved, promises broken. I've translated your words of peace while witnessing acts of war.'\n\nCortés regards you coolly. 'You question my leadership?'\n\n'I question the contradiction between our stated purpose and our actions.'\n\n'Our purpose is conquest,' Cortés says bluntly. 'Everything else is just... diplomacy. You're smart enough to know this. The question is whether you're loyal enough to continue.'\n\n'What if I'm not?'\n\n'Then you become a problem. And I solve problems, María.'",
      choices: [
        {
          text: "Back down and continue serving",
          next: "back_down_cortes",
          stats: { survival: 15, loyalty: 5, humanity: -10 }
        },
        {
          text: "Refuse to continue translating lies",
          next: "refuse_lies",
          stats: { humanity: 20, survival: -15 }
        }
      ]
    },

    patient_peace: {
      title: "The Diplomat",
      date: "August-November 1519 - Peace Through Patience",
      text: "You continue advocating for peaceful solutions. Your patient diplomacy saves dozens of villages from destruction. You broker genuine trade agreements rather than forced tributes.\n\nCortés tolerates your approach because it works. Communities submit without costing him soldiers. He even praises your methods: 'You've proven more valuable than three companies of infantry, María.'\n\nBut in Tenochtitlan, the Aztec capital, you face your greatest challenge. Moctezuma II welcomes the Spanish, believing Cortés might be the prophesied returning god Quetzalcoatl. You know this is a fatal misunderstanding.\n\nYou must decide: let Moctezuma continue his mistake (which helps Spanish conquest), or correct him (which might spark immediate war).",
      choices: [
        {
          text: "Continue diplomatic approach—it's working",
          next: "ending_diplomat",
          stats: { humanity: 20, loyalty: 15 }
        },
        {
          text: "Warn Moctezuma privately of the truth",
          next: "warn_moctezuma",
          stats: { humanity: 25, loyalty: -25, survival: -15 }
        }
      ]
    },

    active_resistance: {
      title: "The Resister",
      date: "September 1519 - Direct Action",
      text: "You escalate from advocacy to active resistance. You mistranslate orders, delay information, and pass intelligence to indigenous leaders about Spanish weaknesses.\n\nPedro de Alvarado catches you meeting with a Tlaxcalan chief you're supposed to be intimidating, but instead you're warning. He reports to Cortés.\n\nYou're arrested. Cortés is furious. 'I gave you chances, María. I tolerated your soft heart. But this is betrayal.'\n\n'You're invading their lands,' you respond. 'I'm trying to prevent genocide.'\n\n'You're trying to get us all killed,' Cortés snaps. 'You will face trial.'",
      choices: [
        {
          text: "Accept trial and defend your actions",
          next: "trial_defense",
          stats: { humanity: 25, loyalty: -20, survival: -10 }
        },
        {
          text: "Escape and flee to indigenous peoples",
          next: "escape_to_natives",
          stats: { humanity: 20, loyalty: -30, survival: -5 }
        }
      ]
    },

    confess_mistranslation: {
      title: "The Confession",
      date: "June 1519 - Honesty's Price",
      text: "You confess to Cortés. 'Yes, I've been mistranslating to prevent unnecessary violence. I've saved Spanish lives by avoiding battles we would have won but at great cost.'\n\nCortés considers this. He's pragmatic, not purely cruel. 'Your intent was to help, even if misguided. But I cannot have a translator I cannot trust.'\n\nHe demotes you from primary translator but doesn't execute you. 'You'll remain with the expedition, but under watch. Your linguistic skills are too valuable to waste, but you'll translate only in the presence of others who speak the languages.'\n\nYou've lost influence but kept your life.",
      choices: [
        {
          text: "Accept the reduced role and continue cautiously",
          next: "reduced_role",
          stats: { survival: 15, humanity: 5 }
        },
        {
          text: "Use the reduced scrutiny to continue helping secretly",
          next: "continue_secretly",
          stats: { humanity: 15, survival: -5 }
        }
      ]
    },

    deny_continue: {
      title: "The Careful Liar",
      date: "June-September 1519 - Treading Carefully",
      text: "You deny the accusations convincingly. Alvarado remains suspicious, but Cortés needs you too much to dismiss you on mere suspicion.\n\nYou continue your work but more carefully. You still mistranslate occasionally, but subtly. You choose your moments of deception wisely.\n\nOver the months, you calculate that your careful lies have prevented at least five unnecessary massacres. Hundreds of indigenous lives saved. But you live in constant fear of discovery.\n\nIn Tenochtitlan, Cortés asks you to translate crucial negotiations with Moctezuma. This is your most dangerous moment yet.",
      choices: [
        {
          text: "Translate faithfully—too risky to deceive now",
          next: "faithful_translation",
          stats: { survival: 15, loyalty: 10, humanity: -5 }
        },
        {
          text: "Continue subtle deceptions for peace",
          next: "subtle_deceptions",
          stats: { humanity: 15, survival: -10 }
        }
      ]
    },

    desert_expedition: {
      title: "The Deserter",
      date: "June 1519 - Fleeing Spanish Camp",
      text: "You flee in the night, carrying only what you can grab. You reach a Maya village where Ix Chel lives. She hides you when Spanish search parties come looking.\n\n'You are brave,' she tells you. 'Few Spanish reject their own people.'\n\nYou live with the Maya for several months, learning their language fluently, teaching them Spanish tactics. When Cortés's army approaches, the village is prepared. They negotiate from strength rather than fear.\n\nBut Cortés eventually learns you're helping indigenous peoples. He sends word: 'Surrender, or I'll burn every village that harbors you.'",
      choices: [
        {
          text: "Surrender to save the villages",
          next: "surrender_save_villages",
          stats: { humanity: 25, survival: -10 }
        },
        {
          text: "Move deeper into the interior where Spanish cannot reach",
          next: "flee_interior",
          stats: { humanity: 15, survival: 10 }
        },
        {
          text: "Help organize armed resistance",
          next: "organize_resistance",
          stats: { humanity: 20, survival: -15 }
        }
      ]
    },

    translation_captive: {
      title: "In Chains",
      date: "June-November 1519 - Prisoner Translator",
      text: "You translate in chains. Every word monitored. Every phrase checked by Spanish soldiers learning native languages. You cannot help anyone now.\n\nYou watch atrocities unfold and must translate the justifications. You tell Cholula leaders that Cortés massacred their people 'for their own good.' You watch your words break them.\n\nFather Olmedo visits you. 'I'm sorry, María. I wish there was another way.'\n\n'There was,' you say bitterly. 'I tried it. Now I'm just a tool for conquest.'\n\nYour humanity slowly erodes. Each translation chips away at your soul.",
      isEnding: true,
      outcome: "You survived as Cortés's chained translator through the conquest. You were released after the fall of Tenochtitlan, given some gold, and sent to live in New Spain. You never married, never recovered from your trauma. You died at 42, alcoholic and alone. Your final words were an indigenous prayer you'd learned—one of the few things the Spanish couldn't take from you. History doesn't record your name. You were just 'the translator.' You chose survival over death, but survival proved its own form of death. You lived in body but died in spirit during those months in chains."
    },

    martyrdom: {
      title: "The Price of Conscience",
      date: "June 1519 - The Execution",
      text: "You refuse. 'I will not help you destroy these peoples. Kill me if you must, but I won't be your instrument.'\n\nCortés is stunned. 'You would die for savages who mean nothing to you?'\n\n'They mean everything. They're human beings. I won't help murder them.'\n\nFather Olmedo tries to intercede. Diego and other sailors protest. But Cortés cannot allow such defiance. 'You leave me no choice.'\n\nYou're executed the next morning. Before you die, you shout to the gathered indigenous peoples in their own language: 'Resist them! Unite! Don't trust Spanish promises!'\n\nYour last words are a warning that echoes through the region.",
      isEnding: true,
      outcome: "You died at 24, executed as a traitor to Spain. But your warning spread. Several indigenous groups that had been considering alliance with Cortés instead chose resistance. Your martyrdom inspired others—both indigenous and Spanish—to question the morality of conquest. Decades later, a Dominican friar named Bartolomé de las Casas would cite your story in his famous defense of indigenous peoples. Your grave is unmarked, but your name became legendary among indigenous resistance movements. You chose conscience over survival, truth over safety. You died young, but you died human. That matters more than most lives lived to old age."
    },

    plan_escape: {
      title: "Waiting for the Moment",
      date: "June-August 1519 - Patient Prisoner",
      text: "You agree to translate in chains, but secretly plan escape. You watch, wait, and learn. During the march to Tenochtitlan, you notice patterns: when guards change, which routes are less watched, who is sympathetic.\n\nDiego remains your friend despite your imprisonment. He slips you a knife. 'When the time is right,' he whispers.\n\nIn August, during a thunderstorm, you make your move. You cut your bonds and flee into the jungle. Spanish pursue but lose you in the darkness and rain.\n\nYou're free, but lost in hostile territory with both Spanish and some indigenous groups hunting you.",
      choices: [
        {
          text: "Seek shelter with friendly indigenous peoples",
          next: "find_allies",
          stats: { humanity: 15, survival: 10 }
        },
        {
          text: "Live alone in the wilderness",
          next: "wilderness_alone",
          stats: { survival: 20, humanity: -10 }
        }
      ]
    },

    claim_prayers: {
      title: "The Accepted Lie",
      date: "September 1519 - Deception Succeeds",
      text: "You claim the journal is prayers and devotions in Arabic, a habit from your Moorish mother. Cortés, who cannot read Arabic, accepts this.\n\n'Religious devotion is admirable,' he says. 'But be careful—some might misunderstand foreign scripts.'\n\nYou've saved your journal, but now must be even more careful about recording. You continue documenting but hide it better. Your chronicle grows into the most complete firsthand account of the conquest.\n\nBy the time you reach Tenochtitlan, you have hundreds of pages of observations, translations, and analysis. This could be the most important historical document of the era—if it survives.",
      choices: [
        {
          text: "Continue chronicling until the very end",
          next: "ending_complete_chronicle",
          stats: { humanity: 20 }
        },
        {
          text: "Send copies back to Spain for safety",
          next: "send_chronicle_spain",
          stats: { humanity: 15, survival: 10 }
        }
      ]
    },

    admit_chronicle: {
      title: "The Honest Historian",
      date: "September 1519 - Truth Revealed",
      text: "You admit you're recording a truthful history. 'Future generations deserve to know what really happened here, Captain. Not propaganda, but truth.'\n\nCortés is surprisingly receptive. 'You think I care about how history judges me? History is written by victors. We will win, and we will write our own history.'\n\n'But what if someone writes the truth?'\n\n'Then it will be ignored. No one wants to hear uncomfortable truths about how empires are built.'\n\nHe allows you to continue your chronicle, confident that it won't matter. You're not so sure.",
      isEnding: true,
      outcome: "You chronicled the entire conquest faithfully. Your journal survived and reached Spain decades after your death at 67. It was suppressed by the Church and Crown for centuries but rediscovered in 1823. Your chronicle became crucial evidence for historians understanding the conquest. You told the truth about massacres, cultural destruction, and indigenous agency. You also documented Spanish motivations, indigenous political complexity, and the tragedy of first contact. Your work influenced generations of historians. You died obscure, but your words lived forever. You proved that one truthful voice, however silenced in its time, can eventually echo through centuries."
    },

    lie_about_journal: {
      title: "The Strategic Deception",
      date: "September 1519 - Selective Truth",
      text: "You read selected passages to Cortés, claiming the critical ones are 'just observations' and 'language notes.' He seems satisfied.\n\nYour journal survives, but now Cortés occasionally asks you to read from it. You must maintain the deception while continuing to record truth.\n\nThis becomes increasingly difficult as atrocities mount. The Cholula massacre. The imprisonment of Moctezuma. The temple desecrations. You record it all but must lie about what you've recorded.\n\nThe dual life is exhausting. You're not sure how long you can maintain it.",
      choices: [
        {
          text: "Continue the deception to protect the chronicle",
          next: "maintain_deception",
          stats: { humanity: 15, survival: 10 }
        },
        {
          text: "Admit the full truth and accept consequences",
          next: "admit_full_truth",
          stats: { humanity: 20, survival: -10 }
        }
      ]
    },

    dual_chronicle_continues: {
      title: "The Double Life",
      date: "October 1519 - March 1520 - Dual Recording",
      text: "You maintain both journals through the conquest. Your public journal praises Spanish heroism and indigenous savagery. Your private journal records the truth.\n\nThe strain of this double life affects your health. You develop headaches, insomnia. You sometimes forget which version you've told to whom.\n\nBut both journals survive. One is published in 1522, shaping Spanish public perception of the conquest. The other remains hidden in your belongings, waiting to be discovered.",
      isEnding: true,
      outcome: "Your dual chronicles created an unintended legacy. The public journal justified conquest for centuries. The private journal, discovered in 1789, revealed the truth and sparked debates about colonialism that continue today. You died at 71, your public persona celebrated while your private torment remained hidden. Only after your death did the world learn of your moral struggle. You're now studied as a case study in complicity—someone who documented evil while facilitating it. Your divided legacy reflects the divided soul you lived with. You were both enabler and witness, both complicit and resistant. History still debates whether you were brave for recording truth or cowardly for hiding it for so long."
    },

    prioritize_truth: {
      title: "Truth Above All",
      date: "October-December 1519 - The Honest Record",
      text: "You focus entirely on your truthful chronicle, letting the public journal languish. Cortés notices and questions the sparse entries.\n\n'You've stopped recording our glorious deeds, María?'\n\n'I've been... busy with translations, Captain.'\n\nHe's suspicious but distracted by the complexities of occupying Tenochtitlan. Your truthful chronicle grows comprehensive. You interview indigenous people, record their perspectives, document the destruction of their culture.\n\nThis is history as it should be written—from all sides, in full honesty.",
      isEnding: true,
      outcome: "Your chronicle became one of the most important historical documents of the conquest. You died at 54, but your journal survived through careful planning—you sent copies to allies who smuggled it to Spain. It was published in 1568, causing an uproar. It influenced reforms in Spanish colonial policy and inspired the 'Black Legend' critique of Spanish colonialism. You were vilified by conquistador families but celebrated by humanist scholars. Your work directly influenced the 'Leyes de Indias' that provided some protections for indigenous peoples. You sacrificed comfort and safety for historical truth. That truth changed how future conquests were conducted and justified. Your pen was mightier than Cortés's sword."
    },

    document_atrocities: {
      title: "The Dark Chronicle",
      date: "November 1519 - March 1520 - Recording Horror",
      text: "You document every atrocity in painful detail. The Cholula massacre: 3,000 dead in two hours. The destruction of the Templo Mayor: centuries of art and history erased. The torture of indigenous nobles to reveal gold: humanity reduced to instruments for extraction.\n\nYour chronicle becomes a catalog of horrors. Reading it back makes you physically ill. But someone must remember what was done here.\n\nFather Olmedo finds you weeping over your journal. 'Why torture yourself recording this?' he asks.\n\n'Because otherwise they'll lie about what happened. They'll call it glorious. Someone must remember the truth.'\n\nYour chronicle becomes evidence—dangerous evidence.",
      choices: [
        {
          text: "Hide it carefully and continue recording",
          next: "hide_continue",
          stats: { humanity: 20, survival: 5 }
        },
        {
          text: "Try to smuggle it back to Spain",
          next: "smuggle_spain",
          stats: { humanity: 25, survival: -10 }
        }
      ]
    },

    truth_only: {
      title: "No More Lies",
      date: "November 1519 - The Stand",
      text: "You tell Cortés you'll continue translating, but only truthfully. No more softening threats, no more making promises sound better than they are.\n\nCortés is surprised. 'You're growing a conscience now? After helping us get this far?'\n\n'Better late than never.'\n\n'Better never,' he retorts. 'Conscience is a luxury. We're conquering an empire. There's no room for moral hesitation.'\n\nYou translate faithfully from then on. Indigenous leaders hear the actual threats, the real demands. Some submit out of fear. Others resist. More violence follows than your diplomatic translations would have caused.\n\nYou've chosen honesty, but honesty has a price paid by others.",
      isEnding: true,
      outcome: "You continued as translator but translated only truth, refusing to soften Spanish demands or promises. This made conquest bloodier—indigenous peoples, hearing true Spanish intentions, resisted more fiercely. Cortés blamed you for increased casualties. You were dismissed after the fall of Tenochtitlan. You lived in Mexico City, working as a language teacher until you died at 61. Your students included both Spanish and indigenous people. You never became wealthy or famous, but you died with a clear conscience. Historians debate whether your truthful translations helped or harmed indigenous peoples—honesty provoked resistance that was crushed violently, but also preserved indigenous agency and dignity. You chose truth, even when truth was costly. That's a rare and difficult choice."
    },

    warn_aztecs: {
      title: "The Ultimate Betrayal",
      date: "November 1519 - Warning the Empire",
      text: "You secretly meet with Aztec nobles opposed to Moctezuma's accommodation policy. Through intermediaries, you provide detailed intelligence about Spanish tactics, weapons, weaknesses.\n\n'They're far from home,' you tell them. 'Their supply lines are fragile. They depend on indigenous allies who could be turned. Their guns are fearsome but slow to reload. They're vulnerable at night.'\n\nThe nobles thank you. Plans are made for an uprising. You've committed complete treason against Spain.\n\nBut Diego somehow learns of your meetings. He comes to you privately, devastated. 'María, what have you done? They'll kill us all if the Aztecs rise up.'\n\n'They're killing the Aztecs. I'm just trying to even the odds.'",
      choices: [
        {
          text: "Continue helping the Aztec resistance",
          next: "ending_aztec_ally",
          stats: { humanity: 30, loyalty: -40 }
        },
        {
          text: "Try to warn Diego and other innocent Spanish to flee",
          next: "warn_innocent",
          stats: { humanity: 20, loyalty: -20 }
        }
      ]
    },

    broker_peace: {
      title: "The Impossible Negotiation",
      date: "November 1519 - January 1520 - Seeking Middle Ground",
      text: "You attempt the impossible: negotiating genuine peace between Cortés and Moctezuma. You translate honestly between them, trying to find common ground.\n\nSome progress is made. Trade agreements. Cultural exchanges. Spanish agree to respect certain temples. Aztecs provide gold tribute voluntarily.\n\nFor three months, it seems peace might work. You've created a fragile bridge between worlds.\n\nThen Pedro de Alvarado, left in charge while Cortés is away, massacres Aztec nobles during a religious festival. The peace shatters instantly. Aztecs rise in fury. Spanish are besieged.\n\nYour peace effort dies in blood.",
      isEnding: true,
      outcome: "Your peace lasted three months—a miracle in itself. When Alvarado's massacre destroyed it, you tried to help negotiate Spanish withdrawal. You saved some lives on both sides during the chaotic 'Noche Triste' when Spanish fled Tenochtitlan. You remained in Mexico after the conquest, married an Aztec noble who survived, and spent thirty years trying to bridge the two cultures. You translated legal documents, helped negotiate land rights, and taught Spanish and Nahuatl. You died at 59, respected by both communities. Your brief peace proved that coexistence was possible, even if it didn't last. That possibility inspired future efforts at reconciliation. You showed that the conquistador-victim binary was false—third paths exist for those brave enough to walk them."
    },

    help_aztec_resistance: {
      title: "The Conspirator",
      date: "December 1519 - January 1520 - Planning Uprising",
      text: "You become a key member of the Aztec resistance. Your knowledge of Spanish tactics and ability to move freely among them makes you invaluable.\n\nYou provide intelligence about Spanish numbers, weapons, supply locations. You help plan the uprising that will trap Spanish in Tenochtitlan.\n\nBut you're also helping plan the deaths of people you know: Diego, Father Olmedo, even Cortés himself. Can you really be responsible for killing your own countrymen?\n\nThe night before the uprising, Diego finds you. 'María, I know something is happening. Please, whatever you're planning, think of the innocent Spanish who'll die.'\n\nHe's your friend. Warning him might compromise the entire uprising.",
      choices: [
        {
          text: "Warn Diego but proceed with the uprising",
          next: "warn_friend_proceed",
          stats: { humanity: 15, loyalty: -30 }
        },
        {
          text: "Proceed without warning—too much at stake",
          next: "proceed_no_warning",
          stats: { humanity: -15, loyalty: -35, survival: 10 }
        },
        {
          text: "Call off the uprising—you can't do this",
          next: "abort_uprising",
          stats: { humanity: 10, loyalty: -10, survival: 15 }
        }
      ]
    },

    small_kindnesses: {
      title: "The Quiet Helper",
      date: "November 1519 - May 1520 - Small Mercies",
      text: "You continue small acts of kindness without major betrayal: warning individuals of danger, mistranslating minor orders, providing food and medicine to indigenous people when possible.\n\nIt's not revolutionary, but it matters. You estimate you've saved dozens of individual lives through these quiet interventions.\n\nWhen Spanish flee Tenochtitlan during the 'Noche Triste,' you help both wounded Spanish and Aztecs. You don't try to change the course of history—just reduce its human cost where you can.\n\nYou survive the conquest and remain in New Spain.",
      isEnding: true,
      outcome: "You lived to 68, spending your life helping individuals caught in conquest's machinery. You became a translator, mediator, and advocate for indigenous peoples under Spanish rule. You helped dozens of communities negotiate better terms, preserve some cultural practices, and navigate colonial bureaucracy. You never stopped conquest, but you made it slightly less cruel for those you could reach. Your funeral was attended by both Spanish and indigenous people. One Nahuatl-speaking woman said: 'She never stopped the storm, but she was shelter for those caught in it.' That's an epitaph worth having. You chose small kindnesses over grand gestures, and small kindnesses accumulated into a life of meaning."
    },

    preserve_compassion: {
      title: "Compassion in the Ruins",
      date: "December 1519 - August 1521 - Mission Compromised",
      text: "You continue working with Father Olmedo, trying to preserve what compassion you can in an increasingly brutal conquest. You establish a hospital for indigenous wounded. You teach reading to children. You translate religious texts with genuine care.\n\nIt's not enough. The conquest's machinery grinds on despite your mercy. But you save some souls—literally and figuratively.\n\nAfter Tenochtitlan falls, you and Olmedo work to rebuild. You help establish the first schools for indigenous children. You fight against the worst abuses of encomienda. You translate the first Nahuatl Bible.\n\nYour mission failed, but your ministry succeeded.",
      isEnding: true,
      outcome: "You lived to 73, longer than almost anyone from the conquest. You became 'Mother María,' a revered figure who educated thousands of indigenous children, established hospitals, and fought for indigenous rights within the colonial system. You couldn't stop conquest, but you shaped how colonialism functioned. Your schools produced indigenous leaders who navigated Spanish rule more effectively. Your hospitals saved thousands of lives. Your advocacy influenced colonial law. At your funeral, a Spanish bishop and an indigenous elder both spoke of your compassion. You were canonized as a saint by indigenous communities, if not officially by the Church. You turned a failed mission into a successful life of service."
    },

    oppose_forced_conversion: {
      title: "Standing for Choice",
      date: "December 1519 - The Stand",
      text: "You openly oppose forced conversion. 'Christianity must be chosen, not compelled,' you argue to Cortés. 'Conversion at sword-point is no conversion at all.'\n\nCortés is furious. 'You dare lecture me on Christian duty? Who are you to question how we spread God's word?'\n\n'Someone who's read the gospels,' you respond. 'Christ never forced anyone to follow Him.'\n\nYou're removed from your translation position. But your protest resonates with some Spanish, including Father Olmedo and a faction of soldiers who question conquest's morality.\n\nYou've lost your position but kept your integrity.",
      choices: [
        {
          text: "Join the dissenting soldiers and return to Spain",
          next: "return_spain_dissident",
          stats: { humanity: 20, survival: 15 }
        },
        {
          text: "Stay in New Spain to continue advocating for indigenous peoples",
          next: "stay_advocate",
          stats: { humanity: 25, survival: 5 }
        }
      ]
    },

    internal_sabotage: {
      title: "The Saboteur",
      date: "December 1519 - April 1520 - Undermining Conquest",
      text: "You work to undermine conquest from within: destroying supplies, releasing prisoners, passing intelligence to indigenous resistance, creating bureaucratic delays.\n\nIt's dangerous work. Pedro de Alvarado grows increasingly suspicious. Several times you barely avoid discovery.\n\nYour sabotage slows conquest but doesn't stop it. You calculate you've delayed some operations by weeks, prevented some massacres, saved some individuals. But ultimately, Spanish conquest continues.\n\nThe question becomes: is sabotage worth the risk if it can't ultimately succeed?",
      choices: [
        {
          text: "Continue sabotage despite the odds",
          next: "continue_sabotage",
          stats: { humanity: 25, survival: -20 }
        },
        {
          text: "Escape before being caught",
          next: "escape_before_caught",
          stats: { humanity: 15, survival: 15 }
        }
      ]
    },

    abandon_expedition: {
      title: "Walking Away",
      date: "November 1519 - Departure",
      text: "You leave the expedition in Tenochtitlan. You're not imprisoned—just dismissed. Cortés is glad to be rid of a troublesome conscience.\n\nYou live in the outskirts of the Aztec capital, surviving on odd jobs, teaching Spanish to indigenous merchants, learning Nahuatl fluently. You witness the conquest from the outside.\n\nWhen war comes, you help where you can: treating wounded, sheltering refugees, translating for captives. You're not part of either army, just trying to reduce suffering.",
      isEnding: true,
      outcome: "You lived to 66 as a permanent outsider—neither Spanish nor indigenous, trusted by neither, helping both. You became a legendary figure: the Spanish woman who rejected conquest. After the fall of Tenochtitlan, you helped survivors navigate colonial bureaucracy, advocated for humane treatment, and preserved indigenous knowledge by recording it. You never remarried or had children, dedicating your life to helping individuals. Your autobiography, written in your final years, provided a unique perspective on conquest from someone who rejected participation. Historians prize it for its honesty and complexity. You chose to walk away from power, prestige, and wealth to maintain your humanity. That's a rare choice. You died poor but free."
    },

    back_down_cortes: {
      title: "Survival Through Submission",
      date: "October 1519 - March 1520 - Continued Service",
      text: "You back down and continue serving. The confrontation haunts you, but you survive. You translate Cortés's demands, his threats, his false promises.\n\nYou become efficient, professional, detached. It's the only way to endure. You stop seeing indigenous peoples as humans and start seeing them as problems to be managed.\n\nThis psychological defense mechanism keeps you sane but costs you your humanity.",
      isEnding: true,
      outcome: "You became Cortés's most reliable translator, serving throughout the conquest and into the early colonial period. You were rewarded with land and title, becoming Doña María de Santos. You lived to 64, wealthy and respected by Spanish society. But you were a hollowed-out person, going through motions of life without real feeling. Your marriage was loveless, your friendships shallow, your faith empty. You died of natural causes, your last words reportedly being 'I should have fought him.' Your legacy is complicated—you facilitated conquest efficiently, but everyone who knew you spoke of your sadness. You chose survival through submission and paid for it with your capacity for joy."
    },

    refuse_lies: {
      title: "The Honest Translator",
      date: "October-November 1519 - Standing Firm",
      text: "You refuse to continue translating lies. Cortés dismisses you from primary translator duties. You're kept with the expedition but marginalized.\n\nFrom the sidelines, you watch conquest unfold without being able to influence it. You see the Cholula massacre, the imprisonment of Moctezuma, the destruction of temples—all without your participation.\n\nYou're complicit by presence but not by action. Is that enough to clear your conscience?",
      choices: [
        {
          text: "Accept marginalization and focus on helping individuals quietly",
          next: "quiet_individual_help",
          stats: { humanity: 15, survival: 10 }
        },
        {
          text: "Leave the expedition entirely",
          next: "leave_entirely",
          stats: { humanity: 20, survival: 5 }
        }
      ]
    },

    ending_diplomat: {
      title: "The Bridge Builder",
      date: "1519-1547 - A Life of Service",
      text: "You continue your diplomatic work throughout and after the conquest. You broker peace agreements where possible, translate cultural exchanges, and work to build understanding between Spanish and indigenous peoples.\n\nAfter Tenochtitlan falls, you're instrumental in establishing the colonial administrative system. You advocate for laws protecting indigenous peoples, translate legal codes, and help establish schools.\n\nYou marry a Spanish official sympathetic to indigenous rights. Together you work within the system to make colonialism slightly less brutal.",
      isEnding: true,
      outcome: "You lived to 75, one of the longest-lived conquistador-era figures. You became 'La Diplomática,' a legendary mediator who helped shape early colonial Mexico. Your advocacy contributed to the New Laws of 1542, which provided some protections for indigenous peoples. You established schools that educated both Spanish and indigenous children together—revolutionary for the era. Your home became a gathering place for intellectuals discussing how to build a more just colonial society. At your funeral, both the Viceroy and indigenous community leaders spoke. You couldn't stop conquest, but you shaped what came after. You proved that working within unjust systems, while morally complicated, can still reduce harm. Your legacy is one of pragmatic compassion—never perfect, often compromised, but undeniably helpful to thousands of people."
    },

    warn_moctezuma: {
      title: "Breaking the Illusion",
      date: "November 1519 - The Warning",
      text: "You meet privately with Moctezuma and tell him the truth: 'Lord Moctezuma, Cortés is not Quetzalcoatl. He's a man seeking gold and glory. The Spanish have conquered and enslaved entire peoples in the islands. That's what they plan here.'\n\nMoctezuma is stunned. 'You betray your own people to tell me this?'\n\n'I betray conquest to serve truth.'\n\nMoctezuma immediately changes strategy. He orders the Spanish confined to their quarters. Tensions skyrocket. When Cortés learns you warned Moctezuma, he has you arrested for treason.",
      choices: [
        {
          text: "Accept imprisonment—you did what was right",
          next: "imprisoned_righteous",
          stats: { humanity: 30, survival: -15 }
        },
        {
          text: "Escape to Moctezuma's protection",
          next: "moctezuma_protection",
          stats: { humanity: 25, loyalty: -35, survival: -10 }
        }
      ]
    },

    trial_defense: {
      title: "The Trial",
      date: "September 1519 - Military Justice",
      text: "You stand trial before Cortés and his officers. You defend your actions eloquently:\n\n'Gentlemen, I stand accused of treason. But treason against what? Against a mission of conquest built on lies? Against the systematic destruction of peoples and cultures? If that's treason, then I'm proud to be a traitor to tyranny.'\n\nSome soldiers are moved by your words. Others call for your execution. Cortés must decide.",
      choices: [
        {
          text: "Continue your defense—appeal to their conscience",
          next: "appeal_conscience",
          stats: { humanity: 25 }
        },
        {
          text: "Accept whatever judgment comes",
          next: "accept_judgment",
          stats: { humanity: 20, survival: -5 }
        }
      ]
    },

    escape_to_natives: {
      title: "Fleeing to Freedom",
      date: "September 1519 - The Escape",
      text: "You escape during the night and flee to a nearby Totonac village. They're suspicious at first—you're Spanish—but your warnings of Spanish tactics earn their trust.\n\nYou live with them for months, learning their culture, teaching them Spanish tactics, helping them prepare for conquest. You've fully abandoned your Spanish identity.\n\nWhen Cortés's army approaches, the Totonacs are ready. They negotiate from strength rather than fear. Some even form genuine alliances with Spanish, but on more equal terms than would have been possible otherwise.",
      isEnding: true,
      outcome: "You lived among the Totonacs for thirty years, eventually marrying a Totonac noble and having four children. You became a cultural bridge, teaching Spanish language and customs while learning and preserving Totonac culture. Your children were among the first true mestizos, comfortable in both worlds. You helped your adopted people navigate colonial rule more effectively than many communities. You died at 62, bilingual and bicultural. At your funeral, your children performed both Christian and Totonac death rites. You were buried in a hybrid ceremony that symbolized your life—belonging fully to neither culture but creating a new synthesis. You proved that conquest didn't have to mean cultural annihilation. Your legacy is thousands of descendants who carry both heritages with pride."
    },

    reduced_role: {
      title: "Diminished but Present",
      date: "June-December 1519 - Reduced Influence",
      text: "You accept your reduced role, translating under supervision. Your influence is diminished, your ability to help limited. You watch conquest proceed with increasing brutality.\n\nThe frustration is immense. You see opportunities to prevent violence that you cannot act on because you're monitored. You translate words that lead to deaths you might have prevented.\n\nYou've preserved your life but lost your purpose.",
      isEnding: true,
      outcome: "You continued in your reduced role through the conquest and into colonial period. You lived to 59, dying of illness. Your life was comfortable but unfulfilling. You were never quite trusted by Spanish, never quite able to help indigenous peoples. You existed in a liminal space, belonging nowhere, helping no one significantly. Your obituary called you 'a translator of some skill.' That's all. You survived but never thrived. You avoided the worst fates but also missed opportunities for meaning. Sometimes the middle path is just mediocrity. You chose survival over impact, and your life reflected that choice—long but unremarkable, safe but unmemorable."
    },

    continue_secretly: {
      title: "The Secret Resister",
      date: "July-December 1519 - Underground Work",
      text: "With reduced scrutiny, you actually have more freedom to help secretly. You pass warnings, provide supplies, offer advice—all underground. Your apparent demotion is actually liberating.\n\nYou help more people from your diminished position than you could have from your prominent one. No one watches you closely anymore. You're underestimated, which makes you more effective.\n\nYou've learned that sometimes the best way to fight power is from the shadows.",
      isEnding: true,
      outcome: "You operated as an underground resistance figure for eighteen years, helping indigenous communities navigate Spanish rule while appearing to be a minor colonial functionary. You died at 60, and only after your death did your secret journals reveal the extent of your activities. You'd helped hundreds of individuals, passed crucial information to resistance leaders, and even sabotaged some particularly brutal encomienda operations. Your funeral was small and Spanish officials spoke of you as a 'quiet, pious woman.' Indigenous communities quietly honored you with ceremonies Spanish never knew about. You proved that visible resistance isn't the only kind that matters. Sometimes the most effective rebels are those no one suspects. You chose the long game of quiet resistance over dramatic gestures, and saved more lives because of it."
    },

    faithful_translation: {
      title: "Playing it Safe",
      date: "September-December 1519 - Faithful Service",
      text: "You translate faithfully, taking no risks. Cortés is pleased with your improved accuracy. You've become the efficient tool he always wanted.\n\nThe translation sessions with Moctezuma go smoothly. You convey threats accurately, promises faithfully, demands clearly. You're professional, detached, effective.\n\nYou've survived by becoming exactly what Cortés needed. But you barely recognize yourself anymore.",
      isEnding: true,
      outcome: "You served as faithful translator through the conquest and for twenty years after. You became wealthy, respected, and empty. You married but your husband said you were 'absent even when present.' You had no children. You died at 54 of natural causes, leaving a fortune that went to the Church. Your legacy is that of an efficient translator who enabled conquest through professional competence. History barely remembers you. Your name appears in footnotes as 'one of Cortés's translators.' That's all. You survived by becoming a tool, and tools aren't remembered as people. You traded your humanity for security and found that security without humanity is just a different kind of death."
    },

    subtle_deceptions: {
      title: "The Careful Deceiver",
      date: "September 1519 - January 1520 - Walking the Line",
      text: "You continue subtle deceptions carefully. Each word chosen strategically. Each translation slightly softer than the original. Threats become 'requests,' demands become 'proposals.'\n\nIt works—mostly. Moctezuma and Cortés reach agreements that might not have been possible with harsher translations. Some violence is avoided.\n\nBut you're caught again. Pedro de Alvarado, who's learned Nahuatl, notices another discrepancy. This time, there's no talking your way out. You're arrested and imprisoned.",
      choices: [
        {
          text: "Accept imprisonment as the price of your deceptions",
          next: "imprisoned_peace",
          stats: { humanity: 20, survival: -10 }
        },
        {
          text: "Beg forgiveness and promise faithful translation",
          next: "promise_faithful",
          stats: { survival: 15, humanity: -15 }
        }
      ]
    },

    surrender_save_villages: {
      title: "The Sacrifice",
      date: "September 1519 - Surrendering for Others",
      text: "You surrender to Spanish authorities to save the Maya villages harboring you. Cortés imprisons you but honors his word—the villages are spared.\n\nYou spend months in chains. Other prisoners come and go. You endure interrogation, threats, isolation. But you have the satisfaction of knowing villages survived because of your surrender.\n\nEventually, Cortés offers you a deal: translate for the remainder of the expedition, under guard, and you'll live. Refuse, and you'll be executed.",
      choices: [
        {
          text: "Accept the deal and translate under guard",
          next: "guarded_translator",
          stats: { survival: 15, humanity: 5 }
        },
        {
          text: "Refuse and accept execution",
          next: "execution_principle",
          stats: { humanity: 30, survival: -100 }
        }
      ]
    },

    flee_interior: {
      title: "Into the Unknown",
      date: "September 1519 - February 1521 - Deep Interior",
      text: "You flee deep into the interior with Maya guides, far beyond where Spanish can reach. You live in remote villages, teaching Spanish language and tactics, helping prepare resistance.\n\nYou become something of a legend: the Spanish woman who joined indigenous peoples. Communities shelter you as you move from place to place, always ahead of Spanish expansion.\n\nYou never see Europe again. You never see Spanish civilization again. You've chosen complete exile from your birth culture.",
      isEnding: true,
      outcome: "You lived to 71, dying in a remote Maya village that remained independent until 1697. You had five children with a Maya husband, learned three indigenous languages fluently, and became a respected elder. Your Spanish identity faded until you could barely remember Seville. Your descendants became important leaders in Maya resistance to Spanish colonization. Your story became legend—the woman who walked away from conquest. In 1847, during the Caste War, Maya rebels invoked your name as the 'foreign woman who stood with us.' You chose complete cultural transformation, and it worked. You found belonging, purpose, and peace by leaving everything behind and embracing a radically different life. Your grave, marked with both Christian cross and Maya symbols, stands in what is now Chiapas."
    },

    organize_resistance: {
      title: "The Resistance Leader",
      date: "October 1519 - May 1521 - Armed Struggle",
      text: "You help organize armed resistance. Your knowledge of Spanish tactics makes you invaluable. You teach Maya warriors about Spanish weapons, formations, supply lines, weaknesses.\n\nSeveral Spanish expeditions are ambushed and defeated using tactics you taught. Cortés puts a price on your head: 500 gold pesos for you alive, 300 for proof of your death.\n\nYou become one of the most wanted people in New Spain. But you're also one of the most effective resistance leaders. Your campaign slows Spanish conquest in your region by years.",
      isEnding: true,
      outcome: "You were killed in battle at age 38, leading a Maya force against a Spanish column. You died fighting, sword in hand, shouting commands in Nahuatl. Cortés had your body displayed as a warning to other potential rebels, but it backfired—you became a martyr. Indigenous resistance movements invoked your name for centuries. Songs were written about 'La Rebelde,' the Spanish woman who fought for indigenous freedom. Your death delayed Spanish conquest of your region by five years, saving countless lives. You chose violence to resist violence, and history debates whether you were terrorist or freedom fighter. To Spanish chronicles, you were a traitor. To indigenous chronicles, you were a hero. You proved that some people can't watch injustice without fighting it, even unto death."
    },

    find_allies: {
      title: "Finding Shelter",
      date: "August 1519 - March 1520 - Among Friends",
      text: "You find shelter with Totonac communities who remember your earlier warnings and help. They protect you from Spanish search parties, moving you from village to village.\n\nYou teach them Spanish language and tactics. You help them negotiate better terms with other conquistadors. You become a valuable advisor to multiple communities.",
      isEnding: true,
      outcome: "You lived among the Totonacs for thirty-eight years, dying at 64. You married a Totonac noble, had five children, and became a revered elder. Your linguistic skills and cultural knowledge helped your adopted people navigate colonialism more successfully than many communities. Your descendants became important leaders, using their bicultural heritage to advocate for indigenous rights. You never returned to Spanish society, never reconciled with your birth culture, but found belonging and purpose in your adopted one. Your grave in a Totonac village is still tended by descendants. You proved that cultural transformation is possible, that belonging can be chosen not just inherited, and that sometimes the best way to fight injustice is to build alternative communities outside unjust systems."
    },

    wilderness_alone: {
      title: "Solitary Survival",
      date: "August 1519 - March 1540 - Alone",
      text: "You live alone in the wilderness for twenty-one years, avoiding all human contact. You survive by hunting, foraging, and moving constantly.\n\nYou see neither Spanish nor indigenous peoples. You speak to no one. Your linguistic gifts atrophy from disuse. You become more animal than human.\n\nYou die alone at 58, your body not found for months.",
      isEnding: true,
      outcome: "Your skeletal remains were discovered in 1541 by hunters. You were identified by a locket you wore bearing your mother's name. You'd lived in complete isolation for over two decades. Psychologists studying your sparse writings (found in your shelter) note signs of severe trauma and mental deterioration. You escaped conquest but couldn't escape yourself. Your exile was self-imposed but no less complete. You're a footnote in history: 'one of Cortés's translators who deserted and died in the wilderness.' No one knows why you chose total isolation. Perhaps the moral weight of what you'd witnessed was too much. Perhaps you couldn't bear human society after seeing its worst. You survived longest of almost anyone from the expedition, but you survived alone, and in the end, that's its own form of death."
    },

    ending_complete_chronicle: {
      title: "The Complete Record",
      date: "1519-1527 - Eight Years of Documentation",
      text: "You chronicle everything for eight years: the conquest, the fall of Tenochtitlan, the establishment of New Spain, the encomienda system, the destruction and preservation of indigenous culture.\n\nYour chronicle becomes the most comprehensive account of the conquest from someone who understood both cultures and spoke both languages.\n\nYou die at 45 of fever, but your chronicle survives. Copies were made, smuggled to Spain, published posthumously.",
      isEnding: true,
      outcome: "Your chronicle revolutionized historical understanding of the conquest. Published in 1530, three years after your death, it provided details no Spanish chronicler knew and indigenous perspectives no Spanish source preserved. It influenced the 'Black Legend' of Spanish colonialism and provided ammunition for reform movements. Bartolomé de las Casas cited your work extensively. The 'Catalina Chronicle,' as it became known, is still primary source material for conquest studies. Universities teach courses based on your work. You died young, poor, and alone—but your words lived forever. You proved that accurate historical documentation can be more powerful than any sword. Five hundred years later, historians still quote you. That's immortality of a sort worth having."
    },

    send_chronicle_spain: {
      title: "Preserving History",
      date: "1519-1545 - Careful Documentation",
      text: "You chronicle everything and regularly send copies to trusted contacts in Spain. Multiple versions survive in different archives. Even if one is destroyed, others remain.\n\nYour caution pays off. When colonial authorities try to suppress your work after your death, they discover it's already widely distributed in Spain. The truth is out.\n\nYou live to 63, dying peacefully knowing your chronicle is secure.",
      isEnding: true,
      outcome: "Your distributed chronicle strategy worked brilliantly. Copies survived in monastery archives, private collections, and university libraries across Spain. Your work became foundational for conquest studies. You're regarded as one of the most important chroniclers of the era, ranked alongside Bernal Díaz del Castillo and Sahagún. Your strategic approach to preservation—sending multiple copies to multiple locations—became a model for later historians working under censorship. You proved that information wants to be free, and that determined chroniclers can outwit even powerful censors. Your funeral was modest, but your intellectual legacy is immense. You chose truth-telling as your life's work and executed it brilliantly. That's a life well lived."
    },

    maintain_deception: {
      title: "The Long Deception",
      date: "1519-1547 - Decades of Dual Life",
      text: "You maintain the deception for twenty-eight years, carefully managing two versions of history. It's exhausting, but you persist. Your true chronicle grows to thousands of pages. Your public chronicle remains acceptable to Spanish authorities.\n\nYou die at 65, never having revealed your secret. Your hidden chronicle is discovered weeks after your death.",
      isEnding: true,
      outcome: "Your hidden chronicle's discovery shocked Spanish colonial society. The contrast between your public and private writings revealed the extent of your deception—and the extent of conquest's brutality. Your private chronicle was published in 1550 and caused an international scandal. It influenced reforms, inspired reformers, and provided ammunition for critics of Spanish colonialism. Your dual life became a case study in resistance through deception. Some called you duplicitous; others called you a strategic genius who preserved truth while appearing to support power. Your legacy is complicated—you enabled conquest through your public work while documenting its crimes in private. You proved that sometimes the best resistance is the one authorities never see coming. Your chronicle is now considered essential reading for understanding conquest."
    },

    admit_full_truth: {
      title: "The Confession",
      date: "March 1520 - Revealing All",
      text: "You admit the full truth about your chronicle to Cortés. 'I've been documenting everything honestly—the massacres, the betrayals, the cultural destruction. Future generations deserve to know what really happened here.'\n\nCortés is furious but also oddly impressed. 'You've been deceiving me for months? That takes courage. Foolish courage, but courage nonetheless.'\n\nYour chronicle is confiscated. You're imprisoned, though not executed.",
      isEnding: true,
      outcome: "Your chronicle was confiscated and supposedly burned, but copies survived—you'd been smart enough to send portions to allies. Those fragments were compiled and published in 1542. Though incomplete, they provided crucial evidence about conquest. You were imprisoned for five years, released in 1525, and lived quietly until your death at 52. Your partial chronicle influenced the New Laws and debates about colonial policy. Your confession ended your ability to document further but ensured that what you'd already documented survived. You chose truth-telling over continued deception and paid a moderate price—neither martyrdom nor comfortable complicity, but something in between. Your incomplete chronicle became famous precisely because it was incomplete—people wondered what the full version would have revealed."
    },

    hide_continue: {
      title: "The Persistent Chronicler",
      date: "April-December 1521 - Careful Recording",
      text: "You hide your chronicle more carefully, writing at night, using codes, distributing pages among trusted allies. Your documentation continues through the fall of Tenochtitlan and into the early colonial period.\n\nYour chronicle becomes a comprehensive history of conquest and its immediate aftermath, documenting not just violence but also resistance, survival, and adaptation.",
      isEnding: true,
      outcome: "Your chronicle survived intact and was published in 1556, nine years after your death at 75. It became one of the foundational texts for understanding the conquest. Your detailed documentation of both Spanish tactics and indigenous agency provided balanced perspective rare for the era. Modern historians call it indispensable. You lived long enough to see the worst of conquest pass into the brutal stability of colonialism. Your final entries, written in your seventies, reflect on what was lost and what survived. You documented an empire's death and a new world's birth with unflinching honesty. That's a rare gift to history. Your name appears in every serious bibliography of conquest studies. Your words will be read as long as people study this period."
    },

    smuggle_spain: {
      title: "Smuggling Truth",
      date: "March-May 1520 - Dangerous Delivery",
      text: "You arrange to smuggle your chronicle to Spain via a sympathetic ship captain. The pages are hidden in trade goods. The risk is enormous—if discovered, you'll be executed.\n\nThe ship sails. You wait anxiously for months, not knowing if your chronicle survived the journey or was discovered and destroyed.\n\nTen months later, you receive secret word: your chronicle reached Spain safely. Copies are being made. The truth is out.",
      isEnding: true,
      outcome: "Your smuggled chronicle reached Spain and was published in 1523, causing an immediate sensation. It provided the first detailed account of conquest from someone who'd witnessed it firsthand and questioned its morality. You became a wanted woman—Spanish colonial authorities sought your arrest, but you went into hiding among indigenous communities. You lived to 57, dying in a remote village that protected you. Your chronicle influenced the Valladolid debate, the New Laws, and early human rights discourse. Bartolomé de las Casas called your work 'the conscience of the conquest.' You paid for your truth-telling with permanent exile and hiding, but your words changed policy and saved lives. That's a trade you made consciously and never regretted."
    },

    ending_aztec_ally: {
      title: "The Spanish Traitor",
      date: "1520-1524 - Fighting for the Aztecs",
      text: "You fully commit to the Aztec resistance. You fight in the battles for Tenochtitlan, helping coordinate defense, translating captured Spanish documents, providing intelligence.\n\nWhen the city falls, you flee with surviving Aztec nobles. You continue resistance in the countryside for four more years.\n\nYou're finally captured in 1524, brought before Cortés in chains.",
      isEnding: true,
      outcome: "Cortés offered you a pardon if you'd publicly renounce the Aztecs and translate for him again. You refused. 'I'd rather die true to my conscience than live false to it.' You were executed at 30. But your story became legend. Indigenous resistance movements invoked you for centuries as proof that even conquistadors could recognize the injustice of conquest. Spanish authorities tried to suppress your story, calling you a madwoman, but too many had witnessed your courage. Indigenous oral traditions preserved your name and story. In the 19th century, Mexican nationalists revived your memory as a symbol of resistance to colonialism. Today, you're considered a folk hero in Mexico, with streets and schools named after you. You chose absolute resistance and paid the ultimate price, but your example inspired generations. Sometimes martyrdom matters more than survival."
    },

    warn_innocent: {
      title: "Selective Mercy",
      date: "January 1520 - Choosing Sides",
      text: "You warn Diego, Olmedo, and other Spanish who showed kindness to leave Tenochtitlan. About thirty escape based on your warning.\n\nThe uprising proceeds. Spanish suffer heavy casualties but your friends survive. However, your selective warnings compromise the uprising—enough Spanish escape to warn Cortés, who counterattacks more quickly.\n\nThe uprising fails faster because of your warnings. But you saved innocent lives.",
      isEnding: true,
      outcome: "You were killed in the fighting during Tenochtitlan's fall at age 26. Diego and Olmedo both survived and wrote about you. Diego's memoir describes you as 'the most conflicted soul I ever knew—wanting to save everyone, ending up unable to fully help anyone.' Father Olmedo was more charitable: 'She tried to honor both justice and mercy, an impossible task in times of war.' Your selective mercy saved specific lives while compromising a resistance movement. History debates whether you were weak or compassionate, traitor or humanitarian. The people you saved remembered you with love. The resistance you weakened saw you as a betrayer. You tried to thread an impossible needle and paid with your life. But the thirty people you saved lived full lives and had hundreds of descendants who owe their existence to your impossible choice."
    },

    warn_friend_proceed: {
      title: "Friendship and Duty",
      date: "January 1520 - The Warning",
      text: "You tell Diego: 'An uprising is planned. Get out of Tenochtitlan. Take Father Olmedo and anyone else who's been kind. Go tonight.'\n\nDiego is torn. 'María, if I warn others, the conspiracy will be exposed. Everyone will die—Aztec and Spanish.'\n\n'Then save only yourself. Please.'\n\nHe leaves that night with Olmedo and a few others. The next day, the uprising begins. Thousands die—both Aztec and Spanish. But your friends survive.",
      isEnding: true,
      outcome: "The Aztec uprising failed, crushed brutally. But you saved Diego, Olmedo, and seventeen others by warning them. You were captured and executed by Spanish after the uprising's failure. Diego visited your body before burial and wept. He spent the rest of his life arguing for better treatment of indigenous peoples, directly inspired by your sacrifice. Father Olmedo wrote about you in his chronicles, calling you 'a soul torn between two worlds, faithful to conscience above all.' Your warning saved specific lives while trying to serve a larger cause. You're remembered differently by different peoples: to Spanish, a traitor who enabled an uprising; to Aztecs, a sympathizer who compromised their revolution; to the few who knew the full story, someone who tried to balance impossible loyalties. You died young at 26, but the people you saved lived to spread your story."
    },

    proceed_no_warning: {
      title: "The Cold Calculus",
      date: "January 1520 - The Uprising",
      text: "You don't warn Diego. The uprising proceeds as planned. Spanish are caught completely by surprise. Hundreds are killed in the first hours.\n\nYou watch Diego die, cut down by Aztec warriors. Father Olmedo falls trying to save wounded. The slaughter is comprehensive.\n\nYou helped plan this. These deaths are on your hands—even if they're deaths of invaders, they're also deaths of people you knew, some you even liked.\n\nThe uprising ultimately fails. Cortés regroups and retakes the city with even greater brutality. Your betrayal achieved nothing but more death.",
      isEnding: true,
      outcome: "You died at 25, killed by Spanish when they retook Tenochtitlan. Your betrayal is remembered in Spanish chronicles as ultimate treachery. But you're also remembered by indigenous peoples as someone who stood with them against conquest. The uprising you helped plan, while it failed, became legendary—one of the few moments indigenous peoples fought back against Spanish conquest with inside information. Historical debate continues: did your actions help or harm indigenous resistance? The uprising's failure led to harsher Spanish reprisals, but it also inspired later resistance. You chose absolute loyalty to indigenous peoples over all other considerations, including individual friendships. That purity of commitment is admirable in theory, terrible in practice. You died with blood on your hands from all sides."
    },

    abort_uprising: {
      title: "Calling It Off",
      date: "January 1520 - The Abort",
      text: "You convince Aztec leaders to call off the uprising. 'Too many innocents will die—on both sides. Let me try diplomacy first.'\n\nThey reluctantly agree. You approach Cortés with a proposal: Spanish withdrawal in exchange for gold and guarantees of safe passage.\n\nCortés is suspicious but intrigued. Negotiations begin. The uprising never happens. Some violence is avoided.\n\nBut Spanish don't actually leave. They negotiate in bad faith, buying time to consolidate power. Your diplomatic effort is exploited.",
      isEnding: true,
      outcome: "Your aborted uprising and failed diplomacy left you marginalized by both sides. Aztecs saw you as weak; Spanish as untrustworthy. You lived in Tenochtitlan through its fall, witnessing conquest from the sidelines. You survived to 51, working as a minor translator and teacher. Your life was quiet, unremarkable, tinged with regret. You often wondered: what if you'd let the uprising proceed? Could it have succeeded? Did your caution doom more people than it saved? On your deathbed, you told a priest: 'I tried to prevent violence and only delayed it. Sometimes delay is just cowardice dressed as prudence.' Your gravestone bears only your name and dates. You wanted to be remembered for peacemaking but are hardly remembered at all. Sometimes the middle path leads nowhere important."
    },

    defend_chronicle: {
      title: "Defending History",
      date: "December 1519 - The Defense",
      text: "You defend your chronicle. 'History requires honest recording, Captain. Future generations will judge us. Better they judge us based on truth than lies.'\n\nCortés is unmoved. 'Future generations will read what we tell them to read. Your chronicle is dangerous. It will be destroyed.'\n\n'Then you're afraid of the truth.'\n\n'I'm afraid of nothing. But I won't let a misguided woman's scribbling undermine our great enterprise.'\n\nYour journal is burned. Months of careful documentation gone. You're devastated but not broken. You can start again—if you dare.",
      choices: [
        {
          text: "Start recording again in secret",
          next: "record_again",
          stats: { humanity: 25, survival: -10 }
        },
        {
          text: "Give up chronicling and focus on direct help",
          next: "direct_help",
          stats: { humanity: 15, survival: 5 }
        }
      ]
    },

    destroy_journal: {
      title: "Burning History",
      date: "December 1519 - The Destruction",
      text: "You burn your journal yourself, crying as months of work turns to ash. Cortés watches approvingly.\n\n'Good,' he says. 'You're learning that some truths are better forgotten.'\n\nBut you've memorized much of what you wrote. The facts remain in your mind, even if not on paper. You could rebuild the chronicle from memory—or you could let it die.\n\nWithout the physical record, you feel unmoored. The journal was your anchor, your purpose. Now what?",
      isEnding: true,
      outcome: "You destroyed your journal and never recorded another. You lived to 57, working as a translator but never documenting what you saw. On your deathbed, you tried to dictate your memories to a priest, but dementia had already claimed many details. Some fragments of your oral history survived, but the comprehensive chronicle was lost forever. Historians mourn what could have been—the definitive firsthand account of conquest, burned because you chose survival over historical truth. You lived longer than many, but your silence let conquerors control the narrative. Sometimes survival isn't enough. Sometimes bearing witness matters more than living. You chose differently and history is poorer for it."
    },

    claim_fiction: {
      title: "The Novelist's Defense",
      date: "December 1519 - Strategic Lie",
      text: "You claim your journal is fiction, stories you're writing for entertainment. Cortés is skeptical but accepts this explanation.\n\n'Writers and their fantasies,' he mutters, returning the journal. 'Just keep them to yourself.'\n\nYou continue recording under the guise of fiction. When you describe massacres, you call them 'dramatic scenes.' When you document broken treaties, they're 'plot twists.' The chronicle survives as fiction.\n\nBut the lie gnaws at you. Is fiction that tells truth more valuable than destroyed fact? Or have you diminished the real suffering by calling it story?",
      isEnding: true,
      outcome: "Your 'fictional' chronicle survived and was published in 1535 as 'Tales from the New World.' For decades, it was read as adventure fiction. Only in the 1650s did scholars realize it was thinly veiled fact. Your 'novel' became crucial historical evidence. You lived to 69, never admitting in life that your fiction was truth. After your death, your personal papers revealed the truth. Historians debate whether your strategic fiction preserved important truth or diluted historical urgency by framing atrocities as entertainment. You found a third way—not pure truth, not total silence, but truth disguised as fiction. It was clever, morally ambiguous, and ultimately preserved knowledge that might otherwise have been lost. You proved that sometimes the best way to tell dangerous truths is to pretend they're lies."
    },

    stop_warnings: {
      title: "Retreat to Safety",
      date: "September-November 1519 - Silence",
      text: "You stop warning indigenous peoples. The change in your behavior is noted. Suspicion against you decreases. You survive.\n\nBut you watch communities walk into Spanish traps you could have prevented. You translate false promises knowing they're false. You see the results of your silence.\n\nThe moral weight is crushing. You've chosen survival, but at what cost to your soul?",
      isEnding: true,
      outcome: "You survived the conquest and lived to 61. You became a wealthy translator, respected by Spanish authorities. You married a Spanish officer and had three children. But guilt consumed you. You drank heavily, suffered nightmares, and in your final years developed a reputation for unstable behavior. On your deathbed, you confessed to a priest: 'I could have warned them. I could have saved so many. I chose my life over theirs.' The priest absolved you, but you never absolved yourself. Your children inherited your wealth but also your trauma—your eldest son became a monk dedicated to indigenous peoples, trying to atone for your choices. You proved that survival without integrity is its own form of death."
    },

    continue_warnings: {
      title: "The Persistent Voice",
      date: "September-December 1519 - Continuing Despite Danger",
      text: "You continue warning indigenous peoples despite the mounting danger. Your warnings save several communities from surprise attacks. They also make Spanish conquest harder, bloodier.\n\nPedro de Alvarado finally catches you passing information to a Tlaxcalan messenger. You're arrested immediately.\n\nAt your trial, Cortés himself presides. 'María Catalina de Santos, you are charged with treason against Spain and against God. How do you plead?'\n\n'Guilty of trying to prevent genocide,' you respond. 'Not guilty of treason to humanity.'",
      choices: [
        {
          text: "Accept execution with dignity",
          next: "execution_dignity",
          stats: { humanity: 30, survival: -100 }
        },
        {
          text: "Beg for mercy and offer to serve loyally",
          next: "beg_mercy",
          stats: { survival: 15, humanity: -20 }
        }
      ]
    },

    execution_dignity: {
      title: "Facing Death Proudly",
      date: "December 1519 - The Execution",
      text: "You face execution with head held high. When offered a chance to recant and beg mercy, you refuse.\n\n'I warned people who deserved warning. I resisted invasion that deserved resistance. I'm guilty of everything you accuse me of and proud of it. Do what you must.'\n\nYour execution is public, meant as a warning. Instead, it inspires some Spanish to question their mission and emboldens indigenous resistance.",
      isEnding: true,
      outcome: "You died at 25, executed as a traitor. Your defiant death became legend in both Spanish and indigenous accounts. Spanish authorities tried to suppress your story, calling you a madwoman, but too many had witnessed your courage. Indigenous oral traditions preserved your name and story. In the 19th century, Mexican nationalists adopted you as a symbol of resistance to imperialism. Today, you're commemorated with monuments, street names, and annual remembrances. Your execution date is observed by some as 'Day of Conscience.' You died very young, but your death meant something. You refused to beg, refused to compromise, and refused to pretend conquest was anything other than what it was. That moral clarity, even unto death, inspired generations. You proved that sometimes how you die matters as much as how you live."
    },

    beg_mercy: {
      title: "The Plea for Life",
      date: "December 1519 - Begging Forgiveness",
      text: "You beg for mercy, promising to serve loyally and faithfully if spared. Cortés, seeing your genuine terror, grants clemency.\n\n'You'll live. But you'll translate in chains until you've proven yourself trustworthy again. Perhaps never.'\n\nYou've bought life at the cost of dignity and any remaining influence.",
      isEnding: true,
      outcome: "You lived in chains for three years, translating under guard. Eventually released in 1523, you continued as a minor translator until your death at 48. You lived in shame, knowing you'd begged when you should have stood firm. You drank heavily and suffered depression. On your deathbed, you told a priest: 'I chose life but lost the reason to live.' Your story became a cautionary tale about the cost of cowardice. Some pitied you, others scorned you, but no one respected you. You died unmourned except by family. Your gravestone bears only your name and dates—no epitaph, because no one could think of anything positive to say. You proved that survival at any cost can cost everything that makes survival worthwhile."
    },

    guarded_translator: {
      title: "Under Guard",
      date: "September 1519 - August 1521 - Guarded Service",
      text: "You translate under guard for two years, until Tenochtitlan falls. You're watched constantly, your every word monitored. You have no freedom to help anyone.\n\nYou're a living tool, nothing more. The psychological toll is immense. You translate words that lead to deaths, policies that enslave peoples, orders that destroy cultures—all while unable to resist.\n\nWhen the conquest ends, you're released. You're free but broken.",
      isEnding: true,
      outcome: "You lived to 48, dying young from what would now be called post-traumatic stress disorder. You drank heavily, suffered nightmares, and isolated yourself from others. Your final years were spent in solitude in a small house in Veracruz. You left no children, no legacy, no chronicle. The only record of your existence is your name on a payroll document: 'María de Santos, translator, 6 pesos monthly.' You survived physically but died spiritually during those years in chains. Your story is a warning about the cost of survival when survival requires complete abandonment of principles. Sometimes living is harder than dying."
    },

    execution_principle: {
      title: "Dying Free",
      date: "September 1519 - The Execution",
      text: "You refuse Cortés's offer. 'I will not help you destroy these peoples. Kill me.'\n\nCortés seems almost respectful. 'You're a fool, María. A courageous fool, but a fool nonetheless.'\n\n'Better a fool with a conscience than a success without one.'\n\nYou're executed the next morning. Your last words are in Nahuatl: 'Resist them. Unite. Don't trust Spanish promises.'",
      isEnding: true,
      outcome: "You died at 25, executed as a traitor. But your last words were recorded by an Aztec witness and preserved in indigenous oral traditions. They became a rallying cry for resistance movements. Spanish authorities tried to suppress your story, but it survived. After Mexican independence, you were rehabilitated as a national hero—a Spanish person who chose indigenous peoples over imperial conquest. Streets, schools, and squares bear your name. Your execution site is marked with a monument. You chose death over complicity and your death inspired generations. You lived briefly but died magnificently, standing for principles bigger than yourself. That's a life of profound meaning compressed into few years."
    },

    imprisoned_righteous: {
      title: "Righteous Prisoner",
      date: "November 1519 - June 1520 - Imprisonment",
      text: "You accept imprisonment with dignity. You warned Moctezuma because it was right, and you'd do it again. From your cell, you watch Tenochtitlan descend into tension and violence.\n\nWhen the Aztec uprising occurs, Spanish blame you for their vulnerability. 'Your warning caused this!' they shout.\n\nPerhaps. Or perhaps your warning just leveled the playing field slightly. Either way, you don't regret it.",
      isEnding: true,
      outcome: "You were executed in June 1520 during the chaos of Spanish evacuation from Tenochtitlan. You were 26. Your warning to Moctezuma became legendary—Spanish chronicles vilified you as a traitor, but indigenous accounts honored you as one of the few Spanish who told them the truth. Your execution site in Tenochtitlan became a memorial after Mexican independence. You're now considered a proto-human rights activist, someone who believed all peoples deserved truth regardless of political allegiances. Your story is taught in Mexican schools as an example of moral courage. You chose truth over tribal loyalty and paid the ultimate price, but your example resonates across centuries. You died young but died standing for universal human dignity. That matters."
    },

    moctezuma_protection: {
      title: "Under Imperial Protection",
      date: "November 1519 - June 1520 - Aztec Court",
      text: "You escape to Moctezuma's protection. The Aztec emperor is intrigued by you—a Spanish person who chose his side. You become a member of his court, advising on Spanish tactics and culture.\n\nYou live in unprecedented luxury while watching two empires clash. You're training Aztec warriors in Spanish warfare when the uprising begins.\n\nDuring the fighting, you must choose: actively fight Spanish, or just provide information and remain non-combatant?",
      choices: [
        {
          text: "Take up arms and fight Spanish forces",
          next: "fight_spanish",
          stats: { humanity: 20, loyalty: -40, survival: -20 }
        },
        {
          text: "Remain advisor only—no direct combat",
          next: "advisor_only",
          stats: { humanity: 15, loyalty: -25, survival: 10 }
        }
      ]
    },

    fight_spanish: {
      title: "Taking Up Arms",
      date: "June-July 1520 - In Combat",
      text: "You take up an obsidian-bladed weapon and fight alongside Aztec warriors during the uprising. You're not skilled at combat, but you fight with fury born of guilt and determination.\n\nYou kill two Spanish soldiers—men you don't recognize. The act haunts you immediately. These are your countrymen, even if you oppose their cause.\n\nDuring Spanish evacuation, you're wounded but survive. Aztec healers treat you. You've fully committed to armed resistance.",
      isEnding: true,
      outcome: "You died in August 1521 during the final Spanish assault on Tenochtitlan. You were 27, killed by Spanish artillery. Your body was never identified by Spanish forces. Aztec chronicles record you as 'the Spanish woman who fought for us,' though they didn't record your name. Centuries later, historians pieced together your identity from Spanish records noting your disappearance and Aztec accounts of a Spanish woman warrior. You chose violence to resist violence. Historical debate continues about whether your choice was justified or whether you just added to the bloodshed. You proved that even conquistadors could question their side enough to switch allegiances completely. That's rare in any era. You died young, fighting for a cause that ultimately lost, but you died on your feet, weapon in hand, standing for what you believed. That counts for something."
    },

    advisor_only: {
      title: "The Strategic Mind",
      date: "June 1520 - August 1521 - Aztec Advisor",
      text: "You remain a strategic advisor, providing intelligence but not personally engaging in combat. You help plan defenses, train warriors, and coordinate resistance—but you don't personally kill Spanish.\n\nThis distinction matters to you, though you recognize its moral ambiguity. You're still fighting Spanish; you're just not pulling the trigger yourself.\n\nWhen Tenochtitlan falls, you're captured along with other advisors to Aztec leadership.",
      isEnding: true,
      outcome: "You were tried for treason and executed in September 1521 at age 27. Your defense at trial became famous: 'I advised people defending their homes. If that's treason against Spain, then Spain itself is the traitor to justice.' Cortés had your statement stricken from official records, but scribes copied it anyway. Your trial testimony survived and influenced later debates about just war and resistance to tyranny. You were posthumously pardoned by the Mexican government in 1921, 400 years after your execution. Your distinction between advising resistance and engaging in combat was philosophically interesting but legally meaningless to Spanish courts. You died for your choices, but your ideas about justified resistance to unjust invasion influenced political philosophy for centuries. Your words outlived your body by generations."
    },

    appeal_conscience: {
      title: "The Appeal",
      date: "September 1519 - Speaking Truth",
      text: "You continue your defense: 'I appeal to your consciences. Each of you came here for gold, glory, or God. But what have we actually done? We've destroyed peoples who welcomed us. We've stolen from those who shared with us. We've killed those who offered peace.\n\nIs this what you dreamed of when you signed on? Is this the legacy you want?'\n\nSilence fills the room. Some soldiers look uncomfortable. Others angry. Cortés himself seems thoughtful.",
      choices: [
        {
          text: "Wait for Cortés's judgment",
          next: "cortes_judgment",
          stats: { humanity: 20 }
        },
        {
          text: "Offer to leave expedition peacefully",
          next: "offer_peaceful_departure",
          stats: { humanity: 15, survival: 10 }
        }
      ]
    },

    accept_judgment: {
      title: "Accepting Fate",
      date: "September 1519 - The Verdict",
      text: "You accept whatever judgment comes. Cortés deliberates with his officers. Some argue for execution, others for mercy. The debate lasts hours.\n\nFinally, Cortés announces: 'You will be imprisoned until the conquest is complete. Your fate will be decided then. You're too valuable to execute now, too dangerous to free.'\n\nYou're imprisoned for the duration of the conquest, watching history unfold from a cell.",
      isEnding: true,
      outcome: "You spent eighteen months imprisoned, released only after Tenochtitlan fell. By then, the conquest was essentially complete. Cortés granted you freedom but prohibited you from leaving New Spain. You lived in Mexico City, working as a language teacher and translator for ecclesiastical courts. You died at 52 of natural causes. Your trial testimony survived and was published in 1548, ten years after your death. It became important evidence in debates about conquest morality. You accepted judgment and survived, but you also preserved your testimony for history. That testimony influenced legal and ethical debates for centuries. You chose acceptance over resistance and your acceptance became its own form of resistance—calm testimony about injustice that couldn't be dismissed as hysteria."
    },

    cortes_judgment: {
      title: "Cortés's Decision",
      date: "September 1519 - The Verdict",
      text: "Cortés deliberates with his officers. The room is tense. Finally, he speaks:\n\n'María de Santos, you've spoken boldly. Some call it treason; others might call it conscience. I'll call it impractical idealism. But you've also been valuable.\n\nYou'll remain with the expedition, but you'll translate only verified texts, under supervision. Your influence is ended, but your skills are still needed. This is mercy. Accept it.'\n\nYou've been neutered but spared.",
      isEnding: true,
      outcome: "You served in this diminished capacity through the conquest and into colonial administration. You lived to 56, never regaining full trust or influence. You translated legal documents, taught languages, and helped individuals where possible, but you never again shaped major events. Your trial speech survived and was published in 1537, ten years after your death. It influenced reform movements and debates about conquest morality. You lived a quiet life of reduced impact after your moment of bold truth-telling. But that moment mattered. Your speech was quoted by Las Casas, cited in the Valladolid debate, and referenced in early human rights discussions. You proved that one moment of courage can echo through history even if the rest of your life is ordinary. Your legacy is your words more than your deeds."
    },

    offer_peaceful_departure: {
      title: "Offering to Leave",
      date: "September 1519 - The Proposal",
      text: "You offer to leave peacefully. 'Let me return to Spain or settle in a coastal town. I'll neither help nor hinder the conquest. Just let me go in peace.'\n\nCortés considers this. It would solve his problem without making a martyr of you. After consultation with officers, he agrees.\n\n'You may leave. But if you ever interfere with Spanish interests in the New World, the penalty is death.'\n\nYou're escorted to Veracruz and put on the next ship to Spain.",
      isEnding: true,
      outcome: "You returned to Seville in 1520 and lived quietly for forty-seven years, dying at 85—extraordinarily old for the era. You married, had six children, and worked as a language teacher. You wrote a memoir in your seventies that was published after your death. It provided valuable historical perspective from someone who'd witnessed conquest's beginning but chose to walk away. Your memoir influenced the debates about colonialism but from the distance of decades and an ocean. You chose peace over conflict, distance over involvement. You died old and comfortable, having avoided the violence that consumed so many. But you also avoided the meaning that comes from sustained engagement with difficult issues. Your legacy is one of principled withdrawal—admirable to some, cowardly to others. You proved that walking away is an option, but whether it's the right option remains debated."
    },

    imprisoned_peace: {
      title: "Imprisoned for Peace",
      date: "January-June 1520 - Prison",
      text: "You accept imprisonment as the price of your deceptions. 'I lied to prevent violence. I'd do it again.'\n\nYour imprisonment becomes a cause célèbre among some Spanish soldiers who question conquest. Father Olmedo visits regularly, bringing food and spiritual comfort.\n\nWhen the Aztec uprising occurs, Spanish need translators desperately. They reluctantly release you, but you're no longer trusted with sensitive work.",
      isEnding: true,
      outcome: "You continued as a minor translator through the conquest and into the colonial period. You lived to 59, never regaining the trust you lost but never regretting your deceptions. You helped individuals where you could, translated legal documents fairly, and taught languages to both Spanish and indigenous students. At your funeral, students from both communities attended. One Nahuatl-speaking student said: 'She taught us that language can be a weapon for peace or war. She chose peace.' Your gravestone reads: 'She bent the truth to serve a higher truth.' That's an epitaph worth having. You chose strategic deception over strategic truth and your conscience was clear."
    },

    promise_faithful: {
      title: "The Broken Spirit",
      date: "January-August 1521 - Faithful Service",
      text: "You promise faithful translation and keep your promise. You translate exactly what's said, no more softening, no more mercy.\n\nIndigenous leaders hear the full brutality of Spanish demands. Many resist and are crushed. You translate orders for massacres, for enslavements, for cultural destruction.\n\nYou've become exactly what Cortés always wanted: a perfect tool. But you're dead inside.",
      isEnding: true,
      outcome: "You lived to 43, dying of alcoholism and despair. Your final years were spent in a haze, trying to forget what you'd helped enable. You translated faithfully for twenty-four years, enabling conquest and colonization with your linguistic skills. You were well-paid and respected by Spanish authorities. But you were a ghost—technically alive, but your soul died the day you promised faithful service knowing what faithful service meant. On your deathbed, you refused last rites, saying 'I don't deserve God's mercy.' Your grave is unmarked. Even your name was misspelled on the death registry. You chose survival through submission and found that some prices are too high even for survival."
    },

    return_spain_dissident: {
      title: "The Returned Dissident",
      date: "1520-1542 - Back in Spain",
      text: "You return to Spain with the dissident soldiers. In Seville, you write and speak about conquest's immorality. You ally with reform movements, support Bartolomé de las Casas, and advocate for New Laws protecting indigenous peoples.\n\nYour testimony as someone who was there carries weight. You influence the debates about colonial policy.",
      isEnding: true,
      outcome: "You spent twenty-two years in Spain as a prominent advocate for indigenous rights. Your testimony contributed to the New Laws of 1542, which provided legal protections for indigenous peoples in Spanish colonies. You never returned to the New World but your words shaped its governance. You died at 60, respected by reformers and hated by conquistador families who saw you as a traitor. Your writings influenced the Valladolid debate and early human rights discourse. You proved that witnessing atrocity and then speaking truth about it can shape policy for the better. Your advocacy didn't stop colonialism, but it made it less brutal than it might have been. That's significant. You chose your battles wisely and fought them effectively from a platform where your voice could be heard."
    },

    stay_advocate: {
      title: "The Indigenous Advocate",
      date: "1520-1556 - Lifetime of Advocacy",
      text: "You remain in New Spain, advocating for indigenous rights within the colonial system. You translate legal codes, help indigenous communities navigate Spanish law, and push for reforms.\n\nYou never have formal power, but you have influence. You help establish legal precedents protecting some indigenous rights, preserve cultural practices through documentation, and mediate disputes.",
      isEnding: true,
      outcome: "You lived to 74, one of the longest-lived figures from the conquest era. You became 'La Defensora'—the defender—known throughout New Spain as an advocate for indigenous peoples. You helped hundreds of communities negotiate better terms with Spanish authorities, preserved countless indigenous customs through careful documentation, and trained a generation of indigenous legal advocates. At your funeral, both the Archbishop and indigenous community leaders eulogized you. You were buried in Mexico City, and your grave became a pilgrimage site for indigenous peoples seeking justice. You proved that one person working within a flawed system can still make a real difference over a sustained lifetime of effort. You didn't destroy the colonial system, but you made it survivable for many who otherwise wouldn't have made it. That's a legacy of genuine compassion and effectiveness."
    },

    continue_sabotage: {
      title: "The Persistent Saboteur",
      date: "April-July 1520 - Sabotage Escalates",
      text: "You escalate your sabotage: poisoning supplies, releasing prisoners, misdirecting troops, destroying gunpowder stores. Each act is risky. Each risks discovery.\n\nPedro de Alvarado finally catches you red-handed, setting fire to a supply depot. There's no talking your way out this time. You're arrested for treason and sabotage.\n\nCortés is furious. 'You've cost us hundreds of men with your sabotage. You'll be executed as an example.'",
      choices: [
        {
          text: "Face execution with pride in your resistance",
          next: "proud_execution",
          stats: { humanity: 30, survival: -100 }
        },
        {
          text: "Try one last escape attempt",
          next: "final_escape_attempt",
          stats: { humanity: 20, survival: -50 }
        }
      ]
    },

    escape_before_caught: {
      title: "The Timely Escape",
      date: "July 1520 - Fleeing Before Capture",
      text: "You sense Alvarado is closing in. Before he can act, you flee Tenochtitlan during the chaos of the 'Noche Triste,' when Spanish are expelled from the city.\n\nYou disappear into the confusion, eventually finding shelter with Tlaxcalan communities who remember your earlier help. You live among them as Spanish regroup for their final assault.",
      isEnding: true,
      outcome: "You lived among the Tlaxcalans for thirty-three years, dying at 61. You married a Tlaxcalan noble, had four children, and became a respected elder. Your sabotage activities were never fully discovered by Spanish authorities. You lived a quiet life, teaching languages and helping your adopted community navigate colonial rule. Your children became important cultural bridges. On your deathbed, you told your eldest daughter about your sabotage work. She preserved your story, which was eventually written down in the 1580s. Your memoir, discovered in the 20th century, revealed you'd conducted one of the most effective resistance campaigns of the conquest era. You delayed Spanish advances, saved hundreds of lives, and escaped justice to live peacefully. You proved that sometimes the best revenge is living well after effective resistance."
    },

    proud_execution: {
      title: "Defiant Until the End",
      date: "July 1520 - The Final Stand",
      text: "You face execution proudly. 'I sabotaged an unjust invasion. I'm a hero, not a traitor. History will vindicate me even if you execute me.'\n\nCortés shakes his head. 'History is written by victors. No one will remember you, María.'\n\n'You're wrong. Truth outlives power. Someone will remember. Someone will tell my story.'\n\nYou're executed the next morning, defiant to the end.",
      isEnding: true,
      outcome: "Cortés was wrong. Your story survived in multiple accounts—Spanish records of your treason, indigenous oral traditions of your resistance, and most importantly, a journal you'd hidden that was discovered in 1680. Your sabotage campaign, documented in your journal, was revealed to have been far more extensive than Spanish authorities ever knew. You'd delayed conquest by months, saved hundreds of lives, and inspired other resisters. Modern historians call you one of the most effective resistance fighters of the conquest era. Monuments to you exist in Mexico, and your story is taught in schools as an example of resistance to tyranny. You died at 26, but your defiant last words—'Truth outlives power'—proved prophetic. You're remembered not despite your execution, but because of how you faced it."
    },

    final_escape_attempt: {
      title: "The Last Gambit",
      date: "July 1520 - Desperate Flight",
      text: "You attempt one final escape during the confusion of your impending execution. You're wounded in the attempt but manage to flee the Spanish camp.\n\nYou survive three days in the jungle before dying of your wounds and infection. Tlaxcalan villagers find your body and give you a proper burial.",
      isEnding: true,
      outcome: "Your body was buried by Tlaxcalans who recognized you as someone who'd tried to help indigenous peoples. They buried you with honor, marking your grave with both Christian cross and indigenous symbols. Your final escape attempt became legendary—'the woman who chose freedom in death over captivity in life.' Your grave became a pilgrimage site for people resisting oppression. Songs were written about your final days in the jungle, wounded and alone but free. You died at 26, but you died as you'd lived your final months—resisting conquest with everything you had. Your choice to die free rather than live in chains inspired others facing similar choices. You proved that the manner of death can be its own statement of values. Your last act of defiance became your most remembered."
    },

    record_again: {
      title: "Defiant Documentation",
      date: "January-August 1520 - Recording Resumes",
      text: "You begin chronicling again, more carefully hidden this time. You write in smaller script, use better codes, hide pages in multiple locations.\n\nYour new chronicle is even more detailed than the first. You're documenting not just events but your emotional journey, the moral compromises, the human cost of conquest on all sides.\n\nThis time, you successfully protect your work. It survives.",
      isEnding: true,
      outcome: "Your second chronicle survived and was even more powerful than the first. Combined with your burned first journal (of which you'd kept fragmentary copies), your documentation became the most comprehensive account of conquest from a morally conflicted participant. Published in 1547, five years after your death at 65, it influenced generations of historians and ethicists. Your chronicle is taught in universities worldwide as a primary source on conquest and a meditation on complicity, resistance, and moral choice in impossible circumstances. You proved that persistence matters—even when your first attempt is destroyed, you can start again. Your refusal to be silenced became as important as what you documented. You died knowing your truth would outlive attempts to suppress it."
    },

    direct_help: {
      title: "From Words to Actions",
      date: "January-July 1521 - Direct Service",
      text: "You stop chronicling and focus on direct help: treating wounded, sheltering refugees, teaching survival skills, mediating disputes. You can't change conquest, but you can ease individual suffering.\n\nYou establish a small hospital in Texcoco. You treat Aztec, Spanish, and Tlaxcalan wounded impartially. Some call you a saint. Others call you a traitor. You don't care—you're just reducing suffering where you can.",
      isEnding: true,
      outcome: "Your hospital in Texcoco operated for twenty-eight years, treating thousands. You died at 56 of disease caught from a patient. Your hospital continued operating for another century, eventually becoming the Hospital Real de Indios. You never documented your work, so you're barely mentioned in historical records. But oral traditions in Texcoco remember 'María the Healer' who treated everyone equally. Your great-granddaughter, researching family history in 1603, compiled testimonies about you and sent them to Spain. They survive in a monastery archive. You chose action over documentation, immediate help over historical record. Most historians don't know your name, but thousands of people lived because of you. That's a trade many would accept."
    },

    quiet_individual_help: {
      title: "Small Acts of Kindness",
      date: "October 1519 - July 1528 - Quiet Service",
      text: "From the margins, you help individuals where you can: warning people of danger, providing food to refugees, treating the wounded, teaching survival skills.\n\nYou're never important enough to make big changes, but you help dozens, then hundreds of individuals. Each person you help is a victory against conquest's dehumanization.",
      isEnding: true,
      outcome: "You lived to 66, dying peacefully surrounded by people you'd helped over the years. Your funeral was attended by Spanish and indigenous people alike—individuals you'd assisted, refugees you'd fed, wounded you'd treated. No monuments were built to you, no streets named after you, but hundreds of people lived better lives because you'd been in the world. Your great-granddaughter compiled oral histories about you in 1590. The stories describe a woman who 'helped everyone quietly, asked for nothing, and left the world gentler than she found it.' That's a legacy better than gold or glory. You chose individual kindness over grand gestures and proved that sustained compassion matters more than dramatic heroism."
    },

    leave_entirely: {
      title: "Walking Away",
      date: "November 1519 - Complete Departure",
      text: "You leave the expedition entirely. No imprisonment, no conflict—you simply walk away. Cortés lets you go, glad to be rid of a problematic translator.\n\nYou settle in a small coastal village, far from conquest's front lines. You teach languages, work as a translator for merchants, and live quietly. You hear news of the conquest but are no longer part of it.\n\nYou've chosen peace and distance over involvement.",
      isEnding: true,
      outcome: "You lived to 71 in your coastal village, dying peacefully of old age. You married a local fisherman, had three children, and lived a quiet, unremarkable life. You taught Spanish and indigenous languages to traders, helping facilitate peaceful commerce rather than conquest. Your life was ordinary, comfortable, and untroubled—which is itself an achievement in conquest times. You're not remembered by history. No chronicles mention you. But you lived well, loved deeply, and died peacefully. Sometimes the greatest wisdom is knowing when to walk away. You chose a quiet life over a meaningful death, and you never regretted it. Your descendants still live in that coastal town, unaware of what you walked away from."
    }
  };

  const currentSceneData = scenes[currentScene];

  if (!currentSceneData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-950 via-stone-900 to-black flex items-center justify-center">
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
    <div className="min-h-screen bg-gradient-to-br from-amber-950 via-stone-900 to-black relative overflow-hidden">
      {/* Decorative exploration elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 text-9xl">⚔️</div>
        <div className="absolute bottom-10 right-10 text-9xl">🌎</div>
        <div className="absolute top-1/2 right-1/4 text-6xl">⛵</div>
      </div>

      {/* Stats Panel */}
      <div className="fixed top-4 right-4 bg-stone-900/90 backdrop-blur-sm border-2 border-amber-800/60 rounded-lg p-4 z-20 w-64">
        <h3 className="text-amber-400 font-serif font-bold mb-3 text-center">Your Character</h3>
        
        <div className="space-y-3">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-amber-300 text-sm flex items-center gap-2">
                <Ship className="w-4 h-4" />
                Loyalty
              </span>
              <span className="text-amber-200 text-sm font-bold">{stats.loyalty}%</span>
            </div>
            <div className="w-full bg-stone-800 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-600 to-indigo-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${stats.loyalty}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-amber-300 text-sm flex items-center gap-2">
                <Heart className="w-4 h-4" />
                Humanity
              </span>
              <span className="text-amber-200 text-sm font-bold">{stats.humanity}%</span>
            </div>
            <div className="w-full bg-stone-800 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-rose-600 to-red-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${stats.humanity}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-amber-300 text-sm flex items-center gap-2">
                <Compass className="w-4 h-4" />
                Survival
              </span>
              <span className="text-amber-200 text-sm font-bold">{stats.survival}%</span>
            </div>
            <div className="w-full bg-stone-800 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-green-600 to-emerald-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${stats.survival}%` }}
              />
            </div>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-amber-800/40">
          <p className="text-amber-400/70 text-xs text-center italic">
            What will history remember?
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
          <div className="bg-gradient-to-r from-amber-900 to-orange-900 p-6 border-b-2 border-amber-800/60">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <Compass className="w-8 h-8 text-amber-300" />
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
                    className="w-full text-left p-5 bg-gradient-to-r from-stone-800/50 to-amber-950/30 hover:from-amber-900/40 hover:to-orange-900/40 border-2 border-amber-800/40 hover:border-amber-600 rounded-lg transition-all duration-300 group"
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
                    setStats({ loyalty: 50, humanity: 50, survival: 50 });
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

        {/* Choice History */}
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

export default ExplorationStory;
