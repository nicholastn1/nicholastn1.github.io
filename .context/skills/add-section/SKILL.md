# Skill: Add New Section

## When to Use

- Adding a new content section to the portfolio (e.g., Awards, Publications, Testimonials)
- Creating a new page area with consistent styling

## Step by Step

### 1. Create TypeScript Interface (if needed)

Add types to `/types/index.ts` for the section data:

```typescript
export interface Award {
  id: string
  title: string
  organization: string
  date: string
  description?: string
}

export interface AwardsData {
  summary?: string
  awards: Award[]
}
```

### 2. Create YAML Data File

Create `/content/data/awards.yaml`:

```yaml
summary: "Recognition for technical excellence"
awards:
  - id: "1"
    title: "Best Technical Implementation"
    organization: "TechConf 2025"
    date: "2025-06"
    description: "Awarded for innovative API design"
```

### 3. Update usePortfolioData Composable

Add data fetching method to `/composables/usePortfolioData.ts`:

```typescript
export async function getAwardsData() {
  const { data } = await useAsyncData('awards', () =>
    queryContent('data/awards').findOne()
  )
  return data
}
```

### 4. Create Vue Section Component

Create `/components/sections/AwardsSection.vue`:

```vue
<script setup lang="ts">
import type { AwardsData } from '~/types'

const { data } = await useAsyncData('awards', () =>
  queryContent<AwardsData>('data/awards').findOne()
)
</script>

<template>
  <section id="premios" class="py-16 md:py-24" aria-label="Prêmios">
    <div class="container mx-auto px-4 md:px-6 max-w-5xl">
      <h2 class="text-h2 text-primary dark:text-primary-light mb-8">
        Prêmios
      </h2>
      <!-- Section content -->
    </div>
  </section>
</template>
```

### 5. Add to Homepage

Import and add the section in `/pages/index.vue`:

```vue
<template>
  <!-- ... existing sections ... -->
  <AwardsSection />
  <!-- ... -->
</template>
```

### 6. Add Navigation Link

Update `/components/layout/TheHeader.vue` navigation:

```vue
<a href="#premios" class="nav-link">Prêmios</a>
```

### 7. Test Responsiveness

Check the section at all breakpoints using browser DevTools:
- Desktop (>1000px)
- Tablet (800-1000px)
- Mobile (500-800px)
- Small mobile (<500px)

Run typecheck to ensure types are correct:
```bash
docker compose exec app npm run typecheck
```

## Anti-Patterns

**Don't:**
- Skip TypeScript types for new data structures
- Put styles inline instead of using Tailwind classes
- Forget aria-label for accessibility
- Skip the YAML data file and hardcode content

**Do:**
- Follow existing component patterns (check ExperienceSection.vue)
- Use semantic HTML5 tags with aria-labels
- Use Tailwind utility classes for styling
- Keep data in YAML for easy content updates
- Support dark mode with `dark:` variants
