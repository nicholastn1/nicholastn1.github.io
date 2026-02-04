# ADR-009: Internationalization (i18n)

**Status:** Accepted
**Date:** 2026-02-04
**Version:** 1.0

## Context

The portfolio was only available in Portuguese, limiting professional reach to international recruiters and remote opportunities. As a Full Stack developer, having a bilingual portfolio is essential for:
- Applications to international/remote companies
- Global networking at conferences and communities
- Demonstrating proficiency in technical English

## Decision

Implement internationalization using **@nuxtjs/i18n** with the following configuration:

**Supported Languages:**
- Portuguese (Brazil) - `pt-BR` (default)
- English - `en`

**URL Strategy:** `prefix_except_default`
- Portuguese: `/` (no prefix)
- English: `/en/`

**Browser Detection:**
- Detect browser language on first visit
- Redirect to appropriate locale
- Persist preference in cookie (`i18n_redirected`)
- User preference overrides detection

**Content Structure:**
- UI strings: JSON files in `/i18n/locales/`
- Data content: Separate YAML files with `.en` suffix (e.g., `personal.en.yaml`)
- Blog posts: Organized in locale folders `/content/posts/pt/` and `/content/posts/en/`

## Consequences

**Positive:**
- Broader professional reach to international market
- Better SEO with hreflang tags
- Demonstrates English proficiency
- Framework for future language additions

**Negative:**
- Content maintenance effort doubled
- Risk of translation inconsistency
- Slightly increased build time
- More complex routing

## Implementation

Key files:
- `nuxt.config.ts` - i18n module configuration
- `i18n/locales/*.json` - UI string translations
- `content/data/*.en.yaml` - Content translations
- `components/ui/LanguageSwitcher.vue` - Language toggle

## History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-02-04 | Initial decision - add English internationalization |
