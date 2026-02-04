# ADR-002: Modular CSS Architecture

**Status:** Accepted
**Date:** 2025-02-03
**Version:** 1.0

## Context

With multiple sections on a single-page site, CSS can become difficult to maintain. Options considered:
- Single monolithic CSS file
- CSS-in-JS (requires framework)
- CSS modules/modular stylesheets
- CSS preprocessor (Sass/LESS)

## Decision

Use modular CSS with one stylesheet per section, imported via `@import` in a main `style.css` file:

```
stylesheets/
├── style.css        # @import orchestrator
├── global.css       # Reset, utilities
├── header.css       # Navigation
├── introducao.css   # Hero section
├── experiencia.css  # Work experience
├── formacao.css     # Education
├── projetos.css     # Projects
├── sobre-mim.css    # About me
└── footer.css       # Footer/contact
```

## Consequences

- **Positive:**
  - Easy to find and edit styles for specific sections
  - Clear organization mirrors HTML structure
  - No build step required
  - Avoids CSS conflicts with section-scoped styles

- **Negative:**
  - Multiple HTTP requests for CSS files (mitigated by small file sizes)
  - No CSS minification or optimization
  - `@import` is slower than concatenated CSS (acceptable for portfolio size)

## History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2025-02-03 | Initial decision |
