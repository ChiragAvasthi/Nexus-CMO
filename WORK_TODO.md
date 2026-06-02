# Nexus CMO — Work To Be Done

> Step-by-step implementation plan for backend infrastructure, AI integration, and production readiness.

---

## Execution Schedule

| Priority | Phase | Focus |
|----------|-------|-------|
| **1st** | Phase 7 | Core Backend (DB Schema, Auth, API structure) |
| **2nd** | Phase 9 | Full-Stack Integration (Hooking up React UI to the new Backend) |
| **3rd** | Phase 10 | Refactoring, CI/CD, Deployment Prep |
| **Last** | Phase 6.5 | Frontend functional wiring (Stripe Payments, Billing, Settings) |
| **Last** | Phase 8 | Agent orchestration, Proprietary AI APIs (from User), Secrets |

---

## 🏗 Phase 7: Core Backend Setup (Priority: High)

We will build a Node.js/Express backend with Prisma ORM to serve the React frontend.

### Step 20 — Initialize Server Environment
- [ ] Create a `server/` directory in the root repository.
- [ ] Run `npm init` and install Express, CORS, dotenv, and nodemon.
- [ ] Set up a basic `server.js` with a `/health` endpoint to verify connectivity.
- [ ] Configure `vite.config.js` in the frontend to proxy `/api` requests to `localhost:3001`.

### Step 21 — Database & Prisma ORM setup
- [ ] Install Prisma (`npm i prisma @prisma/client`).
- [ ] Initialize Prisma with SQLite (for rapid prototyping) or PostgreSQL.
- [ ] Draft `schema.prisma`:
  - `User`: id, email, password_hash, name
  - `Workspace`: id, name, owner_id
  - `Asset`: id, title, type, status, workspace_id
  - `Task`: id, agent_id, status, description, workspace_id
  - `Message`: id, sender_role, content, thread_id
- [ ] Run initial migration (`npx prisma migrate dev`).

### Step 22 — Authentication Layer
- [ ] Install `jsonwebtoken` and `bcrypt`.
- [ ] Create `POST /api/auth/register` to create a user and default workspace.
- [ ] Create `POST /api/auth/login` to issue JWTs.
- [ ] Create an `authMiddleware` to protect backend routes.

---

## 🔗 Phase 9: Full-Stack Integration (Priority: High)

### Step 23 — Hooking up the Dashboard
- [ ] Create `GET /api/workspace/:id/stats` to fetch real KPI data.
- [ ] Replace static state in `CommandCenter.jsx` with `useEffect` fetches to the backend.
- [ ] Wire the "Approve" buttons to fire `PUT /api/tasks/:id/approve`.

### Step 24 — Hooking up the Asset Library
- [ ] Create `GET /api/assets` to fetch all user assets from the DB.
- [ ] Update `AssetLibrary.jsx` to map over the DB response instead of mock data.
- [ ] Wire the filter and search bar to query the backend endpoints.

### Step 25 — Real-Time WebSockets (War Room)
- [ ] Install `socket.io` on the backend and `socket.io-client` on the frontend.
- [ ] Establish a WS connection when mounting `WarRoom.jsx` and `AgentChat.jsx`.
- [ ] Emit events for "new_message" and broadcast to the frontend.

---

## 🚀 Phase 10: Refactoring & Deployment (Priority: Medium)

### Step 26 — Code Quality
- [ ] Extract `<AgentAvatar />`, `<StatusPill />`, and `<KpiCard />` into `src/components/`.
- [ ] Replace raw HTML blocks with these components across the app.
- [ ] Purge unused CSS variables and clean up `index.css`.

### Step 27 — Deployment Prep
- [ ] Add deployment scripts (`npm run build:server`, `npm run build:client`).
- [ ] Set up environment variables securely for production.
- [ ] Deploy frontend to Vercel/Netlify.
- [ ] Deploy backend + DB to Render/Railway.

---

## 💳 Phase 6.5: Payments & Settings (Priority: Last)

### Step 28 — Subscription & Billing
- [ ] Build `/billing` React page.
- [ ] Integrate Stripe Elements or Stripe Checkout.
- [ ] Create backend webhooks to listen for `customer.subscription.updated`.

### Step 29 — Workspace Settings
- [ ] Build `/settings` page for user profiles and team invites.
- [ ] Add backend endpoints `POST /api/workspace/invite`.

---

## 🧠 Phase 8: Proprietary AI & Agents (Priority: Last)

> **CRITICAL**: The actual analysis will be powered by proprietary APIs provided by you.

### Step 30 — Secure Credentials Setup
- [ ] Create secure `.env` vaults exclusively for proprietary API keys.
- [ ] Verify `.gitignore` rules prevent accidental key leaks.

### Step 31 — Proprietary API Integration
- [ ] Replace mock agent responses in `server.js` with calls to your proprietary AI endpoints.
- [ ] Build backend controllers to pass necessary workspace context (assets, guidelines) to your APIs.
- [ ] Stream the proprietary AI responses back through the WebSockets to the React frontend UI.
