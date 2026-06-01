# CoffeeFlow — AGENTS.md

## Commands
- `npm run dev` — Vite dev server
- `npm run build` — production build
- `npm run lint` — ESLint (no typecheck or test available)
- `npm run preview` — preview production build

## Setup
- **Supabase**: anon key in `src/lib/supabase.js:3-4`. Committed in source — do not commit other secrets.
- **OpenAI**: set `VITE_OPENAI_API_KEY` in `.env` (project root). Used in `src/pages/AiAssistant.jsx`. OpenAI client loaded via dynamic `import("openai")`.
- No `.env` checked in; create one if needed.

## Architecture
- **Framework**: React 19 + Vite 8, plain `.jsx` (no TypeScript)
- **CSS**: Tailwind v3 via PostCSS. Custom `coffee` palette in `tailwind.config.js` (primary `#6F4E37`). Also `success`/`warning`/`danger` semantic colors. Font: Inter via Google Fonts.
- **Routing**: `react-router-dom` v7. Public: `/` (Landing), `/login`, `/register`, `/menu-qr` (public menu). Protected: `/dashboard/*` with nested routes and `<ProtectedRoute feature="">` role-based guards.
- **Auth**: Supabase Auth via `src/contexts/AuthContext.jsx`. Roles: owner/manager/cashier with `ROLE_PERMISSIONS` map. `<RoleGate feature="">` for conditional rendering inside pages.
- **Entry**: `index.html` → `src/main.jsx` → `src/App.jsx`
- **UI**: Reusable primitives in `src/components/ui/` (Button, Card, Input, Modal, Badge, Table, StatCard, EmptyState). Uses `framer-motion` for animations and `lucide-react` for icons.
- **Data**: Supabase queries in page components or via `src/services/api.js` wrapper.
- **DB**: `src/database/schema.sql` — full PostgreSQL schema with RPC functions and seed data.
- **Deploy**: Netlify via `netlify.toml` (SPA redirect `/*` → `/index.html`, publish `dist/`).

## Conventions
- Brand name: **CoffeeFlow** throughout.
- Sidebar: `bg-coffee-700` active state, `rounded-xl` nav items.
- Toast: `react-hot-toast`, dark style (`#3E2723` bg, `#FDF8F0` text).
- Icons: `lucide-react` (preferred). `react-icons` also available as dependency but avoid.
- No test framework or test scripts configured.
- Known pre-existing lint error: `react-refresh/only-export-components` in `src/contexts/AuthContext.jsx:6` — leave as-is.
