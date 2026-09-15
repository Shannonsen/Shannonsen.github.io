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

- [x] 10.1 Anchor the grid to the content column as its own layer, bled sideways by a whole
      multiple of the major step so it covers the viewport without losing alignment.
- [x] 10.2 ~~Confine the grid to a sheet~~ — reverted on review; the bare sides read as empty.
- [x] 10.3 Size the carousel to 1024px so its edges land on major rules inside the sheet.
- [x] 10.4 Snap the vertical measures to multiples of the 32px step.
- [x] 10.5 ~~Draw the sheet edge with a shadow ring~~ — dropped with the sheet.

## 11. Wheel input and static page (review feedback)

- [x] 11.1 Add `embla-carousel-wheel-gestures` for continuous horizontal wheel and trackpad.
- [x] 11.2 Add a vertical-wheel handler for mouse users, guarded against double-handling a
      diagonal gesture.
- [x] 11.3 Lock the page to one viewport height above 700px; scroll below it.
- [x] 11.4 Make the carousel the flexible element so it absorbs the leftover height.
- [x] 11.5 Fix `.app-container`'s `min-height: 100vh`, which made the page taller than the
      viewport regardless of content.

## 12. Grid clipping regression

- [x] 12.1 Remove `overflow: hidden` from `#root`, which cropped the bleeding grid layer back
      to the content column. The scroll lock lives on `body` and was always sufficient.

## 13. Card surface

- [x] 13.1 Give the carousel slides a soft translucent fill that mutes the grid beneath rather
      than hiding it, keeping them frameless.
- [x] 13.2 Verify the fill does not erode type contrast — it improves it at every tint.

## 14. Slate ground

- [x] 14.1 Invert the ground to a near-black slate with white grid rules.
- [x] 14.2 Split the type scale in two, `--on-slate-*` and `--on-paper-*`, named for their
      ground so neither can be used against the wrong one by accident.
- [x] 14.3 Make the carousel slides solid bone sheets, separating at 17.21:1.
- [x] 14.4 Let orange be type on the slate, and take the hairline off orange fills there.
- [x] 14.5 Check no component uses one ground's type scale against the other.

## 6. Verification

- [x] 6.1 `npm run lint` and `npm run build` pass.
- [x] 6.2 Confirm no stray `#667eea` / `#764ba2` remain in `src/`.
- [ ] 6.3 Manually verify: pills filter and restore, one-slide case, grid legibility, layout
      at 375px, reduced motion.

> 6.3 note: the Chrome extension would not connect at any point this session, so every visual
> pass is pending on the developer's machine. Contrast was verified numerically throughout —
> see the palette decisions in design.md.
