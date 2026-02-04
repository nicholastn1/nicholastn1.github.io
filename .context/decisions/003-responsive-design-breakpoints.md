# ADR-003: Responsive Design Breakpoints

**Status:** Accepted
**Date:** 2025-02-03
**Version:** 1.0

## Context

The portfolio must be viewable on devices from mobile phones to large desktop monitors. Need to define consistent breakpoints across all stylesheets.

## Decision

Use four main breakpoints with a desktop-first approach:

| Breakpoint | Target Devices |
|------------|----------------|
| `max-width: 1000px` | Small laptops, tablets landscape |
| `max-width: 900px` | Tablets, small screens |
| `max-width: 800px` | Large tablets, major layout changes |
| `max-width: 500px` | Mobile phones |

Layout changes at each breakpoint:
- **1000px**: Reduce padding, adjust grid columns
- **900px**: Stack timeline items vertically
- **800px**: Navigation becomes simpler, sections stack
- **500px**: Single column layout, mobile-optimized spacing

Container max-width: `1200px` for content centering on large screens.

## Consequences

- **Positive:**
  - Consistent experience across devices
  - Content remains readable at all sizes
  - Navigation adapts to touch interfaces

- **Negative:**
  - Desktop-first means mobile styles are overrides (more CSS)
  - Four breakpoints add complexity to each stylesheet
  - Manual testing required across screen sizes

## History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2025-02-03 | Initial decision |
