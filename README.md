<div align="center">
  <img src="./public/window.svg" alt="Crypto Dashboard icon" width="80" />
  <h1>Crypto Tracker Dashboard</h1>
  <p>A sleek Next.js dashboard for tracking top cryptocurrencies, favorite coins, and market trends in near real-time.</p>
</div>

## Overview

The Crypto Tracker Dashboard consumes the public CoinGecko Markets API to display the top cryptocurrencies, including price action, 24h performance, 7-day sparklines, and market cap. Users can favorite coins for quick filtering, refresh the feed every 30 seconds, switch themes, and even keep using the UI offline thanks to the PWA setup.

## Features

- Favorite toggle with local-storage persistence and filter view
- Client-side pagination for the top market-cap coins
- 7-day sparkline mini charts powered by `recharts`
- Auto-refreshing market data via React Query (30-second interval)
- Offline + error detection with friendly alerts
- Light/dark theme toggle
- Installable PWA experience using `@ducanh2912/next-pwa`

## Tech Stack

- **Framework:** Next.js 15 (App Router, React 19)
- **Styling:** Tailwind CSS v4, CSS variables, custom gradients
- **State/Data:** @tanstack/react-query, custom hooks, local storage
- **UI Components:** shadcn/ui primitives, Lucide icons
- **Charts:** `recharts` sparklines for trend visualization
- **Tooling:** TypeScript, ESLint 9, Turbopack dev/build pipeline

## Getting Started

### Prerequisites

- Node.js 20+ (matches the Next.js 15 requirement)
- npm 10+ (or your preferred package manager such as pnpm or bun)

### Installation

```bash
npm install
```

### Development server

```bash
npm run dev
```

Then open http://localhost:3000 to use the dashboard. The app hot-reloads on save.

### Production build

```bash
npm run build
npm run start
```

`npm run build` uses Turbopack to create an optimized production bundle, and `npm run start` serves it on port 3000 by default.

### Linting

```bash
npm run lint
```

Runs ESLint with the Next.js base config to ensure code quality and type safety.

## Project Structure

```
app/                # App Router entry points, layout, and global styles
components/         # UI components (tables, charts, alerts, pagination, etc.)
hooks/              # React Query data hooks and custom logic (favorites, offline)
lib/                # Shared types and utilities
public/             # Icons, PWA assets, manifest
```

## API & Data Refresh

The dashboard fetches public market data from the CoinGecko `/coins/markets` endpoint. No API key is required, but be mindful of the public rate limits during heavy usage. React Query auto-refreshes the data every 30 seconds and caches responses to keep the UI responsive.

## Offline / PWA Notes

- PWA integration (`@ducanh2912/next-pwa`) enables install prompts on supported browsers.
- `useIsOffline` displays a banner when the network disconnects, allowing users to continue browsing cached data.


