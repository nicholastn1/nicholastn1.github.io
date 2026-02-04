# Skill: Add New Project

## When to Use

- Adding a new project to the portfolio showcase
- Updating the Projetos section with recent work

## Step by Step

### 1. Prepare Project Assets

Place any project images in `/public/images/`:
- Use descriptive names: `projeto-nome.png`
- Optimize images for web (compress PNGs/JPGs)
- Recommended size: ~600x400px or similar aspect ratio

### 2. Add Project to YAML Data

Edit `/content/data/projects.yaml` and add the new project:

```yaml
projects:
  # ... existing projects ...
  - id: "new-project"
    name: "Nome do Projeto"
    description: "Breve descrição do projeto explicando o que ele faz e qual problema resolve."
    period:
      start: "2025-01"
      end: "Presente"  # or specific date like "2025-06"
    technologies:
      - "React"
      - "Node.js"
      - "PostgreSQL"
    url: "https://projeto-demo.com"
    github: "https://github.com/user/repo"
    image: "/images/projeto-nome.png"
```

### 3. Verify TypeScript Types

Ensure your project data matches the `Project` interface in `/types/index.ts`:

```typescript
export interface Project {
  id: string
  name: string
  description: string
  period: {
    start: string
    end: string
  }
  technologies: string[]
  url?: string
  github?: string
  image?: string
}
```

### 4. Test Display

Run the development server:
```bash
docker compose up
```

Then verify:
- Project card displays correctly
- Card alignment with existing projects
- Responsive behavior on mobile (use browser DevTools)
- External links open in new tabs
- Image loads correctly

### 5. Run Checks

```bash
docker compose exec app npm run typecheck
docker compose exec app npm run lint
```

## Anti-Patterns

**Don't:**
- Use very large unoptimized images
- Skip optional fields like `url` or `github` without reason
- Add projects without descriptions
- Forget to test mobile responsiveness

**Do:**
- Keep descriptions concise (2-3 sentences)
- List relevant technologies used
- Include both code repo and live demo when available
- Use consistent image sizes across project cards
- Run typecheck after making changes
