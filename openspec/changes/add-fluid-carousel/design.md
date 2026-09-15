## Context

`embla-carousel-react` is already a dependency and already drives the placeholder carousel,
so the scroll engine, drag physics, looping and snapping are solved. What is missing is the
visual layer on top of it. Embla exposes `scrollProgress()` and per-slide snap positions on
every `scroll` event, which is exactly the signal a cover flow needs — this is a rendering
problem, not a new-library problem.

The intro window from the previous change already established `src/data/` as where content
lives and per-component CSS as the styling convention. This change follows both.

## Goals / Non-Goals

**Goals:**

- Transforms that are a continuous function of scroll position, so the effect feels attached
  to the visitor's finger rather than triggered by it.
- Real content: skills, experience, projects, typed and separated from presentation.
- Correct transforms across the loop boundary, which is where naive cover flows break.
- Degrade cleanly under `prefers-reduced-motion`.

**Non-Goals:**

- Autoplay. The slides carry text worth reading; moving them out from under the reader is
  hostile. The `embla-carousel-autoplay` dependency stays installed but unused.
- A generic reusable carousel component. This one is shaped around these three card types.
- Real experience and project data — the structure ships with marked placeholders for Shannon
  to fill in.

## Decisions

**Tween on `scroll`, not on `select`.** A `select`-driven implementation only knows about
settled slides, so a half-finished drag shows the end state of whichever slide will win. The
implementation subscribes to Embla's `scroll`, `reInit` and `slideFocus` events, reads
`scrollProgress()` and `scrollSnapList()`, and writes transforms directly to each slide's
inner node. Writing styles imperatively rather than through React state avoids re-rendering
every slide on every animation frame of a drag.

**Loop-boundary correction.** When `loop: true`, a slide that has been repositioned to the far
side has a scroll-snap distance that no longer reflects where it visually sits. Embla exposes
this through `internalEngine().slideLooper.loopPoints`; for each looped slide the raw
difference is rewritten against the wrapped progress (`scrollSnap - (1 + progress)` or
`scrollSnap + (1 - progress)`). Without this, slides crossing the seam snap to the wrong
rotation for one frame. This is the single subtlest part of the component and is commented as
such.

**Transform curve.** The normalized signed distance `d` (clamped to [-1, 1]) drives:
`rotateY(d * -42deg)`, `translateZ(-|d| * 140px)`, `scale(1 - |d| * 0.22)`,
`opacity(1 - |d| * 0.5)`, `blur(|d| * 3.2px)`. Rotation keeps `d`'s sign so the two sides
mirror; everything else uses `|d|`. The container carries `perspective: 1600px`, which is far
enough back that the tilt reads as depth rather than distortion.

**No CSS transition on the tweened transform.** The transform is rewritten every scroll frame;
a transition on top of it would lag behind the drag and fight the engine. Smoothness comes
from Embla's own scroll physics.

**Edge fade via mask, not overlay.** With `overflow: hidden` the neighbouring cards end at a
straight vertical line, which reads as breakage rather than depth — the one thing a cover flow
must not do. The fix is a horizontal `mask-image` on the viewport so the neighbours dissolve.
A gradient overlay in the page background colour was rejected: `body` carries its own vertical
gradient, so an overlay would have to match a colour that changes down the page and would drift
as soon as the background is touched. The mask is background-agnostic.

**Slide width at 52%.** Narrow enough that both neighbours peek and the cover flow is legible as
one, wide enough that the centre card stays a comfortable reading column (~570px at the
1100px max width). It widens to 85% under 768px, where the neighbour barely peeks at all — so
the mask narrows there too, or it would eat into the centre card.

**Content model.** `src/data/portfolio.ts` exports three typed collections. The component
flattens them into a discriminated union of slides and renders one card component per kind.
Placeholder entries are marked with a `TODO` comment block rather than invented detail, so
nothing fictional about Shannon's history can ship by accident.

## Risks / Trade-offs

- **Blur on many layers is expensive.** Capped at 3.2px, and only slides Embla reports in view
  are tweened during a scroll; the rest are skipped.
- **Imperative style writes bypass React.** The slide nodes are collected on `reInit`, so a
  change in slide count re-collects them. This is the documented Embla pattern, but it does
  mean the transforms are invisible to React DevTools.
- **Masking an ancestor of 3D content.** A mask forces the subtree into its own buffer, and
  some engines have historically flattened descendant 3D transforms when that happens. Chrome
  and Firefox composite this correctly; Safari is the one to check on review. If it does
  flatten, the fallback is pseudo-element overlays with the background colour baked in.
- **Reduced motion loses the effect entirely.** Rotation and blur are dropped rather than
  softened — a shallow 3D tilt is still vestibular motion, and the content reads fine flat.
