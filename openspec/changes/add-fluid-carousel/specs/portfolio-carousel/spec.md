## Purpose

The portfolio carousel is the main body of the site: a cover-flow slider that presents
Shannon's skills, work experience and projects as content cards, with motion that responds
continuously to the visitor's drag rather than snapping between fixed states.

## ADDED Requirements

### Requirement: Cover-flow presentation

The carousel SHALL render the centered slide at the front, flat and sharp, with neighboring
slides receding in 3D.

#### Scenario: Slides at rest

- **WHEN** the carousel is settled on a slide
- **THEN** the centered slide is unrotated, at full scale, unblurred and fully opaque
- **AND** each neighboring slide is rotated about the vertical axis away from the viewer,
  scaled down, blurred and dimmed in proportion to its distance from the center

#### Scenario: Rotation direction

- **WHEN** a slide sits to the left of center
- **THEN** it rotates in the opposite direction to a slide sitting to the right of center

### Requirement: Motion tracks the drag continuously

The transforms SHALL be a function of scroll position, so intermediate drag positions produce
intermediate transforms.

#### Scenario: Visitor drags halfway

- **WHEN** the visitor drags the carousel halfway toward the next slide and holds
- **THEN** the incoming and outgoing slides are each rendered at roughly half of their
  respective end-state rotation, scale, blur and opacity
- **AND** releasing the drag settles the carousel onto the nearest slide

#### Scenario: Looping

- **WHEN** the visitor advances past the last slide
- **THEN** the carousel continues into the first slide without a visible jump, and the
  transforms stay correct across the loop boundary

### Requirement: Content cards

The carousel SHALL present three kinds of content card, each with a layout suited to it.

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
- **THEN** it carries a badge naming its section (Skills, Experience or Projects)

### Requirement: Navigation

The carousel SHALL be navigable by pointer and by keyboard.

#### Scenario: Controls

- **WHEN** the carousel is visible
- **THEN** the visitor can drag it, click previous/next buttons, and click a dot to jump to
  that slide
- **AND** the dot for the current slide is visually distinguished

#### Scenario: Keyboard

- **WHEN** the carousel has keyboard focus and the visitor presses the left or right arrow key
- **THEN** the carousel moves to the previous or next slide respectively

### Requirement: Accessibility and reduced motion

The carousel SHALL remain usable without the 3D effect and readable by assistive technology.

#### Scenario: Reduced motion

- **WHEN** the visitor's system requests reduced motion
- **THEN** rotation and blur are not applied, and slide changes happen without an animated
  transition
- **AND** all slide content remains reachable

#### Scenario: Assistive technology

- **WHEN** the carousel is read by a screen reader
- **THEN** the region is labelled, each slide is exposed with its position in the set, and the
  navigation controls have accessible names

### Requirement: Responsive layout

The carousel SHALL adapt to small screens.

#### Scenario: Narrow viewport

- **WHEN** the viewport is 375px wide
- **THEN** the slide occupies most of the width with the neighbors only peeking
- **AND** no horizontal page scrolling is introduced
