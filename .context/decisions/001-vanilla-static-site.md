# ADR-001: Vanilla Static Site Architecture

**Status:** Accepted
**Date:** 2025-02-03
**Version:** 1.0

## Context

When building a personal portfolio website, there are many options: static site generators (Jekyll, Hugo, Gatsby), frontend frameworks (React, Vue, Angular), or plain HTML/CSS/JavaScript. The site needs to be:
- Fast to load
- Easy to maintain
- Simple to deploy on GitHub Pages
- SEO-friendly

## Decision

Use vanilla HTML5, CSS3, and JavaScript without any build tools or frameworks. The site is a single `index.html` file with modular CSS and minimal JavaScript.

## Consequences

- **Positive:**
  - Zero build step - files served directly
  - No dependencies to update or security vulnerabilities from packages
  - Fastest possible load time (no framework overhead)
  - Easy to edit directly - no compilation needed
  - GitHub Pages deployment is automatic on push

- **Negative:**
  - No component reusability (HTML repeated across sections)
  - Manual updates for content changes
  - No templating system for repeated structures
  - CSS can grow unwieldy without tooling

## History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2025-02-03 | Initial decision |
