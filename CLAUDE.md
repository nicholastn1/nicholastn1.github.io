# nicholastn1.github.io

> Personal portfolio website for Nicholas Nogueira - Full Stack Software Engineer

## Decision Compliance

**IMPORTANT:** Before implementing any change, check `.context/decisions/` for related ADRs.

If a requested change conflicts with an existing decision:
1. **Stop and inform the user** which ADR(s) would be affected
2. **Ask explicitly** if they want to:
   - Proceed and update the decision
   - Modify the approach to comply with existing decision
   - Cancel the change
3. **If updating a decision**, create a new version:
   - Change status to `Superseded by ADR-XXX`
   - Create new ADR with updated decision
   - Reference the previous ADR

## Stack

- **Framework:** Nuxt.js 3 with TypeScript
- **Styling:** Tailwind CSS
- **Content:** Nuxt Content (YAML/Markdown)
- **Animations:** GSAP
- **Dark Mode:** @nuxtjs/color-mode
- **Fonts:** Google Fonts (Roboto, Titillium Web)
- **Hosting:** GitHub Pages (SSG)
- **Development:** Docker

## Commands

**IMPORTANT:** All commands must be executed via Docker to ensure consistent environment.

```bash
# Start development server (recommended)
docker compose up

# Or run in detached mode
docker compose up -d

# Run npm commands inside Docker container
docker compose exec app npm run <command>

# Examples:
docker compose exec app npm run build      # Build for production
docker compose exec app npm run generate   # Generate static site
docker compose exec app npm run lint       # Run ESLint
docker compose exec app npm run typecheck  # Run TypeScript checks

# Stop containers
docker compose down

# Rebuild container (after Dockerfile changes)
docker compose up --build

# View logs
docker compose logs -f app
```

### Without Docker (not recommended)

Only use if Docker is unavailable:

```bash
npm install
npm run dev
```

### Deploy

```bash
git push origin master  # Auto-deploys via GitHub Pages
```

## Critical Rules

1. **Always ask before assuming** - When there is ambiguity, multiple valid approaches, or decisions to be made, use the AskUserQuestion tool to clarify before proceeding. Never assume user intent.
2. **Run commands via Docker** - Always use `docker compose exec app npm run <command>` for consistency.
3. **Preserve responsive design** - Test changes across breakpoints (500px, 800px, 900px, 1000px). Mobile-first approach.
4. **Maintain semantic HTML** - Use appropriate HTML5 semantic tags with `aria-label` for accessibility.
5. **Use TypeScript** - All new code should be typed. Run `docker compose exec app npm run typecheck` to validate.

## Architecture

### Project Structure

```
├── .docker/              # Docker configuration
├── assets/css/           # Tailwind CSS and custom styles
├── components/           # Vue components (ui/, layout/, sections/, blog/)
├── composables/          # Vue composables (usePortfolioData, useScrollAnimation)
├── content/
│   ├── data/             # YAML data files (personal, experiences, education, projects)
│   └── posts/            # Blog posts in Markdown
├── layouts/              # Nuxt layouts (default, blog)
├── pages/                # Nuxt pages (index, blog)
├── public/images/        # Static images
├── types/                # TypeScript interfaces
├── nuxt.config.ts        # Nuxt configuration
└── tailwind.config.ts    # Tailwind configuration
```

### Data Management

Content is managed via YAML files in `/content/data/`:
- `personal.yaml` - Personal info, bio, social links
- `experiences.yaml` - Professional experiences
- `education.yaml` - Education, certifications, languages
- `projects.yaml` - Projects

Access data using the `usePortfolioData` composable.

---

## Additional Context

- Domain and architecture → `.context/CONTEXT.md`
- Architectural decisions → `.context/decisions/`
- Task-specific skills → `.context/skills/`
- Migration PRP → `.context/prp/generated/20260203-nuxtjs-portfolio-migration.md`
