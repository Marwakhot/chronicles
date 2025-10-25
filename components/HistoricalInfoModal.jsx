import React from 'react';
import { X, BookOpen, ExternalLink, Info } from 'lucide-react';

const HistoricalInfoModal = ({ isOpen, onClose, storyId }) => {
  if (!isOpen) return null;

  const historicalInfo = {
    'ancient-caesar': {
      title: "The Assassination of Julius Caesar",
      date: "March 15, 44 BCE",
      summary: "Julius Caesar was assassinated by a group of Roman senators, including his close friend Marcus Junius Brutus, on the Ides of March in 44 BCE.",
      sections: [
        {
          heading: "Historical Context",
          content: "By 44 BCE, Julius Caesar had accumulated unprecedented power in Rome. He had been declared 'Dictator Perpetuo' (Dictator for Life), effectively ending the Roman Republic's tradition of shared power. Many senators feared he would declare himself king, an abhorrent title to Romans who had expelled their last king centuries earlier."
        },
        {
          heading: "The Conspiracy",
          content: "A group of 60+ senators, calling themselves the 'Liberators,' plotted to assassinate Caesar. Led by Gaius Cassius Longinus and Marcus Junius Brutus, they believed killing Caesar would restore the Republic. The conspiracy included both political enemies and some of Caesar's allies who felt he had gone too far."
        },
        {
          heading: "The Assassination",
          content: "On March 15, 44 BCE (the Ides of March), Caesar was attacked in the Theatre of Pompey during a Senate session. He was stabbed 23 times by the conspirators. According to ancient sources, Caesar initially fought back but stopped resisting when he saw Brutus among the attackers, allegedly saying 'Et tu, Brute?' (And you, Brutus?)."
        },
        {
          heading: "The Aftermath",
          content: "The assassination did not restore the Republic as the conspirators hoped. Instead, it triggered a series of civil wars. Mark Antony and Octavian (Caesar's adopted heir) eventually defeated the conspirators at the Battle of Philippi in 42 BCE. Octavian later became Augustus, the first Roman Emperor, completing the transformation from Republic to Empire that Caesar had begun."
        },
        {
          heading: "Historical Impact",
          content: "The assassination of Caesar marked the definitive end of the Roman Republic. The event has become one of history's most famous political murders, inspiring countless works of literature, most notably Shakespeare's 'Julius Caesar.' It demonstrates how attempts to preserve democracy through violence can backfire spectacularly."
        }
      ],
      funFacts: [
        "Caesar was warned by a soothsayer to 'Beware the Ides of March' but ignored the warning.",
        "Caesar's wife Calpurnia had nightmares about his death the night before and begged him not to go to the Senate.",
        "The phrase 'Et tu, Brute?' is from Shakespeare's play; ancient sources suggest Caesar's actual last words were in Greek: 'Kai su, teknon?' ('You too, child?').",
        "Brutus and Cassius both committed suicide after their defeat at Philippi, with Brutus allegedly using the same dagger he used on Caesar.",
        "Caesar's assassination occurred at the base of a statue of his rival Pompey, whom he had defeated in civil war."
      ],
      sources: [
        "Plutarch's 'Lives' (1st-2nd century CE)",
        "Suetonius' 'The Twelve Caesars' (2nd century CE)",
        "Appian's 'Civil Wars' (2nd century CE)",
        "Shakespeare's 'Julius Caesar' (1599)"
      ]
    },
    'medieval-plague': {
      title: "The Black Death (Bubonic Plague)",
      date: "1347-1353 CE",
      summary: "The Black Death was one of the most devastating pandemics in human history, killing an estimated 75-200 million people across Eurasia and North Africa.",
      sections: [
        {
          heading: "Origins and Spread",
          content: "The plague originated in Central Asia and traveled along the Silk Road trade routes. It reached Europe in 1347 via merchant ships arriving in Sicily. The disease was caused by the bacterium Yersinia pestis, carried by fleas living on black rats that were common on ships and in medieval towns."
        },
        {
          heading: "Symptoms and Mortality",
          content: "The bubonic plague caused painful swellings (buboes) in the lymph nodes, fever, chills, and often death within days. The pneumonic form, which affected the lungs, was even more deadly and could spread person-to-person. Mortality rates varied but often reached 60-90% in affected areas. Medieval medicine had no effective treatments."
        },
        {
          heading: "Social Impact",
          content: "The plague killed 30-60% of Europe's population. Entire villages were abandoned. The massive death toll led to labor shortages, which eventually improved conditions for surviving peasants. It also caused significant religious upheaval, with some blaming God's wrath while others lost faith entirely. Jews were scapegoated and persecuted in many areas."
        },
        {
          heading: "Responses to the Plague",
          content: "Medieval responses included quarantine (the word comes from 'quaranta,' Italian for forty, the number of days ships were isolated), fleeing to the countryside, flagellant movements (self-whipping for penance), and various useless medical treatments like bloodletting. Some cities implemented early public health measures like cleaning streets and burying bodies properly."
        },
        {
          heading: "Long-term Consequences",
          content: "The Black Death fundamentally changed European society. Labor shortages gave workers more bargaining power, contributing to the end of feudalism. It spurred medical and scientific inquiry. Art and literature took on darker themes. The trauma shaped European culture for centuries and demonstrated how disease could reshape civilization in ways no war could."
        }
      ],
      funFacts: [
        "The plague returned in waves for centuries; London had a major outbreak in 1665-1666.",
        "Ring Around the Rosie' may reference plague symptoms, though this is debated by historians.",
        "Plague doctors wore distinctive beak-like masks filled with herbs, believing bad air ('miasma') caused disease.",
        "The plague killed so many clergy that standards for becoming a priest dropped significantly.",
        "Some historians argue the Black Death's labor shortage was a key factor in ending serfdom and advancing human rights."
      ],
      sources: [
        "Giovanni Boccaccio's 'The Decameron' (1353)",
        "Samuel K. Cohn Jr.'s 'The Black Death Transformed' (2002)",
        "Philip Ziegler's 'The Black Death' (1969)",
        "Ole Benedictow's 'The Black Death 1346-1353: The Complete History' (2004)"
      ]
    },
    'exploration-conquest': {
      title: "Spanish Conquest of the Aztec Empire",
      date: "1519-1521 CE",
      summary: "Hernán Cortés led a Spanish expedition that conquered the Aztec Empire, leading to the fall of Tenochtitlan and the colonization of Mexico.",
      sections: [
        {
          heading: "Historical Context",
          content: "In 1519, the Aztec Empire was the dominant power in Mesoamerica, with its capital Tenochtitlan (modern Mexico City) housing 200,000+ people—larger than most European cities. Hernán Cortés arrived with about 600 soldiers, 16 horses, and several cannons. The technological advantage of Spanish steel weapons, firearms, and horses was significant, but not decisive on its own."
        },
        {
          heading: "Key Factors in Spanish Victory",
          content: "The conquest succeeded due to multiple factors: indigenous allies (especially the Tlaxcalans who hated Aztec rule), European diseases (especially smallpox) that killed millions of indigenous people, superior military technology, and Spanish exploitation of indigenous political divisions. Cortés also benefited from the translator La Malinche, who helped him navigate complex indigenous politics."
        },
        {
          heading: "The Siege of Tenochtitlan",
          content: "After initial Spanish success, the Aztecs expelled Cortés during 'La Noche Triste' (The Sad Night) in June 1520. Cortés regrouped with indigenous allies and laid siege to Tenochtitlan for 93 days in 1521. The siege involved cutting off water and food supplies. Smallpox ravaged the defenders. The city fell in August 1521, ending the Aztec Empire."
        },
        {
          heading: "Demographic Catastrophe",
          content: "The conquest triggered a demographic collapse. European diseases (smallpox, measles, typhus) killed an estimated 90% of the indigenous population over the next century. This was one of history's greatest demographic disasters. The Spanish also implemented the encomienda system, essentially enslaving indigenous peoples for labor."
        },
        {
          heading: "Long-term Impact",
          content: "The conquest destroyed indigenous political structures, imposed Christianity, and created a new mestizo (mixed) culture. It enabled Spanish colonization of the Americas and the extraction of vast wealth (especially silver). The conquest raised profound ethical questions about colonialism, cultural destruction, and the treatment of indigenous peoples that remain relevant today."
        }
      ],
      funFacts: [
        "Cortés burned his ships to prevent his men from deserting, committing them fully to the conquest.",
        "The Aztecs initially thought Cortés might be the god Quetzalcoatl returning, though this is debated by historians.",
        "Tenochtitlan was built on an island in Lake Texcoco with sophisticated causeways and canals—like Venice.",
        "The Spanish were shocked by Aztec human sacrifice but ignored their own violent religious practices.",
        "La Malinche, Cortés's translator and advisor, is a controversial figure in Mexican history—seen as both traitor and victim."
      ],
      sources: [
        "Bernal Díaz del Castillo's 'The True History of the Conquest of New Spain' (1568)",
        "Hugh Thomas's 'Conquest: Montezuma, Cortés, and the Fall of Old Mexico' (1993)",
        "Matthew Restall's 'Seven Myths of the Spanish Conquest' (2003)",
        "The Florentine Codex (Aztec perspective, compiled by Bernardino de Sahagún)"
      ]
    },
    'industrial-revolution': {
      title: "The Industrial Revolution and Labor Movements",
      date: "1760-1840 CE (Early Industrial Revolution)",
      summary: "The Industrial Revolution transformed manufacturing and society, creating both unprecedented wealth and severe exploitation of workers, leading to the birth of organized labor movements.",
      sections: [
        {
          heading: "The Rise of Factories",
          content: "The Industrial Revolution began in Britain in the late 18th century with textile manufacturing. Factories replaced home-based production, concentrating workers in mills powered by water and later steam. Working conditions were brutal: 14-16 hour days, dangerous machinery, child labor, low wages, and no safety regulations. Workers had no legal protections or rights to organize."
        },
        {
          heading: "Living Conditions",
          content: "Industrial workers lived in overcrowded slums near factories. Housing was substandard, sanitation poor, and disease rampant. Entire families worked to survive. Children as young as six worked in factories, mills, and mines. Life expectancy in industrial cities was significantly lower than in rural areas. The wealth gap between factory owners and workers was enormous."
        },
        {
          heading: "Early Labor Organizing",
          content: "Workers began organizing despite legal restrictions and violent opposition. The Combination Acts (1799-1800) made unions illegal in Britain. Despite this, secret societies formed. The Luddites (1811-1816) destroyed machinery in protest. The Peterloo Massacre (1819) saw cavalry charge peaceful labor protesters, killing 15. Gradually, workers won rights to organize through sustained struggle."
        },
        {
          heading: "Reform Movements",
          content: "The Factory Acts (1833-1850) gradually improved conditions: limiting child labor, requiring basic education for child workers, and reducing working hours. The Ten Hours Act (1847) limited the working day. These reforms came only after decades of worker agitation, strikes, and public pressure. The Chartist movement (1838-1857) demanded political rights for working men."
        },
        {
          heading: "Long-term Impact",
          content: "The Industrial Revolution created the modern working class and sparked organized labor movements worldwide. It led to: the 8-hour workday, weekends, child labor laws, workplace safety regulations, minimum wages, and the right to unionize. The struggles of industrial workers established principles of workers' rights that remain relevant today. It also demonstrated how collective action can change unjust systems."
        }
      ],
      funFacts: [
        "The term 'Luddite' comes from Ned Ludd, possibly a fictional leader of machine-breaking protesters.",
        "Child workers in textile mills often had their fingers mangled by machinery; factory owners preferred children because their small hands could reach into machinery.",
        "The word 'sabotage' allegedly comes from workers throwing their wooden shoes (sabots) into machinery.",
        "Early unions often met in secret, using elaborate codes and rituals to avoid detection.",
        "The Industrial Revolution created the weekend—before, most people worked every day except Sunday."
      ],
      sources: [
        "Friedrich Engels's 'The Condition of the Working Class in England' (1845)",
        "E.P. Thompson's 'The Making of the English Working Class' (1963)",
        "Parliamentary Reports on Factory Conditions (1830s-1840s)",
        "Elizabeth Gaskell's 'Mary Barton' (1848) and 'North and South' (1855)"
      ]
    },
    'modern-chernobyl': {
      title: "The Chernobyl Nuclear Disaster",
      date: "April 26, 1986",
      summary: "The Chernobyl disaster was the worst nuclear accident in history, caused by a flawed reactor design and human error during a safety test.",
      sections: [
        {
          heading: "What Happened",
          content: "On April 26, 1986, Reactor 4 at the Chernobyl Nuclear Power Plant in Ukraine (then Soviet Union) exploded during a safety test. The test was poorly planned and conducted by operators who didn't fully understand the reactor's behavior. A power surge caused a steam explosion that blew off the reactor's 1000-ton lid, exposing the core. A second explosion scattered radioactive debris. The graphite moderator burned for 10 days, releasing massive amounts of radiation into the atmosphere."
        },
        {
          heading: "Immediate Response",
          content: "Firefighters responded without being told about radiation danger—many died within weeks from acute radiation syndrome. The city of Pripyat (50,000 people) wasn't evacuated for 36 hours, despite dangerous radiation levels. Eventually, 350,000 people were evacuated from a 30km exclusion zone. About 600,000 'liquidators' (cleanup workers) were exposed to high radiation levels while containing the disaster."
        },
        {
          heading: "The Cover-up",
          content: "Soviet authorities initially downplayed the disaster. They didn't inform neighboring countries until Swedish radiation monitors detected the fallout. Local officials were ordered not to cause panic, delaying evacuation. Accurate information about radiation levels was suppressed. This cover-up worsened health impacts and reflected Soviet-era prioritization of image over safety."
        },
        {
          heading: "Health and Environmental Impact",
          content: "The disaster released 400 times more radiation than the Hiroshima bomb. 31 people died acutely; thousands more developed cancers, particularly thyroid cancer from radioactive iodine. The full death toll remains disputed (estimates range from 4,000 to 60,000+). A 2,600 km² exclusion zone remains largely uninhabited. Wildlife has returned, but the area will be contaminated for thousands of years."
        },
        {
          heading: "Long-term Consequences",
          content: "Chernobyl contributed to the Soviet Union's collapse by exposing its systemic dysfunction. It led to improved nuclear safety protocols worldwide. The 'New Safe Confinement' structure (completed 2017) will contain the damaged reactor for 100 years. The disaster demonstrated the importance of transparency, proper training, and safety culture in high-risk technologies. It remains a warning about the consequences of cutting corners and silencing dissent."
        }
      ],
      funFacts: [
        "The radiation was so intense that the first robots sent to clean the roof failed—their electronics were fried. Humans had to do it, in 90-second shifts.",
        "The 'liquidators' included miners who dug a tunnel under the reactor to install a cooling system, working in extreme heat and radiation.",
        "Pripyat now looks like a frozen moment in time—an abandoned Soviet city with schools, apartments, and an amusement park that never opened.",
        "Some elderly residents illegally returned to the exclusion zone and still live there, preferring radiation risk to leaving their ancestral homes.",
        "The Chernobyl New Safe Confinement is the largest movable land-based structure ever built."
      ],
      sources: [
        "Svetlana Alexievich's 'Voices from Chernobyl' (1997)",
        "Adam Higginbotham's 'Midnight in Chernobyl' (2019)",
        "The HBO miniseries 'Chernobyl' (2019)",
        "IAEA reports on Chernobyl (multiple publications)"
      ]
    }
  };

  const info = historicalInfo[storyId];
  if (!info) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-gradient-to-br from-stone-900 to-amber-950 border-2 border-amber-800/60 rounded-xl max-w-4xl w-full my-8 animate-fade-in">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-900 to-orange-900 p-6 border-b-2 border-amber-800/60 rounded-t-xl sticky top-0 z-10">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <BookOpen className="w-8 h-8 text-amber-300 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-3xl font-serif font-bold text-amber-300 mb-2">
                  {info.title}
                </h2>
                <p className="text-amber-400/80 text-sm italic">{info.date}</p>
                <p className="text-amber-200 mt-2 leading-relaxed">{info.summary}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-amber-400 hover:text-amber-300 transition-colors p-2"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          <div className="space-y-6">
            {info.sections.map((section, index) => (
              <div key={index} className="bg-stone-800/30 border border-amber-800/30 rounded-lg p-5">
                <h3 className="text-xl font-serif font-bold text-amber-400 mb-3">
                  {section.heading}
                </h3>
                <p className="text-amber-200 leading-relaxed">
                  {section.content}
                </p>
              </div>
            ))}

            {/* Fun Facts */}
            <div className="bg-amber-900/20 border-2 border-amber-700/50 rounded-lg p-5">
              <h3 className="text-xl font-serif font-bold text-amber-400 mb-4 flex items-center gap-2">
                <span>💡</span> Interesting Facts
              </h3>
              <ul className="space-y-2">
                {info.funFacts.map((fact, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-amber-600 text-xl flex-shrink-0">•</span>
                    <span className="text-amber-200">{fact}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Sources */}
            <div className="bg-stone-800/30 border border-amber-800/30 rounded-lg p-5">
              <h3 className="text-xl font-serif font-bold text-amber-400 mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Sources & Further Reading
              </h3>
              <ul className="space-y-2">
                {info.sources.map((source, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <ExternalLink className="w-4 h-4 text-amber-600 flex-shrink-0 mt-1" />
                    <span className="text-amber-200">{source}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-stone-900/60 p-4 border-t border-amber-800/30 rounded-b-xl">
          <p className="text-amber-400/60 text-sm text-center italic">
            History shapes us. Understanding it helps us shape the future.
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default HistoricalInfoModal;
