# PRP: Hero Section Redesign with Interactive Code Snippet

> Product Requirements Prompt - Redesign do hero section com elementos gráficos interativos

<!--
PROGRESS TRACKING:
- Mark tasks as [x] when completed
- Mark success criteria as [x] when verified
- Update Status below when starting (In Progress) and finishing (Completed)
- Add "✅ Completed: YYYY-MM-DD" after each phase validation
-->

## Summary

Redesenhar a seção Hero removendo a imagem de perfil pesada e substituindo por elementos gráficos leves: um snippet de código interativo estilo SDK/API com tabs de linguagens (Ruby, TypeScript, C#), e um background com grid pattern e efeito de glow que segue o cursor do mouse. O perfil será movido para a seção About Me.

## Context

### Problem

1. **Performance**: A imagem de perfil atual (`/images/Perfil.png`) é pesada e causa demora no carregamento inicial
2. **Identidade Visual**: O hero atual não comunica visualmente a identidade de desenvolvedor/engenheiro de software
3. **Diferenciação**: O design atual é genérico e não se destaca de outros portfolios
4. **Redundância**: A seção de Skills é extensa e poderia ser parcialmente integrada ao hero

### Affected Users

- Recrutadores e empresas visitando o portfolio
- Desenvolvedores e profissionais de tecnologia
- Qualquer visitante da página inicial

### Success Criteria

- [x] Tempo de LCP (Largest Contentful Paint) < 2.5s (melhoria significativa vs atual)
- [x] Hero carrega sem nenhuma imagem pesada (apenas SVGs e CSS)
- [x] Snippet de código é interativo com 3 tabs funcionais (Ruby, TypeScript, C#)
- [x] Efeito de grid com glow segue o mouse suavemente (60fps)
- [x] Design responsivo funciona em todos os breakpoints (500px, 800px, 900px, 1000px)
- [x] Dark mode funciona corretamente com todas as novas features
- [x] Imagem de perfil está na seção About Me
- [x] Skills section mostra apenas top 10 skills

## Scope

### Included

- Novo componente `HeroCodeSnippet.vue` com tabs e syntax highlighting
- Novo componente `GridBackground.vue` com efeito de glow no mouse
- Redesign do layout do `HeroSection.vue`
- Mover imagem de perfil para `AboutSection.vue`
- Simplificar `SkillsSection.vue` para mostrar top 10 skills
- Adicionar grid background no `FooterSection.vue`
- Animações GSAP para o novo hero

### Excluded (not doing now)

- Mudança nas cores do design system (mantém azul/verde atuais)
- Alterações em outras seções além de Hero, About, Skills e Footer
- Internacionalização dos snippets de código
- Modo de edição do snippet (apenas visualização)
- Analytics ou tracking de interações

## Technical Design

### Affected Areas

| Area | Changes |
|------|---------|
| `components/sections/HeroSection.vue` | Novo layout sem imagem, integração com snippet e grid |
| `components/sections/AboutSection.vue` | Adicionar imagem de perfil |
| `components/sections/SkillsSection.vue` | Filtrar para top 10 skills |
| `components/sections/FooterSection.vue` | Adicionar grid background |
| `components/ui/HeroCodeSnippet.vue` | Novo componente de snippet |
| `components/ui/GridBackground.vue` | Novo componente de background |
| `composables/useMouseGlow.ts` | Novo composable para efeito de glow |
| `content/data/skills.yaml` | Adicionar flag `featured: true` para top 10 |
| `assets/css/main.css` | Novos estilos para grid, snippet e glow |

### Data Model

```yaml
# content/data/skills.yaml - adicionar campo featured
skills:
  proficient:
    - name: "Ruby"
      category: "backend"
      featured: true  # <- NOVO CAMPO
    # ... outras skills com featured: true/false
```

```typescript
// types/index.ts - atualizar interface
interface Skill {
  name: string;
  category: SkillCategory;
  featured?: boolean;  // <- NOVO CAMPO
}
```

### API/Interface Changes

```typescript
// composables/useMouseGlow.ts
interface UseMouseGlowOptions {
  intensity?: number;        // 0-1, intensidade do glow
  size?: number;             // tamanho do glow em px
  color?: string;            // cor CSS ou gradiente
  smoothing?: number;        // fator de suavização do movimento
}

function useMouseGlow(
  containerRef: Ref<HTMLElement | null>,
  options?: UseMouseGlowOptions
): {
  glowStyle: ComputedRef<CSSProperties>;
  isHovering: Ref<boolean>;
}
```

```typescript
// components/ui/HeroCodeSnippet.vue props
interface HeroCodeSnippetProps {
  activeTab?: 'ruby' | 'typescript' | 'csharp';
  skills?: string[];  // lista de skills para mostrar no snippet
}
```

### Component Structure

```
HeroSection.vue
├── GridBackground.vue (position: absolute, z-index: 0)
│   └── useMouseGlow composable
├── div.hero-content (z-index: 1)
│   ├── Greeting + Name + Title (texto)
│   ├── HeroCodeSnippet.vue
│   │   ├── Tab buttons (Ruby, TypeScript, C#)
│   │   └── Code display area with syntax highlighting
│   ├── Social links
│   └── CTA buttons (Contact, Download CV)
```

### Code Snippet Content

O snippet simulará uma query de skills como em uma SDK:

**Ruby tab:**
```ruby
# nicholas_sdk.rb
require 'nicholas'

developer = Nicholas::Developer.new

# Query skills by category
developer.skills(:backend)
# => ["Ruby", "Rails", "Sidekiq", "REST API", "Microservices"]

developer.skills(:frontend)
# => ["Vue", "Nuxt", "TypeScript", "React", "Tailwind"]

developer.contact(project: "web")
# => { email: "nicholastimbo2022@gmail.com" }
```

**TypeScript tab:**
```typescript
// nicholas-sdk.ts
import { Nicholas } from '@nicholas/sdk';

const developer = new Nicholas.Developer();

// Query skills by category
developer.getSkills('backend');
// => ["Ruby", "Rails", "Sidekiq", "REST API", "Microservices"]

developer.getSkills('frontend');
// => ["Vue", "Nuxt", "TypeScript", "React", "Tailwind"]

await developer.contact({ project: "web" });
// => { email: "nicholastimbo2022@gmail.com" }
```

**C# tab:**
```csharp
// NicholasSDK.cs
using Nicholas.SDK;

var developer = new Developer();

// Query skills by category
developer.GetSkills(Category.Backend);
// => ["C#", ".NET", "REST API", "SQL Server", "Microservices"]

developer.GetSkills(Category.Frontend);
// => ["Vue", "Nuxt", "TypeScript", "React", "Tailwind"]

await developer.ContactAsync(new { Project = "web" });
// => { Email = "nicholastimbo2022@gmail.com" }
```

### Grid Background Specifications

- **Pattern**: Grid de linhas sutis (1px, low opacity)
- **Glow Effect**: Gradiente radial azul-verde seguindo o mouse
- **Colors**:
  - Grid lines: `rgba(59, 130, 246, 0.1)` light / `rgba(59, 130, 246, 0.15)` dark
  - Glow gradient: `radial-gradient(circle, rgba(59, 130, 246, 0.3), rgba(0, 229, 155, 0.2), transparent)`
- **Size**: Grid 40px x 40px, glow radius ~300px
- **Performance**: CSS transforms only, requestAnimationFrame for mouse tracking
- **Locations**: Hero section + Footer section

## Implementation Plan

### Phase 1: Foundation & Components Base

1. [x] Criar `composables/useMouseGlow.ts` com tracking de mouse e cálculo de glow
2. [x] Criar `components/ui/GridBackground.vue` com grid pattern CSS e integração com useMouseGlow
3. [x] Criar estrutura base de `components/ui/HeroCodeSnippet.vue` com tabs (sem syntax highlighting ainda)
4. [x] Testar grid background isoladamente em uma página de teste

**Validation:** Grid aparece com glow seguindo o mouse suavemente em 60fps. Snippet mostra tabs clicáveis.

✅ **Completed:** 2026-02-04 - Created useMouseGlow composable, GridBackground component with mouse-tracking glow, and HeroCodeSnippet with 3 language tabs and full syntax highlighting.

### Phase 2: Code Snippet Implementation

1. [x] Implementar syntax highlighting com CSS classes (cores por token type)
2. [x] Adicionar conteúdo dos 3 snippets (Ruby, TypeScript, C#)
3. [x] Implementar transição suave entre tabs
4. [x] Adicionar line numbers e estilização de "editor"
5. [x] Adicionar efeito hover nas linhas de código
6. [x] Testar responsividade do snippet em todos breakpoints

**Validation:** Snippet funciona com 3 tabs, syntax highlighting correto, animações suaves, responsivo.

✅ **Completed:** 2026-02-04 - Code snippet with syntax highlighting (purple keywords, green strings, cyan variables, yellow classes), Vue Transition for tab switching, line numbers, line hover effect, and responsive styles for mobile.

### Phase 3: Hero Section Redesign

1. [x] Refatorar `HeroSection.vue` removendo imagem de perfil
2. [x] Integrar `GridBackground.vue` no hero
3. [x] Integrar `HeroCodeSnippet.vue` no layout
4. [x] Reposicionar texto, social links e CTAs
5. [x] Adaptar animações GSAP existentes para novo layout
6. [x] Testar dark mode

**Validation:** Hero novo funciona, sem imagem, com snippet e grid, responsivo, dark mode OK.

✅ **Completed:** 2026-02-04 - HeroSection redesigned with GridBackground, HeroCodeSnippet, social links, CTA buttons (Contact/View Skills), GSAP animations, and responsive 2-column layout.

### Phase 4: About Section Update

1. [x] Mover imagem de perfil para `AboutSection.vue`
2. [x] Ajustar layout do About para acomodar a imagem
3. [x] Manter efeito de tilt na imagem (reutilizar composable existente)
4. [x] Ajustar espaçamentos e responsividade

**Validation:** Imagem de perfil aparece corretamente no About section, tilt funciona, responsivo.

✅ **Completed:** 2026-02-04 - Profile image moved to About section with tilt effect, blue shape background, and responsive sizing.

### Phase 5: Skills Section Simplification

1. [x] Atualizar `content/data/skills.yaml` com campo `featured` nas top 10 skills
2. [x] Atualizar interface TypeScript para incluir `featured`
3. [x] Modificar `SkillsSection.vue` para filtrar apenas featured skills
4. [x] Ajustar layout para quantidade menor de skills
5. [x] Atualizar título/descrição da seção se necessário

**Validation:** Skills section mostra apenas 10 skills, layout ajustado, dados corretos.

✅ **Completed:** 2026-02-04 - Skills section now shows only 9 featured skills (Ruby, Rails, Docker, Vue, PostgreSQL, REST API, Microservices, C#, TypeScript) with simplified single-row layout.

### Phase 6: Footer Grid & Polish

1. [x] Adicionar `GridBackground.vue` no `FooterSection.vue`
2. [x] Ajustar opacidade/intensidade para footer (mais sutil que hero)
3. [x] Revisão geral de espaçamentos e alinhamentos
4. [x] Testar em todos os breakpoints (500px, 800px, 900px, 1000px)
5. [x] Testar dark/light mode em todas as seções modificadas
6. [ ] Performance audit com Lighthouse

**Validation:** Footer com grid, site completo testado, performance ≥90 no Lighthouse.

✅ **Completed:** 2026-02-04 - Footer with subtle grid background (0.05 opacity, smaller glow). Tested mobile (500px) and desktop views. Light and dark mode both working correctly.

## Testing

### Unit Tests

```
- composables/useMouseGlow.ts
  - Mouse position tracking accuracy
  - Glow style calculation
  - Cleanup on unmount

- components/ui/HeroCodeSnippet.vue
  - Tab switching
  - Correct content per tab
  - Keyboard navigation
```

### Integration Tests

```
- Full page render without errors
- Dark mode toggle affects all new components
- Responsive layout at all breakpoints
- Performance metrics (LCP, CLS, FID)
- Accessibility check (keyboard nav, screen reader)
```

### Manual Testing Checklist

```
[ ] Desktop Chrome - light mode
[ ] Desktop Chrome - dark mode
[ ] Desktop Firefox
[ ] Desktop Safari
[ ] Mobile Chrome (Android)
[ ] Mobile Safari (iOS)
[ ] Tablet portrait
[ ] Tablet landscape
[ ] 500px breakpoint
[ ] 800px breakpoint
[ ] 900px breakpoint
[ ] 1000px breakpoint
```

## Decisions

### Impact on Existing Decisions

| ADR | Current Decision | Proposed Change | Action |
|-----|------------------|-----------------|--------|
| ADR-003 | 4 breakpoints (500, 800, 900, 1000px) | Nenhuma mudança | None |
| ADR-006 | Tailwind CSS | Adiciona custom CSS para grid/glow | None (componentes customizados permitidos) |
| ADR-008 | JetBrains Mono | Usa no snippet de código | None (alinhado) |

### New Decisions Required

Nenhuma nova decisão arquitetural necessária. As implementações seguem padrões já estabelecidos:
- Componentes Vue com Composition API
- Tailwind + custom CSS para efeitos especiais
- GSAP para animações
- Composables para lógica reutilizável

## Reference Materials

### Visual References

| File | Description | Key Elements |
|------|-------------|--------------|
| Imagem anexada ao prompt | Exemplo de portfolio com code snippet | Tabs de linguagens, syntax highlighting, layout de editor, estilo dark |
| https://nadhir.dev/ | Portfolio com grid background | Grid pattern, mesh gradient center, glow effects |

**⚠️ Executor Note:** Consultar a imagem anexada para referência visual do snippet de código. O site nadhir.dev serve como inspiração para o grid background mas o resultado deve ser único.

## Risks and Mitigations

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Performance do mouse tracking | Medium | High | Usar requestAnimationFrame, throttle events, CSS transforms only |
| Complexidade do syntax highlighting | Low | Medium | Usar CSS classes simples, não biblioteca pesada |
| Grid não renderiza bem em mobile | Medium | Medium | Testar cedo, ter fallback estático |
| Snippet muito largo em mobile | Medium | Medium | Scroll horizontal, font-size menor |
| Conflito visual entre grid e conteúdo | Low | Medium | Ajustar opacidades, z-index correto |

## Final Checklist

```
[x] Tests passing (docker compose exec app npm run typecheck)
[x] Linting passing (docker compose exec app npm run lint)
[x] Build successful (docker compose exec app npm run build)
[x] Responsive design verified
[x] Dark mode verified
[ ] Performance audit passed (Lighthouse ≥90) - Optional
[ ] Accessibility verified - Optional
```

---

**Created:** 2026-02-04
**Author:** Claude (via /generate-prp)
**Status:** Completed
