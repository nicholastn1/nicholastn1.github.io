# PRP: English Internationalization (i18n)

> Product Requirements Prompt - Adicionar suporte completo a inglês no portfolio

<!--
PROGRESS TRACKING:
- Mark tasks as [x] when completed
- Mark success criteria as [x] when verified
- Update Status below when starting (In Progress) and finishing (Completed)
- Add "✅ Completed: YYYY-MM-DD" after each phase validation
-->

## Summary

Implementar internacionalização (i18n) completa do portfolio, adicionando suporte ao idioma inglês com detecção automática do navegador, URLs prefixadas (`/en/`), persistência de preferência via localStorage, e tradução completa de todo conteúdo incluindo posts do blog.

## Context

### Problem

O portfolio atualmente está disponível apenas em português, limitando o alcance profissional a recrutadores e oportunidades internacionais. Como desenvolvedor Full Stack, ter um portfolio bilíngue é essencial para:
- Candidaturas a empresas internacionais/remotas
- Networking global em conferências e comunidades
- Demonstrar proficiência em inglês técnico

### Affected Users

- **Recrutadores internacionais** - Precisam avaliar perfil em inglês
- **Empresas remotas** - Avaliam candidatos de qualquer país
- **Comunidade dev global** - Leitura de posts técnicos em inglês
- **Próprio usuário** - Maior visibilidade profissional

### Success Criteria

- [x] Site detecta idioma do navegador e redireciona automaticamente
- [x] URLs com prefixo `/en/` funcionam para versão inglesa
- [x] Seletor de idioma visível no header, próximo ao toggle de tema
- [x] Preferência de idioma persiste entre sessões via cookie
- [x] Todo conteúdo YAML traduzido para inglês (personal, experiences, education, projects)
- [x] Todos os posts do blog traduzidos para inglês
- [x] SEO completo por idioma (meta tags, og:tags, hreflang)
- [x] Fallback mostra conteúdo original quando tradução não existe
- [x] Site passa em validação de acessibilidade com lang correto
- [x] Build e deploy funcionam corretamente no GitHub Pages

## Scope

### Included

- Instalação e configuração do módulo `@nuxtjs/i18n`
- Criação de arquivos de tradução para UI strings
- Tradução de todos arquivos YAML de dados
- Tradução de todos posts do blog
- Componente LanguageSwitcher no header
- Detecção automática de idioma do navegador
- Persistência de preferência via localStorage
- URLs prefixadas para inglês (`/en/`)
- SEO localizado com hreflang tags
- Fallback para conteúdo original quando tradução não existe

### Excluded (not doing now)

- Suporte a mais de 2 idiomas (estrutura preparada, mas não implementado)
- Tradução automática em tempo real (traduções são estáticas)
- CMS para gerenciar traduções
- Suporte a RTL (right-to-left)
- Traduções de mensagens de erro do sistema

## Technical Design

### Affected Areas

| Area | Changes |
|------|---------|
| `nuxt.config.ts` | Adicionar módulo i18n, configurar locales, SEO |
| `components/layout/TheHeader.vue` | Adicionar LanguageSwitcher |
| `components/ui/LanguageSwitcher.vue` | Novo componente |
| `content/data/` | Criar versões `.en.yaml` de todos arquivos |
| `content/posts/` | Criar versões inglesas dos posts |
| `composables/usePortfolioData.ts` | Adaptar para carregar dados do locale correto |
| `i18n/locales/` | Criar arquivos de tradução UI |
| Todos os componentes | Substituir strings hardcoded por `$t()` |

### Data Model

**Estrutura de arquivos de tradução:**
```
i18n/
└── locales/
    ├── pt-BR.json    # UI strings em português
    └── en.json       # UI strings em inglês

content/
├── data/
│   ├── personal.yaml      # PT (default)
│   ├── personal.en.yaml   # EN
│   ├── experiences.yaml
│   ├── experiences.en.yaml
│   ├── education.yaml
│   ├── education.en.yaml
│   ├── projects.yaml
│   └── projects.en.yaml
└── posts/
    ├── pt/               # Posts em português
    │   └── tech/
    │       └── otimizacao-performance-rails.md
    └── en/               # Posts em inglês
        └── tech/
            └── rails-performance-optimization.md
```

**Schema dos arquivos de locale (JSON):**
```typescript
interface LocaleMessages {
  nav: {
    experience: string
    education: string
    projects: string
    about: string
    contact: string
    blog: string
  }
  hero: {
    greeting: string
  }
  about: {
    title: string
    tagline: string
  }
  experience: {
    title: string
  }
  education: {
    title: string
    certifications: string
    volunteering: string
    languages: string
  }
  projects: {
    title: string
    viewProject: string
  }
  footer: {
    contact: string
    rights: string
  }
  blog: {
    title: string
    subtitle: string
    all: string
    noPostsFound: string
    comingSoon: string
    readMore: string
    minRead: string
    notFound: string
    notFoundDescription: string
    backToBlog: string
    backToPortfolio: string
    toc: string
  }
  theme: {
    light: string
    dark: string
  }
  language: {
    switchTo: string
  }
}
```

### API/Interface Changes

**Composable usePortfolioData adaptado:**
```typescript
// Novo parâmetro locale
export const usePortfolioData = () => {
  const { locale } = useI18n()

  const getPersonalData = async () => {
    const suffix = locale.value === 'en' ? '.en' : ''
    return queryContent(`/data/personal${suffix}`).findOne()
  }
  // ... similar para outros métodos
}
```

**Configuração i18n no nuxt.config.ts:**
```typescript
i18n: {
  locales: [
    { code: 'pt-BR', iso: 'pt-BR', name: 'Português', file: 'pt-BR.json' },
    { code: 'en', iso: 'en-US', name: 'English', file: 'en.json' }
  ],
  defaultLocale: 'pt-BR',
  strategy: 'prefix_except_default',
  detectBrowserLanguage: {
    useCookie: false,
    redirectOn: 'root',
    cookieKey: 'i18n_redirected',
    alwaysRedirect: false
  },
  langDir: 'i18n/locales/',
  lazy: true
}
```

## Implementation Plan

### Phase 1: Setup & Infrastructure

1. [ ] Instalar módulo `@nuxtjs/i18n` via Docker
2. [ ] Criar estrutura de pastas `i18n/locales/`
3. [ ] Configurar i18n no `nuxt.config.ts`
4. [ ] Criar arquivo `i18n/locales/pt-BR.json` com todas UI strings
5. [ ] Criar arquivo `i18n/locales/en.json` (cópia inicial)
6. [ ] Criar ADR-009 documentando decisão de i18n
7. [ ] Verificar build funciona com configuração básica

**Validation:** `docker compose exec app npm run build` executa sem erros, módulo i18n carrega

### Phase 2: UI String Translations

1. [ ] Traduzir todas strings do `en.json`
2. [ ] Atualizar `TheHeader.vue` - usar `$t()` para navegação
3. [ ] Atualizar `TheFooter.vue` - usar `$t()` para textos
4. [ ] Atualizar `HeroSection.vue` - usar `$t()` para greeting
5. [ ] Atualizar `AboutSection.vue` - usar `$t()` para título e tagline
6. [ ] Atualizar `ExperienceSection.vue` - usar `$t()` para título
7. [ ] Atualizar `EducationSection.vue` - usar `$t()` para títulos de seção
8. [ ] Atualizar `ProjectsSection.vue` - usar `$t()` para títulos
9. [ ] Atualizar `ThemeToggle.vue` - usar `$t()` para aria-labels
10. [ ] Atualizar `pages/blog/index.vue` - usar `$t()` para UI
11. [ ] Atualizar `pages/posts/[...slug].vue` - usar `$t()` para UI
12. [ ] Atualizar `layouts/blog.vue` - usar `$t()` para navegação
13. [ ] Atualizar `components/blog/TableOfContents.vue` - usar `$t()`
14. [ ] Atualizar `components/blog/PostCard.vue` - usar `$t()`

**Validation:** Navegar pelo site em PT, todas strings aparecem corretamente

### Phase 3: Language Switcher Component

1. [ ] Criar `components/ui/LanguageSwitcher.vue`
2. [ ] Implementar toggle entre PT/EN com ícones de bandeira ou texto
3. [ ] Integrar com `useI18n()` para troca de locale
4. [ ] Implementar persistência em localStorage
5. [ ] Adicionar ao `TheHeader.vue` próximo ao ThemeToggle
6. [ ] Estilizar com Tailwind seguindo design system existente
7. [ ] Garantir responsividade no mobile
8. [ ] Adicionar aria-labels para acessibilidade

**Validation:** Clicar no switcher alterna idioma, recarregar página mantém preferência

### Phase 4: Content YAML Translations

1. [ ] Criar `content/data/personal.en.yaml` com tradução completa
2. [ ] Criar `content/data/experiences.en.yaml` com tradução completa
3. [ ] Criar `content/data/education.en.yaml` com tradução completa
4. [ ] Criar `content/data/projects.en.yaml` com tradução completa
5. [ ] Atualizar `usePortfolioData.ts` para carregar arquivo baseado em locale
6. [ ] Testar todas seções em inglês renderizam corretamente

**Validation:** Acessar `/en/`, todo conteúdo do portfolio aparece em inglês

### Phase 5: Blog Translation Infrastructure

1. [ ] Reorganizar posts para estrutura `content/posts/pt/` e `content/posts/en/`
2. [ ] Mover post existente para `content/posts/pt/tech/`
3. [ ] Criar tradução em `content/posts/en/tech/rails-performance-optimization.md`
4. [ ] Atualizar queries de blog para filtrar por locale
5. [ ] Implementar fallback para mostrar post original se tradução não existe
6. [ ] Adicionar indicador visual quando mostrando conteúdo em idioma diferente
7. [ ] Atualizar links internos do blog para respeitar locale

**Validation:** Blog funciona em ambos idiomas, posts aparecem corretamente

### Phase 6: SEO & Meta Tags

1. [ ] Configurar `useHead()` dinâmico baseado em locale
2. [ ] Adicionar hreflang tags para todas páginas
3. [ ] Traduzir meta descriptions
4. [ ] Traduzir Open Graph tags
5. [ ] Atualizar `lang` attribute do HTML dinamicamente
6. [ ] Testar com ferramentas de SEO (Lighthouse, etc)

**Validation:** Inspecionar HTML mostra meta tags corretas para cada idioma

### Phase 7: Browser Detection & Routing

1. [ ] Configurar detecção de idioma do navegador
2. [ ] Implementar redirect automático na primeira visita
3. [ ] Garantir que localStorage preference sobrescreve detecção
4. [ ] Testar fluxo: novo usuário → detecta EN → redireciona para /en/
5. [ ] Testar fluxo: usuário com preferência salva → usa preferência
6. [ ] Verificar que links diretos funcionam (ex: compartilhar /en/blog)

**Validation:** Simular navegador em inglês, verificar redirect automático

### Phase 8: Final Polish & Testing

1. [ ] Revisar todas traduções para consistência
2. [ ] Testar navegação completa em ambos idiomas
3. [ ] Testar responsividade do LanguageSwitcher em todos breakpoints
4. [ ] Verificar acessibilidade com screen reader
5. [ ] Rodar `npm run lint` e `npm run typecheck`
6. [ ] Testar build de produção
7. [ ] Verificar deploy no GitHub Pages funciona
8. [ ] Atualizar documentação se necessário

**Validation:** Site 100% funcional em ambos idiomas, deploy bem sucedido

## Testing

### Unit Tests

```
- LanguageSwitcher.vue: renderiza, alterna idiomas, persiste preferência
- usePortfolioData.ts: carrega dados corretos baseado em locale
- i18n config: locales carregam corretamente
```

### Integration Tests

```
- Navegação completa em português
- Navegação completa em inglês
- Troca de idioma durante navegação
- Persistência de idioma entre recarregamentos
- SEO tags corretas por idioma
- Blog com fallback quando tradução não existe
- Build estático gera todas páginas em ambos idiomas
```

## Decisions

### Impact on Existing Decisions

| ADR | Current Decision | Proposed Change | Action |
|-----|------------------|-----------------|--------|
| ADR-004 | GitHub Pages deployment | Nenhuma mudança, SSG continua compatível | None |
| ADR-005 | Nuxt.js 3 framework | Adiciona módulo @nuxtjs/i18n | None |

### New Decisions Required

| Decision | Context | Options to Consider |
|----------|---------|---------------------|
| i18n Strategy | Como estruturar URLs e detectar idioma | prefix_except_default (escolhido) |
| Content Structure | Como organizar traduções de conteúdo | Arquivos separados por locale (escolhido) |

**Note:** Criar ADR-009 na Phase 1 documentando estratégia de i18n escolhida.

## Risks and Mitigations

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Build quebra com i18n | Low | High | Testar incrementalmente, fazer backup |
| URLs duplicadas no SEO | Medium | Medium | Configurar hreflang corretamente |
| Conteúdo desatualizado entre idiomas | Medium | Low | Documentar processo de atualização |
| Performance degradada | Low | Medium | Lazy loading de locales |
| GitHub Pages routing issues | Medium | High | Testar preview antes de merge |

## Final Checklist

```
[x] Linting passing (warnings only)
[x] TypeScript sem erros
[x] Ambos idiomas funcionais
[x] SEO validado
[x] Build testado (45 routes pre-rendered)
[x] ADR-009 criado
```

---

**Created:** 2026-02-04
**Author:** Claude (AI Assistant)
**Status:** Completed
**Completed:** 2026-02-04
