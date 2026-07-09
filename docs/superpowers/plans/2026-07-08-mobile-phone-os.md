# Mobile Phone-OS Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Give phone visitors a phone-OS home screen (identity + quick actions + app icons) that opens one fullscreen app at a time with a `‹ Home` back, without changing the desktop experience at all.

**Architecture:** All changes are confined to the `isMobile` code path. A new `MobileHome` launcher replaces the desktop icons on phones; the existing `WindowManagerContext` (`openWindow`/`closeWindow`) drives navigation; windows already render fullscreen on mobile via `WindowShells`. The 6 app icons are extracted to a shared module so the desktop `DesktopShortcuts` renders byte-identical output.

**Tech Stack:** React 19, Vite 8, Tailwind CSS v4 (CSS-first). Build-time JSON imports for content. No test runner in this repo — verification is eslint + build + Chrome-headless screenshots.

## Global Constraints

- **Desktop experience must be byte-for-byte identical.** Only touch code gated on mobile. The desktop `return` block in `App.jsx`, desktop drag/resize/maximize, and every window's desktop rendering stay exactly as they are.
- **No new dependencies.** Reuse existing JSON imports and context.
- **No git operations** this session — "commit" steps are verification checkpoints only.
- Mobile breakpoint is `window.innerWidth < 768`, matching existing code.
- External links use `https://` prefix (the JSON stores bare URLs like `github.com/shauryaroks`).
- Content field names (verbatim): `terminal.json` → `name`, `role`, `status`. `about.json` → `contact.github`, `contact.linkedin`.

---

## Task 1: Extract shared app-icon module

Pure refactor. Move the 6 SVG icon components + the app list out of `DesktopShortcuts.jsx` into a shared `appIcons.jsx` so both desktop and the new mobile home import one source. `DesktopShortcuts` must render identically afterward.

**Files:**
- Create: `react-app/src/appIcons.jsx`
- Modify: `react-app/src/DesktopShortcuts.jsx`

**Interfaces:**
- Produces: `export const apps` — array of `{ id: string, icon: JSX.Element, label: string }` in this exact order: `terminal, explorer, blog, mail, resume, about`.

- [ ] **Step 1: Capture desktop baseline screenshot**

Start the dev server and screenshot the desktop before any change, to compare against later.

```bash
cd /home/shaurya/Projects/Portfolio_website/react-app && npm run dev &
sleep 3
google-chrome-stable --headless --disable-gpu --no-sandbox --hide-scrollbars \
  --window-size=1366,768 --screenshot=/tmp/desktop-before.png \
  --virtual-time-budget=6000 http://localhost:5173/
```
Expected: `/tmp/desktop-before.png` shows the terminal window open over the wallpaper with the 6 desktop icons top-left.

- [ ] **Step 2: Create `appIcons.jsx`**

Move the six icon components (`TerminalIcon`, `ExplorerIcon`, `MailIcon`, `BlogIcon`, `ResumeIcon`, `AboutIcon`) verbatim from `DesktopShortcuts.jsx` into this new file, and export the `apps` list.

```jsx
import React from "react";

const TerminalIcon = () => (
  <svg viewBox="0 0 24 24" width="32" height="32">
    <rect x="2" y="3" width="20" height="18" fill="#1a1a1a" />
    <rect x="4" y="8" width="2" height="2" fill="#22c55e" />
    <rect x="7" y="8" width="2" height="2" fill="#22c55e" />
    <rect x="10" y="8" width="4" height="2" fill="#22c55e" />
    <rect x="4" y="12" width="2" height="2" fill="#22c55e" />
    <rect x="7" y="12" width="2" height="2" fill="#22c55e" />
    <rect x="10" y="12" width="2" height="2" fill="#22c55e" />
    <rect x="4" y="16" width="6" height="2" fill="#22c55e" />
  </svg>
);

const ExplorerIcon = () => (
  <svg viewBox="0 0 24 24" width="32" height="32">
    <path d="M2 8 L10 8 L12 4 L22 4 L22 20 L2 20 Z" fill="#f59e0b" />
    <rect x="2" y="8" width="8" height="12" fill="#fbbf24" />
    <rect x="12" y="4" width="10" height="4" fill="#fbbf24" />
  </svg>
);

const MailIcon = () => (
  <svg viewBox="0 0 24 24" width="32" height="32">
    <rect x="2" y="4" width="20" height="16" rx="2" fill="#dc2626" />
    <rect x="2" y="4" width="20" height="3" rx="1" fill="#ef4444" />
    <polygon points="2,7 12,15 22,7" fill="#991b1b" />
    <rect x="4" y="14" width="16" height="6" rx="1" fill="#fecaca" />
    <rect x="8" y="16" width="8" height="2" rx="1" fill="#dc2626" />
  </svg>
);

const BlogIcon = () => (
  <svg viewBox="0 0 24 24" width="32" height="32">
    <rect x="4" y="2" width="16" height="20" rx="2" fill="#3b82f6" />
    <rect x="6" y="4" width="12" height="2" rx="1" fill="#1d4ed8" />
    <rect x="6" y="8" width="10" height="2" rx="1" fill="#60a5fa" />
    <rect x="6" y="12" width="8" height="2" rx="1" fill="#60a5fa" />
    <rect x="6" y="16" width="6" height="2" rx="1" fill="#60a5fa" />
  </svg>
);

const ResumeIcon = () => (
  <svg viewBox="0 0 24 24" width="32" height="32">
    <rect x="4" y="2" width="16" height="20" rx="2" fill="#8b5cf6" />
    <rect x="6" y="4" width="12" height="2" rx="1" fill="#7c3aed" />
    <rect x="6" y="8" width="4" height="2" rx="1" fill="#c4b5fd" />
    <rect x="6" y="12" width="8" height="2" rx="1" fill="#c4b5fd" />
    <rect x="6" y="16" width="6" height="2" rx="1" fill="#c4b5fd" />
    <rect x="10" y="20" width="4" height="2" rx="1" fill="#7c3aed" />
  </svg>
);

const AboutIcon = () => (
  <svg viewBox="0 0 24 24" width="32" height="32">
    <rect x="2" y="2" width="20" height="20" rx="2" fill="#06b6d4" />
    <rect x="8" y="5" width="8" height="8" fill="white" />
    <rect x="6" y="6" width="2" height="2" fill="#06b6d4" />
    <rect x="16" y="6" width="2" height="2" fill="#06b6d4" />
    <rect x="10" y="9" width="4" height="2" fill="#06b6d4" />
    <rect x="4" y="14" width="4" height="2" fill="white" />
    <rect x="10" y="14" width="4" height="2" fill="white" />
    <rect x="16" y="14" width="4" height="2" fill="white" />
    <rect x="4" y="17" width="4" height="2" fill="white" />
    <rect x="10" y="17" width="4" height="2" fill="white" />
    <rect x="16" y="17" width="4" height="2" fill="white" />
  </svg>
);

export const apps = [
  { id: 'terminal', icon: <TerminalIcon />, label: 'Terminal' },
  { id: 'explorer', icon: <ExplorerIcon />, label: 'Explorer' },
  { id: 'blog', icon: <BlogIcon />, label: 'Blog' },
  { id: 'mail', icon: <MailIcon />, label: 'Mail' },
  { id: 'resume', icon: <ResumeIcon />, label: 'Resume' },
  { id: 'about', icon: <AboutIcon />, label: 'About' },
];
```

- [ ] **Step 3: Replace icon definitions in `DesktopShortcuts.jsx` with an import**

Delete the six icon component definitions (lines 4–70) and the local `shortcuts` array (lines 72–79). Import `apps` instead and rename the render reference from `shortcuts` to `apps`.

Replace the top of the file:
```jsx
import React, { useContext } from "react";
import { WindowManagerContext } from "./WindowManagerContext";
import { apps } from "./appIcons";
```

In `DesktopShortcuts()`, change the chunking loop to use `apps`:
```jsx
  const columns = [];
  for (let i = 0; i < apps.length; i += 5) {
    columns.push(apps.slice(i, i + 5));
  }
```
The rest of the component (JSX rendering `col.map((sc) => ...)`) is unchanged.

- [ ] **Step 4: Lint and build**

Run:
```bash
cd /home/shaurya/Projects/Portfolio_website/react-app && npx eslint . 2>&1 | tail -5 && npm run build 2>&1 | tail -3
```
Expected: no new eslint errors (the one pre-existing `react-refresh/only-export-components` warning at `WindowManagerContext.jsx` is acceptable); build ends with `✓ built`.

- [ ] **Step 5: Verify desktop is pixel-identical**

```bash
google-chrome-stable --headless --disable-gpu --no-sandbox --hide-scrollbars \
  --window-size=1366,768 --screenshot=/tmp/desktop-after.png \
  --virtual-time-budget=6000 http://localhost:5173/
compare -metric AE /tmp/desktop-before.png /tmp/desktop-after.png /tmp/diff.png; echo
```
Expected: `AE` (absolute error pixel count) is `0`. If `compare` is unavailable, eyeball `/tmp/desktop-before.png` vs `/tmp/desktop-after.png` — they must be indistinguishable.

- [ ] **Step 6: Checkpoint** (no commit — session constraint)

Confirm Task 1 deliverable: `appIcons.jsx` exists, `DesktopShortcuts` imports it, desktop screenshot unchanged.

---

## Task 2: MobileHome launcher + App.jsx wiring

Create the phone home screen and mount it on the mobile path, removing the "Desktop Experience" gate. After this task, a phone-width viewport shows the identity header, quick actions, and app icon grid, and tapping an icon opens that app fullscreen.

**Files:**
- Create: `react-app/src/MobileHome.jsx`
- Modify: `react-app/src/App.jsx`

**Interfaces:**
- Consumes: `apps` from `appIcons.jsx`; `openWindow`, `focusWindow` from `WindowManagerContext`; `terminal.json` (`name`, `role`, `status`); `about.json` (`contact.github`, `contact.linkedin`).
- Produces: default-exported `MobileHome` component.

- [ ] **Step 1: Create `MobileHome.jsx`**

```jsx
import React, { useContext } from "react";
import { WindowManagerContext } from "./WindowManagerContext";
import { apps } from "./appIcons";
import terminal from "./content/terminal.json";
import about from "./content/about.json";

const ext = (u) => (u.startsWith("http") ? u : `https://${u}`);

export default function MobileHome() {
  const { openWindow, focusWindow } = useContext(WindowManagerContext);
  const open = (id) => { openWindow(id); focusWindow(id); };

  return (
    <div className="min-h-full w-full p-4 flex flex-col gap-4">
      {/* Identity header */}
      <div className="bg-black/70 backdrop-blur-sm border-2 border-black rounded-lg p-4 text-white font-mono">
        <div className="text-lg font-bold">{terminal.name}</div>
        <div className="text-xs text-gray-300 mt-0.5">
          {terminal.role} · <span className="text-green-400">● {terminal.status}</span>
        </div>
        <div className="flex flex-wrap gap-2 mt-3">
          <button onClick={() => open("resume")} className="border-2 border-white px-3 py-1.5 text-xs hover:bg-white hover:text-black active:bg-white active:text-black">Resume</button>
          <a href={ext(about.contact.github)} target="_blank" rel="noreferrer" className="border-2 border-white px-3 py-1.5 text-xs hover:bg-white hover:text-black active:bg-white active:text-black">GitHub</a>
          <a href={ext(about.contact.linkedin)} target="_blank" rel="noreferrer" className="border-2 border-white px-3 py-1.5 text-xs hover:bg-white hover:text-black active:bg-white active:text-black">LinkedIn</a>
        </div>
      </div>

      {/* App grid */}
      <div className="grid grid-cols-3 gap-4">
        {apps.map((app) => (
          <button
            key={app.id}
            onClick={() => open(app.id)}
            className="flex flex-col items-center gap-1 p-2 focus:outline-none active:scale-95 transition-transform"
          >
            <div className="w-14 h-14 flex items-center justify-center">{app.icon}</div>
            <span className="text-xs font-mono text-white text-center drop-shadow-md">{app.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Wire `MobileHome` into `App.jsx` and delete the desktop-prompt gate**

Add the import near the top:
```jsx
import MobileHome from './MobileHome.jsx';
```

Delete the desktop-prompt block entirely — remove the `const showDesktopPrompt = window.innerWidth < 600;` line and the whole `if (isMobile && showDesktopPrompt) { ... }` block (currently `App.jsx:24–42`).

Replace the mobile `return` body so it renders `MobileHome` instead of `DesktopShortcuts`. The mobile branch becomes:
```jsx
  if (isMobile) {
    return (
      <WindowManagerProvider>
        <div
          className="relative w-full h-screen overflow-hidden"
          style={{
            backgroundImage: `url('/wallhaven-l3971q_1920x1080.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          <div className="absolute inset-0 overflow-auto">
            <MobileHome />
          </div>
          <WindowShells />
        </div>
      </WindowManagerProvider>
    );
  }
```
Leave the desktop `return` block (currently `App.jsx:65–80`) completely unchanged. `DesktopShortcuts` import stays — it's still used on desktop.

- [ ] **Step 3: Lint and build**

Run:
```bash
cd /home/shaurya/Projects/Portfolio_website/react-app && npx eslint . 2>&1 | tail -5 && npm run build 2>&1 | tail -3
```
Expected: no new errors; `✓ built`.

- [ ] **Step 4: Screenshot the phone home screen**

```bash
google-chrome-stable --headless --disable-gpu --no-sandbox --hide-scrollbars \
  --window-size=375,812 --screenshot=/tmp/mobile-home.png \
  --virtual-time-budget=6000 http://localhost:5173/
```
Expected: `/tmp/mobile-home.png` shows the identity card (name "Shaurya Garg", role, `● Open to Internships`), the Resume/GitHub/LinkedIn buttons, and a 3-column grid of the 6 app icons over the wallpaper. No "Desktop Experience" wall.

- [ ] **Step 5: Verify desktop still unchanged**

```bash
google-chrome-stable --headless --disable-gpu --no-sandbox --hide-scrollbars \
  --window-size=1366,768 --screenshot=/tmp/desktop-check2.png \
  --virtual-time-budget=6000 http://localhost:5173/
compare -metric AE /tmp/desktop-before.png /tmp/desktop-check2.png /tmp/diff2.png; echo
```
Expected: `AE` = `0` (or visually indistinguishable from `/tmp/desktop-before.png`).

- [ ] **Step 6: Checkpoint** (no commit — session constraint)

Deliverable: phone shows the home launcher; desktop unchanged. Tapping an icon opens the app fullscreen (verified further in Task 3).

---

## Task 3: `‹ Home` back bar on mobile, hide window chrome

On mobile, the fullscreen window's title bar should show a clear `‹ Home` back button (calls `closeWindow`) instead of the mac traffic-light dots, and drag/resize/maximize affordances should not render. Desktop keeps all of them.

**Files:**
- Modify: `react-app/src/WindowShells.jsx`

**Interfaces:**
- Consumes: `windowSize.width` (already in component state) to derive mobile; `closeWindow` from context (already destructured).

- [ ] **Step 1: Derive `isMobile` inside the render map**

In `WindowShells`, inside the `.map((win) => { ... })` callback (after `const isFocused = ...`), add:
```jsx
        const isMobile = windowSize.width < 768;
```

- [ ] **Step 2: Make the title bar mobile-aware**

Replace the title bar block (currently the `<div>` with `onMouseDown={(e) => handleMouseDown(e, win)}` and its children — `App.jsx` window controls, centered title, spacer). New version:

```jsx
            {/* Window Title Bar - draggable on desktop only */}
            <div
              className="flex items-center justify-between bg-black px-3 py-2 border-b-2 border-black select-none flex-shrink-0"
              onMouseDown={isMobile ? undefined : (e) => handleMouseDown(e, win)}
              style={{ cursor: isMobile || win.maximized ? 'default' : 'move' }}
            >
              {isMobile ? (
                <button
                  className="text-white text-sm font-mono font-bold focus:outline-none"
                  onClick={(e) => { e.stopPropagation(); closeWindow(win.id); }}
                >
                  ‹ Home
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    className="w-5 h-5 rounded-full bg-red-500 border-2 border-red-700 hover:bg-red-600 transition-colors focus:outline-none"
                    onClick={(e) => { e.stopPropagation(); closeWindow(win.id); }}
                  />
                  <button
                    className="w-5 h-5 rounded-full bg-green-500 border-2 border-green-700 hover:bg-green-600 transition-colors focus:outline-none"
                    onClick={(e) => { e.stopPropagation(); handleMaximize(win.id); }}
                  />
                </div>
              )}

              {/* Center: Title */}
              <span className="text-white text-sm font-mono font-bold uppercase tracking-wide absolute left-1/2 transform -translate-x-1/2">
                {win.title}
              </span>

              <div className="w-16"></div>
            </div>
```

- [ ] **Step 3: Hide resize handles on mobile**

Change the resize-handle guard from `{isFocused && !win.maximized && (` to also exclude mobile:
```jsx
            {isFocused && !win.maximized && !isMobile && (
```
The eight handle `<div>`s inside are unchanged.

- [ ] **Step 4: Lint and build**

Run:
```bash
cd /home/shaurya/Projects/Portfolio_website/react-app && npx eslint . 2>&1 | tail -5 && npm run build 2>&1 | tail -3
```
Expected: no new errors; `✓ built`.

- [ ] **Step 5: Verify mobile back flow + desktop chrome intact**

Mobile — confirm an opened app shows the `‹ Home` bar (open Blog via a tiny script-injected click is overkill; instead temporarily set `blog` `open:true` in the mobile defaults OR just trust the render and screenshot after tapping). Simplest check: screenshot a fullscreen app on mobile.

Temporarily flip `blog` to `open: true` in the mobile branch of `getDefaults()` (`WindowManagerContext.jsx`), screenshot, then revert:
```bash
google-chrome-stable --headless --disable-gpu --no-sandbox --hide-scrollbars \
  --window-size=375,812 --screenshot=/tmp/mobile-app.png \
  --virtual-time-budget=6000 http://localhost:5173/
```
Expected: fullscreen Blog with a `‹ Home` button top-left, no traffic-light dots, no resize handles. **Revert the `open:true` change.**

Desktop:
```bash
google-chrome-stable --headless --disable-gpu --no-sandbox --hide-scrollbars \
  --window-size=1366,768 --screenshot=/tmp/desktop-check3.png \
  --virtual-time-budget=6000 http://localhost:5173/
compare -metric AE /tmp/desktop-before.png /tmp/desktop-check3.png /tmp/diff3.png; echo
```
Expected: `AE` = `0` — desktop title bar still has red/green dots, windows still drag/resize.

- [ ] **Step 6: Stop dev server and final checkpoint** (no commit — session constraint)

```bash
pkill -f vite
```
Deliverable: mobile apps open fullscreen with `‹ Home` back; desktop window chrome and behavior unchanged.

---

## Self-Review

**Spec coverage:**
- Remove desktop-prompt gate → Task 2, Step 2. ✓
- `MobileHome.jsx` (identity header + quick actions + icon grid) → Task 2, Step 1. ✓
- Shared `appIcons` extraction, desktop identical → Task 1. ✓
- Fullscreen app + `‹ Home` back, no drag/resize on mobile → Task 3. ✓
- Reuse `terminal.json` / `about.json`, no new content → Task 2 imports only. ✓
- Desktop byte-for-byte identical → verified via `compare -metric AE` in Tasks 1, 2, 3. ✓
- eslint clean + build green → every task. ✓

**Placeholder scan:** No TBD/TODO; all code blocks complete; all commands concrete. ✓

**Type consistency:** `apps` shape `{id, icon, label}` defined in Task 1, consumed identically in Task 2 and `DesktopShortcuts`. `ext()`, `open()` helpers self-contained in `MobileHome`. `isMobile = windowSize.width < 768` matches the app-wide breakpoint. ✓
