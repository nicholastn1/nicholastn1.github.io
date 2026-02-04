# ADR-008: JetBrains Mono Typography System

**Status:** Accepted
**Date:** 2026-02-03
**Version:** 1.0
**Supersedes:** ADR-006 typography section (fonts only)

## Context

The portfolio needed a typography update to reinforce the developer/software engineer identity. The previous typography used Titillium Web as primary font and Roboto as secondary font. A monospace font better represents the technical nature of a software engineering portfolio.

Options considered:
- Keep Titillium Web + Roboto (status quo)
- Fira Code (monospace with ligatures)
- JetBrains Mono (monospace with ligatures, designed for developers)
- Inter (modern sans-serif, not monospace)

## Decision

Use **JetBrains Mono** as the single font family for the entire portfolio with:

- All 8 font weights (100 Thin through 800 ExtraBold)
- Italic variants for all weights
- Typography ligatures enabled by default
- CSS Custom Properties for easy future customization
- Semantic type scale integrated with Tailwind CSS

### CSS Custom Properties

```css
:root {
  /* Font Family */
  --font-primary: 'JetBrains Mono', monospace;

  /* Font Weights */
  --font-weight-thin: 100;
  --font-weight-extralight: 200;
  --font-weight-light: 300;
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
  --font-weight-extrabold: 800;

  /* Line Heights */
  --line-height-tight: 1.2;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.6;
}
```

### Type Scale

| Element | Size | Weight | Line Height | Use |
|---------|------|--------|-------------|-----|
| Display | 6xl | extrabold | tight | Section decorative subtitles |
| H1 | 4xl/5xl | bold | tight | Main titles |
| H2 | 3xl | bold | tight | Section titles |
| H3 | 2xl | semibold | tight | Subtitles |
| H4 | xl | semibold | normal | Minor headings |
| Body | base | regular | normal | Main text |
| Body Large | lg | regular | relaxed | Featured paragraphs |
| Small | sm | regular | normal | Secondary text |
| Caption | xs | medium | normal | Metadata, tags, labels |

### Font Loading Strategy

- Load via Google Fonts CDN
- Use `font-display: swap` for performance
- Preconnect to fonts.googleapis.com and fonts.gstatic.com

## Consequences

**Positive:**
- Reinforces developer/engineer identity
- Modern, readable monospace font
- Ligatures improve code readability
- Single font simplifies maintenance
- Variable weight provides design flexibility
- Well-supported across browsers

**Negative:**
- Larger font file size (8 weights + italics)
- Monospace may feel less "corporate" to some recruiters
- Character width uniformity requires careful weight/size adjustments for hierarchy

**Mitigations:**
- Use `font-display: swap` to avoid FOIT
- Leverage weight variation for clear visual hierarchy
- JetBrains Mono is widely recognized in developer community

## History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-02-03 | Initial decision - adopt JetBrains Mono |
