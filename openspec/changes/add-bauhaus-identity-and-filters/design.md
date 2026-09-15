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

**Sections are textures, not hues.** A two-colour palette has no hue left to spend on
distinguishing sections, so each takes a riso texture: Skills solid, Experience hatched,
Projects dotted. The textures live as `--pattern-*` tokens and are applied identically to the
pill and the badge, so the pill teaches the badge.

The obvious failure mode is text over a texture. It is avoided by hatching coral against a
*lighter* coral rather than against paper: both tones sit above the ink laid over them, so the
worst contrast anywhere on a patterned block is 6.75:1 rather than swinging between legible and
unreadable stripe by stripe. Texture is decorative reinforcement only — every block still names
its section in text, and no state depends on resolving a texture.

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

**Coral needs two tones.** No single coral does both jobs. The true coral `#ff6f61` is
excellent as a fill — ink on it is 6.75:1 — but as text on paper it is 2.68:1 and fails AA. A
coral dark enough to pass as text (`#c4402f`, 5.01:1) no longer reads as coral when used as a
fill. So `--coral` fills and `--coral-deep` sets type, and a third `--coral-light` supplies the
second tone of the textures.

## Risks / Trade-offs

- **Textures are noisier than hue at badge size.** A 7px hatch on a ~24px badge shows about
  three stripes; below that it turns to mush. If the badge ever shrinks, the texture pitch has
  to grow, not shrink with it.
- **Contrast measured, not eyeballed.** Every palette colour was checked against paper and ink.
  Yellow (1.65:1 against paper) is only ever a fill under ink. The orange needed two tokens.
  Adding a colour to the palette means repeating that check.
- **The grid is one more thing to render on scroll.** It is a background image on `body`, so it
  composites once rather than per element.
- **Re-centring on filter change discards position.** Deliberate: returning to All and landing
  on a slide unrelated to what the visitor was just reading is worse.
