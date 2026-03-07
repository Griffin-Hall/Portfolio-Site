/**
 * Personal info — edit this file to customize your portfolio.
 */
const profile = {
  name: 'Your Name',
  title: 'Creative Developer & Designer',
  email: 'griffinhall123@gmail.com',

  hero: {
    headline: 'I build, break, and\nlearn by doing.',
    subheadline:
      'Developer and problem solver — turning curiosity into real projects, one experiment at a time.',
    cta: 'View My Work',
  },

  about: {
    bio: [
      "I'm a self-taught developer who learned by fixing small UI bugs and shipping side projects after hours. I like to keep things practical and improve by building, not by overhyping.",
      'Lately I have been prototyping AI-powered features, writing C++ desktop utilities with MFC, and drawing custom UI elements with GDI+. On the web side I work with React, Vite, Tailwind, and Three.js to keep interfaces fast and intentional.',
    ],
    skills: [
      'JavaScript & TypeScript',
      'React + Vite',
      'Tailwind CSS',
      'React Three Fiber',
      'C++',
      'MFC',
      'GDI+',
      'AI prototyping (Python/PyTorch)',
      'REST/GraphQL APIs',
      'Git & GitHub Actions',
    ],
    toolkit: [
      {
        category: 'Frontend',
        icon: '◆',
        items: [
          { name: 'React + Vite', note: 'Primary stack for all web projects' },
          { name: 'Tailwind CSS', note: 'Rapid styling & responsive design' },
          { name: 'Three.js / R3F', note: '3D scenes, globe viz, particle effects' },
          { name: 'TypeScript', note: 'Type-safe code on larger projects' },
        ],
      },
      {
        category: 'Desktop & Systems',
        icon: '▣',
        items: [
          { name: 'C++', note: 'Desktop utilities & performance-critical code' },
          { name: 'MFC', note: 'Windows UI framework for native apps' },
          { name: 'GDI+', note: 'Custom-drawn UI elements & graphics' },
        ],
      },
      {
        category: 'AI & Data',
        icon: '◎',
        items: [
          { name: 'Python', note: 'Scripting, automation, prototyping' },
          { name: 'PyTorch', note: 'Experimenting with ML models' },
          { name: 'REST / GraphQL', note: 'API design & integration' },
          { name: 'AI API Integration', note: 'Building apps powered by OpenAI, Anthropic & other APIs' },
        ],
      },
      {
        category: 'AI Tools',
        icon: '✦',
        items: [
          { name: 'Claude Code', note: 'AI-assisted coding & pair programming' },
          { name: 'Codex / Copilot', note: 'Code generation & rapid prototyping' },
          { name: 'OpenClaw', note: 'Open-source AI agent tooling' },
          { name: 'Cursor', note: 'AI-native IDE for accelerated development' },
        ],
      },
      {
        category: 'DevOps & Tools',
        icon: '⚙',
        items: [
          { name: 'Git & GitHub', note: 'Version control & collaboration' },
          { name: 'GitHub Actions', note: 'CI/CD pipelines & auto-deploy' },
          { name: 'Vite', note: 'Fast builds & HMR for dev workflow' },
        ],
      },
    ],
    resumeUrl: null, // set to a URL or file path to enable the resume button
  },

  social: {
    github: null,
    linkedin: null,
    twitter: null, // set to URL or null to hide
  },
}

export default profile
