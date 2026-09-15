## Why

The portfolio currently opens on a generic header plus a name carousel, which says nothing
about who Shannon is. The landing moment should introduce her directly — name, contact,
country and background — in a presentation that already signals craft. A macOS-style window
does that: it is instantly recognizable, it frames the personal data as a "profile card",
and it gives the site a deliberate entry point the visitor dismisses to continue.

## What Changes

- Add an intro window component rendered as the first thing a visitor sees: a macOS-styled
  window (title bar, traffic-light buttons, browser-like address bar).
- The address bar shows `www.about.me` styled in blue, as the window's URL.
- The window body shows Shannon's identity block: full name, email
  (`shannonsenpmo@gmail.com`), country (Mexico), and a one-paragraph bio stating she is a
  Software Engineer graduated from the Software Engineering program at the Facultad de
  Matemáticas, Universidad Autónoma de Yucatán.
- A primary call-to-action button ("Know me") dismisses the window with an exit animation
  and reveals the page content behind it. The red traffic-light button dismisses it too.
- **BREAKING** (copy only): the existing Spanish copy in `App.tsx` is rewritten in English,
  matching the project convention that everything shipped is in English.
- The carousel stays as-is in this change; the next change replaces it with the fluid one.

## Capabilities

### New Capabilities

- `intro-window`: the macOS-style landing window that presents Shannon's identity and
  gates the rest of the page behind an explicit dismissal.

### Modified Capabilities

<!-- none: no existing specs -->

## Impact

- New `src/components/IntroWindow.tsx` + `IntroWindow.css`.
- New `src/data/profile.ts` holding the identity data as a single source of truth, so the
  carousel change can reuse it.
- `src/App.tsx`: renders the intro window over the page, owns the dismissed state, and gets
  its copy translated to English.
- `index.html`: `lang` attribute and meta description switch to English.
- No new dependencies.
