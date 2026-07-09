# Mobile Phone-OS Portfolio — Design Spec

Date: 2026-07-08
Status: Approved (pending spec review)

## Problem

The portfolio is a fake **desktop-OS** (draggable/resizable windows, desktop
icons). That metaphor is a desktop gimmick — on a phone it feels broken and an
employer glancing on mobile bounces. Two concrete failures today:

1. Anything under 600px hits a full-screen "Desktop Experience / Continue
   anyway" gate (`App.jsx:24–42`) — the worst possible first impression.
2. Past that gate, the phone lands on a bare wallpaper with desktop icons in the
   corner; `terminal` is `open:false` on mobile, so nothing opens by default and
   there's no identity, no navigation model.

## Goal

A phone-native experience: a **home screen** (identity + quick actions + app
icons) → tap → **one fullscreen app at a time** → `‹ Home` back to the launcher.

## Hard Constraint

**The desktop experience must be byte-for-byte identical after these changes.**
All changes are confined to the `isMobile` code path. The desktop `return` block
in `App.jsx`, the window drag/resize logic for desktop, and every window's
desktop rendering stay exactly as they are.

## Non-Goals (YAGNI)

- No routing library, no separate mobile content/data.
- No swipe gestures, no multi-app switcher, no animated transitions.
- No icon redesign — reuse existing colored pixel icons as-is.

## Design

### Data sources (no new files)

- `terminal.json` → `name`, `role`, `status` (identity header).
- `about.json` → GitHub / LinkedIn / resume links (quick actions).

Both are already build-time JSON imports; `MobileHome` imports them the same way.

### 1. Remove the desktop-prompt gate

Delete the `showDesktopPrompt` block (`App.jsx:24–42`) and its `< 600px` branch.
Phones go straight to the mobile home screen. Desktop return path unaffected.

### 2. `MobileHome.jsx` (new) — the launcher

Rendered in place of `DesktopShortcuts` in the `isMobile` branch of `App.jsx`,
over the existing wallpaper. Structure:

- **Identity header card** — name, role, `● online` status from `terminal.json`,
  on a dark/frosted card for legibility over the wallpaper.
- **Quick actions row** — `[Resume]` (calls `openWindow('resume')`),
  `[GitHub]` + `[LinkedIn]` (external `<a>` links from `about.json`).
- **App icon grid** — the 6 existing apps (Terminal, Explorer, Blog, Mail,
  Resume, About). Tap → `openWindow(id)` (already opens fullscreen on mobile).

### 3. Shared icon source — `appIcons.js` (new)

The 6 SVG icons currently live inside `DesktopShortcuts.jsx`. Lift the icon set +
`{id, icon, label}` list into `appIcons.js` so both `DesktopShortcuts` (desktop)
and `MobileHome` (mobile) import one source. `DesktopShortcuts`'s rendered output
stays identical — this is a pure extraction, no visual change on desktop.

### 4. Fullscreen app + `‹ Home` back (mobile only)

Windows already render fullscreen on mobile via `WindowShells` (OPEN sets
`isFullscreen`, width/height = viewport). Changes, gated on `window.innerWidth <
768` so desktop is untouched:

- Title bar shows a labeled **`‹ Home`** button (calls `closeWindow(win.id)`)
  instead of the mac traffic-light dots.
- Drag / resize / maximize handles are not rendered on mobile (they do nothing
  useful on a phone; desktop keeps all of them).

Only one app is open at a time on phone, so `closeWindow` always returns to Home.

## Navigation flow

```
MobileHome ──openWindow(id)──▶ fullscreen app ──closeWindow(id)──▶ MobileHome
```

All navigation reuses the existing `WindowManagerContext` (`openWindow` /
`closeWindow`). No new state machine, no new context.

## Files touched

| File | Change |
|------|--------|
| `App.jsx` | Delete desktop-prompt gate; render `MobileHome` (not `DesktopShortcuts`) in the `isMobile` branch. Desktop branch unchanged. |
| `MobileHome.jsx` | New — launcher (header + quick actions + icon grid). |
| `appIcons.js` | New — extracted shared icon set + app list. |
| `DesktopShortcuts.jsx` | Import icons from `appIcons.js` (pure refactor, identical output). |
| `WindowShells.jsx` | Mobile-only: `‹ Home` title bar, no drag/resize handles. Desktop path unchanged. |

## Verification

- Desktop: screenshot before/after at 1366×768 — pixel-identical, all windows
  drag/resize/maximize as before.
- Mobile: screenshot at 375×812 — home screen renders (header, actions, icons);
  tapping an icon opens fullscreen; `‹ Home` returns to launcher.
- `npx eslint .` clean (allowing the one pre-existing context warning); `npm run
  build` green.

## Note

Per the standing session constraint, **no git operations** — this spec is written
but not committed.
