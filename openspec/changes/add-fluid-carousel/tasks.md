## 1. Content model

- [ ] 1.1 Add `src/data/portfolio.ts`: typed `skillGroups`, `experience` and `projects`
      collections, with placeholder experience/project entries clearly marked TODO.

## 2. Carousel component

- [ ] 2.1 Add `src/components/FluidCarousel.tsx`: Embla with `loop`, centered align and a 62%
      slide width; flatten the three collections into a discriminated slide union.
- [ ] 2.2 Implement the cover-flow tween: subscribe to `scroll`/`reInit`/`slideFocus`, compute
      the signed normalized distance per slide, and write rotateY/translateZ/scale/opacity/
      blur to the slide inner nodes.
- [ ] 2.3 Handle the loop boundary via `slideLooper.loopPoints` so transforms stay correct
      across the seam.
- [ ] 2.4 Render the three card layouts (skills, experience, project) with section badges.
- [ ] 2.5 Add navigation: prev/next buttons, dots with a current-slide state, and left/right
      arrow keys.
- [ ] 2.6 Add accessibility: labelled region, per-slide position info, control names.
- [ ] 2.7 Add `src/components/FluidCarousel.css`: perspective container, card styles, dots,
      responsive rules, and a `prefers-reduced-motion` block that drops rotation and blur.

## 3. Integration and cleanup

- [ ] 3.1 `src/App.tsx`: render `FluidCarousel` and fold the standalone "About Me" block into
      the carousel's skills card.
- [ ] 3.2 Delete `src/components/NameCarousel.tsx` and `NameCarousel.css`.

## 4. Verification

- [ ] 4.1 `npm run lint` and `npm run build` pass.
- [ ] 4.2 Manually verify in `npm run dev`: drag tracks continuously, the loop seam is clean,
      arrows/dots/keyboard work, layout holds at 375px, reduced motion drops the 3D.
