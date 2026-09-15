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

**The grid is the sheet, not the wallpaper.** Aligning a full-bleed background to centred
content means offsetting the tile by half the difference between viewport and column — which
drags in `vw` units, whose relationship to the centred content box differs by the scrollbar
width, and which has to be re-derived at every breakpoint. Putting the grid on the content
container instead makes its origin the sheet's own top-left corner, so alignment is structural
rather than computed: it cannot drift, at any width. The page outside becomes a plain, slightly
darker ground, which also gives the metaphor its subject — a drafting sheet on a desk.

The measures then have to cooperate, and they do: the sheet is 1280px = 10 major cells, its
gutter is 32px = one minor cell, and the carousel at 1024px = 8 major cells centres inside the
1216px content area to start at x=128 and end at x=1152, both major rules. Vertical measures
are snapped to multiples of 32px so section edges land on rules as well.

The sheet's edge is a `box-shadow` ring, not a border. A 1px border sits inside `max-width`
and would push the content box over by a pixel — precisely the misalignment this is for.

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

## Risks / Trade-offs

- **The sheet's measures are now load-bearing.** Changing the sheet width, the gutter or the
  carousel width breaks the alignment unless the new value is a whole multiple of the step. The
  relationship is recorded in `tokens.css`, but nothing enforces it.
- **Frameless type sits directly on the grid.** The grid is at 7%/15%, faint enough that body
  copy at 8.73:1 holds, but any increase in grid strength erodes text contrast directly — there
  is no card fill to protect it any more.
- **`--type-muted` sits on the AA floor** at 4.54:1. It has no headroom: darkening the bone or
  lightening that tint drops it below.
- **Orange is now confined to fills.** That is a real constraint on future work, not a passing
  preference — anything that wants to be orange and thin has to become a fill or become blue.
- **Contrast measured, not eyeballed.** Every palette colour was checked against paper and ink.
  Yellow (1.65:1 against paper) is only ever a fill under ink. The orange needed two tokens.
  Adding a colour to the palette means repeating that check.
- **The grid is one more thing to render on scroll.** It is a background image on `body`, so it
  composites once rather than per element.
- **Re-centring on filter change discards position.** Deliberate: returning to All and landing
  on a slide unrelated to what the visitor was just reading is worse.
