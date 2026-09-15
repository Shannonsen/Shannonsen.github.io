## Purpose

The visual identity is a drafting sheet: a bone ground carrying a blue drafting grid, type set
in tints of the blueprint blue, and orange reserved for fills. It is the language every
component draws from.

## ADDED Requirements

### Requirement: Palette

The site SHALL draw its colour from the blueprint blue, orange, and a scale of bone tints,
exposed as design tokens.

#### Scenario: Palette tokens exist

- **WHEN** a component needs a colour
- **THEN** it reads a token for a bone ground tint, for orange, or for a blue type tint
- **AND** it does not introduce a colour outside that set

#### Scenario: The two colours divide the work

- **WHEN** something needs to be set as type, or drawn as a hairline, rule or thin indicator
- **THEN** a blue tint is used, never orange
- **WHEN** something needs to be filled
- **THEN** orange is used, with the blueprint blue laid over it

#### Scenario: An orange fill is given an edge

- **WHEN** orange is used as a fill on the bone ground
- **THEN** it carries a blue hairline, because orange against bone is 2.30:1 and its edges
  would otherwise dissolve into the page

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

### Requirement: A full-bleed grid, aligned to the content

The grid SHALL cover the full width of the page, and the layout's structural edges SHALL land
on its rules.

#### Scenario: Background rendering

- **WHEN** the page is displayed
- **THEN** a repeating grid of thin blue rules covers the page from edge to edge on a bone
  ground
- **AND** the grid distinguishes minor cells from heavier major cells
- **AND** the grid never reduces the contrast of text placed over it

#### Scenario: Structural edges land on rules

- **WHEN** the page is displayed at any viewport width
- **THEN** the content column's edges, its gutter, and the carousel's left and right edges each
  coincide with a grid rule
- **AND** this holds without depending on viewport units or scrollbar width
- **AND** it holds although the grid extends well beyond the column on both sides

#### Scenario: Measures are multiples of the step

- **WHEN** a vertical measure separates two sections
- **THEN** it is a whole multiple of the minor step, so section edges land on rules too

#### Scenario: What cannot align

- **WHEN** a carousel slide is rendered
- **THEN** its content is exempt: the slide is scaled, rotated and translated in 3D on every
  scroll frame, so its text cannot sit on a page-level rule

### Requirement: Contrast

Text SHALL stay legible against the palette.

#### Scenario: Text on a coloured fill

- **WHEN** text is placed on any palette colour used as a fill
- **THEN** the pairing meets at least WCAG AA contrast for its size

#### Scenario: Text over the grid

- **WHEN** text sits directly on the ground, over the grid rules
- **THEN** it meets AA against the ground, and the grid is faint enough not to erode it
