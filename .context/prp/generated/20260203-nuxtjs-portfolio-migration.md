# PRP: Migração do Portfólio para Nuxt.js com TypeScript

> Product Requirements Prompt - Reescrita completa do portfólio usando Nuxt.js, Tailwind CSS, Nuxt Content, GSAP, Dark Mode e Docker para desenvolvimento

<!--
PROGRESS TRACKING:
- Mark tasks as [x] when completed
- Mark success criteria as [x] when verified
- Update Status below when starting (In Progress) and finishing (Completed)
- Add "✅ Completed: YYYY-MM-DD" after each phase validation
-->

## Summary

Migrar o portfólio atual de HTML/CSS/JS vanilla para Nuxt.js 3 com TypeScript, adicionando blog com Nuxt Content, animações GSAP, dark mode, e deploy estático no GitHub Pages. O conteúdo será gerenciado via arquivos JSON/YAML e o styling será feito com Tailwind CSS.

## Context

### Problem

O portfólio atual é funcional mas apresenta limitações:
- **Manutenção**: HTML repetitivo sem componentização, difícil adicionar novas experiências/projetos
- **Escalabilidade**: Não suporta blog/artigos para compartilhar conhecimento técnico
- **Experiência**: Falta de animações modernas e dark mode que são esperados em 2026
- **DX**: Sem hot reload, type safety, ou ferramentas modernas de desenvolvimento
- **SEO**: Embora funcional, não aproveita otimizações automáticas de frameworks modernos

### Affected Users

| User | Impact |
|------|--------|
| **Recrutadores** | Melhor experiência visual, navegação mais fluida, conteúdo técnico via blog |
| **Desenvolvedores** | Portfolio como referência técnica, artigos demonstrando conhecimento |
| **Nicholas (owner)** | Manutenção simplificada, fácil atualização de conteúdo, showcase de skills modernas |

### Success Criteria

- [ ] Site Nuxt.js funcional com todas as seções do portfólio atual migradas
- [ ] Lighthouse score > 90 em Performance, Accessibility, Best Practices e SEO
- [ ] Blog funcional com pelo menos 1 post de exemplo categorizado
- [ ] Dark mode funcional com persistência de preferência
- [ ] Animações GSAP funcionando em scroll e transições de página
- [ ] Deploy automático no GitHub Pages funcionando
- [ ] Tempo de build < 60 segundos
- [ ] Bundle size < 200KB (gzipped, sem imagens)
- [ ] Todos os breakpoints responsivos funcionando (500px, 800px, 900px, 1000px)
- [ ] Ambiente Docker funcional para desenvolvimento (`docker compose up` inicia o servidor)

## Scope

### Included

- **Docker para desenvolvimento** (Dockerfile + docker-compose.yml para ambiente isolado)
- Configuração completa do projeto Nuxt.js 3 com TypeScript
- Migração de todas as 7 seções: Header, Introducao, Experiencia, Formacao, Projetos, SobreMim, Footer
- Sistema de blog com Nuxt Content (estrutura `/posts/[categoria]/[slug]`)
- Dark mode com @nuxtjs/color-mode
- Animações com GSAP (scroll triggers, transições)
- Tailwind CSS para estilização
- Dados em arquivos JSON/YAML (`/content/data/`)
- Deploy estático (SSG) para GitHub Pages
- Preparação para domínio customizado futuro
- SEO meta tags dinâmicas
- Sitemap automático

### Excluded (not doing now)

- Internacionalização (i18n) - pode ser adicionado futuramente
- Sistema de comentários no blog
- Analytics avançados (apenas preparar para Google Analytics)
- PWA/Service Worker
- Sistema de newsletter
- Busca no blog (pode adicionar depois com Algolia)
- Testes automatizados (E2E/Unit) - fase posterior
- CI/CD complexo além do deploy básico

## Technical Design

### Affected Areas

| Area | Changes |
|------|---------|
| **Estrutura de projeto** | De arquivos soltos para estrutura Nuxt.js padrão |
| **HTML** | De `index.html` monolítico para componentes Vue SFC |
| **CSS** | De CSS modular vanilla para Tailwind CSS |
| **JavaScript** | De ES5 vanilla para TypeScript + Composition API |
| **Conteúdo** | De hardcoded HTML para JSON/YAML + Nuxt Content |
| **Build** | De zero-build para Nuxt SSG |
| **Deploy** | Manter GitHub Pages, adicionar GitHub Actions |
| **Assets** | Migrar `/img/` para `/public/` ou `/assets/` |

### Nova Estrutura do Projeto

```
nicholastn1.github.io/
├── .docker/                  # Docker configuration
│   └── Dockerfile.dev        # Development Dockerfile
├── docker-compose.yml        # Docker Compose for development
├── .dockerignore             # Files to ignore in Docker build
├── .nuxt/                    # Build output (gitignored)
├── .output/                  # Static generation output
├── assets/
│   ├── css/
│   │   └── main.css          # Tailwind imports + custom CSS
│   └── images/               # Imagens processadas pelo bundler
├── components/
│   ├── ui/                   # Componentes base reutilizáveis
│   │   ├── Button.vue
│   │   ├── Card.vue
│   │   ├── SkillTag.vue
│   │   └── ThemeToggle.vue
│   ├── layout/
│   │   ├── TheHeader.vue
│   │   ├── TheFooter.vue
│   │   └── TheNavigation.vue
│   ├── sections/
│   │   ├── HeroSection.vue
│   │   ├── ExperienceSection.vue
│   │   ├── EducationSection.vue
│   │   ├── ProjectsSection.vue
│   │   ├── AboutSection.vue
│   │   └── ContactSection.vue
│   └── blog/
│       ├── PostCard.vue
│       ├── PostList.vue
│       └── TableOfContents.vue
├── composables/
│   ├── useScrollAnimation.ts  # GSAP scroll triggers
│   └── usePortfolioData.ts    # Acesso aos dados JSON/YAML
├── content/
│   ├── data/
│   │   ├── experiences.yaml   # Dados de experiências profissionais
│   │   ├── education.yaml     # Formação e certificações
│   │   ├── projects.yaml      # Projetos
│   │   └── personal.yaml      # Dados pessoais (nome, bio, contato)
│   └── posts/
│       ├── tech/
│       │   └── primeiro-post.md
│       └── carreira/
│           └── exemplo-carreira.md
├── layouts/
│   ├── default.vue           # Layout principal do portfólio
│   └── blog.vue              # Layout para páginas do blog
├── pages/
│   ├── index.vue             # Página principal (single-page)
│   ├── blog/
│   │   └── index.vue         # Listagem de posts
│   └── posts/
│       └── [categoria]/
│           └── [slug].vue    # Página individual de post
├── public/
│   ├── favicon.svg
│   ├── images/               # Imagens estáticas (não processadas)
│   │   ├── Perfil.png
│   │   └── Nicholas_Marca.svg
│   └── robots.txt
├── server/                   # Vazio para SSG, preparado para futuro
├── types/
│   └── index.ts              # Tipos TypeScript (Experience, Project, etc)
├── .github/
│   └── workflows/
│       └── deploy.yml        # GitHub Actions para deploy
├── nuxt.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

### Data Model

```typescript
// types/index.ts

export interface Experience {
  id: string
  company: string
  role: string
  period: {
    start: string  // "05/2024"
    end: string | "Presente"
  }
  description: string
  achievements: string[]
  technologies: string[]
  companyUrl?: string
}

export interface Education {
  id: string
  institution: string
  degree: string
  period: {
    start: string
    end: string
  }
  activities?: string[]
}

export interface Certification {
  id: string
  name: string
  provider: string
  date: string
  url?: string
}

export interface Project {
  id: string
  name: string
  description: string
  period: {
    start: string
    end: string | "Presente"
  }
  technologies: string[]
  url?: string
  github?: string
  image?: string
}

export interface Language {
  name: string
  level: string
  proficiency: "Native" | "Fluent" | "Advanced" | "Intermediate" | "Basic"
}

export interface SocialLink {
  platform: "github" | "linkedin" | "instagram" | "whatsapp" | "email"
  url: string
  label: string
}

export interface PersonalInfo {
  name: string
  title: string
  location: string
  email: string
  phone?: string
  bio: string[]
  socialLinks: SocialLink[]
}

export interface BlogPost {
  title: string
  description: string
  date: string
  category: string
  tags: string[]
  image?: string
  readingTime?: number
}
```

### API/Interface Changes

Não há API backend. O conteúdo é carregado via:

```typescript
// composables/usePortfolioData.ts
export const usePortfolioData = () => {
  const { data: experiences } = await useAsyncData('experiences',
    () => queryContent('/data/experiences').findOne()
  )

  const { data: projects } = await useAsyncData('projects',
    () => queryContent('/data/projects').findOne()
  )

  // ... etc

  return { experiences, projects, education, personal }
}
```

### Configuração Nuxt

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    '@nuxt/content',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    '@nuxt/image',
    '@nuxtjs/sitemap',
  ],

  // SSG para GitHub Pages
  ssr: true,
  nitro: {
    preset: 'github-pages'
  },

  // Color mode config
  colorMode: {
    classSuffix: '',
    preference: 'system',
    fallback: 'light',
  },

  // Content config
  content: {
    highlight: {
      theme: {
        default: 'github-light',
        dark: 'github-dark',
      }
    }
  },

  // App config
  app: {
    baseURL: '/', // Ajustar se usar subpath
    head: {
      htmlAttrs: { lang: 'pt-BR' },
      title: 'Nicholas Nogueira - Full Stack Software Engineer',
      meta: [
        { name: 'description', content: 'Portfolio de Nicholas Nogueira...' }
      ]
    }
  }
})
```

## Commit Strategy

**IMPORTANTE:** Commitar e dar push a cada etapa concluída e testada.

### Regras de Commit
1. **Commit atômico** - Cada commit deve representar uma mudança funcional completa
2. **Testar antes de commitar** - Verificar que `docker compose up` ou `npm run dev` funciona
3. **Push frequente** - Dar push após cada commit para backup e CI
4. **Mensagens descritivas** - Usar convenção: `tipo(escopo): descrição`

### Tipos de Commit
- `feat`: Nova funcionalidade
- `fix`: Correção de bug
- `chore`: Manutenção, configuração
- `docs`: Documentação
- `style`: Formatação, CSS
- `refactor`: Refatoração de código

### Exemplo de Fluxo
```bash
# Após completar cada tarefa:
1. Testar a funcionalidade
2. git add <arquivos-relevantes>
3. git commit -m "feat(phase-1): add Docker development environment"
4. git push origin master
```

---

## Implementation Plan

### Phase 1: Setup & Infraestrutura

**Docker Setup (primeiro, para não depender de ambiente local):**
1. [x] Criar `.docker/Dockerfile.dev` com Node.js 20 LTS
2. [x] Criar `docker-compose.yml` para desenvolvimento
3. [x] Criar `.dockerignore` para otimizar build
4. [x] Testar que container Docker funciona (`docker compose up`)

**Nuxt.js Setup (dentro do container ou local):**
5. [x] Criar novo projeto Nuxt.js 3 com TypeScript (`npx nuxi@latest init`)
6. [x] Configurar Tailwind CSS (`@nuxtjs/tailwindcss`)
7. [x] Configurar @nuxtjs/color-mode para dark mode
8. [x] Configurar Nuxt Content para blog e dados
9. [x] Configurar @nuxt/image para otimização de imagens
10. [x] Criar estrutura de pastas conforme especificado
11. [x] Configurar ESLint + Prettier para qualidade de código
12. [x] Criar ADR-005: Nuxt.js Framework Migration
13. [x] Criar ADR-006: Tailwind CSS Styling Strategy
14. [x] Criar ADR-007: Docker Development Environment
15. [x] Migrar assets estáticos para `/public/images/`

**Validation:**
- `docker compose up` inicia o servidor de desenvolvimento
- `npm run dev` funciona sem erros (dentro ou fora do container)
- Página inicial renderiza "Hello World"
- Dark mode toggle funciona
- Hot reload funcionando (com volume mount no Docker)

✅ **Completed:** 2026-02-03 - Docker configurado, Nuxt.js inicializado com todos os módulos, ADRs criados

### Phase 2: Tipos e Dados

1. [x] Criar `/types/index.ts` com todas as interfaces TypeScript
2. [x] Criar `/content/data/personal.yaml` com dados pessoais
3. [x] Criar `/content/data/experiences.yaml` com experiências (4 posições)
4. [x] Criar `/content/data/education.yaml` com formação e certificações
5. [x] Criar `/content/data/projects.yaml` com projetos
6. [x] Criar composable `usePortfolioData.ts` para acessar dados
7. [x] Validar tipos com TypeScript strict mode

**Validation:**
- Dados carregam corretamente via composable
- TypeScript não apresenta erros
- Console mostra dados estruturados corretamente

✅ **Completed:** 2026-02-03 - Tipos TypeScript criados, dados YAML extraídos do HTML original, composable implementado

### Phase 3: Componentes Base & Layout

1. [x] Criar componentes UI base: Button, Card, SkillTag
2. [x] Criar ThemeToggle.vue com animação suave
3. [x] Criar TheHeader.vue com navegação
4. [x] Criar TheFooter.vue com contato e social links
5. [x] Criar layout `default.vue` com header/footer
6. [x] Configurar Tailwind com cores do design atual (gradiente azul, verde accent)
7. [x] Criar variáveis CSS para dark mode
8. [x] Implementar smooth scroll para navegação anchor

**Validation:**
- Layout renderiza corretamente
- Navegação funciona entre seções
- Dark mode alterna cores corretamente
- Componentes são responsivos

✅ **Completed:** 2026-02-03 - Componentes UI base criados, Header com menu mobile, ThemeToggle com animação

### Phase 4: Seções do Portfólio

1. [ ] Criar HeroSection.vue (Introdução com foto e título)
2. [ ] Criar ExperienceSection.vue (timeline de experiências)
3. [ ] Criar EducationSection.vue (formação, certificações, idiomas)
4. [ ] Criar ProjectsSection.vue (cards de projetos)
5. [ ] Criar AboutSection.vue (sobre mim narrativo)
6. [ ] Criar ContactSection.vue (dentro do footer ou separado)
7. [ ] Montar página `/pages/index.vue` com todas as seções
8. [ ] Garantir paridade visual com site atual

**Validation:**
- Todas as seções renderizam dados dos YAML
- Layout visual similar ao original
- Responsivo em todos os breakpoints (500px, 800px, 900px, 1000px)
- Links externos funcionam (WhatsApp, LinkedIn, etc)

### Phase 5: Animações GSAP

1. [ ] Instalar GSAP e plugins necessários (`gsap`, `@gsap/business` ou plugins free)
2. [ ] Criar composable `useScrollAnimation.ts`
3. [ ] Adicionar fade-in animations nas seções ao scroll
4. [ ] Animar cards de experiência com stagger
5. [ ] Animar skill tags com efeito de entrada
6. [ ] Adicionar parallax sutil no hero section
7. [ ] Transições de página suaves
8. [ ] Animação no theme toggle

**Validation:**
- Animações executam suavemente (60fps)
- Não há layout shift durante animações
- Animações respeitam `prefers-reduced-motion`
- Performance não degradada (Lighthouse > 90)

### Phase 6: Blog com Nuxt Content

1. [ ] Criar layout `blog.vue` para páginas de blog
2. [ ] Criar página `/pages/blog/index.vue` (listagem)
3. [ ] Criar página `/pages/posts/[categoria]/[slug].vue`
4. [ ] Criar componentes PostCard.vue e PostList.vue
5. [ ] Criar TableOfContents.vue para posts longos
6. [ ] Configurar syntax highlighting para code blocks
7. [ ] Criar post de exemplo em `/content/posts/tech/`
8. [ ] Adicionar link para blog na navegação
9. [ ] Configurar meta tags dinâmicas para posts (Open Graph)

**Validation:**
- Blog lista posts por categoria
- Post individual renderiza markdown corretamente
- Code highlighting funciona
- Meta tags aparecem corretamente (testar com opengraph.xyz)

### Phase 7: SEO & Performance

1. [ ] Configurar @nuxtjs/sitemap
2. [ ] Adicionar robots.txt
3. [ ] Otimizar imagens com @nuxt/image
4. [ ] Configurar meta tags globais e por página
5. [ ] Adicionar structured data (JSON-LD) para Person e BlogPosting
6. [ ] Configurar canonical URLs
7. [ ] Lazy load de imagens e componentes pesados
8. [ ] Comprimir e otimizar Perfil.png (1.8MB -> <200KB)

**Validation:**
- Lighthouse score > 90 em todas as categorias
- Sitemap acessível em /sitemap.xml
- Meta tags corretas em todas as páginas
- Imagens otimizadas (WebP com fallback)

### Phase 8: Deploy & CI/CD

1. [ ] Configurar `nuxt.config.ts` para GitHub Pages (`nitro.preset: 'github-pages'`)
2. [ ] Criar `.github/workflows/deploy.yml` para GitHub Actions
3. [ ] Configurar build e deploy automático no push para master
4. [ ] Testar deploy em branch separada primeiro
5. [ ] Configurar CNAME para domínio customizado futuro (preparação)
6. [ ] Documentar processo de deploy no README
7. [ ] Atualizar CLAUDE.md com novos comandos

**Validation:**
- Push para master dispara deploy automático
- Site acessível em nicholastn1.github.io
- Sem erros 404 em páginas ou assets
- Build completo em < 60 segundos

### Phase 9: Documentação & Cleanup

1. [ ] Atualizar README.md com instruções do novo stack
2. [ ] Atualizar CLAUDE.md com comandos Nuxt
3. [ ] Atualizar `.context/CONTEXT.md` com nova arquitetura
4. [ ] Criar ADR-005: Nuxt.js Migration (se não feito na Phase 1)
5. [ ] Marcar ADRs 001-004 como Superseded
6. [ ] Remover arquivos do projeto antigo (ou mover para branch legacy)
7. [ ] Validação final de todos os success criteria

**Validation:**
- Documentação atualizada e precisa
- ADRs refletem decisões atuais
- Projeto antigo arquivado/removido
- Todos os success criteria marcados como [x]

## Testing

### Manual Testing Checklist

```
Navegação:
- [ ] Todos os links do menu funcionam
- [ ] Scroll suave para seções
- [ ] Scroll-to-top button funciona
- [ ] Links externos abrem em nova aba

Responsividade:
- [ ] Desktop (1200px+)
- [ ] Laptop (1000px)
- [ ] Tablet (900px, 800px)
- [ ] Mobile (500px)

Dark Mode:
- [ ] Toggle funciona
- [ ] Persistência após refresh
- [ ] Todas as seções têm cores corretas
- [ ] Não há flash de tema incorreto

Blog:
- [ ] Listagem carrega posts
- [ ] Filtro por categoria funciona
- [ ] Post individual renderiza
- [ ] Code blocks com syntax highlight
- [ ] Links internos funcionam

Performance:
- [ ] First Contentful Paint < 1.5s
- [ ] Largest Contentful Paint < 2.5s
- [ ] Cumulative Layout Shift < 0.1
- [ ] Imagens lazy load
- [ ] Fonts não bloqueiam render
```

### Automated Testing (Fase Futura)

```
# Quando implementar testes:
- Vitest para unit tests de composables
- Vue Test Utils para componentes
- Playwright para E2E
- Lighthouse CI para performance gates
```

## Decisions

### Impact on Existing Decisions

| ADR | Current Decision | Proposed Change | Action |
|-----|------------------|-----------------|--------|
| ADR-001 | Vanilla Static Site | Nuxt.js com TypeScript | **Supersede** |
| ADR-002 | Modular CSS (vanilla) | Tailwind CSS | **Supersede** |
| ADR-003 | Responsive Breakpoints | Manter breakpoints, usar Tailwind | **Update** (manter valores) |
| ADR-004 | GitHub Pages Deploy | Manter, adicionar GitHub Actions | **Update** (adicionar CI/CD) |

### New Decisions Required

| Decision | Context | Options to Consider |
|----------|---------|---------------------|
| ADR-005: Framework Choice | Migração para stack moderno | Nuxt.js (escolhido), Next.js, Astro |
| ADR-006: CSS Strategy | Estilização de componentes | Tailwind (escolhido), CSS Modules, UnoCSS |
| ADR-007: Docker Development | Ambiente de desenvolvimento isolado | Docker Compose (escolhido), Dev Containers, Local only |
| ADR-008: Animation Library | Animações de scroll e UI | GSAP (escolhido), Vue transitions, Motion One |
| ADR-009: Content Management | Gerenciamento de dados | Nuxt Content (escolhido), Headless CMS, hardcoded |

**Note:** ADRs para novas decisões devem ser criados na Phase 1 antes da implementação começar.

## Reference Materials

Não foram fornecidos materiais de referência externos. O design atual do site (nicholastn1.github.io) serve como referência visual principal.

### Design System Extraído

| Elemento | Valor |
|----------|-------|
| **Primary Gradient** | `linear-gradient(137.94deg, #00198d 15.4%, #4f6dff 88.72%)` |
| **Background Dark** | `#141414` |
| **Background Black** | `#000000` |
| **Text Primary** | `#141414` |
| **Text Secondary** | `#525252` |
| **Text Muted** | `#a3a3a3` |
| **Accent Green** | `#00e59b` |
| **Font Primary** | Titillium Web (400, 600, 700) |
| **Font Secondary** | Roboto (300) |
| **Container Max** | 1200px |
| **Breakpoints** | 500px, 800px, 900px, 1000px |

## Risks and Mitigations

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Build time alto no GitHub Actions | Medium | Low | Usar cache de node_modules, limitar regeneração |
| GSAP bundle size grande | Medium | Medium | Usar apenas plugins necessários, tree-shaking |
| Perda de SEO durante migração | Low | High | Manter mesmas URLs, configurar redirects se necessário |
| Incompatibilidade de browsers antigos | Low | Low | Definir browserslist adequado, testar em Safari |
| Nuxt Content lento com muito conteúdo | Low | Medium | Paginação, lazy loading de posts |
| Dark mode flash on load | Medium | Low | Usar color-mode script inline, preferência em cookie |
| GitHub Pages cache agressivo | Medium | Medium | Configurar headers corretos, usar hash em assets |

## Dependencies

### Runtime Dependencies (principais)

```json
{
  "nuxt": "^3.x",
  "@nuxt/content": "^2.x",
  "@nuxt/image": "^1.x",
  "@nuxtjs/tailwindcss": "^6.x",
  "@nuxtjs/color-mode": "^3.x",
  "@nuxtjs/sitemap": "^5.x",
  "gsap": "^3.x"
}
```

### Dev Dependencies

```json
{
  "typescript": "^5.x",
  "@nuxt/devtools": "latest",
  "eslint": "^8.x",
  "@nuxtjs/eslint-config-typescript": "^12.x",
  "prettier": "^3.x"
}
```

## Final Checklist

```
[ ] Docker funcional para desenvolvimento
[ ] Todas as seções migradas e funcionando
[ ] Blog com post de exemplo
[ ] Dark mode com persistência
[ ] Animações GSAP funcionando
[ ] Lighthouse > 90 em todas as métricas
[ ] Deploy automático funcionando
[ ] Documentação atualizada
[ ] ADRs criados/atualizados
```

---

**Created:** 2026-02-03
**Author:** Claude (via /generate-prp)
**Status:** In Progress
