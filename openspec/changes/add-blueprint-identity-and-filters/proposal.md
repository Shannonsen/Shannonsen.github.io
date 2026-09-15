## Why

The site has no visual point of view: it leans on the default indigo-to-purple gradient that
ships with every React starter, soft shadows and rounded corners. Shannon wants a retro
identity built on blue and orange. The direction that earns those two colours is a blueprint:
a deep blue ground carrying the graph paper, type set in tints of bone, and orange spent only
where something needs to be pointed at.

Separately, the carousel now holds three kinds of content in one continuous run. A visitor who
wants to see the projects has to drag past everything else. Section filters solve that.

## What Changes

- Introduce a design-token layer (`src/styles/tokens.css`) defining the blueprint ground, orange, the
  paper ground, the ink colour, rule weights and the hard-shadow offset. Every component
  references tokens instead of hard-coded hex values.
- Replace the indigo/purple gradient identity everywhere: intro window, carousel, buttons,
  dots, arrows, headings.
- Give the page a graph-paper background: black rules on bone, minor and major grid.
- Restyle components for the blueprint: hairline bone rules at low alpha, rounded controls,
  no hard offset shadows, flat fills instead of gradients.
- Add a filter bar above the carousel with four pills — All, Skills, Experience, Projects.
  Selecting one narrows the carousel to that section's slides; All restores every slide.
- Sections are not colour-coded at all: every badge is orange and names its section in words,
  which is the only signal that survives being read aloud anyway.
- Carousel cards lose their frame entirely — no fill, no rule, no shadow. Depth comes only
  from the tilt, the scale and the blur, so nothing cuts between one slide and the next.
- Inner card layers parallax against the card as it travels, and the discrete dots gain a
  continuous progress rail, so the carousel reads as motion rather than as steps.
- **BREAKING** (visual): the previous light, gradient look is gone entirely, and the page ground is now dark.

## Capabilities

### New Capabilities

- `visual-identity`: the Bauhaus design language — palette, section colour assignment, rules,
  hard shadows and the graph-paper ground — that every component draws from.
- `carousel-filters`: the pill filter bar that narrows the carousel to one section.

### Modified Capabilities

- `portfolio-carousel`: the slide set becomes a function of the active filter rather than a
  fixed list, and the carousel must stay coherent when that set changes.

## Impact

- New `src/styles/tokens.css`, imported once from `src/index.css`.
- New `src/components/FilterPills.tsx` + `FilterPills.css`.
- `FluidCarousel`: owns the active filter, derives its slides from it, and re-centres when the
  filter changes.
- `IntroWindow.css`, `App.css`, `index.css`, `FluidCarousel.css`: restyled onto tokens.
- No new dependencies.
