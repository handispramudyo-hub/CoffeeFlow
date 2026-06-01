# CoffeeFlow — AGENTS.md

## Commands
- `npm run dev` — start Vite dev server
- `npm run build` — production build
- `npm run lint` — ESLint (only check; no typecheck or test)
- `npm run preview` — preview production build

## Setup
- **Supabase**: keys hardcoded in `src/lib/supabase.js:3-4`. Do NOT extract to `.env` without updating both the file and the Supabase project keys.
- **OpenAI**: set `VITE_OPENAI_API_KEY` in `.env` (project root). Used in `src/pages/AiAssistant.jsx`. OpenAI client loaded dynamically via `import("openai")`.
- No `.env` exists by default; create one if needed.

## Architecture
- **Framework**: React 19 + Vite 8, plain `.jsx` (no TypeScript)
- **CSS**: Tailwind CSS v3 via PostCSS. Custom `coffee` color palette in `tailwind.config.js` (primary `#6F4E37`). Also `success`/`warning`/`danger` semantic colors.
- **Routing**: `react-router-dom` v7. Public: `/` (Landing), `/login`, `/register`, `/menu-qr` (public menu). Protected: `/dashboard/*` with nested routes.
- **Auth**: Supabase Auth via `src/contexts/AuthContext.jsx`. Role-based access (owner/manager/cashier) with `ROLE_PERMISSIONS` map. `<ProtectedRoute feature="">` guards per-page.
- **Entry**: `index.html` → `src/main.jsx` → `src/App.jsx`
- **UI Components**: Reusable primitives in `src/components/ui/` (Button, Card, Input, Modal, Badge, Table, StatCard, EmptyState). Uses `framer-motion` for animations and `lucide-react` for icons.
- **Data Layer**: Supabase queries in page components. `src/services/api.js` provides a wrapper.
- **DB Schema**: `src/database/schema.sql` — full PostgreSQL schema with RPC functions.
- **Icons**: `lucide-react` (not `react-icons/fi`).
- **Animation**: `framer-motion` (`motion.div`, `AnimatePresence`).

## Key conventions
- UI brand name is **CoffeeFlow** throughout.
- Sidebar uses `bg-coffee-700` active state with `rounded-xl` nav items.
- Toast: `react-hot-toast`, dark style (`#3E2723` bg, `#FDF8F0` text).
- All dashboard routes are under `/dashboard/*`. Landing page is at `/`.
- Public QR menu at `/menu-qr`.

## Routes overview
| Path | Page | Auth |
|------|------|------|
| `/` | Landing | Public |
| `/login` | Login | Public |
| `/register` | Register | Public |
| `/menu-qr` | QR Menu | Public |
| `/dashboard` | Dashboard | Protected (dashboard) |
| `/dashboard/menu` | Menu Management | Protected (menu) |
| `/dashboard/pos` | POS System | Protected (pos) |
| `/dashboard/inventory` | Inventory | Protected (inventory) |
| `/dashboard/reports` | Reports | Protected (reports) |
| `/dashboard/customers` | Customers | Protected (customers) |
| `/dashboard/loyalty` | Loyalty | Protected (loyalty) |
| `/dashboard/ai` | AI Assistant | Protected (ai) |
| `/dashboard/settings` | Settings | Protected (settings) |

## Important notes
- No test framework or test scripts configured.
- No typecheck step available.
- Supabase anon key committed in source — do not commit other secrets.
- Pre-existing lint errors exist in `AuthContext.jsx` and several pages (function-before-declaration in useEffect). These are known and not introduced by feature work.
