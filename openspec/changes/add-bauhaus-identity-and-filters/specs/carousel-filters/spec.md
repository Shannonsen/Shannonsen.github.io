## Purpose

The filter bar lets a visitor narrow the carousel to the section they came for — skills,
experience or projects — instead of dragging through everything.

## ADDED Requirements

### Requirement: Filter pills

The carousel SHALL be preceded by a row of pills, one per section plus an All pill.

#### Scenario: Pills are shown

- **WHEN** the carousel is visible
- **THEN** a pill row above it offers All, Skills, Experience and Projects
- **AND** All is selected initially
- **AND** each section pill carries its section's colour

#### Scenario: Selected pill is distinguishable

- **WHEN** a pill is the active filter
- **THEN** it is visually distinct from the inactive pills by more than colour alone

### Requirement: Filtering narrows the carousel

Selecting a pill SHALL change which slides the carousel contains.

#### Scenario: Selecting a section

- **WHEN** the visitor selects the Experience pill
- **THEN** the carousel contains only the experience slides
- **AND** it is positioned on the first of them

#### Scenario: Restoring everything

- **WHEN** the visitor selects the All pill
- **THEN** the carousel contains every slide again

#### Scenario: A single remaining slide

- **WHEN** a filter leaves only one slide
- **THEN** the carousel renders that slide centered and does not break

### Requirement: Accessible filter controls

The pills SHALL be operable and understandable without sight or a pointer.

#### Scenario: Keyboard and semantics

- **WHEN** the pill row is reached by keyboard
- **THEN** each pill is focusable and activates with Enter or Space
- **AND** the active pill exposes its selected state to assistive technology
- **AND** the row is labelled as a filter group
