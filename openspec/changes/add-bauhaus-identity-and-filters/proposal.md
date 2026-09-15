## Why

The site has no visual point of view: it leans on the default indigo-to-purple gradient that
ships with every React starter, soft shadows and rounded corners. Shannon wants a retro
identity built on five colours — orange, blue, red, yellow, green — in a Bauhaus register:
flat blocks, thick black rules, hard offset shadows, and a graph-paper ground.

Separately, the carousel now holds three kinds of content in one continuous run. A visitor who
wants to see the projects has to drag past everything else. Section filters solve that.

## What Changes

- Introduce a design-token layer (`src/styles/tokens.css`) defining the Bauhaus palette, the
  paper ground, the ink colour, rule weights and the hard-shadow offset. Every component
  references tokens instead of hard-coded hex values.
- Replace the indigo/purple gradient identity everywhere: intro window, carousel, buttons,
  dots, arrows, headings.
- Give the page a graph-paper background: black rules on bone, minor and major grid.
- Restyle components in the Bauhaus register: square corners, 2px ink rules, hard offset
  shadows instead of blurred ones, flat fills instead of gradients.
- Add a filter bar above the carousel with four pills — All, Skills, Experience, Projects.
  Selecting one narrows the carousel to that section's slides; All restores every slide.
- Each section keeps a fixed colour throughout: Skills blue, Experience orange, Projects
  green. Yellow and red carry accents and destructive/primary actions.
- **BREAKING** (visual): the previous soft, rounded, gradient look is gone entirely.

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
