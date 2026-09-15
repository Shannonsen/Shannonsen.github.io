## 1. Token layer

- [x] 1.1 Add `src/styles/tokens.css`: palette (orange, red, blue, yellow, green), paper, ink,
      section colour aliases, rule weights, hard-shadow offsets.
- [x] 1.2 Import it from `src/index.css` and repoint the global element styles (body, links,
      buttons, headings) onto tokens.

## 2. Graph-paper ground

- [x] 2.1 Give `body` the bone ground with minor and major grid rules, tuned so text over it
      keeps its contrast.

## 3. Filter pills

- [x] 3.1 Add `src/components/FilterPills.tsx`: All / Skills / Experience / Projects, taking
      `active` and `onChange`, each section pill in its colour.
- [x] 3.2 Add accessible semantics: labelled group, per-pill selected state, keyboard operable.
- [x] 3.3 Add `src/components/FilterPills.css` in the Bauhaus register — square, ink-ruled,
      hard shadow, pressed state on the active pill.

## 4. Carousel filtering

- [x] 4.1 `FluidCarousel`: own the active filter, derive the slide set from it, render the
      pills above the viewport.
- [x] 4.2 Re-centre to index 0 and reset the position indicator when the filter changes.
- [x] 4.3 Confirm the one-slide case renders centered without breaking.

## 5. Repaint onto the identity

- [x] 5.1 `FluidCarousel.css`: square cards, ink rules, hard shadows, section-coloured badges,
      square dots and arrows; reduce the tween blur to 2px.
- [x] 5.2 `IntroWindow.css`: ink-ruled window with a hard shadow, palette traffic lights, flat
      name, blocky CTA with a pressed state.
- [x] 5.3 `App.css` + `index.css`: header, footer and global styles onto tokens.
- [x] 5.4 Remove the indigo/purple gradient everywhere it survives.

## 6. Verification

- [x] 6.1 `npm run lint` and `npm run build` pass.
- [x] 6.2 Confirm no stray `#667eea` / `#764ba2` remain in `src/`.
- [ ] 6.3 Manually verify: pills filter and restore, one-slide case, grid legibility, layout
      at 375px, reduced motion.

> 6.3 note: the Chrome extension would not connect across four attempts this session, so the
> manual pass is pending on the developer's machine. Contrast was verified numerically rather
> than visually — see the foreground decision in design.md.
