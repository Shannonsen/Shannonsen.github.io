## Context

The app is a single-page React 19 + Vite site with one component (`NameCarousel`) and
global CSS. Hopper UI is installed and used for typography primitives, but the macOS window
is a bespoke visual: Hopper has no window chrome primitive, and forcing one would fight the
design. The intro window is therefore hand-rolled CSS, consistent with how `NameCarousel`
already ships its own stylesheet.

The next change replaces the carousel entirely, so this change must not couple the window to
the carousel's internals — only to "whatever App renders behind me".

## Goals / Non-Goals

**Goals:**

- A window that reads as macOS at a glance: traffic lights, translucent title bar, address
  bar, deep shadow.
- Entrance and exit motion that feels physical rather than a linear fade.
- Identity data lives in one module so the carousel change can reuse it without duplication.
- Keyboard and screen-reader usable; respects `prefers-reduced-motion`.

**Non-Goals:**

- Persisting dismissal across reloads (the window is the intended first impression every
  visit).
- A real draggable/resizable window manager. The traffic lights are decorative except for
  the red one, which closes.
- Touching the carousel's behavior — that is the next change.

## Decisions

**State lives in `App`, not in the window.** `App` owns `isIntroOpen`. The window is a
controlled component taking `open` and `onDismiss`. This keeps the reveal of the page
content — which the next change will rework — in the parent's hands.

**Exit animation without a library.** Rather than pull in a motion library for one
transition, the component keeps a small `isClosing` flag: `onDismiss` sets it, the CSS exit
animation runs, and an `animationend` handler tells the parent to unmount. This is ~15 lines
and adds no dependency. Guarding on `event.animationName` avoids firing on nested animations.

**Motion curve.** Entrance uses a slight overshoot
(`cubic-bezier(0.34, 1.56, 0.64, 1)`) on scale plus translate-Y, so the window "lands"
instead of sliding. Exit is faster (180ms vs 420ms) and scales down without overshoot —
dismissals should feel immediate. The backdrop blur fades independently so the page behind
sharpens as the window leaves.

**Data module.** `src/data/profile.ts` exports a typed `profile` object (name, email,
country, url, bio, role). The window imports it; the carousel change will too. A plain
module beats context or props-drilling for data that never changes at runtime.

**Focus handling.** On mount the window's container receives focus; a keydown handler on the
container implements a minimal focus trap over its focusable children and maps `Escape` to
dismiss. A full trap library is unwarranted for one dialog with three controls.

**`aria-hidden` on the background.** While open, the page content wrapper is marked
`aria-hidden` and `inert`-like (pointer-events off via CSS) so assistive tech does not read
content the visitor cannot reach.

## Risks / Trade-offs

- **`animationend` may not fire** if the element is display-swapped or the animation is
  removed under `prefers-reduced-motion`. Mitigated by keeping the reduced-motion path on a
  1ms animation rather than `animation: none`, so the event still fires.
- **Backdrop blur is expensive** on low-end devices. Kept to a single 8px blur layer, and the
  backdrop is removed from the DOM after dismissal rather than left at opacity 0.
- **Hand-rolled focus trap** is less robust than a library. Acceptable here: one dialog, three
  focusable elements, and it is removed from the DOM when closed.
