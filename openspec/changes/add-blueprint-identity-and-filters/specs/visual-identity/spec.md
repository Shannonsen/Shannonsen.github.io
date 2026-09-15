## Purpose

The visual identity is a drawing table drawn in one five-step green scale: a near-black ground
carrying a pale drafting grid, with pale sheets laid on it to hold the content. Each ground has
its own type scale. It is the language every component draws from.

## ADDED Requirements

### Requirement: Palette

The site SHALL draw its colour from the blueprint blue, orange, and a scale of bone tints,
exposed as design tokens.

#### Scenario: Palette tokens exist

- **WHEN** a component needs a colour
- **THEN** it reads a token from the green scale: the ground, a sheet, sage, mint, or a type
  tint belonging to one of the two grounds
- **AND** it does not introduce a colour outside that scale

#### Scenario: Each ground has its own type scale

- **WHEN** text is set on the slate
- **THEN** it uses a bone tint from the slate scale
- **WHEN** text is set on a paper sheet
- **THEN** it uses a blue tint from the paper scale
- **AND** neither scale is ever used against the other ground

#### Scenario: The two accents divide by job

- **WHEN** an element classifies content — a section badge, a filter pill's selected state
- **THEN** it uses sage
- **WHEN** an element reports navigation or responds to the visitor — progress, the current
  slide, a hover, a link
- **THEN** it uses mint

#### Scenario: The accents separate by value, not only hue

- **WHEN** sage and mint elements appear near each other
- **THEN** they are distinguishable by lightness alone, so telling them apart does not depend
  on colour vision

#### Scenario: A step that cannot be type is not used as type

- **WHEN** a step of the scale is too dark to meet AA on the ground
- **THEN** it is used only as a sheet type tint or as a rule, never as type on the ground

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
