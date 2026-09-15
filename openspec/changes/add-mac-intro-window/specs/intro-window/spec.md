## Purpose

The intro window is the portfolio's entry point: a macOS-styled window that presents
Shannon Sen Perdomo's identity — name, email, country and professional background — and
holds the visitor's attention until they explicitly choose to continue to the rest of the
site.

## ADDED Requirements

### Requirement: Intro window is shown on first paint

The site SHALL render the intro window above the page content when the page loads, before
the visitor interacts with anything.

#### Scenario: Visitor opens the site

- **WHEN** the visitor loads the portfolio
- **THEN** a macOS-styled window is visible, centered over a dimmed backdrop
- **AND** the page content behind it is not interactive

### Requirement: Window chrome mimics macOS

The window SHALL present macOS window chrome so it reads as a desktop window rather than a
generic card.

#### Scenario: Window chrome is rendered

- **WHEN** the intro window is visible
- **THEN** a title bar shows three traffic-light buttons (red, yellow, green) at its left
- **AND** the title bar contains an address bar displaying the text `www.about.me`
- **AND** that address text is rendered in blue

### Requirement: Identity content

The window body SHALL present Shannon's identity data and a short professional bio.

#### Scenario: Identity is displayed

- **WHEN** the intro window is visible
- **THEN** the body shows the name `Shannon Sen Perdomo`
- **AND** shows the email `shannonsenpmo@gmail.com` as a `mailto:` link
- **AND** shows the country `Mexico`
- **AND** shows a paragraph stating she is a Software Engineer graduated from the Software
  Engineering program at the Facultad de Matemáticas, Universidad Autónoma de Yucatán

#### Scenario: Copy language

- **WHEN** any text inside the intro window is read
- **THEN** it is written in English

### Requirement: Dismissal reveals the page

The window SHALL be dismissible, and dismissing it SHALL reveal the page content behind it.

#### Scenario: Visitor clicks the call-to-action

- **WHEN** the visitor clicks the "Know me" button
- **THEN** the window plays an exit animation and is removed from the accessibility tree
- **AND** the page content behind it becomes visible and interactive

#### Scenario: Visitor closes the window

- **WHEN** the visitor clicks the red traffic-light button
- **THEN** the window is dismissed exactly as it is by the call-to-action

#### Scenario: Visitor presses Escape

- **WHEN** the intro window is visible and the visitor presses the Escape key
- **THEN** the window is dismissed

### Requirement: Accessibility

The intro window SHALL be usable by keyboard and assistive technology.

#### Scenario: Focus and roles

- **WHEN** the intro window appears
- **THEN** it exposes a dialog role with an accessible name
- **AND** keyboard focus moves into the window
- **AND** Tab cycles through the window's own controls while it is open

#### Scenario: Reduced motion

- **WHEN** the visitor's system requests reduced motion
- **THEN** the entrance and exit animations are reduced to a near-instant state change

### Requirement: Responsive layout

The window SHALL remain readable on small screens.

#### Scenario: Narrow viewport

- **WHEN** the viewport is 375px wide
- **THEN** the window fits within the viewport with no horizontal scrolling
- **AND** all identity content and the call-to-action stay visible and legible
