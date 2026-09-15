## Purpose

The visual identity is the blueprint the whole portfolio is drawn on: a deep blue ground
carrying a drafting grid, type set in tints of bone, and orange reserved for accent. It is the
language every component draws from.

## ADDED Requirements

### Requirement: Palette

The site SHALL draw its colour from the blueprint blue, orange, and a scale of bone tints,
exposed as design tokens.

#### Scenario: Palette tokens exist

- **WHEN** a component needs a colour
- **THEN** it reads a token for the blueprint ground, for orange, or for a bone type tint
- **AND** it does not introduce a colour outside that set

#### Scenario: The two colours divide the work

- **WHEN** something needs to be set as type on the ground
- **THEN** a bone tint is used, never orange, whose hue vibrates at text sizes
- **WHEN** something needs to be filled or pointed at
- **THEN** orange is used, with the blueprint blue laid over it

#### Scenario: No gradients in the identity

- **WHEN** any surface, button or heading is rendered
- **THEN** it uses a flat fill rather than a colour gradient

### Requirement: Sections are named, not colour-coded

Sections SHALL be identified by their label rather than by a colour or texture assigned to them.

#### Scenario: Section identification

- **WHEN** Skills, Experience or Projects content is rendered anywhere
- **THEN** it carries a badge in the single accent colour that names the section in words
- **AND** no section is distinguished from another by hue or texture alone

### Requirement: Surface treatment

Surfaces SHALL be drawn with hairline rules at low alpha rather than as bordered blocks.

#### Scenario: A control or window surface

- **WHEN** the intro window or a control is rendered
- **THEN** its rule is a bone hairline at low alpha, or it has no rule at all
- **AND** it carries no hard offset shadow

### Requirement: Blueprint ground

The page SHALL sit on a deep blue ground carrying a drafting grid.

#### Scenario: Background rendering

- **WHEN** the page is displayed
- **THEN** the background is the blueprint blue with a repeating grid of thin light rules
- **AND** the grid distinguishes minor cells from heavier major cells
- **AND** the grid never reduces the contrast of text placed over it

### Requirement: Contrast

Text SHALL stay legible against the palette.

#### Scenario: Text on a coloured fill

- **WHEN** text is placed on any palette colour used as a fill
- **THEN** the pairing meets at least WCAG AA contrast for its size

#### Scenario: Text over the grid

- **WHEN** text sits directly on the ground, over the grid rules
- **THEN** it meets AA against the ground, and the grid is faint enough not to erode it
