import gsMain from '../../Photos/Voyages/MainPage.png'
import gsImg2 from '../../Photos/Voyages/Image2.png'
import gsImg3 from '../../Photos/Voyages/image3.png'
import gsImg4 from '../../Photos/Voyages/image4.png'
import gsImg5 from '../../Photos/Voyages/image5.png'
import gsImg6 from '../../Photos/Voyages/image6.png'

import odyssey1 from '../../Photos/EuropeanOdysseyExample.png'
import odyssey2 from '../../Photos/EuropeanOdysseyExample2.png'
import odyssey3 from '../../Photos/EuropeanOdysseyExample3.png'
import odyssey4 from '../../Photos/EuropeanOdysseyExample4.png'

import scHFT from '../../Photos/SierraChart-C++/HFT-S-D-Window-C++.png'
import scAccountStats from '../../Photos/SierraChart-C++/AccountStats-C++-SC.png'
import scAccountStats2 from '../../Photos/SierraChart-C++/AccountStats-C++-SC2.png'
import scAccountWindow from '../../Photos/SierraChart-C++/AccountWindow-C++-SC.png'
import scForexNews from '../../Photos/SierraChart-C++/ForexNews-C++SC.png'
import scLiqMap from '../../Photos/SierraChart-C++/LiqMap-SC-C++.png'
import scGlyph from '../../Photos/SierraChart-C++/Glyph-SC-C++.png'
import scMarketMaking from '../../Photos/SierraChart-C++/MarketMaking-Engine-C++.png'
import scTSStats from '../../Photos/SierraChart-C++/TS-Stats-SC-C++.png'
import aiCx1 from '../../Photos/Ai-CX-Dashboard/DashboardImage1.png'
import aiCx2 from '../../Photos/Ai-CX-Dashboard/DashboardImage2.png'
import aiCx3 from '../../Photos/Ai-CX-Dashboard/DashboardImage3.png'

/**
 * Projects data - edit this array to add/update/remove projects.
 *
 * Each project object:
 *   title       - project name
 *   description - short summary (1-2 sentences)
 *   image       - path relative to /public (e.g. "/projects/my-app.png")
 *   tags        - array of tech/category tags
 *   category    - used for filtering (e.g. "Web", "Mobile", "Design", "Data")
 *   liveUrl     - link to live demo (optional, set to null)
 *   repoUrl     - link to source code (optional, set to null)
 */
const projects = [
  {
    title: 'AI Support Dashboard',
    description:
      'Support Triage Cloud is an AI-assisted support operations dashboard for classifying tickets, routing priority queues, drafting responses, and tracking team performance in real time.',
    fullDescription:
      'Support Triage Cloud is a full-stack customer-support workspace built for fast, high-volume triage. Agents can review a live ticket queue, open a structured ticket workspace, run AI analysis for category and priority, edit an AI-generated draft, and send a final reply that closes the ticket and updates reporting metrics.\n\nThe platform uses a React + TypeScript frontend and an Express + Prisma backend with SQLite for demo mode. AI classification supports provider-based analysis (OpenAI/Gemini/Kimi) with robust keyword fallback when providers are unavailable. Each ticket is routed into a primary queue (Urgent, Billing, Technical, Sales, Misc) using deterministic category/priority rules, with Needs Review flags for ambiguous fallback cases. A dedicated KPI/Stats page reports ticket closure throughput, AI draft usage, and daily ticket trends, including deterministic demo-mode volume simulation for realistic dashboard behavior.\n\nThe experience focuses on fast triage loops, reliable fallback behavior, and clear agent workflows that keep humans in control while reducing routine response overhead.',
    image: aiCx1,
    gallery: [aiCx1, aiCx2, aiCx3],
    highlights: [
      'AI-assisted triage pipeline for category, priority, and draft reply generation',
      'Queue-based routing logic with live counts across Urgent, Billing, Technical, Sales, and Misc',
      'Agent workspace separating customer message, AI analysis, AI draft, and final reply',
      'Fallback-safe behavior with Needs Review handling when AI providers fail or are unavailable',
      'KPI/Stats dashboard for closures, AI draft usage, and daily created vs closed trend charts',
      'Real-time UX updates after analyze, regenerate, and send reply actions',
    ],
    tags: [
      'React',
      'TypeScript',
      'Vite',
      'Tailwind CSS',
      'Express.js',
      'Prisma ORM',
      'SQLite',
      'OpenAI',
      'Gemini',
      'Kimi',
      'AI Triage',
      'Dashboard UI',
    ],
    category: 'AI & Data',
    liveUrl: null,
    repoUrl: null,
  },
  {
    title: 'GlobeSense',
    description:
      'AI-driven travel discovery platform — search destinations in natural language and get ranked results via vector similarity instead of keyword matching.',
    fullDescription:
      'GlobeSense is an AI-driven travel discovery platform that lets users search destinations in natural language (e.g. "cozy coastal town with great nightlife") and returns ranked, relevant results using vector similarity instead of simple keyword matching.\n\nUser queries are embedded via the OpenAI Embeddings API and compared against a 255‑destination vector dataset using cosine similarity in PostgreSQL 16 with the pgvector extension. This keeps semantic search and relational data in a single database, avoiding a separate vector store. The database is containerized with Docker Compose, with Prisma ORM managing migrations and seeding.\n\nAn Express.js API exposes the semantic search endpoint, and a React frontend provides a natural-language search bar with destination cards and an interactive map. Together, they deliver a full AI search pipeline from query → embedding → similarity search → ranked travel suggestions.',
    image: gsMain,
    gallery: [gsMain, gsImg2, gsImg3, gsImg4, gsImg5, gsImg6],
    highlights: [
      'OpenAI Embeddings API for intent-aware, semantic destination search',
      'PostgreSQL 16 + pgvector for in-database cosine similarity on vector columns',
      'Docker Compose–managed database with persistent volume',
      'Prisma ORM migrations and seed script for a 255‑destination dataset',
      'Express.js API + React UI for a complete end-to-end search experience',
    ],
    tags: [
      'OpenAI API',
      'Vector Embeddings',
      'pgvector',
      'PostgreSQL 16',
      'Docker',
      'Prisma ORM',
      'Express.js',
      'React',
      'AI Search',
    ],
    category: 'AI & Data',
    liveUrl: 'https://griffin-hall.github.io/GlobeSense-AI-Website/',
    repoUrl: null,
  },
  {
    title: 'European Odyssey Dashboard',
    description:
      'Immersive Three.js globe planner that connects 70+ European cities from Vancouver with AI-assisted insights.',
    image: odyssey1,
    gallery: [odyssey1, odyssey2, odyssey3, odyssey4],
    highlights: [
      'Globe launcher from Vancouver with smooth spin/zoom using React Three Fiber',
      '70+ city profiles detailing costs, weather, safety, and tourism load',
      'Smart route builder that auto-optimizes multi-stop rail and flight legs',
      'Interactive filters for cost, climate, tourism busyness, and crime with instant updates',
      'Dual day/night themes that swap globe textures for polished light/dark views',
    ],
    tags: [
      'React',
      'Vite',
      'React Three Fiber',
      'Three.js',
      'Tailwind CSS',
      'Map & data viz',
      'AI-assisted curation',
    ],
    category: '3D Web',
    liveUrl: 'https://griffin-hall.github.io/EuropeanTravel/',
    repoUrl: null,
  },
  {
    title: 'Real-Time Futures Trading Desktop Suite',
    description:
      'High-performance C++ / MFC / GDI+ systems for low-latency market analysis, visualization, and trader safety.',
    fullDescription:
      'I design and build professional desktop tools in C++, using MFC for native Windows interfaces and GDI+ for high-performance custom rendering. These applications are built for real-time futures market workflows, where incoming data must be processed, analyzed, and displayed with extremely low latency and high reliability.\n\nThis work focuses on efficient streaming architecture, clean native UI engineering, and performance-conscious rendering for fast-moving data such as Time & Sales, Market Depth, account statistics, and live economic events. Some systems are designed to update in as little as 4 milliseconds, requiring careful attention to memory use, caching, redraw control, resource cleanup, and responsive modeless window behavior.\n\nAlthough these tools were built for trading, the engineering behind them applies broadly to any environment that demands real-time analytics, high-frequency event handling, low-latency desktop visualization, and safety-critical controls.',
    image: scHFT,
    gallery: [
      scHFT,
      scMarketMaking,
      scLiqMap,
      scAccountWindow,
      scAccountStats,
      scAccountStats2,
      scForexNews,
      scGlyph,
      scTSStats,
    ],
    highlights: [
      'Native C++ desktop engineering with MFC',
      'Custom GDI+ dashboards and visual rendering',
      'Low-latency streaming systems with real-time updates',
      'Performance-focused architecture with caching and efficient redraw logic',
      'Robust handling of live event-driven data',
      'Safety features and operational controls for high-stakes workflows',
    ],
    tags: [
      'C++',
      'MFC',
      'GDI+',
      'Real-Time Systems',
      'Desktop Engineering',
      'Low-Latency',
      'Market Data',
    ],
    category: 'Desktop',
    liveUrl: null,
    repoUrl: null,
  },
]

export default projects
