## Purpose

The visual identity is the Bauhaus design language the whole portfolio is drawn in: a
five-colour retro palette on a bone graph-paper ground, with flat fills, thick ink rules and
hard offset shadows instead of gradients and blur.

## ADDED Requirements

### Requirement: Palette

The site SHALL draw its colour from a fixed five-colour palette plus a paper and an ink
neutral, exposed as design tokens.

#### Scenario: Palette tokens exist

- **WHEN** a component needs a colour
- **THEN** it reads a token for orange, red, blue, yellow or green, or for paper or ink
- **AND** it does not introduce a colour outside that set

#### Scenario: No gradients in the identity

- **WHEN** any surface, button or heading is rendered
- **THEN** it uses a flat fill rather than a colour gradient

### Requirement: Section colours

Each content section SHALL keep one colour across the whole site so the colour identifies the
section on sight.

#### Scenario: Section colour assignment

- **WHEN** Skills, Experience or Projects content is rendered anywhere
- **THEN** Skills is blue, Experience is orange and Projects is green
- **AND** the same assignment holds in the filter pills and in the card badges

### Requirement: Bauhaus surface treatment

Surfaces SHALL be drawn as flat blocks with thick ink rules and hard offset shadows.

#### Scenario: A card or window surface

- **WHEN** a card, the intro window or a control is rendered
- **THEN** it has square or near-square corners, a solid ink rule of at least 2px, and any
  shadow is a hard offset with no blur

### Requirement: Graph-paper ground

The page SHALL sit on a bone-coloured graph-paper background.

#### Scenario: Background rendering

- **WHEN** the page is displayed
- **THEN** the background is bone with a repeating grid of thin dark rules
- **AND** the grid distinguishes minor cells from heavier major cells
- **AND** the grid never reduces the contrast of text placed over it

### Requirement: Contrast

Text SHALL stay legible against the palette.

#### Scenario: Text on a coloured fill

- **WHEN** text is placed on any palette colour used as a fill
- **THEN** the pairing meets at least WCAG AA contrast for its size
