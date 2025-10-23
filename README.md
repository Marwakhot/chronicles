# Chronicles: Rewritten

**Live Demo:** [https://chronicles-tawny.vercel.app/](https://chronicles-tawny.vercel.app/)

An immersive interactive narrative experience that places you at pivotal moments in history. Make choices that matter, face moral dilemmas, and discover how your decisions shape not just individual lives, but the course of history itself.

![Chronicles: Rewritten](https://img.shields.io/badge/status-live-success) ![Next.js](https://img.shields.io/badge/Next.js-14.0-black) ![React](https://img.shields.io/badge/React-18.2-blue) ![License](https://img.shields.io/badge/license-MIT-green)

## 📜 About The Project

Chronicles: Rewritten is an interactive storytelling platform that transforms historical events into deeply personal narrative experiences. Rather than simply reading about history, you become an active participant, making decisions that reflect the complex moral, ethical, and practical dilemmas faced by people throughout time.

### Why This Project Matters

- **Educational Impact**: Learn history through immersive experience rather than passive reading
- **Moral Complexity**: Explore ethical dilemmas without easy answers, reflecting real historical choices
- **Empathy Building**: Walk in the shoes of people from different eras, cultures, and circumstances
- **Multiple Perspectives**: See how the same historical events can be experienced differently based on choices
- **Consequence-Driven**: Every decision has weight, creating branching narratives with dozens of unique endings

## ✨ Key Features

### 🎭 **Deep Interactive Narratives**
- **Branching Storylines**: Each story contains 30-50+ unique scenes with multiple endings
- **Meaningful Choices**: Every decision impacts your character's stats (loyalty, morality, courage, etc.)
- **Consequence System**: Your choices early in the story affect options and outcomes later
- **Multiple Endings**: Discover 15-25 different endings per story, from heroic to tragic

### 📚 **Five Historical Eras**

1. **Ancient World** (3000 BCE - 500 CE)
   - Experience Julius Caesar's assassination on the Ides of March
   - Navigate Roman politics, loyalty, and betrayal

2. **Medieval & Renaissance** (500 - 1500 CE)
   - Survive the Black Death plague
   - Make choices about faith, community, and survival

3. **Age of Exploration** (1500 - 1800 CE)
   - Join Hernán Cortés's expedition to Mexico
   - Face ethical dilemmas about conquest and cultural destruction

4. **Revolutions & Industrial Age** (1750 - 1900 CE)
   - Work in Manchester's cotton mills during the Industrial Revolution
   - Organize labor movements and face worker exploitation

5. **Modern History** (1900 - 2000 CE)
   - Respond to the Chernobyl nuclear disaster
   - Make split-second decisions with life-or-death consequences

### 🎮 **Sophisticated Game Mechanics**

- **Dynamic Stats System**: Track your character's values in real-time
  - Loyalty vs. Betrayal
  - Compassion vs. Survival
  - Truth vs. Compromise
  - Faith vs. Pragmatism

- **Choice Memory**: The game remembers every decision you make
- **Progressive Difficulty**: Stories range from Medium to Very Hard complexity
- **Historical Accuracy**: Each narrative is grounded in real historical events and dynamics

### 🎨 **Immersive Design**

- **Era-Specific Aesthetics**: Each timeline has unique visual styling and color schemes
- **Cinematic Animations**: Smooth transitions and atmospheric effects
- **Responsive Layout**: Optimized for desktop, tablet, and mobile devices
- **Elegant Typography**: Period-appropriate fonts (Cinzel & Crimson Text)

### 📊 **Progress Tracking**

- **Journey History**: View all the choices you've made during your playthrough
- **Multiple Playthroughs**: Replay stories to discover different paths and endings
- **Stat Visualization**: Real-time stat bars show how your character is developing

## 🚀 Getting Started

### Prerequisites

- Node.js 16.x or higher
- npm or yarn package manager

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/chronicles-rewritten.git
cd chronicles-rewritten
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Run the development server**
```bash
npm run dev
# or
yarn dev
```

4. **Open your browser**
```
Navigate to http://localhost:3000
```

### Building for Production

```bash
npm run build
npm start
```

## 🏗️ Project Structure

```
chronicles-rewritten/
├── app/
│   ├── globals.css          # Global styles and animations
│   ├── layout.js            # Root layout component
│   └── page.js              # Main app entry point
├── components/
│   ├── LandingPage.jsx      # Animated welcome screen
│   ├── WelcomePage.jsx      # Introduction and instructions
│   ├── TimelineSelection.jsx # Era selection interface
│   ├── StorySelection.jsx   # Story picker within each era
│   ├── AncientStory.jsx     # Julius Caesar assassination story
│   ├── MedievalStory.jsx    # Black Death plague story
│   ├── ExplorationStory.jsx # Spanish conquest story
│   ├── IndustrialStory.jsx  # Industrial Revolution story
│   └── ModernStory.jsx      # Chernobyl disaster story
├── public/                  # Static assets
└── package.json            # Project dependencies
```

## 🎯 How to Play

1. **Begin Your Journey**: Start from the landing page
2. **Select a Timeline**: Choose from five historical eras
3. **Pick Your Story**: Each era contains unique historical scenarios
4. **Make Choices**: Read carefully and choose your path
5. **Watch Stats Change**: Your decisions affect your character's values
6. **Discover Endings**: Reach one of many possible conclusions
7. **Try Again**: Replay to explore different paths and outcomes

## 🛠️ Technologies Used

- **[Next.js 14](https://nextjs.org/)** - React framework for production
- **[React 18](https://react.dev/)** - UI component library
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Lucide React](https://lucide.dev/)** - Beautiful icon library
- **[Vercel](https://vercel.com/)** - Deployment and hosting platform

## 🎓 Educational Value

Chronicles: Rewritten serves multiple educational purposes:

1. **Historical Literacy**: Learn about major historical events in context
2. **Critical Thinking**: Analyze complex situations without clear right answers
3. **Ethical Development**: Explore moral philosophy through practical dilemmas
4. **Empathy Training**: Experience different perspectives and consequences
5. **Decision-Making Skills**: Practice weighing competing values and outcomes

## 🌟 Unique Selling Points

- **No Superficial Choices**: Every decision genuinely affects the story
- **Historically Grounded**: Events and dilemmas based on real historical records
- **Moral Complexity**: No black-and-white answers, reflecting real human experience
- **Replayability**: Dozens of unique paths and endings per story
- **Accessible Learning**: Engaging way to understand history beyond textbooks
- **Beautiful Presentation**: Polished UI/UX with attention to period aesthetics

## 🔮 Future Enhancements

- [ ] Additional stories in each era
- [ ] User accounts to save progress
- [ ] Achievement system
- [ ] Historical fact database linked to choices
- [ ] Multiplayer/discussion features
- [ ] Teacher tools and curriculum guides
- [ ] Accessibility improvements (screen reader support, etc.)
- [ ] Mobile app versions
- [ ] Localization for multiple languages

## 🤝 Contributing

Contributions are welcome! Whether it's:

- **New Stories**: Help write additional historical scenarios
- **Bug Fixes**: Report or fix issues you encounter
- **Enhancements**: Suggest or implement new features
- **Documentation**: Improve guides and explanations
- **Historical Accuracy**: Help verify or improve historical details

Please read our [Contributing Guidelines](CONTRIBUTING.md) before submitting pull requests.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Credits

- **Game Design & Development**: [Your Name]
- **Historical Research**: Based on academic sources and historical records
- **Typography**: Cinzel and Crimson Text fonts from Google Fonts
- **Icons**: Lucide React icon library

## 📧 Contact

Project Link: [https://github.com/yourusername/chronicles-rewritten](https://github.com/yourusername/chronicles-rewritten)

Live Demo: [https://chronicles-tawny.vercel.app/](https://chronicles-tawny.vercel.app/)

## 🙏 Acknowledgments

- Historical consultants and resources that informed the narratives
- Beta testers who provided valuable feedback
- The open-source community for the amazing tools and libraries

---

**"Those who cannot remember the past are condemned to repeat it."** - George Santayana

Experience history. Make choices. Shape destiny.
