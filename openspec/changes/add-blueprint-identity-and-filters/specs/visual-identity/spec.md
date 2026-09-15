## Purpose

The visual identity is a drawing table: a near-black slate carrying a white drafting grid, with
bone paper sheets laid on it to hold the content. Each ground has its own type scale; orange
spans both. It is the language every component draws from.

## ADDED Requirements

### Requirement: Palette

The site SHALL draw its colour from the blueprint blue, orange, and a scale of bone tints,
exposed as design tokens.

#### Scenario: Palette tokens exist

- **WHEN** a component needs a colour
- **THEN** it reads a token for the slate, for paper, for orange, or for a type tint belonging
  to one of the two grounds
- **AND** it does not introduce a colour outside that set

#### Scenario: Each ground has its own type scale

- **WHEN** text is set on the slate
- **THEN** it uses a bone tint from the slate scale
- **WHEN** text is set on a paper sheet
- **THEN** it uses a blue tint from the paper scale
- **AND** neither scale is ever used against the other ground

#### Scenario: Orange as type

- **WHEN** orange is set as type on the slate
- **THEN** it is legible, at 7.48:1
- **WHEN** orange would be set as type on paper
- **THEN** it is not used, being 2.30:1 there

#### Scenario: An orange fill is given an edge only where it needs one

- **WHEN** orange is used as a fill on paper
- **THEN** it carries a blue hairline, because orange against bone is 2.30:1 and its edges
  would otherwise dissolve into the sheet
- **WHEN** orange is used as a fill on the slate
- **THEN** it needs no hairline, separating at 7.48:1 on its own

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
- **THEN** a repeating grid of thin white rules covers the page from edge to edge on a
  near-black slate
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

- **WHEN** text sits directly on the ground, where a grid rule may pass beneath it
- **THEN** it meets AA against the ground *as lightened by a major rule*, which is the worst
  case, not against the bare ground
