## 1. Content model

- [x] 1.1 Add `src/data/portfolio.ts`: typed `skillGroups`, `experience` and `projects`
      collections, with placeholder experience/project entries clearly marked TODO.

## 2. Carousel component

- [x] 2.1 Add `src/components/FluidCarousel.tsx`: Embla with `loop`, centered align and a 62%
      slide width; flatten the three collections into a discriminated slide union.
- [x] 2.2 Implement the cover-flow tween: subscribe to `scroll`/`reInit`/`slideFocus`, compute
      the signed normalized distance per slide, and write rotateY/translateZ/scale/opacity/
      blur to the slide inner nodes.
- [x] 2.3 Handle the loop boundary via `slideLooper.loopPoints` so transforms stay correct
      across the seam.
- [x] 2.4 Render the three card layouts (skills, experience, project) with section badges.
- [x] 2.5 Add navigation: prev/next buttons, dots with a current-slide state, and left/right
      arrow keys.
- [x] 2.6 Add accessibility: labelled region, per-slide position info, control names.
- [x] 2.7 Add `src/components/FluidCarousel.css`: perspective container, card styles, dots,
      responsive rules, and a `prefers-reduced-motion` block that drops rotation and blur.

## 3. Integration and cleanup

- [x] 3.1 `src/App.tsx`: render `FluidCarousel` and fold the standalone "About Me" block into
      the carousel's skills card.
- [x] 3.2 Delete `src/components/NameCarousel.tsx` and `NameCarousel.css`.

## 5. Edge treatment (review feedback)

- [x] 5.1 Add a horizontal `mask-image` to the viewport so neighbouring cards dissolve into
      the page instead of being sliced by the overflow edge.
- [x] 5.2 Narrow the slides from 62% to 52% so more of the neighbour shows before it fades.
- [x] 5.3 Narrow the mask under 768px, where the neighbour only just peeks.

## 4. Verification

- [x] 4.1 `npm run lint` and `npm run build` pass.
- [x] 4.2 Manually verify in `npm run dev`: drag tracks continuously, the loop seam is clean,
      arrows/dots/keyboard work, layout holds at 375px, reduced motion drops the 3D.

> 4.2 verified by Shannon on her machine after the edge-fade fix. Still open for a later
> pass: whether Safari flattens the 3D transforms under the viewport mask (see design.md).
