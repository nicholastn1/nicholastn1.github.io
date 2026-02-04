# Domain Context

## Overview

Personal portfolio website showcasing Nicholas Nogueira's professional experience as a Full Stack Software Engineer with 5+ years of experience. The site targets recruiters, potential employers, and professional networking contacts. Content is primarily in Portuguese (pt-BR).

**Technology Stack:** Nuxt.js 3 + TypeScript + Tailwind CSS

## Domain

### Core Entities

| Entity | Responsibility |
|--------|----------------|
| `TheHeader` | Site branding, navigation links, theme toggle, mobile menu |
| `HeroSection` | Profile image, name, and professional title |
| `ExperienceSection` | Timeline of professional work history (4 positions) |
| `EducationSection` | Education, certifications, volunteering, and languages |
| `ProjectsSection` | Showcase of personal/professional projects |
| `AboutSection` | Personal narrative and career journey |
| `TheFooter` | Contact information and social media links |
| `Blog` | Technical articles and career insights |

### Modules/Packages

```
nicholastn1.github.io/
├── components/
│   ├── ui/                 # Reusable UI components
│   │   ├── Button.vue
│   │   ├── Card.vue
│   │   ├── SkillTag.vue
│   │   └── ThemeToggle.vue
│   ├── layout/
│   │   ├── TheHeader.vue
│   │   └── TheFooter.vue
│   ├── sections/           # Portfolio sections
│   │   ├── HeroSection.vue
│   │   ├── ExperienceSection.vue
│   │   ├── EducationSection.vue
│   │   ├── ProjectsSection.vue
│   │   └── AboutSection.vue
│   └── blog/               # Blog components
│       ├── PostCard.vue
│       └── TableOfContents.vue
├── content/
│   ├── data/               # Portfolio data (YAML)
│   │   ├── personal.yaml
│   │   ├── experiences.yaml
│   │   ├── education.yaml
│   │   └── projects.yaml
│   └── posts/              # Blog posts (Markdown)
│       └── tech/
├── pages/
│   ├── index.vue           # Homepage with all sections
│   ├── blog/index.vue      # Blog listing
│   └── posts/[...slug].vue # Individual blog posts
├── layouts/
│   ├── default.vue         # Main layout (portfolio)
│   └── blog.vue            # Blog layout
├── composables/
│   ├── usePortfolioData.ts # Access YAML data
│   └── useScrollAnimation.ts # GSAP animations
├── plugins/
│   ├── gsap.client.ts      # GSAP registration
│   └── seo.client.ts       # JSON-LD structured data
├── types/
│   └── index.ts            # TypeScript interfaces
└── public/
    └── images/             # Static images
```

## Main Flows

### Navigation Flow

```
User lands on page
  → Hero section visible
  → Clicks nav link (e.g., "Experiência")
  → Page smoothly scrolls to #experiencia section
  → Can use sticky header to navigate
  → Theme toggle available for dark/light mode
```

### Content Data Flow

```
YAML files (content/data/)
  ↓ Nuxt Content
Composable (usePortfolioData.ts)
  ↓ useAsyncData
Section Components
  ↓ Template rendering
User sees content
```

### Blog Flow

```
User clicks "Blog" in navigation
  → /blog page with post listing
  → Filter by category (tech, carreira)
  → Click post card
  → /posts/[categoria]/[slug] renders markdown
  → Table of contents for navigation
```

## External Integrations

| System | Type | Description |
|--------|------|-------------|
| Google Fonts | CDN | Roboto (300) and Titillium Web (400, 600, 700) |
| GitHub Pages | Hosting | Static site deployment via GitHub Actions |
| GitHub Actions | CI/CD | Automated build and deploy on push to master |
| WhatsApp | Link | Direct contact via `wa.me` link |
| GSAP | Animation | Scroll-triggered animations |
| Nuxt Content | CMS | Markdown/YAML content management |

## Glossary

| Term | Definition |
|------|------------|
| **Experiência** | Professional work experience section displaying job positions |
| **Formação** | Education and certifications section |
| **Projetos** | Personal/professional projects showcase |
| **Sobre Mim** | "About Me" personal narrative section |
| **Contato** | Contact information section in footer |
| **Full Stack Engineer** | Developer skilled in both backend (Ruby on Rails, .NET) and frontend (React, Vue.js) |
| **GitHub Pages** | Free static site hosting that deploys from `username.github.io` repositories |
| **Nuxt Content** | Module for file-based CMS using Markdown and YAML |
| **SSG** | Static Site Generation - pre-renders pages at build time |
