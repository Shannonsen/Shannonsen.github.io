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
- **THEN** it carries a badge naming its section, in the single accent colour

#### Scenario: Slide set follows the filter

- **WHEN** the active filter changes
- **THEN** the carousel's slide set becomes the slides of that filter
- **AND** the cover-flow transforms are recalculated for the new set
- **AND** the position indicator reflects the new set's length, not the full set's

### Requirement: Cover-flow presentation

The carousel SHALL render the centered slide at the front, flat and sharp, with neighboring
slides receding in 3D, and SHALL do so without drawing a frame around any slide.

#### Scenario: Slides at rest

- **WHEN** the carousel is settled on a slide
- **THEN** the centered slide is unrotated, at full scale, unblurred and fully opaque
- **AND** each neighboring slide is rotated about the vertical axis away from the viewer,
  scaled down, blurred and dimmed in proportion to its distance from the center

#### Scenario: No slide frame

- **WHEN** any slide is rendered
- **THEN** it has no rule and no shadow of its own
- **AND** its depth is conveyed only by rotation, scale, blur and opacity

#### Scenario: The slide has no surface of its own

- **WHEN** a slide is rendered on the slate
- **THEN** it has no fill, and the grid runs unbroken behind its content
- **AND** its text therefore meets AA against the ground *as lightened by a grid rule*, not
  only against bare slate

#### Scenario: Rotation direction

- **WHEN** a slide sits to the left of center
- **THEN** it rotates in the opposite direction to a slide sitting to the right of center

## ADDED Requirements

### Requirement: Layered motion

A slide's inner content SHALL move against the slide as it travels, rather than riding it
rigidly.

#### Scenario: Dragging the carousel

- **WHEN** the visitor drags the carousel
- **THEN** a slide's badge, heading and body copy each shift by a different amount, in
  proportion to how far that slide is from center
- **AND** at rest in the center, every layer is back in its resting position

#### Scenario: Reduced motion

- **WHEN** the visitor's system requests reduced motion
- **THEN** no layer is displaced

### Requirement: Continuous progress

Position SHALL be shown as continuous travel, not only as discrete steps.

#### Scenario: Scrolling between slides

- **WHEN** the visitor drags part-way between two slides
- **THEN** a progress indicator reflects that intermediate position rather than snapping

### Requirement: Wheel and trackpad navigation

The carousel SHALL respond to wheel and trackpad input on both axes.

#### Scenario: Horizontal gesture

- **WHEN** the visitor swipes horizontally on a trackpad over the carousel
- **THEN** the carousel tracks the gesture continuously, as it does a drag

#### Scenario: Vertical wheel

- **WHEN** the visitor turns a mouse wheel over the carousel
- **THEN** the carousel advances or retreats by one slide per notch
- **AND** a single diagonal gesture never moves the carousel twice

### Requirement: Static viewport

On a viewport tall enough to hold it, the page SHALL occupy exactly one screen and SHALL NOT
scroll.

#### Scenario: A tall enough viewport

- **WHEN** the viewport is at least 700px tall
- **THEN** the page fills exactly that height and neither axis scrolls
- **AND** the carousel absorbs whatever height the header and footer leave

#### Scenario: A viewport too short to hold the layout

- **WHEN** the viewport is shorter than that
- **THEN** the page scrolls normally rather than clipping its content
