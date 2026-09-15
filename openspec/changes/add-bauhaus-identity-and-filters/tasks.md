## 1. Token layer

- [ ] 1.1 Add `src/styles/tokens.css`: palette (orange, red, blue, yellow, green), paper, ink,
      section colour aliases, rule weights, hard-shadow offsets.
- [ ] 1.2 Import it from `src/index.css` and repoint the global element styles (body, links,
      buttons, headings) onto tokens.

## 2. Graph-paper ground

- [ ] 2.1 Give `body` the bone ground with minor and major grid rules, tuned so text over it
      keeps its contrast.

## 3. Filter pills

- [ ] 3.1 Add `src/components/FilterPills.tsx`: All / Skills / Experience / Projects, taking
      `active` and `onChange`, each section pill in its colour.
- [ ] 3.2 Add accessible semantics: labelled group, per-pill selected state, keyboard operable.
- [ ] 3.3 Add `src/components/FilterPills.css` in the Bauhaus register — square, ink-ruled,
      hard shadow, pressed state on the active pill.

## 4. Carousel filtering

- [ ] 4.1 `FluidCarousel`: own the active filter, derive the slide set from it, render the
      pills above the viewport.
- [ ] 4.2 Re-centre to index 0 and reset the position indicator when the filter changes.
- [ ] 4.3 Confirm the one-slide case renders centered without breaking.

## 5. Repaint onto the identity

- [ ] 5.1 `FluidCarousel.css`: square cards, ink rules, hard shadows, section-coloured badges,
      square dots and arrows; reduce the tween blur to 2px.
- [ ] 5.2 `IntroWindow.css`: ink-ruled window with a hard shadow, palette traffic lights, flat
      name, blocky CTA with a pressed state.
- [ ] 5.3 `App.css` + `index.css`: header, footer and global styles onto tokens.
- [ ] 5.4 Remove the indigo/purple gradient everywhere it survives.

## 6. Verification

- [ ] 6.1 `npm run lint` and `npm run build` pass.
- [ ] 6.2 Confirm no stray `#667eea` / `#764ba2` remain in `src/`.
- [ ] 6.3 Manually verify: pills filter and restore, one-slide case, grid legibility, layout
      at 375px, reduced motion.
