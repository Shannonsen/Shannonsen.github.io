## Why

Once the intro window is dismissed, the visitor lands on a placeholder carousel that shows
the same name three times with different job titles. It carries no information. The portfolio
needs the part that actually makes the case for Shannon as an engineer — what she knows,
where she has worked, what she has built — and it should move in a way that is worth
stopping for, not a stock slider.

## What Changes

- Replace `NameCarousel` with `FluidCarousel`: a cover-flow carousel where the off-center
  slides rotate away in 3D, scale down, blur and dim, while the centered slide sits flat and
  sharp at the front.
- The transform is driven continuously by scroll position, not by slide-change events, so the
  effect tracks a drag one-to-one instead of snapping between states.
- Slides are typed content cards of three kinds: **skills**, **experience** and **projects**,
  each with its own card layout and a section badge.
- Navigation: drag, prev/next buttons, clickable dots, and left/right arrow keys.
- Content lives in `src/data/portfolio.ts` as typed collections, seeded with clearly marked
  placeholder entries for experience and projects that Shannon fills in with real data.
- **BREAKING**: `NameCarousel` and its stylesheet are removed.

## Capabilities

### New Capabilities

- `portfolio-carousel`: the cover-flow carousel that presents Shannon's skills, experience
  and projects as the main body of the portfolio.

### Modified Capabilities

<!-- none: intro-window is untouched -->

## Impact

- New `src/components/FluidCarousel.tsx` + `FluidCarousel.css`.
- New `src/data/portfolio.ts` (skill groups, experience entries, projects).
- Removed `src/components/NameCarousel.tsx` + `NameCarousel.css`.
- `src/App.tsx`: renders `FluidCarousel`; the now-redundant "About Me" block folds into the
  carousel's skills card.
- No new dependencies — `embla-carousel-react` is already installed. The
  `embla-carousel-autoplay` dependency becomes unused (autoplay fights readable content) and
  is left installed but unreferenced.
