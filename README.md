# GasNow

On-demand LPG gas delivery marketplace connecting customers, vendors, delivery riders, and administrators.

## Tech Stack

### Backend
- Node.js + Express + TypeScript
- PostgreSQL + Prisma
- JWT + OTP Authentication
- Clean Architecture

### Frontend
- React + Vite + TypeScript
- Tailwind CSS (GasNow Design System)
- TanStack Query
- React Router v6

## Getting Started

### Prerequisites
- Node.js 20+
- PostgreSQL 16+
- npm

### Setup

```bash
# 1. Install dependencies
cd backend && npm install
cd ../frontend && npm install
cd ..

# 2. Set up environment variables
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env

# 3. Start PostgreSQL and create database
createdb gasnow

# 4. Run database migrations
cd backend
npx prisma migrate dev --name init
npx prisma generate
cd ..

# 5. Start development servers
npm run dev
```

### Seed Data

```bash
cd backend
npx tsx src/database/seeds/index.ts
```

## Project Structure

```
gasnow/
├── backend/
│   ├── prisma/               # Prisma schema & migrations
│   ├── src/
│   │   ├── config/           # Configuration
│   │   ├── common/           # Shared middleware, exceptions, utils
│   │   ├── database/         # Prisma client, seeds
│   │   ├── modules/          # Feature modules (Clean Architecture)
│   │   ├── integrations/     # External service integrations
│   │   ├── app.ts            # Express app
│   │   └── main.ts           # Entry point
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── features/         # Feature modules
│   │   ├── layouts/          # Layout components
│   │   ├── hooks/            # Custom hooks
│   │   ├── services/         # API services
│   │   ├── types/            # TypeScript types
│   │   ├── utils/            # Utilities
│   │   ├── App.tsx           # Root component
│   │   └── main.tsx          # Entry point
│   └── package.json
├── .github/workflows/ci.yml  # CI pipeline
├── .prettierrc                # Prettier config
└── package.json               # Root scripts
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start both backend (4000) and frontend (5173) |
| `npm run dev:backend` | Start backend only |
| `npm run dev:frontend` | Start frontend only |
| `npm test` | Run all tests |
| `npm run lint` | Lint all projects |
| `npm run build` | Build all projects |
