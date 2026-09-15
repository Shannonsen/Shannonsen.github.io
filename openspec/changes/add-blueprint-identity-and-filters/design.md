## Context

Every component currently hard-codes the same starter-kit hex values — `#667eea`, `#764ba2`,
slate greys — and each stylesheet repeats them. Recolouring the site by find-and-replace would
work once and then rot. This change introduces a token layer first, then repaints through it.

The carousel already rebuilds its cover-flow transforms on Embla's `reInit`, and Embla 8 ships
`watchSlides: true`, so it re-inits by itself when its slide DOM changes. Filtering can
therefore be a plain React render of a different slide array — the tween layer needs no
special handling. Verified in the installed 8.6.0 source: `createEngine` also recurses with
`loop: false` when `slideLooper.canLoop()` fails, so filtering down to a single slide degrades
instead of breaking.

## Goals / Non-Goals

**Goals:**

- One place to change a colour.
- A section's colour is the same in its pill and on its card, so the mapping is learnable.
- Filtering that actually reduces the carousel, including the degenerate one-slide case.
- Keep the cover-flow motion that was just approved.

**Non-Goals:**

- A typeface change. Bauhaus suggests a geometric sans, but Inter is already loaded and
  swapping it is a separate decision with its own loading cost.
- Dark mode. The palette is defined against paper; a dark variant needs its own colour work.
- Animating the filter transition. Embla re-inits on the new set; cross-fading slides in and
  out is a separate piece of work.

## Decisions

**Tokens as CSS custom properties, not a JS theme object.** The styling is plain CSS files per
component; custom properties reach them without a build step or a runtime provider, and they
cascade into the imperative styles the carousel tween writes. `src/styles/tokens.css` is
imported once from `index.css`.

**Sections stop being colour-coded.** Two earlier attempts spent signal on distinguishing the
three sections — first hue, then riso texture. Both were solving a problem the content does not
have: each badge already says "Skills", "Experience" or "Projects". The label is also the only
signal that survives being read aloud or seen by someone who cannot separate two hues. So every
badge is orange, and the accent is spent on pointing rather than on categorising.

**Hard shadows via a token pair.** `--shadow-hard: 4px 4px 0 var(--ink)` and a `--shadow-hard-lg`
for the intro window. Pressed states translate by the offset and drop the shadow, so a button
physically sinks onto the page — the Bauhaus equivalent of a hover lift.

**Graph paper drawn as an SVG tile, not as gradients.** Two scales — minor rules every 32px at
5% ink, a major rule every 128px at 11% — because one scale alone reads as either noise or as a
plain box. The first attempt stacked four `linear-gradient`s with hard stops
(`colour 1px, transparent 1px`); those stops get antialiased, so on a fractional device pixel
ratio some rules land crisp and others land soft and the grid reads as badly made. The tile is
now an SVG of exact 1px `rect`s with `shape-rendering='crispEdges'`, which snaps every rule to
device pixels. `rect`, not `line`: a 1px stroke centred on x=32 straddles 31.5-32.5 and blurs no
matter what. Cost: the ink is baked into the data URI, since it cannot read a custom property.
The tile size must stay a whole multiple of the minor step or the seam shows as a doubled rule.

**No blur over the grid.** The intro overlay's `backdrop-filter: blur()` smeared the 1px rules
into moiré — bands and phantom lines that are not in the background at all. It is replaced by a
flat ink wash, which is also the only treatment consistent with a flat graphic language.

**Cards stay opaque.** The grid is a ground, not a texture for the content to sit in. Cards
fill with paper-white so text never competes with rules underneath.

**Filter state lives in `FluidCarousel`.** The pills are a presentational component taking
`active` and `onChange`; the carousel owns the state because it owns the slide set. Lifting it
to `App` would buy nothing today.

**Re-centre on filter change.** When the filter changes, the slide array changes identity, so
the component scrolls to index 0 and resets `selectedIndex`. Without this, Embla keeps its
previous index and lands mid-set on a shorter list.

**Blur reduced, not removed.** Blur is at odds with a flat graphic language, but it is the
depth cue that makes the cover flow read. It drops from 3.2px to 2px: enough to separate the
planes, little enough that the cards still look printed.

**The two colours divide the work, which is why this pairing needs no second tone.** Measuring
five blue/orange pairs showed the same shape every time: deep blues are excellent as type
(10-12:1 on a light ground, 11-14:1 under white) while oranges fail as type (2.2-3.1:1) and
excel as fills (5.3-7.4:1). Rather than fight that, the palette assigns it — bone tints set all
type, orange only ever fills. That removes the two-token problem the previous palettes both hit.

`#0f2c52` with `#ff7a2f` was chosen over the other four because it is the only pair where the
orange is legible *directly on* the blue (5.38:1). The others range from 3.57 down to 1.31, so
the two colours could never touch. On a blueprint ground they touch constantly.

**A full-bleed grid anchored to the column, via an integer bleed.** The naive way to align a
full-bleed background to centred content is to offset the tile by half the difference between
viewport and column. That drags in `vw` units, whose relationship to the centred content box
differs by the scrollbar width, and it has to be re-derived at every breakpoint.

The grid is instead its own layer, absolutely positioned against the content column and
extended sideways by `--grid-bleed: 2560px` — deliberately **20 whole major cells**. Because the
bleed is an integer multiple of the step, the rules land in exactly the positions a
column-origin grid would put them, while the layer still covers the viewport. There is no
arithmetic at runtime and nothing to recompute per breakpoint. 2560px each side covers viewports
to ~6400px.

The layer is a `::before` at `z-index: -1`, which needs `#root` to be a stacking context
(`position: relative; z-index: 0`) so it paints under the content rather than under the page.

The trap this sets: because the layer is a child of `#root` and deliberately overflows it, any
`overflow` on `#root` crops the background back to the content column. Adding `overflow: hidden`
there while building the static page did exactly that. Only `body` carries the scroll lock.

The measures cooperate: the column is 1280px = 10 major cells, its gutter is 32px = one minor
cell, and the carousel at 1024px = 8 major cells centres inside the 1216px content area to start
at x=128 and end at x=1152, both major rules. Vertical measures are snapped to multiples of 32px
so section edges land on rules as well.

A confined, sheet-shaped grid was tried first and rejected on review: losing the grid at the
sides read as emptiness rather than as a sheet on a desk.

**What is exempt, and why it has to be.** Carousel slides cannot participate. They are scaled,
rotated about Y and translated in Z, recomputed every scroll frame, so their text has no fixed
relationship to a page rule. This is the reason the alignment is structural — edges, gutters and
section boundaries — rather than a typographic baseline grid: a baseline grid would align the
header and footer while the largest element on the page visibly floated free of it.

**Bone ground, blue grid.** The graph paper predates this palette, and drawing its rules in the
blueprint blue rather than black is what makes the page read as a drafting sheet rather than as
lined paper. Rules sit at 7%/15%.

**The orange needs a hairline, because on bone it cannot serve two masters.** On a blue ground
one number did two jobs: the ground and the type over the orange were the same blue, so 5.38:1
covered both the fill's edge and its label. On bone those become two opposing pulls — measured
across five oranges, the crossover where both are equal lands at about 3.5/3.5, under AA either
way. Lightening the orange so blue type reads on it (5.38:1) leaves it at 2.30:1 against bone;
darkening it for definition drops the label below AA. So the colour is not asked to do both: the
orange stays light and every orange fill carries a 1px blue hairline, which supplies the edge at
12.38:1. The corollary is that anything *thin* — the progress rail, rules, the focus ring — is
blue rather than orange, since a hairline of orange on bone would barely register. Orange never
sets type at all.

**Wheel input needs both axes, from two mechanisms.** `embla-carousel-wheel-gestures` resolves
its axis as `forceWheelAxis ?? engine.options.axis`, so on a horizontal carousel it claims
x-dominant gestures and ignores vertical ones. That is right for a trackpad swipe and useless
for a mouse wheel, which only reports `deltaY` — and once the page no longer scrolls vertically,
a plain wheel would have nothing at all to do. So the plugin keeps the horizontal axis
continuously, and a small handler covers the vertical one in notches, guarded on
`|deltaY| > |deltaX|` so one diagonal gesture cannot be consumed by both.

**Static page, with a floor.** The page locks to one viewport height above 700px and scrolls
below it. Locking a viewport that cannot fit the layout does not make the layout smaller, it
hides part of it, which is worse than scrolling. Inside the lock the carousel is the flexible
element: header and footer take what they need and it absorbs the rest.

Two consequences worth stating. The header gives up size in static mode — a locked page is only
worth having if the content fits, and on a laptop viewport it otherwise does not. And vertical
grid alignment cannot survive this: section edges are now positioned by a viewport height that
is not a multiple of the step. Horizontal alignment — the column, the gutter, the carousel's
edges — is unaffected, and that is the part that reads.

Fixing this also removed a latent bug: `.app-container` carried `min-height: 100vh` inside a
`#root` with 32px of padding, so the page was always 64px taller than the viewport and always
scrolled a little, whatever the content.

## Risks / Trade-offs

- **The measures are now load-bearing.** Changing the column width, the gutter, the carousel
  width or the bleed breaks the alignment unless the new value is a whole multiple of the step.
  The relationships are recorded in `tokens.css`, but nothing enforces them.
- **Card content can outgrow a short viewport.** At the 700px floor the slide gets about 334px.
  The bio clamps to four lines to give way first, but a longer bio or a fifth skill group would
  clip rather than scroll.
- **`#root` must never clip.** The grid layer overflows it on purpose, so an `overflow` rule
  there silently crops the background to the column. It is commented in place, but the coupling
  is invisible from either side on its own.
- **The bleed is finite.** Beyond a ~6400px viewport the grid would stop short. Raising
  `--grid-bleed` is safe only in multiples of the major step.
- **All slate type sits directly on the grid**, so the grid's opacity is a contrast input, not
  only a visual choice. Raising the major rule above 13% pushes `--on-slate-muted` back under
  AA. The token comments record both figures for exactly this reason.
- **`--on-paper-muted` sits on the AA floor** at 4.54:1. It has no headroom. The paper scale is
  now used only by the intro window, so that is where it matters.
- **Two type scales is two chances to reach for the wrong one.** The names carry the ground, and
  a check confirms neither scale is used against the other, but nothing enforces it at build
  time.
- **Orange is now confined to fills.** That is a real constraint on future work, not a passing
  preference — anything that wants to be orange and thin has to become a fill or become blue.
- **Contrast measured, not eyeballed.** Every palette colour was checked against paper and ink.
  Yellow (1.65:1 against paper) is only ever a fill under ink. The orange needed two tokens.
  Adding a colour to the palette means repeating that check.
- **The grid is one more thing to render on scroll.** It is a background image on `body`, so it
  composites once rather than per element.
- **Re-centring on filter change discards position.** Deliberate: returning to All and landing
  on a slide unrelated to what the visitor was just reading is worse.
