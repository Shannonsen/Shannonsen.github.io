## Purpose

The visual identity is the Bauhaus design language the whole portfolio is drawn in: ink and
coral on a bone graph-paper ground, with flat fills, thick ink rules and hard offset shadows
instead of gradients and blur.

## ADDED Requirements

### Requirement: Palette

The site SHALL draw its colour from ink and coral plus a paper neutral, exposed as design
tokens.

#### Scenario: Palette tokens exist

- **WHEN** a component needs a colour
- **THEN** it reads a token for coral, for ink, or for paper
- **AND** it does not introduce a colour outside that set

#### Scenario: Coral has two tones

- **WHEN** coral is used as a fill
- **THEN** the full-strength tone is used and only ink is laid over it
- **WHEN** coral is used as text on paper
- **THEN** the deep tone is used instead, because the full-strength tone fails AA there

#### Scenario: No gradients in the identity

- **WHEN** any surface, button or heading is rendered
- **THEN** it uses a flat fill rather than a colour gradient

### Requirement: Section textures

With a single accent colour, each content section SHALL be told apart by a fixed riso texture
rather than by hue, and SHALL keep that texture across the whole site.

#### Scenario: Section texture assignment

- **WHEN** Skills, Experience or Projects content is rendered anywhere
- **THEN** Skills is a solid coral fill, Experience is hatched and Projects is dotted
- **AND** the same assignment holds in the filter pills and in the card badges

#### Scenario: Texture never carries meaning alone

- **WHEN** a textured block is read by assistive technology or by someone who cannot resolve
  the texture
- **THEN** the section is still named in the block's own text
- **AND** no state or action depends on telling two textures apart

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

#### Scenario: Text over a texture

- **WHEN** text sits on a textured block
- **THEN** it meets AA against *both* tones of that texture, not only the base tone
