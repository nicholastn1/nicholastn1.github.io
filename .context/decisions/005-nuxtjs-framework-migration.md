# ADR-005: Nuxt.js Framework Migration

**Status:** Accepted
**Date:** 2026-02-03
**Version:** 1.0
**Supersedes:** ADR-001 (Vanilla Static Site Architecture)

## Context

The existing vanilla HTML/CSS/JS portfolio has limitations:
- No componentization, making maintenance difficult
- No blog/CMS capabilities for content sharing
- Missing modern features like dark mode and animations
- Poor developer experience (no hot reload, no type safety)

After evaluating options (React, Vue, Next.js, Nuxt.js, Astro), Nuxt.js 3 was chosen for the migration.

## Decision

Migrate the portfolio from vanilla HTML/CSS/JS to **Nuxt.js 3 with TypeScript**.

**Key choices:**
- **Nuxt.js 3** over Next.js: Better Vue ecosystem, simpler learning curve, excellent DX
- **TypeScript**: Type safety, better IDE support, catch errors early
- **SSG (Static Site Generation)**: Maintains GitHub Pages compatibility, fast loading
- **Composition API**: Modern Vue 3 patterns, better TypeScript integration

## Consequences

**Positive:**
- Component-based architecture enables reusability
- TypeScript provides type safety and better tooling
- Hot reload improves development speed
- Nuxt modules ecosystem (Content, Image, Color Mode) simplifies feature development
- Future-proof architecture for blog, i18n, and other features

**Negative:**
- Build step required (was zero-build before)
- Larger dependency tree to maintain
- Learning curve for Vue/Nuxt patterns
- Requires Node.js environment for development

## History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-02-03 | Initial decision - migrate to Nuxt.js 3 |
