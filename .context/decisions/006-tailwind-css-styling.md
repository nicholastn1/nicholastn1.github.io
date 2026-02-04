# ADR-006: Tailwind CSS Styling Strategy

**Status:** Accepted
**Date:** 2026-02-03
**Version:** 2.0
**Supersedes:** ADR-002 (Modular CSS Architecture)

## Context

The portfolio migration to Nuxt.js requires a CSS strategy decision. Options considered:
- CSS Modules (scoped CSS per component)
- SCSS/Sass (preprocessor with nesting, variables)
- Tailwind CSS (utility-first framework)
- UnoCSS (atomic CSS, Tailwind alternative)

## Decision

Use **Tailwind CSS** as the primary styling approach via `@nuxtjs/tailwindcss` module.

**Configuration:**
- Custom color palette matching original design (primary gradient, accent green)
- Custom breakpoints matching original responsive design (500px, 800px, 900px, 1000px)
- Dark mode via class strategy (integrates with @nuxtjs/color-mode)
- Custom component classes in `assets/css/main.css` using `@layer components`

**Design tokens preserved:**
- Primary gradient: `#00198d` to `#4f6dff`
- Accent green: `#00e59b`
- Background dark: `#141414`
- Font: JetBrains Mono (see ADR-008 for typography details)
- Container max-width: 1200px

## Consequences

**Positive:**
- Rapid development with utility classes
- Consistent design system via configuration
- Excellent dark mode support
- Built-in responsive utilities
- Small production bundle (purges unused styles)
- Great IDE support with IntelliSense

**Negative:**
- HTML can become verbose with many classes
- Learning curve for utility-first approach
- Custom CSS still needed for some effects (gradients, pseudo-elements)
- Different paradigm from traditional CSS

## History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-02-03 | Initial decision - adopt Tailwind CSS |
| 2.0 | 2026-02-03 | Updated font from Titillium Web/Roboto to JetBrains Mono (see ADR-008) |
