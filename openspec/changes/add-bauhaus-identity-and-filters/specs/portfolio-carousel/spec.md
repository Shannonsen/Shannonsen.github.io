## MODIFIED Requirements

### Requirement: Content cards

The carousel SHALL present three kinds of content card, each with a layout suited to it, drawn
from the currently active filter.

#### Scenario: Skills card

- **WHEN** a skills card is shown
- **THEN** it lists skill groups, each with a label and the technologies in that group

#### Scenario: Experience card

- **WHEN** an experience card is shown
- **THEN** it shows the company, the role, the period and a short summary

#### Scenario: Project card

- **WHEN** a project card is shown
- **THEN** it shows the project name, a description and the technologies used
- **AND** when the project has a URL, a link to it

#### Scenario: Section identification

- **WHEN** any card is shown
- **THEN** it carries a badge naming its section, in that section's texture

#### Scenario: Slide set follows the filter

- **WHEN** the active filter changes
- **THEN** the carousel's slide set becomes the slides of that filter
- **AND** the cover-flow transforms are recalculated for the new set
- **AND** the position indicator reflects the new set's length, not the full set's
