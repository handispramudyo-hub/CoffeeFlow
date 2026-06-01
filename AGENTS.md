# CoffeeBoss AI — AGENTS.md

## Commands
- `npm run dev` — start Vite dev server
- `npm run build` — production build
- `npm run lint` — ESLint (only check available; no typecheck or test)
- `npm run preview` — preview production build

## Setup
- **Supabase**: keys are **hardcoded** in `src/lib/supabase.js:4-7` (not env vars). Do NOT extract them to `.env` without updating both the file and any live Supabase project keys.
- **OpenAI**: set `VITE_OPENAI_API_KEY` in `.env` (project root). Required for the AI Assistant page (`src/pages/AiAssistant.jsx`). Loaded dynamically via `import("openai")` at runtime.
- No `.env` file exists by default; create one if needed.

## Architecture
- **Framework**: React 19 + Vite 8 (no TypeScript — plain `.jsx`)
- **CSS**: Tailwind CSS v3 via PostCSS. Custom color palette `bux-{50,100,500,700,800,900}` defined in `tailwind.config.js` (Starbucks-inspired green tones with `bux-50` as cream background, `bux-700` as dark green sidebar).
- **Auth**: Supabase Auth via `src/contexts/AuthContext.jsx`. Protected routes use `<ProtectedRoute>` wrapper. After signup, inserts a row into a custom `users` table.
- **Routing**: `react-router-dom` v7 with nested routes under `<DashboardLayout>`. Public: `/login`, `/register`. Protected: `/` (Dashboard), `/menu`, `/pos`, `/inventory`, `/ai`.
- **Entry**: `index.html` → `src/main.jsx` → `src/App.jsx`
- **Code style**: JSX in `.jsx`, no TypeScript, Indonesian comments throughout.

## Conventions
- UI brand name is **CoffeeFlow** (not CoffeeBoss). App title in `index.html` and sidebar header uses "CoffeeFlow".
- Sidebar nav items use `rounded-full` styling with `bg-bux-500` (green) active state.
- Toast notifications: `react-hot-toast` positioned top-right with dark toast style (`#3E2723` bg, `#FDF8F0` text).
- Icons: `react-icons/fi` (Feather).
- Indonesian-language UI labels and comments.

## Important notes
- No test framework or test scripts configured.
- No typecheck step available.
- Supabase anon key is committed in source — do not commit sensitive keys elsewhere.
