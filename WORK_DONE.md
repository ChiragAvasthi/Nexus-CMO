# Nexus CMO — Work Done So Far

> Last updated: June 1, 2026

---

## Project Overview

**Nexus CMO** is a SaaS product that gives founders an AI-powered marketing team. The prototype is a clickable UI built in **React (Vite)** with **Tailwind CSS v4**, **vanilla CSS**, and **react-router-dom v7** for routing.

The goal: translate 11 wireframe mockups (static HTML) into a fully navigable React prototype that demonstrates the complete user journey — from signup to daily workspace usage.

---

## Tech Stack

| Layer           | Technology                                      |
| --------------- | ----------------------------------------------- |
| Framework       | React 19 (via Vite 8)                           |
| Styling         | Tailwind CSS v4 + vanilla CSS per-page          |
| Routing         | react-router-dom v7                             |
| Fonts           | Inter (via system font stack)                   |
| State           | Local React state (useState)                    |
| Build           | Vite                                            |
| Version Control | Git → GitHub (ChiragAvasthi/Nexus-CMO)          |

---

## File Structure

```
src/
├── main.jsx                    # Entry point
├── App.jsx                     # Router config (all routes)
├── index.css                   # Global design system (tokens, shell, components)
├── App.css                     # Legacy / supplementary styles
├── components/
│   └── AppLayout.jsx           # Authenticated workspace shell (sidebar + outlet)
└── pages/
    ├── Signup.jsx / .css        # Screen 01 — Sign Up
    ├── Pricing.jsx / .css       # Screen 02 — Pick Your Plan
    ├── Onboarding.jsx / .css    # Screen 03 — Onboarding Wizard (5 steps)
    ├── TruthReport.jsx / .css   # Screen 05 — Truth Report (Hero Moment)
    ├── CommandCenter.jsx / .css # Screen 06 — Command Center (Dashboard)
    ├── WarRoom.jsx / .css       # Screen 07 — War Room (Chat with CMO)
    ├── AgentPerformance.jsx/.css # Screen 08 — Your AI Team
    ├── AssetLibrary.jsx / .css  # Screen 09 — Asset Library
    ├── ApprovalQueue.jsx / .css # Screen 10 — Approval Queue
    └── AgentChat.jsx / .css     # Screen 11 — Agent Chat (Quinn / DM)
```

---

## Screens Implemented (10 of 11 mockups)

### Unauthenticated Flow

| # | Screen | Route | Status | Notes |
|---|--------|-------|--------|-------|
| 01 | Sign Up | `/signup` | ✅ Done | SSO buttons (Google/LinkedIn), email form, preview card |
| 02 | Pricing | `/pricing` | ✅ Done | Solo vs Full Nexus, agent picker, FAQ accordion |
| 03 | Onboarding | `/onboarding` | ✅ Done | 5-step wizard with stepper, file upload, integrations, goal |
| 05 | Truth Report | `/truth-report` | ✅ Done | 7 ranked loopholes, severity badges, sticky approve bar |

### Authenticated Workspace (inside `AppLayout` shell)

| # | Screen | Route | Status | Notes |
|---|--------|-------|--------|-------|
| 06 | Command Center | `/command-center` | ✅ Done | KPI row, CMO focus card, approvals, timeline, goal tracker |
| 07 | War Room | `/war-room` | ✅ Done | Chat with Alex (CMO), Critique Loop UI, proposal cards |
| 08 | Your AI Team | `/team` | ✅ Done | 8 agent cards (5 working, 3 idle), DM links to AgentChat |
| 09 | Asset Library | `/assets` | ✅ Done | Filter bar, 3 sections (Live, Draft, Archived), asset cards |
| 10 | Approval Queue | `/approvals` | ✅ Done | 3 approval items, CMO notes, rejected transparency section |

### Standalone (outside workspace shell)

| # | Screen | Route | Status | Notes |
|---|--------|-------|--------|-------|
| 11 | Agent Chat | `/agents/:agentId` | ✅ Done | Quinn specialist view, 4 tabs (Chat, Active, Done, Briefs) |

### Not Yet Implemented

| # | Screen | Status | Notes |
|---|--------|--------|-------|
| 04 | Alex Picks Your Team | ❌ Not done | Transition screen between onboarding and truth report |

---

## Design System (index.css)

The global CSS defines:

- **Color tokens**: `--bg-0` through `--bg-4`, `--text-1` through `--text-4`, semantic colors (cyan, magenta, amber, green, red) with soft variants
- **Gradients**: `--gradient-cmo` (violet→cyan), `--gradient-amber`
- **Typography**: Inter font stack, monospace for code
- **Spacing/Radius**: `--radius-sm/md/lg/xl`
- **Shadows**: `--shadow-1`, `--shadow-2`, `--shadow-glow`
- **Components**: `.btn` variants, `.card`, `.kpi`, `.pill`, `.dot` (status), `.progress`, `.chat-bubble`, `.proposal-card`, `.annotation`, `.stepper`
- **Agent avatars**: Color-coded backgrounds for CMO, SEO, SMM, BDM, Design, Data agents

---

## Workspace Shell (AppLayout.jsx)

The authenticated workspace uses a **sidebar + main** grid layout:

- **Sidebar**: Logo, workspace nav (5 links with active states), account nav, plan badge, user profile footer
- **Main area**: `<Outlet />` renders the active page
- Sidebar is `position: sticky; top: 0; height: 100vh` for persistent navigation

---

## Routing Architecture

```
/                    → Redirects to /signup
/signup              → Signup (standalone)
/pricing             → Pricing (standalone)
/onboarding          → Onboarding (standalone)
/truth-report        → TruthReport (standalone)
/agents/:agentId     → AgentChat (standalone)

/command-center      → CommandCenter (inside AppLayout)
/war-room            → WarRoom (inside AppLayout)
/team                → AgentPerformance (inside AppLayout)
/assets              → AssetLibrary (inside AppLayout)
/approvals           → ApprovalQueue (inside AppLayout)
```

---

## Navigation Flow (End-to-End)

```
Signup → Pricing → Onboarding (5 steps) → Truth Report → Command Center
                                                              ↓
                                              ┌────────────────┼────────────────┐
                                              ↓                ↓                ↓
                                          War Room        AI Team          Asset Library
                                                           ↓
                                                    Agent Chat (DM)
```

---

## Key Interactions Implemented

1. **Onboarding stepper**: Step navigation with done/active/upcoming states, skip buttons, back navigation
2. **Truth Report approve bar**: Sticky bottom bar with approve/skip per loophole
3. **War Room chat**: CMO messages with proposal cards containing approve/reject/counter actions
4. **Agent Chat tabs**: useState-driven tab switching between Chat, Active Tasks, Done, and Briefs
5. **Agent DM links**: All "DM" buttons in AgentPerformance route to `/agents/:agentId`
6. **Sidebar active states**: NavLink with `isActive` className for current route highlighting

---

## Cleanup Done

- ✅ Removed all `.screen-bar` headers (wireframe navigation bars) from Signup, Pricing, Onboarding, TruthReport
- ✅ Removed all `.dev-note` blocks from CommandCenter, AssetLibrary, ApprovalQueue, AgentPerformance, TruthReport
- ✅ Fixed sidebar sticky positioning (`top: 0`, `height: 100vh`)
- ✅ Fixed topbar sticky positioning (`top: 0`)
- ✅ Created missing `index.html` for Vite build

---

## Phases Completed

### Phase 1: Missing Screen & Annotations
- ✅ Built **Screen 04: Alex Picks Your Team** (`TeamAssembly.jsx`).
- ✅ Stripped out all `.annotation` wireframe borders and `data-note` tags across the app.

### Phase 2: Interactivity & State
- ✅ **Truth Report**: Added state to approve/skip loopholes dynamically.
- ✅ **Approval Queue**: Implemented tabs to toggle between "Needs sign-off", "Auto-rejected", and "Approved".
- ✅ **Asset Library**: Added interactive filter chips (by agent) and real-time search.
- ✅ **Command Center**: Wired up the "Approve" buttons to reflect success state.
- ✅ **War Room & Agent Chat**: Added chat input state and delayed mock agent responses.

### Phase 3: Navigation Polish
- ✅ **Dead links**: Fixed standalone buttons (`/agents/devon`, `/assets` links, etc.) and added alerts for unbuilt modules.
- ✅ **404 Page**: Added `NotFound.jsx` catch-all route.
- ✅ **Breadcrumbs**: Implemented dynamic contextual breadcrumbs in all Workspace topbars.

### Phase 4: Responsive Design
- ✅ **Mobile Sidebar**: Added a hamburger menu to toggle the sidebar via context in `AppLayout.jsx`.
- ✅ **Grid Breakpoints**: Added `mobile.css` to handle collapsing multi-column layouts into single columns for `AgentPerformance`, `AssetLibrary`, and `CommandCenter`.
- ✅ **Touch Targets**: Standardized button and input heights to 44px on mobile.

### Phase 5 & 6: Polish & Production
- ✅ **Interaction**: Added `focus-visible` outlines, hover lifts on `.kpi` cards, and typing indicators in the chat.
- ✅ **SEO**: Updated `index.html` with title, descriptions, and Open Graph tags.
- ✅ **Bugfixes**: Resolved CSS Grid conflicts caused by the mobile sidebar overlay interfering with the desktop DOM.

*(Note: Heavy page-transitions, lazy loading, and skeleton loaders were tested but reverted to preserve SPA snap and avoid layout flashes.)*
