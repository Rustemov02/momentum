📝 Momentum – Intelligent Offline-First Note-Taking
Momentum is a modern, full-stack productivity application built with a focus on security, AI-enhanced features, and a seamless offline-first experience. It allows users to manage their personal knowledge base with intelligent tools in a high-performance environment.

🚀 Features
Google OAuth 2.0 Integration: Secure user authentication and session management using Passport.js.

AI-Powered Assistance: Built-in support for automated note summarization and content analysis.

Smart Querying (RAG): An advanced retrieval system that allows you to "talk" to your notes and get contextual answers based on your saved data.

Offline-First & PWA: Fully functional offline capabilities with cached data support, ensuring your notes are always accessible.

Dynamic Tagging System: A smart sidebar featuring a "Tag Cloud" where tags are visually prioritized based on usage frequency.

Note Expiration: Flexible management of note lifespans with presets (24h, 3d, 7d, or Permanent).

Responsive UI: A clean, mobile-first design built for both desktop and smartphone users.

🌐 Tech Stack
Frontend:

React & TypeScript: For building a robust and type-safe user interface.

Vite: For ultra-fast development and optimized production builds.

Tailwind CSS: For modern, utility-first styling.

PWA: Service workers and manifest for offline support and installability.

Backend:

Node.js & Express: Handling the core server logic and API routes.

MongoDB: NoSQL database for flexible and scalable data storage.

Passport.js: Managing Google OAuth strategy and user sessions.

OpenAI / Vercel AI SDK: Powering the intelligent RAG (Retrieval-Augmented Generation) features.

Deployment:

Frontend: Hosted on Vercel.

Backend: Hosted on Render.

🔐 Authentication & Health Checks
Data Isolation: Users can only access and manage their own specific notes.

Session Validation: Active sessions are validated via the /api/me endpoint.

Anti-Sleep (Health-Check): Includes a dedicated /api/ping public endpoint to keep the Render instance awake via external cron-jobs without requiring authentication.
---

## 🎯 Purpose

Practice secure, user-specific data handling, offline-first logic, and real-world frontend–backend integration.
