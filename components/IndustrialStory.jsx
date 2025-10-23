import React, { useState } from 'react';
import { ArrowLeft, Heart, Skull, Factory, AlertTriangle, Hammer } from 'lucide-react';

const IndustrialStory = ({ onBack }) => {
  const [currentScene, setCurrentScene] = useState('intro');
  const [choices, setChoices] = useState([]);
  const [stats, setStats] = useState({
    solidarity: 50,
    courage: 50,
    survival: 50
  });

  const updateStats = (statChanges) => {
    setStats(prev => ({
      solidarity: Math.max(0, Math.min(100, prev.solidarity + (statChanges.solidarity || 0))),
      courage: Math.max(0, Math.min(100, prev.courage + (statChanges.courage || 0))),
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
      title: "First Day at the Mill",
      date: "March 1842 - Manchester, England",
      text: "You are Thomas Hartley, sixteen years old, standing outside Grimshaw's Cotton Mill for the first time. The building looms before you—five stories of blackened brick, windows rattling with the thunder of machinery within. Smoke pours from tall chimneys, adding to the perpetual gray haze over Manchester.\n\nYour father died in a mining accident last month. Your mother takes in washing, but it's not enough. Your two younger siblings need food. The mill pays six shillings a week—barely enough to survive, but you have no choice.\n\nInside, the noise is deafening. Hundreds of machines clatter and whir. The air is thick with cotton dust that makes your throat burn. An overseer, Mr. Hutchins, escorts you to your station.\n\n'You'll work the mule spinner,' he shouts over the din. 'Fourteen hours a day, six days a week. Keep up or you're out. Accidents happen to careless workers.' He gestures to a man nearby with only three fingers on his left hand.",
      choices: [
        {
          text: "Focus on learning the work quickly to keep your job",
          next: "focus_work",
          stats: { survival: 15, courage: -5 }
        },
        {
          text: "Ask other workers about safety and what to watch for",
          next: "ask_workers",
          stats: { solidarity: 15, survival: 10 }
        },
        {
          text: "Question Mr. Hutchins about safety procedures",
          next: "question_overseer",
          stats: { courage: 15, survival: -5 }
        },
        {
          text: "Observe quietly and try to understand the factory system",
          next: "observe_system",
          stats: { survival: 10, solidarity: 5 }
        }
      ]
    },

    focus_work: {
      title: "The Machine's Rhythm",
      date: "March-April 1842 - The Factory Floor",
      text: "You throw yourself into learning the work. The mule spinner is a monstrous machine—a moving carriage that pulls cotton thread, stretches it, then spins it onto bobbins. You must walk backward and forward constantly, piecing broken threads, replacing full bobbins.\n\nYour hands bleed from the rough cotton. Your feet ache from standing fourteen hours. The dust makes you cough constantly. But you keep pace.\n\nAfter two weeks, a young girl named Sarah at the next machine catches her hair in the gears. Her screams pierce even the factory noise. Workers rush to stop the machine, but not before she's badly injured. Mr. Hutchins has her carried out.\n\n'Back to work!' he shouts. 'The machines don't stop for accidents.'\n\nThat night, a man named William approaches you outside. 'That girl lost part of her scalp. She's twelve years old. This happens because we have no safety guards on machines, no regulations. Some of us are meeting to discuss it. Will you come?'",
      choices: [
        {
          text: "Attend the meeting—you want to prevent more accidents",
          next: "first_meeting",
          stats: { solidarity: 20, courage: 15 }
        },
        {
          text: "Decline—you can't risk your job getting involved",
          next: "decline_meeting",
          stats: { survival: 15, solidarity: -15 }
        },
        {
          text: "Ask for more information before deciding",
          next: "cautious_interest",
          stats: { solidarity: 10, survival: 10 }
        }
      ]
    },

    ask_workers: {
      title: "The Workers' Wisdom",
      date: "March 1842 - First Weeks",
      text: "During the brief lunch break—thirty minutes to eat and rest—you approach other workers. An older man named Jack shares his bread with you.\n\n'Keep your wits about you,' he advises. 'The machines don't forgive mistakes. I've been here twelve years and seen dozens maimed or killed. Never reach into moving parts, no matter what the overseer demands.'\n\nA woman named Margaret adds: 'And don't trust Hutchins. He'll push you past safety to meet quotas. We look out for each other here—the bosses certainly don't.'\n\nYou learn the unwritten rules: workers warn each other of overseer approaches, cover for someone who's ill, and share what little food they have. You're being initiated into the factory's hidden culture of mutual aid.\n\nAfter a month, Margaret approaches you. 'Some of us are organizing. We want better hours, safety measures, fair pay. It's dangerous work—the owners hate unions. But we can't keep living like this. Are you with us?'",
      choices: [
        {
          text: "Join the organizing effort—solidarity is the only power you have",
          next: "join_organizing",
          stats: { solidarity: 25, courage: 20 }
        },
        {
          text: "Support them quietly but don't take leadership roles",
          next: "quiet_support",
          stats: { solidarity: 15, courage: 10, survival: 10 }
        },
        {
          text: "Stay neutral—you need this job too desperately",
          next: "stay_neutral",
          stats: { survival: 20, solidarity: -10 }
        }
      ]
    },

    question_overseer: {
      title: "Speaking Up",
      date: "March 1842 - Early Days",
      text: "You find your courage. 'Mr. Hutchins, what safety procedures should I know? What do I do if something goes wrong?'\n\nHutchins stares at you with contempt. 'Safety procedure? Don't be stupid. That's your safety procedure. Keep your hands and hair away from moving parts. Now get to work.'\n\nThe other workers look at you with a mixture of respect and concern. During lunch, a man named Robert pulls you aside.\n\n'Bold of you to question Hutchins. Most don't dare. But you should know—speaking up marks you. The overseers remember faces. They'll push you harder, watch for any excuse to dock your pay or dismiss you.'\n\nHe's right. Over the next weeks, Hutchins assigns you the worst tasks, criticizes your work constantly, and threatens dismissal for minor issues. But other workers respect your courage.\n\nAfter a particularly brutal day, Robert approaches again. 'We're forming a workers' committee. Secret, for now. We need people with courage. Interested?'",
      choices: [
        {
          text: "Join the committee—your courage can help others",
          next: "join_committee",
          stats: { solidarity: 20, courage: 25 }
        },
        {
          text: "Keep your head down now—you've attracted enough attention",
          next: "lay_low",
          stats: { survival: 20, courage: -10 }
        },
        {
          text: "Ask what the committee plans to do first",
          next: "learn_more_committee",
          stats: { courage: 15, solidarity: 10 }
        }
      ]
    },

    observe_system: {
      title: "Understanding Exploitation",
      date: "March-April 1842 - Learning the System",
      text: "You watch and learn. The factory is a carefully designed system of exploitation. Workers arrive at dawn, work until dark. Wages are docked for arriving minutes late, for talking, for bathroom breaks. Children as young as six work as 'scavengers,' crawling under machines to collect loose cotton.\n\nThe owners, the Grimshaw family, never set foot on the factory floor. They live in a mansion outside town while workers crowd into filthy tenements. The machinery is valuable; workers are replaceable.\n\nYou notice hierarchies among workers too. English workers look down on Irish immigrants, who work for even less. Men earn more than women for the same work. Everyone competes for the overseers' favor.\n\nBut you also notice resistance. Deliberate slowdowns when quotas are raised. Workers warning each other when inspectors come. Small acts of sabotage that halt machines without leaving evidence.\n\nA group of workers begin meeting in the evenings at the Crown and Anchor pub. You hear whispers about a union, about strikes happening in other cities. About something called the Chartist movement demanding political rights for working people.\n\nDo you investigate?",
      choices: [
        {
          text: "Attend the pub meetings and learn about the movement",
          next: "join_movement",
          stats: { solidarity: 25, courage: 15 }
        },
        {
          text: "Keep observing but don't commit yet",
          next: "continue_observing",
          stats: { survival: 15, solidarity: 5 }
        },
        {
          text: "Focus on your own survival and family's needs",
          next: "focus_survival",
          stats: { survival: 25, solidarity: -15 }
        }
      ]
    },

    first_meeting: {
      title: "The Secret Gathering",
      date: "April 1842 - Back Room of the Crown and Anchor",
      text: "Twenty workers crowd into a dim back room. William stands on a chair, speaking in urgent whispers.\n\n'Sarah lost part of her scalp because machines have no guards. Jonathan lost three fingers last month. Emily's sister died from lung disease at nineteen—from breathing cotton dust. How many more must suffer before we act?'\n\nA woman named Catherine speaks next: 'The Factory Act of 1833 was supposed to protect us. It limits children to eight hours, requires basic education. But it's never enforced here. Grimshaw pays off the inspectors.'\n\n'We need a union,' Robert argues. 'Collective bargaining. If we all threaten to strike, they must listen.'\n\n'Unions are barely legal,' another worker counters. 'And owners break them with violence. You all remember what happened at Tolpuddle—transportation to Australia for trying to organize.'\n\n'Then we work in secret,' William insists. 'Build our strength before revealing ourselves. Thomas here is new, but he saw Sarah's accident. We need young workers who understand what's at stake.'\n\nThey look to you. Are you willing to help organize, knowing the risks?",
      choices: [
        {
          text: "Commit fully to the organizing effort",
          next: "full_commitment",
          stats: { solidarity: 30, courage: 25, survival: -15 }
        },
        {
          text: "Offer to help with specific tasks but stay cautious",
          next: "limited_commitment",
          stats: { solidarity: 20, courage: 15, survival: -5 }
        },
        {
          text: "Withdraw—the risks are too great for your family",
          next: "withdraw_organizing",
          stats: { survival: 20, solidarity: -20, courage: -15 }
        }
      ]
    },

    decline_meeting: {
      title: "The Safe Path",
      date: "April-June 1842 - Keeping Your Head Down",
      text: "You decline William's invitation. He nods, disappointed but understanding. 'I get it. You've got family depending on you.'\n\nYou focus on work, avoiding trouble, collecting your meager wages. You witness more accidents, more injustices, but you say nothing. Your family eats, barely. Your siblings don't starve.\n\nBut guilt gnaws at you. When Catherine's son loses an arm in a machine, you attend his bedside but offer no help beyond sympathy. When wages are cut by a shilling, you accept it silently while others protest.\n\nThe organizers continue their work without you. Tensions rise in the factory. Mr. Grimshaw hires more overseers. Rumors spread of a coming strike.\n\nOne evening, William finds you leaving the factory. 'It's happening soon. A strike for safety measures, fair wages, and shorter hours. We need everyone. I'm asking one more time—will you stand with us?'",
      choices: [
        {
          text: "Join the strike—you can't stay silent anymore",
          next: "late_joiner",
          stats: { solidarity: 20, courage: 20, survival: -10 }
        },
        {
          text: "Continue working—someone needs to bring in wages",
          next: "scab_path",
          stats: { survival: 20, solidarity: -30, courage: -20 }
        },
        {
          text: "Offer secret support but don't openly strike",
          next: "secret_support",
          stats: { solidarity: 10, survival: 10 }
        }
      ]
    },

    cautious_interest: {
      title: "Careful Consideration",
      date: "April 1842 - Weighing Options",
      text: "You ask William questions. What are they planning? How many workers are involved? What protection do they have against retaliation?\n\n'Twenty of us so far,' William admits. 'We're careful. We meet in different places, use trusted messengers. We're building connections with unions in other factories, other cities. The Chartists support us—they're organizing nationally for working people's political rights.'\n\n'But what can we actually achieve?' you ask. 'The owners have all the power.'\n\n'Together, we have power too,' William insists. 'If we all stop working, the machines stop. The owners make no profit. They must negotiate. It's happened before—short strikes have won concessions. But we need numbers. We need commitment.'\n\nHe places a hand on your shoulder. 'I understand caution. But cautious people don't change the world. Think about it. Come to our next meeting if you decide to join us.'\n\nOver the next days, you wrestle with the decision. Your family needs your wages. But accidents continue. Sarah, the girl who was injured, returned to work with a bandaged head—she has no choice, her family needs the money too.",
      choices: [
        {
          text: "Attend the next meeting—cautious but willing to engage",
          next: "first_meeting",
          stats: { solidarity: 15, courage: 10 }
        },
        {
          text: "Decide the risks outweigh potential benefits",
          next: "decline_meeting",
          stats: { survival: 15, solidarity: -10 }
        },
        {
          text: "Talk to your mother about what to do",
          next: "family_counsel",
          stats: { survival: 10, solidarity: 5 }
        }
      ]
    },

    join_organizing: {
      title: "The Organizer",
      date: "April-July 1842 - Building the Movement",
      text: "You become an organizer. You recruit fellow workers, distribute pamphlets, collect dues for the strike fund. It's dangerous work. Several times you barely avoid being caught by overseers.\n\nYou learn about the broader movement. The Chartists want universal male suffrage, secret ballots, and payment for MPs so working men can serve in Parliament. Trade unions want the right to organize without prosecution. Factory reformers demand safety regulations and shorter hours.\n\nMargaret becomes a mentor. 'We're part of something bigger than one factory. Across England, working people are awakening. The owners fear us—that's why they fight so hard against unions.'\n\nYou help organize secret meetings, plan strategies, and build solidarity. The group grows to fifty workers, then eighty. You're preparing for a major action—a strike that could change everything.\n\nBut Mr. Grimshaw is getting suspicious. Productivity has dropped slightly—the result of coordinated slowdowns. He increases surveillance, plants informants. One evening, Margaret warns you: 'They suspect something. We may need to move sooner than planned. Are you ready?'",
      choices: [
        {
          text: "Push for an immediate strike while momentum is strong",
          next: "early_strike",
          stats: { solidarity: 25, courage: 30, survival: -20 }
        },
        {
          text: "Wait and build more support despite the risks",
          next: "patient_organizing",
          stats: { solidarity: 20, courage: 15, survival: -10 }
        },
        {
          text: "Suggest scaling back temporarily to avoid detection",
          next: "tactical_retreat",
          stats: { survival: 15, solidarity: 10, courage: -5 }
        }
      ]
    },

    quiet_support: {
      title: "The Silent Ally",
      date: "April-July 1842 - Supporting from the Shadows",
      text: "You support the organizers quietly. You contribute to the strike fund, warn of overseer movements, and slow your work pace subtly to support protests. But you don't attend meetings or take visible leadership.\n\nIt's a middle path—helping without fully committing. Margaret understands. 'We need visible leaders, but we also need silent support. Your caution helps you stay employed, and employed workers can sustain the movement with their dues.'\n\nYou watch as braver souls take greater risks. William is nearly caught distributing pamphlets. Catherine is docked a day's pay for 'insubordination' when she questions a quota increase. Robert is beaten by hired thugs outside the factory.\n\nBut the movement grows. More workers join despite the dangers. A network of mutual aid develops—workers sharing food with those who've been fired, caring for injured comrades, supporting widows of men killed in accidents.\n\nAs summer approaches, talk of a strike intensifies. The organizers ask for your decision: when the strike comes, which side will you be on?",
      choices: [
        {
          text: "Commit to striking when the time comes",
          next: "strike_commitment",
          stats: { solidarity: 25, courage: 20, survival: -15 }
        },
        {
          text: "Continue quiet support but don't publicly strike",
          next: "continue_quiet_support",
          stats: { solidarity: 15, survival: 10 }
        },
        {
          text: "Step back—you've done what you can",
          next: "step_back",
          stats: { survival: 20, solidarity: -15 }
        }
      ]
    },

    stay_neutral: {
      title: "The Neutral Worker",
      date: "April-August 1842 - Walking the Line",
      text: "You try to stay neutral, friendly with everyone, committed to no one. The organizers are disappointed but don't push you. The overseers view you as reliable. You exist in an uncomfortable middle ground.\n\nBut neutrality becomes harder as tensions rise. When a workers' delegation meets with Mr. Grimshaw demanding safety improvements, they're dismissed and threatened with firing. When organizers plan a work stoppage, they expect everyone to participate.\n\n'You're either with us or against us,' William tells you bluntly. 'Neutrality is choosing the owners' side.'\n\nBut Hutchins warns you too: 'I know some workers are causing trouble. Smart ones keep their heads down and their jobs. Are you smart, Hartley?'\n\nA crisis forces your hand. Catherine's daughter, working as a scavenger under the machines, is crushed when a gear malfunctions. She's eight years old. She dies slowly, in agony, while Grimshaw's family physician is summoned but arrives too late.\n\nThe workers demand an immediate meeting with Grimshaw. He refuses. A spontaneous strike begins. Do you join?",
      choices: [
        {
          text: "Join the strike—this injustice cannot be tolerated",
          next: "crisis_awakening",
          stats: { solidarity: 25, courage: 25, survival: -10 }
        },
        {
          text: "Continue working—someone must stay employed",
          next: "remain_working",
          stats: { survival: 20, solidarity: -25, courage: -15 }
        },
        {
          text: "Work but donate wages to Catherine's family",
          next: "compromise_position",
          stats: { solidarity: 10, survival: 10, courage: 5 }
        }
      ]
    },

    // Adding condensed ending scenes to stay within limits
    // Each major path now leads to a proper ending

    family_counsel: {
      title: "Mother's Wisdom",
      date: "April 1842 - Home",
      text: "Your mother listens quietly. 'Your father was involved in organizing once. He was blacklisted for it—couldn't find work for two years. That's why he went to the mines. It killed him in the end.'\n\nShe takes your hand. 'I won't tell you what to do. But understand the costs. If you fight, you may lose. If you don't fight, you'll live with knowing you could have tried.'\n\n'What would father do?' you ask.\n\n'He'd probably fight,' she admits. 'But he also left us to struggle alone when he died. You must find your own balance.'",
      choices: [
        {
          text: "Honor your father's legacy by joining the fight",
          next: "join_organizing",
          stats: { solidarity: 25, courage: 25 }
        },
        {
          text: "Protect the family he left behind",
          next: "decline_meeting",
          stats: { survival: 25, solidarity: -10 }
        }
      ]
    },

    full_commitment: {
      title: "The Dedicated Organizer",
      date: "May-August 1842 - Building the Strike",
      text: "You become a key organizer. The strike is called for August. You help prepare—stockpiling food, arranging shelter, coordinating with other factories.\n\nThe night before, Margaret says: 'Tomorrow will be dangerous. Grimshaw will use force. Are you ready?'\n\nYou think of Sarah's scarred head, Catherine's dead daughter. 'I'm ready.'",
      choices: [
        {
          text: "Lead from the front lines of the strike",
          next: "ending_strike_leader",
          stats: { solidarity: 35, courage: 35 }
        },
        {
          text: "Take a supporting role to minimize risk",
          next: "ending_strike_support",
          stats: { solidarity: 30, courage: 25 }
        }
      ]
    },

    ending_strike_leader: {
      title: "The Price of Leadership",
      date: "August-September 1842",
      text: "You lead the strike from day one. You're visible, vocal, vulnerable. Grimshaw targets you specifically. You're beaten twice, arrested on false charges. Your name tops the blacklist.\n\nBut your courage inspires others. After four weeks, Grimshaw negotiates. You win significant concessions: twelve-hour days, safety improvements, wage increases, union recognition.\n\nBut you're fired despite the agreement. You're twenty-three and unemployable in Manchester.",
      isEnding: true,
      outcome: "You became a full-time labor organizer, supported by union dues. You spent thirty years organizing workers across England. You were arrested multiple times, beaten more than you can count, but never broke. You died at fifty-six from injuries sustained during a strike. Thousands attended your funeral. You became a legend—the young man who found his courage and changed history. Your name appears in labor histories as a founder of the British trade union movement. Streets were named after you. You sacrificed comfort for justice and never regretted it."
    },

    ending_strike_support: {
      title: "The Steady Hand",
      date: "1842-1870",
      text: "You support the strike in crucial but less visible ways. You manage funds, organize food distribution, care for injured picketers. The strike wins partial concessions. You keep your job afterward because you weren't visibly leading.",
      isEnding: true,
      outcome: "You became a long-term organizer, working inside factories for thirty years while building union infrastructure. You were never famous, but you were effective. You helped organize dozens of successful actions and trained hundreds of organizers. You died at seventy-three, one of the oldest labor activists of your generation. Your strategy of sustainable activism allowed you to contribute for decades. Your funeral was attended by union leaders from across England. You proved that movements need both dramatic heroes and steady workers who sustain the struggle over time."
    },

    // Condensed other major endings
    late_joiner: {
      title: "Finding Courage Late",
      date: "August 1842",
      text: "You join the strike when it begins. The strike lasts three weeks. You're beaten once, arrested twice, but you don't break. The strike wins partial concessions.",
      isEnding: true,
      outcome: "You became a dedicated labor organizer after your late start. You organized workers for twenty-five years until blacklisting forced you into other work. Your autobiography, 'From Coward to Comrade,' became a labor movement classic. You died at sixty-two, respected in labor circles. You proved that heroes aren't born brave—they become brave by choosing courage despite fear. Your transformation inspired generations."
    },

    scab_path: {
      title: "The Betrayal",
      date: "August 1842",
      text: "You continue working during the strike. The word cuts like a knife: scab. You cross the picket line daily, head down, ignoring shouts of former friends. The strike collapses. You're hated by everyone, including yourself.",
      isEnding: true,
      outcome: "You died at forty-five, alone and hated. Even your family was ashamed. You were buried in an unmarked grave; no one attended your funeral. Your legacy is cautionary: you chose immediate survival over solidarity and gained neither. The reforms strikers fought for eventually came—you benefited despite betraying those who won them. Your name became synonymous with 'scab' in Manchester. You lived as a warning: betraying solidarity destroys both the collective and the individual."
    },

    secret_support: {
      title: "The Double Agent",
      date: "August 1842",
      text: "You work during the strike but secretly funnel wages to the strike fund and pass information. It's dangerous—if discovered, you're fired from both sides. One night, Hutchins catches you passing money to Margaret.",
      choices: [
        {
          text: "Confess and face consequences",
          next: "ending_honest_confession",
          stats: { solidarity: 25, courage: 30 }
        },
        {
          text: "Lie and maintain your position",
          next: "ending_deception",
          stats: { survival: 20 }
        }
      ]
    },

    ending_honest_confession: {
      title: "Speaking Truth",
      date: "1842-1870",
      text: "You confess to supporting the strike. Grimshaw fires you immediately, but your honesty strengthens the strike. You become a full-time organizer.",
      isEnding: true,
      outcome: "Your honest confession became legendary. You spent the rest of your life organizing workers. You died at sixty-seven, respected and honored. Your story was told to young activists: 'Be like Thomas, who chose truth over security.' You proved that honesty, even when costly, has value beyond self-preservation. Your funeral drew thousands. You showed that speaking truth to power is itself a form of resistance."
    },

    ending_deception: {
      title: "The Secret Ally",
      date: "1842-1863",
      text: "You maintain your cover for twenty years, secretly supporting unions while appearing loyal to management. Only your journals, discovered after death, revealed the truth.",
      isEnding: true,
      outcome: "You died at sixty-three, your covert support unrecognized in life. Historians later recognized you as one of the most effective labor spies, feeding intelligence to unions while supporting management. A memorial was erected: 'The Secret Ally.' You proved that not all resistance is public, that covert support can be as valuable as open activism. You sacrificed recognition for effectiveness."
    },

    // Additional critical paths
    early_strike: {
      title: "August Strike",
      date: "August 1842",
      text: "The strike begins August 1st. 150 workers walk out. Grimshaw responds with violence—thugs beat picketers, families are evicted. After ten days, the strike fund is nearly exhausted. You must decide the next move.",
      choices: [
        {
          text: "Hold the picket line—no violence, no surrender",
          next: "ending_peaceful_victory",
          stats: { solidarity: 30, courage: 25 }
        },
        {
          text: "Negotiate a compromise with Grimshaw",
          next: "ending_compromise",
          stats: { solidarity: 20, courage: 15 }
        }
      ]
    },

    ending_peaceful_victory: {
      title: "The Peaceful Warrior",
      date: "1842-1870",
      text: "You maintain peaceful protest despite provocations. Public opinion turns in your favor. After eight weeks, Grimshaw negotiates significant concessions.",
      isEnding: true,
      outcome: "You became known as a pioneer of nonviolent labor action. Your strategy influenced labor movements worldwide. You lived to seventy-one, organizing peacefully but persistently. Your manual on nonviolent resistance was translated into fifteen languages. You proved that oppressed people can fight injustice without becoming like their oppressors. Your peaceful persistence won reforms and preserved humanity."
    },

    ending_compromise: {
      title: "The Pragmatist",
      date: "1842-1880",
      text: "You negotiate partial concessions: thirteen-hour days, some safety improvements. It's not everything, but it's real progress.",
      isEnding: true,
      outcome: "You spent forty years organizing, winning numerous partial victories that accumulated into major change. Your pragmatic approach won steady improvements. Radicals criticized your compromises; you responded that compromise sustains movements. You died at sixty-seven, having transformed factory work through persistent, incremental pressure. You chose the long game and won it."
    },

    crisis_awakening: {
      title: "The Death That Changed You",
      date: "August 1842",
      text: "Catherine's daughter dies, and you join the spontaneous strike. Your grief and rage have made you brave. This is your moment.",
      isEnding: true,
      outcome: "You helped organize the chaotic strike into something sustainable. You won significant safety reforms. You spent your life protecting child workers. You died at sixty-nine from injuries protecting a child from machinery. Thousands of children attended your funeral. You demonstrated that protecting the vulnerable is the highest form of courage. You didn't change the entire system, but you saved countless individual children."
    },

    remain_working: {
      title: "Ultimate Cowardice",
      date: "August 1842",
      text: "A child is dead, and you continue working. You cross picket lines while Catherine mourns. The strike collapses. You're completely isolated.",
      isEnding: true,
      outcome: "You died at forty-five in a workhouse—the very dangers the strike fought against crushed your hand. You kept your job for a year, then lost everything. You spent final twenty years in poverty and shame. No one mourned you. Your grave is unmarked. Your legacy: cowardice may feel like survival, but it's often just a slower death. The safety measures you refused to fight for were implemented too late for you."
    },

    compromise_position: {
      title: "Uncomfortable Middle",
      date: "August 1842",
      text: "You work but donate wages to Catherine's family. Neither side is satisfied. You've alienated everyone.",
      isEnding: true,
      outcome: "You lived to fifty-two, never poor but never respected. You tried to walk a moral tightrope and fell into the chasm between sides. Your confession of moral paralysis haunted you. No one trusted you with anything important. You died forgotten, a cautionary tale about trying to please everyone and satisfying no one."
    },

    join_committee: {
      title: "The Committee Member",
      date: "April-July 1842",
      text: "You become one of twelve core members planning resistance. You learn organizational skills: recruitment, communication, building strike funds. By summer, you have 120 workers committed. The strike is planned for August 1st.",
      choices: [
        {
          text: "Support immediate action",
          next: "early_strike",
          stats: { courage: 30, solidarity: 20 }
        },
        {
          text: "Build more support first",
          next: "patient_organizing",
          stats: { solidarity: 25, survival: 5 }
        }
      ]
    },

    patient_organizing: {
      title: "Building Strength",
      date: "May-September 1842",
      text: "You argue for patience. By September, you have 180 workers committed—more than half the factory. But Grimshaw fires thirty suspected organizers, including Margaret. Do you strike now?",
      choices: [
        {
          text: "Strike immediately in response",
          next: "ending_reactive_strike",
          stats: { solidarity: 30, courage: 30 }
        },
        {
          text: "Continue organizing despite setback",
          next: "ending_persistent_organizer",
          stats: { solidarity: 25, courage: 15 }
        }
      ]
    },

    ending_reactive_strike: {
      title: "Solidarity in Action",
      date: "September 1842",
      text: "180 workers strike in response to the firings. Your months of organizing pay off. After four weeks, you win: fired workers rehired, wages increase, safety improvements agreed.",
      isEnding: true,
      outcome: "You became a respected labor leader, known for strategic patience combined with decisive action. You organized for thirty years, winning numerous victories. You lived to sixty-eight. Your organizational model became standard practice. You trained dozens of organizers. You proved that good organizing requires both patience and decisiveness. You died honored by labor leaders across Europe."
    },

    ending_persistent_organizer: {
      title: "The Long Game",
      date: "September-December 1842",
      text: "Even after firings, you continue organizing. By December, you have 200 committed strikers. When you finally strike in January 1843, you're overwhelmingly strong and win nearly everything.",
      isEnding: true,
      outcome: "You became legendary for strategic patience that achieved total victory. You organized for thirty-five years, winning major battles by refusing to fight until success was guaranteed. You lived to eighty-one—extraordinary for your era. Your victories inspired movements worldwide. You mastered the art of strategic activism. You died honored by tens of thousands who understood that timing matters as much as courage."
    },

    tactical_retreat: {
      title: "Scaling Back",
      date: "July 1842",
      text: "You suggest pausing organizing to let things cool down. The organizing goes quiet. But momentum is lost. Workers who were committed begin to doubt. After two months, the energy has dissipated.",
      choices: [
        {
          text: "Try to rebuild momentum",
          next: "ending_failed_restart",
          stats: { solidarity: 15, courage: 10 }
        },
        {
          text: "Accept the movement is dead",
          next: "ending_movement_death",
          stats: { survival: 20, solidarity: -25 }
        }
      ]
    },

    ending_failed_restart: {
      title: "Too Late",
      date: "1842-1850",
      text: "You try to restart organizing but workers are too frightened and cynical. The moment has passed.",
      isEnding: true,
      outcome: "You never successfully organized again. You worked at Grimshaw's eight more years before quitting. You lived to fifty-seven, always regretting that moment when fear made you advise retreat. Later organizers learned from your failure: sometimes tactical retreat is strategic abandonment. You meant well but chose wrong at a critical moment. That mistake defined your life."
    },

    ending_movement_death: {
      title: "Accepting Defeat",
      date: "1842-1852",
      text: "You accept the movement is dead. You work quietly for ten years until lung disease forces you to stop.",
      isEnding: true,
      outcome: "You died at fifty-three having given up after one failure. Grimshaw's factory eventually unionized—fifteen years after your death. You could have been part of that victory, but early defeat convinced you it was impossible. Your legacy shows how one failure, internalized, prevents future success. Other organizers who failed repeatedly ultimately succeeded. You failed once and stopped. That made all the difference."
    },

    lay_low: {
      title: "Keeping Quiet",
      date: "April-July 1842",
      text: "After attracting Hutchins's attention, you keep your head down. The harassment lessens. But you can't unsee what you've seen. Your younger sister Emma now works here too—she's eleven. One day her dress catches in machinery. You hit the emergency stop, saving her life. Hutchins docks your pay. That night, William finds you: 'You saved your sister. Maybe you have more fire than you thought.'",
      choices: [
        {
          text: "Join the organizers now—your courage has returned",
          next: "join_organizing",
          stats: { courage: 25, solidarity: 20 }
        },
        {
          text: "Focus on protecting your family",
          next: "ending_family_focus",
          stats: { survival: 20 }
        }
      ]
    },

    ending_family_focus: {
      title: "The Family Provider",
      date: "1842-1861",
      text: "You focus on protecting your family through steady work. Emma grows up in the factory. At seventeen, she contracts tuberculosis. She dies at nineteen, her lungs destroyed by cotton dust.",
      isEnding: true,
      outcome: "You lived to fifty-five, dying shortly after Emma. You provided for your family but couldn't change the system that killed them anyway. The factory reforms that came twenty years later might have saved Emma, but they required strikes you refused to support. You sacrificed solidarity for family, but family wasn't enough. Your gravestone reads: 'Devoted Brother.' It doesn't mention your devotion wasn't enough."
    },

    learn_more_committee: {
      title: "Understanding the Stakes",
      date: "April 1842",
      text: "Robert explains the committee's work. 'We're connected to a national network. Our goal isn't just better conditions here—it's changing the entire system.' He's honest about risks: 'Some will be blacklisted, arrested. This requires sacrifice.'",
      choices: [
        {
          text: "Join—the cause is worth the sacrifice",
          next: "join_committee",
          stats: { solidarity: 25, courage: 25 }
        },
        {
          text: "Support without formal membership",
          next: "quiet_support",
          stats: { solidarity: 15, courage: 10 }
        }
      ]
    },

    join_movement: {
      title: "The Chartist Ally",
      date: "April-August 1842",
      text: "You become involved with the Chartist movement. You learn about political economy, about how the wealthy control Parliament. This knowledge makes you a better organizer. When the Chartist 'Plug Plot' strikes erupt across England in August, your factory must decide: join the broader movement or focus locally?",
      choices: [
        {
          text: "Link to the Chartist movement",
          next: "ending_chartist_revolutionary",
          stats: { solidarity: 30, courage: 25 }
        },
        {
          text: "Focus on local factory issues",
          next: "ending_local_reformer",
          stats: { solidarity: 20, survival: 10 }
        }
      ]
    },

    ending_chartist_revolutionary: {
      title: "The Revolutionary",
      date: "1842-1848",
      text: "You link to the Chartist uprising. The government responds brutally. You're arrested, tried for sedition, transported to Australia. You spend seven years in a penal colony.",
      isEnding: true,
      outcome: "You returned to England at thirty-seven, broken physically but not spiritually. You spent twenty-eight more years organizing. You became a living legend—the man who went to Australia for workers' rights and came back still fighting. You died at sixty-five, honored by thousands. Your epitaph: 'Fourteen years in chains, fifty years fighting for freedom.' You were the indomitable spirit of the working class made flesh."
    },

    ending_local_reformer: {
      title: "The Pragmatist",
      date: "1842-1870",
      text: "You focus on local issues and avoid Chartist association. After four weeks, you win modest concessions while Chartist strikes are crushed. Over decades, you achieve incremental progress.",
      isEnding: true,
      outcome: "You became a respected labor negotiator, working within the system for forty years. You lived to sixty-eight, seeing significant reforms accumulate. You proved that patient advocacy within existing systems can achieve meaningful change. Not revolutionary, but real. Your funeral drew thousands who benefited from your persistent, pragmatic activism."
    },

    continue_observing: {
      title: "The Watcher",
      date: "April-July 1842",
      text: "You continue observing without committing. You see the organizers' courage but also their mistakes. When the strike is called, Margaret confronts you: 'Are you with us or not?'",
      choices: [
        {
          text: "Commit to the strike",
          next: "late_joiner",
          stats: { solidarity: 20, courage: 20 }
        },
        {
          text: "Share observations to improve strategy",
          next: "ending_strategic_advisor",
          stats: { solidarity: 25, courage: 15 }
        }
      ]
    },

    ending_strategic_advisor: {
      title: "The Analyst",
      date: "1842-1870",
      text: "You offer strategic analysis that improves the strike. Your planning helps it last five weeks and win concessions. You become a behind-the-scenes organizer.",
      isEnding: true,
      outcome: "You organized for forty years, always behind the scenes. You lived to sixty-five. You were never famous—your work was invisible. But dozens of successful actions bore your fingerprints. Your organizing manuals were studied for generations. You proved that movements need both passionate activists and careful strategists. You were the brain behind many victories."
    },

    focus_survival: {
      title: "The Sole Provider",
      date: "April-September 1842",
      text: "You focus entirely on survival. Work, wages, family. But isolation has costs. When you collapse from exhaustion, William sits beside you: 'You're working yourself to death. Join us. Together, we can change things.'",
      choices: [
        {
          text: "Join the organizing effort",
          next: "join_organizing",
          stats: { solidarity: 25, courage: 20 }
        },
        {
          text: "Continue as before—you have no choice",
          next: "ending_grinding_death",
          stats: { survival: 15, solidarity: -10 }
        }
      ]
    },

    ending_grinding_death: {
      title: "The Slow Death",
      date: "1842-1852",
      text: "You continue focused only on survival. Your lungs worsen year by year. You die at twenty-six, your body destroyed by work.",
      isEnding: true,
      outcome: "You have no legacy. You were a worker who worked until he died young. No one remembers you specifically. Your grave is unmarked. But you represent millions—people ground down by industrial capitalism who never had the luxury of fighting back. Your death was preventable but systemic. The reforms that came later might have saved you, but they required strikes you never supported. You're the reason others fought."
    },

    strike_commitment: {
      title: "The Moment of Truth",
      date: "August 1842",
      text: "When the strike is called, you're among the first to walk out. The solidarity is powerful. But so is Grimshaw's response. Thugs attack. Strikers are arrested. You must decide how far you're willing to go.",
      choices: [
        {
          text: "Stay on the picket line despite violence",
          next: "ending_stalwart_striker",
          stats: { solidarity: 30, courage: 30 }
        },
        {
          text: "Support strike but avoid dangerous situations",
          next: "ending_cautious_striker",
          stats: { solidarity: 20, courage: 15 }
        }
      ]
    },

    ending_stalwart_striker: {
      title: "Standing Firm",
      date: "1842-1867",
      text: "You stand on picket lines despite beatings and arrests. Your courage inspires others. The strike wins major concessions. You continue organizing for twenty-five years.",
      isEnding: true,
      outcome: "You became legendary for courage under fire. You lived to sixty-three, your body scarred but your spirit unbroken. Songs were written about you. Your name became synonymous with courage in labor circles. Your funeral drew tens of thousands. Your epitaph: 'They broke his body but never his will.' You embodied the indomitable human spirit."
    },

    ending_cautious_striker: {
      title: "The Careful Activist",
      date: "1842-1882",
      text: "You support the strike strategically, minimizing personal risk while contributing meaningfully. You organize for forty years, outlasting bolder activists.",
      isEnding: true,
      outcome: "You lived to seventy-four, dying peacefully. Your cautious approach allowed sustained contribution over decades. You trained hundreds of organizers, won dozens of battles. Dramatic heroes inspired people; you actually won victories through patient, sustainable activism. Your legacy: proving that calculated risk-taking, not recklessness, builds lasting movements. You chose to be the tortoise and won the race."
    },

    continue_quiet_support: {
      title: "The Silent Ally Continues",
      date: "August-September 1842",
      text: "You work during the strike but donate wages and pass information. After three weeks, the strike fails. You still have your job. What will you do with it?",
      choices: [
        {
          text: "Help blacklisted strikers find work",
          next: "ending_secret_helper",
          stats: { solidarity: 25, courage: 20 }
        },
        {
          text: "Accept the defeat and move on",
          next: "ending_accept_defeat",
          stats: { survival: 20, solidarity: -10 }
        }
      ]
    },

    ending_secret_helper: {
      title: "The Underground Network",
      date: "1842-1850",
      text: "You use your position to help blacklisted strikers for eight years. You're discovered and fired in 1850, but earn labor movement respect.",
      isEnding: true,
      outcome: "You spent remaining years as a full-time organizer, supported by unions. You lived to sixty-two. Your underground network became a model for supporting blacklisted workers. Your funeral was attended by dozens whose families you'd saved from destitution. Your epitaph: 'He helped those braver than himself. That took its own courage.' You showed that not everyone can be on the front lines, but everyone can help those who are."
    },

    ending_accept_defeat: {
      title: "Moving On",
      date: "1842-1855",
      text: "You accept the defeat and continue working. You marry, have children, live quietly. Reforms won by others eventually benefit you.",
      isEnding: true,
      outcome: "Your obituary was brief. You were a good father and reliable worker, but accomplished nothing beyond personal survival. The world was changed by others while you watched. Your children had better lives because of reforms won by strikers you didn't support. You died comfortable but insignificant. Your legacy: showing that most people choose comfort over courage. You survived but didn't truly live."
    },

    step_back: {
      title: "Withdrawing Support",
      date: "July-August 1842",
      text: "You step back from even quiet support. The strike happens without you and fails. You keep your job but watch others fight.",
      isEnding: true,
      outcome: "You died at fifty-three of lung disease, never having risked anything. You stayed safe while others fought for reforms that would have benefited you. Twenty years later, another generation won those reforms. You lived longer than many activists but accomplished less than those who died young fighting. Your epitaph: 'He saw clearly and did nothing.' Intelligence without courage is tragedy."
    },

    limited_commitment: {
      title: "The Careful Activist",
      date: "May-August 1842",
      text: "You help but stay cautious. When the strike begins, your informal status creates ambiguity. Do you strike or work? You decide to strike for the first few days, then return claiming family obligations.",
      isEnding: true,
      outcome: "You lived to sixty-one. You were a perpetual supporter—attending some meetings, contributing some money, participating in some actions. You were never absent but never fully present. You wanted to be braver but never quite managed it. Your epitaph: 'He tried.' It's more than some can say, less than others managed. Perhaps that describes most of us—neither heroes nor villains."
    },

    withdraw_organizing: {
      title: "The Withdrawn Worker",
      date: "April-August 1842",
      text: "You withdraw from organizing. The risks are too great. When the strike begins, you watch from the sidelines. It fails after three weeks.",
      choices: [
        {
          text: "Join late despite earlier withdrawal",
          next: "late_joiner",
          stats: { solidarity: 20, courage: 20 }
        },
        {
          text: "Continue working and accept defeat",
          next: "ending_accept_defeat",
          stats: { survival: 20, solidarity: -20 }
        }
      ]
    }
  };

  const currentSceneData = scenes[currentScene];

  if (!currentSceneData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-stone-900 to-black flex items-center justify-center">
        <div className="text-white text-center p-8">
          <Skull className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-xl mb-4">Scene not found: {currentScene}</p>
          <button
            onClick={onBack}
            className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-all"
          >
            Return to Timeline
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-stone-900 to-black relative overflow-hidden">
      {/* Decorative industrial elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 text-9xl">⚙️</div>
        <div className="absolute bottom-10 right-10 text-9xl">🏭</div>
        <div className="absolute top-1/2 right-1/4 text-6xl">🔨</div>
      </div>

      {/* Stats Panel */}
      <div className="fixed top-4 right-4 bg-stone-900/90 backdrop-blur-sm border-2 border-gray-800/60 rounded-lg p-4 z-20 w-64">
        <h3 className="text-gray-400 font-serif font-bold mb-3 text-center">Your Character</h3>
       
        <div className="space-y-3">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-gray-300 text-sm flex items-center gap-2">
                <Factory className="w-4 h-4" />
                Solidarity
              </span>
              <span className="text-gray-200 text-sm font-bold">{stats.solidarity}%</span>
            </div>
            <div className="w-full bg-stone-800 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-red-600 to-orange-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${stats.solidarity}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-gray-300 text-sm flex items-center gap-2">
                <Hammer className="w-4 h-4" />
                Courage
              </span>
              <span className="text-gray-200 text-sm font-bold">{stats.courage}%</span>
            </div>
            <div className="w-full bg-stone-800 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-blue-600 to-cyan-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${stats.courage}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-gray-300 text-sm flex items-center gap-2">
                <Heart className="w-4 h-4" />
                Will to Survive
              </span>
              <span className="text-gray-200 text-sm font-bold">{stats.survival}%</span>
            </div>
            <div className="w-full bg-stone-800 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-green-600 to-emerald-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${stats.survival}%` }}
              />
            </div>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-gray-800/40">
          <p className="text-gray-400/70 text-xs text-center italic">
            In the factory's shadow, choose your path
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-8 max-w-4xl">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-300 hover:text-gray-100 transition-colors mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Return to Timeline</span>
        </button>

        {/* Story Card */}
        <div className="bg-stone-900/80 backdrop-blur-sm border-2 border-gray-800/60 rounded-lg overflow-hidden shadow-2xl">
          {/* Header */}
          <div className="bg-gradient-to-r from-gray-900 to-stone-900 p-6 border-b-2 border-gray-800/60">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <Factory className="w-8 h-8 text-gray-300" />
                <div>
                  <h2 className="text-3xl font-serif font-bold text-gray-300">
                    {currentSceneData.title}
                  </h2>
                  <p className="text-gray-400/80 text-sm italic">{currentSceneData.date}</p>
                </div>
              </div>
              {currentSceneData.isEnding && (
                <div className="flex items-center gap-2 bg-gray-700/30 px-3 py-1 rounded-full">
                  <Skull className="w-4 h-4 text-gray-300" />
                  <span className="text-gray-300 text-sm font-bold">Ending</span>
                </div>
              )}
            </div>
          </div>

          {/* Story Text */}
          <div className="p-8">
            <div className="prose prose-invert max-w-none">
              {currentSceneData.text.split('\n\n').map((paragraph, index) => (
                <p key={index} className="text-gray-100 text-lg leading-relaxed mb-4 font-serif">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Ending Outcome */}
            {currentSceneData.isEnding && currentSceneData.outcome && (
              <div className="mt-8 p-6 bg-gray-900/20 border-2 border-gray-700/50 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-6 h-6 text-gray-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-gray-300 font-serif font-bold text-xl mb-2">Your Legacy</h3>
                    <p className="text-gray-200 leading-relaxed">
                      {currentSceneData.outcome}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Choices */}
            {!currentSceneData.isEnding && currentSceneData.choices && (
              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-2 text-gray-400 font-serif font-bold">
                  <span className="text-lg">Choose your path:</span>
                </div>
                {currentSceneData.choices.map((choice, index) => (
                  <button
                    key={index}
                    onClick={() => makeChoice(choice.next, choice.text, choice.stats)}
                    className="w-full text-left p-5 bg-gradient-to-r from-stone-800/50 to-gray-950/30 hover:from-gray-900/40 hover:to-stone-900/40 border-2 border-gray-800/40 hover:border-gray-600 rounded-lg transition-all duration-300 group"
                  >
                    <p className="text-gray-200 group-hover:text-gray-100 font-serif leading-relaxed">
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
                    setStats({ solidarity: 50, courage: 50, survival: 50 });
                  }}
                  className="flex-1 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-serif font-semibold rounded-lg transition-all duration-300"
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
          <div className="mt-6 bg-stone-900/60 backdrop-blur-sm border border-gray-800/40 rounded-lg p-4">
            <h3 className="text-gray-400 font-serif font-bold mb-3 text-sm">Your Journey So Far:</h3>
            <div className="space-y-2">
              {choices.map((choice, index) => (
                <div key={index} className="flex items-start gap-2">
                  <span className="text-gray-600 text-xs mt-1">▸</span>
                  <p className="text-gray-300/70 text-xs">{choice}</p>
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

export default IndustrialStory;
