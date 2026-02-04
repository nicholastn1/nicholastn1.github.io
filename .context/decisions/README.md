# Architectural Decision Records (ADRs)

Record of significant technical decisions in this project.

## Index

| ADR | Title | Status |
|-----|-------|--------|
| [001](001-vanilla-static-site.md) | Vanilla Static Site Architecture | Superseded by ADR-005 |
| [002](002-modular-css-architecture.md) | Modular CSS Architecture | Superseded by ADR-006 |
| [003](003-responsive-design-breakpoints.md) | Responsive Design Breakpoints | Accepted |
| [004](004-github-pages-deployment.md) | GitHub Pages Deployment | Accepted |
| [005](005-nuxtjs-framework-migration.md) | Nuxt.js Framework Migration | Accepted |
| [006](006-tailwind-css-styling.md) | Tailwind CSS Styling Strategy | Accepted |
| [007](007-docker-development-environment.md) | Docker Development Environment | Accepted |
| [008](008-jetbrains-mono-typography.md) | JetBrains Mono Typography System | Accepted |

## Template

To create a new ADR, use the template below and save as `NNN-title-slug.md`:

```markdown
# ADR-NNN: Title

**Status:** Proposed | Accepted | Deprecated | Superseded
**Date:** YYYY-MM-DD
**Version:** 1.0

## Context

[Why was this decision needed?]

## Decision

[What was decided?]

## Consequences

- **Positive:** ...
- **Negative:** ...

## History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | YYYY-MM-DD | Initial decision |
```

## Conventions

- **Numbering:** Sequential, 3 digits with leading zeros (001, 002, ...)
- **Filename:** `NNN-title-in-slug.md`
- **Status:**
  - `Proposed` - Under discussion
  - `Accepted` - Approved and in use
  - `Deprecated` - Still works but not recommended
  - `Superseded` - Replaced by another ADR (link it)

## Adding Decisions

In Claude Code, use the interactive command:
```
/add-decision
```

This will ask clarifying questions and populate the ADR with context.
