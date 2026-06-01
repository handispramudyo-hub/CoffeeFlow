# CoffeeFlow — AGENTS.md

## Commands
- `npm run dev` — Vite dev server
- `npm run build` — production build
- `npm run lint` — ESLint (no typecheck or test available)
- `npm run preview` — preview production build

## Setup
- **Supabase**: anon key in `src/lib/supabase.js:3-4`. Committed in source — do not commit other secrets.
- **OpenAI**: set `VITE_OPENAI_API_KEY` in `.env` (project root). Used in `src/pages/AiAssistant.jsx`. OpenAI client loaded via dynamic `import("openai")`.
- `.env` is gitignored; create one if needed.
- Supabase schema + RPCs + seed data in `src/database/schema.sql` — run that in Supabase SQL editor before using the app.

## Architecture
- **Framework**: React 19 + Vite 8, plain `.jsx` (no TypeScript). State logic in components/contexts; `src/hooks/` is empty.
- **CSS**: Tailwind v3 via PostCSS. Custom `coffee` palette (`primary #6F4E37`), `success`/`warning`/`danger` semantic colors. Font: Inter via Google Fonts. Custom utilities: `.glass`, `.scrollbar-thin`, `.animate-fade-in`, `.animate-slide-in`.
- **Routing**: `react-router-dom` v7. Public: `/` (Landing), `/login`, `/register`, `/menu-qr` (public menu). Protected: `/dashboard/*` with `<ProtectedRoute feature="">` role-based guards and `<RoleGate feature="">` for conditional rendering inside pages.
- **Auth**: Supabase Auth via `src/contexts/AuthContext.jsx`. Roles: owner/manager/cashier with `ROLE_PERMISSIONS` map. Exports `ROLES` and `ROLE_PERMISSIONS` constants.
- **Entry**: `index.html` → `src/main.jsx` → `src/App.jsx`
- **UI**: Reusable primitives in `src/components/ui/` (Button, Card, Input, Modal, Badge, Table, StatCard, EmptyState). `framer-motion` for animations, `lucide-react` for icons (preferred), `recharts` for charts.
- **Data**: Supabase queries in page components or via `src/services/api.js` wrapper (uses `rpc()` for orders and reports).
- **DB**: `src/database/schema.sql` — PostgreSQL schema with 8 tables, RPC functions (`create_order`, `daily_report`, `weekly_report`, `monthly_report`), and seed data.
- **Deploy**: Netlify via `netlify.toml` (SPA redirect `/*` → `/index.html`, publish `dist/`).

## Conventions
- Brand name: **CoffeeFlow** throughout.
- Sidebar nav: `NavLink` with `rounded-xl` items, `bg-coffee-700 text-white shadow-soft` for active state.
- Toast: `react-hot-toast`, dark style (`#3E2723` bg, `#FDF8F0` text).
- Icons: `lucide-react` preferred. `react-icons` is in dependencies but avoid it.
- No test framework or test scripts configured.
- Known pre-existing lint error: `react-refresh/only-export-components` in `src/contexts/AuthContext.jsx:6` — leave as-is.
