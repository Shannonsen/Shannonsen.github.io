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

**Section colour lives in one map.** `--color-skills`, `--color-experience`, `--color-project`
alias the palette tokens. Components reference the semantic name, so reassigning Projects from
green to yellow is a one-line change and stays consistent between pill and badge.

**Hard shadows via a token pair.** `--shadow-hard: 4px 4px 0 var(--ink)` and a `--shadow-hard-lg`
for the intro window. Pressed states translate by the offset and drop the shadow, so a button
physically sinks onto the page — the Bauhaus equivalent of a hover lift.

**Graph paper with two grid scales.** Four repeating linear gradients: minor rules every 28px
at 6% ink, major rules every 140px at 13%. One scale alone reads as either noise or as a plain
box; two reads as engineering paper. The opacities are kept low enough that body text over the
grid retains its contrast.

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

**Foreground chosen per fill, not globally.** White on the orange `#e8622a` measures 3.32:1,
below AA. Rather than lighten the text or abandon the colour, each section fill declares its own
foreground token: ink on orange (5.45:1), paper on blue (7.21:1) and green (4.96:1). Ink on
orange is also the more authentically Bauhaus pairing. Orange used as *text* on paper fails for
the same reason, so a second token `--orange-deep` (`#b8471a`, 5.22:1) covers that case. Yellow
is never a fill under anything but ink (11.0:1).

## Risks / Trade-offs

- **Five saturated colours plus black rules is loud.** Mitigated by confining colour to badges,
  pills, rules and small accents while cards and text stay paper and ink.
- **Contrast measured, not eyeballed.** Every palette colour was checked against paper and ink.
  Yellow (1.65:1 against paper) is only ever a fill under ink. The orange needed two tokens.
  Adding a colour to the palette means repeating that check.
- **The grid is one more thing to render on scroll.** It is a background image on `body`, so it
  composites once rather than per element.
- **Re-centring on filter change discards position.** Deliberate: returning to All and landing
  on a slide unrelated to what the visitor was just reading is worse.
