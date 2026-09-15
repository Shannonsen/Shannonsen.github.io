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

## 7. Grid rendering (review feedback)

- [x] 7.1 Redraw the graph paper as a crisp SVG tile instead of stacked gradient hard stops.
- [x] 7.2 Drop the intro overlay's backdrop blur, which was turning the 1px rules into moiré.

## 8. Blueprint and flow (review feedback)

- [x] 8.1 Replace the palette with the blueprint ground, orange accent and bone type tints;
      invert the grid to light rules on blue.
- [x] 8.2 Drop section colour-coding entirely — one accent, sections named in words.
- [x] 8.3 Make the carousel slides frameless: no fill, rule or shadow.
- [x] 8.4 Add per-layer parallax inside each card, driven by the existing tween.
- [x] 8.5 Add a continuous progress rail alongside the dots.
- [x] 8.6 Restyle the intro window, pills and controls for the blueprint.

## 9. Bone ground (review feedback)

- [x] 9.1 Invert the ground to bone with blue grid rules; move the type scale to blue tints.
- [x] 9.2 Give every orange fill a blue hairline, and move thin indicators to blue.
- [x] 9.3 Remove orange from all type, including links, where it is 2.30:1 on bone.
- [x] 9.4 Give the intro window a rule and shadow so it reads against a bone page.

## 10. Grid alignment (review feedback)

- [x] 10.1 Move the grid from `body` onto the content sheet so its origin is the sheet corner.
- [x] 10.2 Give the page outside the sheet a plain, slightly darker ground.
- [x] 10.3 Size the carousel to 1024px so its edges land on major rules inside the sheet.
- [x] 10.4 Snap the vertical measures to multiples of the 32px step.
- [x] 10.5 Draw the sheet edge with a shadow ring rather than a border, which would offset the
      content box by a pixel.

## 6. Verification

- [x] 6.1 `npm run lint` and `npm run build` pass.
- [x] 6.2 Confirm no stray `#667eea` / `#764ba2` remain in `src/`.
- [ ] 6.3 Manually verify: pills filter and restore, one-slide case, grid legibility, layout
      at 375px, reduced motion.

> 6.3 note: the Chrome extension would not connect at any point this session, so every visual
> pass is pending on the developer's machine. Contrast was verified numerically throughout —
> see the palette decisions in design.md.
