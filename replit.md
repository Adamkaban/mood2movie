# Mood2movie - AI Movie Recommendation System

## Overview

Mood2movie is a web application that recommends movies based on the user's current mood. The system uses AI to analyze mood descriptions and match them with appropriate film genres, then fetches movie data from the Kinopoisk API to provide personalized recommendations.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack:**
- React with TypeScript
- Vite as build tool and dev server
- Wouter for client-side routing
- TanStack Query for server state management
- Tailwind CSS with shadcn/ui component library

**Design System:**
- Dark-mode-first approach with minimalist aesthetic
- Custom gradient system for mood categorization (positive, energetic, thoughtful, emotional, special)
- Responsive layout using Tailwind breakpoints
- Component-based architecture with reusable UI elements

**Key UI Components:**
- MoodGrid: Grid of emoji-labeled mood buttons for user selection
- MovieCard: Displays movie details with poster, metadata, and action buttons
- LoadingSkeleton: Animated placeholder during data fetching
- ErrorMessage: User-friendly error handling with retry capability

**Routing:**
- `/` - Home page with mood selection grid
- `/movie` - Movie recommendation page (accepts mood as query parameter)

### Backend Architecture

**Runtime Environment:**
- Node.js with Express server
- TypeScript for type safety
- ESM module system

**API Integration Pattern:**
- OpenRouter AI API for mood-to-genre analysis (using DeepSeek R1 model)
- Kinopoisk API for movie data retrieval
- Session-based exclusion tracking to prevent repeated recommendations

**Server Structure:**
- `server/routes.ts`: API endpoint definitions and business logic
- `server/storage.ts`: In-memory data storage abstraction (currently user-focused, extensible for movies)
- `server/vite.ts`: Development server setup with HMR support

**Key Endpoints:**
- `POST /api/movie/recommend`: Accepts mood, returns AI-analyzed genres and matched movie

### Data Storage Solutions

**Current Implementation:**
- In-memory storage using Map data structures
- User data stored with username/password schema
- Session storage for tracking excluded movie IDs (client-side sessionStorage)

**Database Schema (Configured but not actively used):**
- PostgreSQL via Drizzle ORM
- Users table with id, username, password fields
- Neon serverless database configured for production deployment

**Rationale:** The current implementation uses in-memory storage for simplicity and rapid development. The database infrastructure is configured for future scalability when persistent user accounts and movie history features are needed.

### External Dependencies

**Third-Party APIs:**

1. **OpenRouter AI API**
   - Purpose: Natural language mood analysis to movie genre mapping
   - Model: DeepSeek R1 (free tier)
   - Authentication: Bearer token via `OPENROUTER_API_KEY`
   - Input: User mood description in Russian
   - Output: Comma-separated list of Russian genre names

2. **Kinopoisk API (kinopoisk.dev)**
   - Purpose: Movie data retrieval and search
   - Authentication: `X-API-KEY` header
   - Features used: Genre-based filtering, rating ranges, pagination
   - Data returned: Movie metadata including title, year, poster, rating, genres, description, runtime

**UI Component Library:**
- Radix UI primitives for accessible components
- shadcn/ui configuration for consistent theming
- Custom gradient utilities for mood-based styling

**Development Tools:**
- Replit-specific plugins for error overlay and development banner
- Cartographer for code navigation

**Authentication & Sessions:**
- connect-pg-simple for PostgreSQL session storage (configured)
- Currently using in-memory session tracking for excluded movies

**Type Safety:**
- Zod for runtime validation and schema definitions
- drizzle-zod for database schema validation
- Shared TypeScript types between client and server

### SEO Optimization

**Meta Tags Implementation:**
- Unique title tags for each page optimized for Yandex
- Dynamic meta descriptions with movie details and mood context
- Comprehensive keyword optimization for Russian cinema queries
- Open Graph tags for social media sharing
- Twitter Card metadata
- Canonical URLs for proper indexing

**Structured Data (Schema.org):**
- WebSite schema with SearchAction on homepage
- Movie schema with aggregate ratings on film pages
- JSON-LD format for better Yandex comprehension

**SEO Content:**
- SEO-optimized text blocks on homepage targeting keywords:
  - "подбор фильмов" (movie selection)
  - "кино под настроение" (movies by mood)
  - "выбрать кино на вечер" (choose movie for evening)
  - "какой фильм посмотреть" (which movie to watch)
  - "лучшие фильмы" (best movies)
- Content strategically placed after mood selection grid
- Bold emphasis on key phrases for better visibility

**Dynamic SEO:**
- `usePageMeta` hook for real-time meta tag updates
- Movie-specific titles including film name, year, and mood
- Descriptions incorporating movie synopsis and Kinopoisk ratings
- Auto-generated keywords from movie genres and mood context

### Deployment Architecture

**Vercel Serverless Deployment:**
- Production domain: mood2movie.ru
- Serverless API: `/api/movie/recommend.ts` (Vercel Functions)
- Frontend build: Static assets served from `dist/public`
- Environment variables: OPENROUTER_API_KEY, KINOPOISK_API_KEY
- CORS configured for wildcard origin without credentials
- Environment validation: Automatic API key verification with clear error messages

**Configuration Files:**
- `vercel.json`: Routes, rewrites, CORS headers, output directory
- `VERCEL_DEPLOYMENT_GUIDE.md`: Complete deployment instructions with domain setup
- `client/public/robots.txt`: References production domain sitemap
- `client/public/sitemap.xml`: All 12 mood pages indexed with mood2movie.ru URLs

**Recent Changes (October 2, 2025):**
- Added comprehensive SEO optimization for Yandex
- Implemented structured data with Schema.org markup
- Created dynamic meta tag system with usePageMeta hook
- Added SEO content blocks with targeted keywords
- Fixed infinite refetch loop in movie recommendation flow
- Implemented proper duplicate movie exclusion via sessionStorage
- Added logo to movie pages with home navigation
- Created robots.txt with Yandex and Google bot configuration
- Implemented sitemap.xml with all 12 mood pages indexed
- Added bright popcorn-themed SVG favicon
- Added progressive advertising banner with smart frequency control: 3s → 7s → 15s delays, maximum 3 shows per day with local midnight reset, SSR-safe with localStorage guards for Vercel deployment
- **Vercel Adaptation**: Migrated Express API to serverless functions (/api/movie/recommend.ts)
- Created comprehensive deployment guide for Vercel with domain setup instructions
- Configured vercel.json for fullstack deployment with proper routing and CORS
- Updated all SEO assets (robots.txt, sitemap.xml) to production domain mood2movie.ru
- Fixed sitemap.xml typo and added environment variable validation