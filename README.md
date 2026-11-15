# TimeWise / KSAM Deal

Intelligent Timetable, Scheduling, Productivity & Life Management Platform.

A high-performance full-stack web application built with **React, Vite, TypeScript, Tailwind CSS**, and an **Express.js / Node.js** backend. It features an interactive smartwatch-themed hero, dynamic bento widgets dashboard, conflict-solving smart timetables, habit streak tracking, procedural ambient sound focus chamber, campus commute mapping, and real-time weather integration.

---

## 🌟 Key Features

- **Dynamic Bento Grid Dashboard**: Real-time widgets including weekly schedule, working time analytics curves, daily hours split, interactive audio note player, and hierarchical project tasks.
- **Smart Timetable & Conflict Engine**: Day, Week, and Agenda views with Week A/B cycle rotation, automated conflict resolution, and calendar export (`.ics` / `.json`).
- **Explainable Smart Planner**: Rule-based scheduling optimizer matching energy levels with task priorities.
- **Focus Chamber**: Pomodoro and deep work timers with built-in procedural Web Audio synthesizer (Rain, White Noise, Ocean Waves, 40Hz Gamma).
- **Habit Streaks & XP**: 14-day heatmap trails, Level/XP progression, and Grace Day Freezes for streak recovery.
- **Geolocation & Weather**: OpenStreetMap routing with transit buffer calculation and real-time Open-Meteo forecasts.
- **Supabase & PostgreSQL Ready**: Complete PostgreSQL migrations and Row Level Security policies ready for cloud deployment.

---

## 🛠️ Tech Stack

- **Frontend**: Vite, React 18, TypeScript, Tailwind CSS, React Router v6, Lucide React, Zustand, Recharts, Leaflet, Web Audio API
- **Backend**: Node.js, Express.js, TypeScript, Node-cron, Zod, CORS
- **Database**: PostgreSQL / Supabase schema with RLS policies (`/supabase/migrations/`)

---

## 📸 Screenshots

*(Place application screenshots and UI demos here)*

---

## 📋 Prerequisites

- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher
- **Git**: Installed and configured

---

## 🚀 Installation & Running

### 1. Clone the repository
```bash
git clone <YOUR_REPOSITORY_URL>
cd <REPO_FOLDER>
```

### 2. Install Dependencies
```bash
# Install root, client, and server dependencies
npm run install:all # or install in /client and /server
cd client && npm install
cd ../server && npm install
cd ..
```

### 3. Environment Variables
Copy the example environment configuration:
```bash
cp .env.example .env
```
Key variables configured in `.env.example`:
- `PORT`: Backend server port (default: 5000)
- `CLIENT_URL`: Client URL (default: http://localhost:5173)
- `VITE_SUPABASE_URL`: Supabase project URL (optional for local demo mode)
- `VITE_SUPABASE_ANON_KEY`: Supabase anon key

### 4. Run Development Servers
```bash
# Start frontend client (http://localhost:5173)
npm run dev --prefix client

# Start backend server (http://localhost:5000)
npm run dev --prefix server
```

### 5. Build for Production
```bash
# Builds both client and server
npm run build
```

---

## 📁 Folder Structure

```
├── client/                     # Vite + React frontend
│   ├── public/                 # Static assets, icons, video hero
│   ├── src/
│   │   ├── components/         # Reusable UI & Bento grid widgets
│   │   ├── hooks/              # Custom React hooks
│   │   ├── pages/              # App routes & views
│   │   ├── services/           # Mock AuthService & API adapters
│   │   ├── store/              # Zustand state stores
│   │   └── types/              # TypeScript interfaces & types
│   └── package.json
├── server/                     # Express REST API backend
│   ├── src/                    # API routes, middleware, controllers
│   └── package.json
├── supabase/                   # Supabase database schema & RLS migrations
├── database/                   # Standalone PostgreSQL SQL schemas
├── .env.example                # Example environment variables
├── .gitignore                  # Git ignore rules
├── LICENSE                     # MIT License
└── README.md
```

---

## 🤝 Contributing & Git Workflow

See [CONTRIBUTING.md](./CONTRIBUTING.md) for branch management and commit guidelines.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.
