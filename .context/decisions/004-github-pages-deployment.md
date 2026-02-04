# ADR-004: GitHub Pages Deployment

**Status:** Accepted
**Date:** 2025-02-03
**Version:** 1.0

## Context

Need a hosting solution for the portfolio that is:
- Free or low-cost
- Reliable and fast
- Easy to deploy
- Supports custom domains

Options considered: GitHub Pages, Netlify, Vercel, traditional web hosting.

## Decision

Use GitHub Pages with the repository naming convention `username.github.io` for automatic deployment from the `master` branch.

**Deployment workflow:**
```bash
git add .
git commit -m "Update portfolio"
git push origin master
# Site automatically deploys within minutes
```

## Consequences

- **Positive:**
  - Free hosting with high uptime
  - Automatic deployment on push
  - Built-in HTTPS
  - No CI/CD configuration needed
  - Custom domain support available

- **Negative:**
  - Limited to static sites
  - No server-side processing
  - Build step not supported natively (not needed for this project)
  - Repository must be public (or GitHub Pro for private)

## History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2025-02-03 | Initial decision |
