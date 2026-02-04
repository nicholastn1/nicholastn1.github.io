# Domain Context

## Overview

Personal portfolio website showcasing Nicholas Nogueira's professional experience as a Full Stack Software Engineer with 5+ years of experience. The site targets recruiters, potential employers, and professional networking contacts. Content is primarily in Portuguese (pt-BR).

## Domain

### Core Entities

| Entity | Responsibility |
|--------|----------------|
| `Header/Navigation` | Site branding and anchor navigation to sections |
| `Introducao` | Hero section with profile image, name, and title |
| `Experiencia` | Timeline of professional work history (4 positions) |
| `Formacao` | Education, certifications, volunteering, and languages |
| `Projetos` | Showcase of personal/professional projects |
| `Sobre Mim` | Personal narrative and career journey |
| `Footer/Contato` | Contact information and social media links |

### Modules/Packages

```
nicholastn1.github.io/
├── index.html              # Main portfolio page (single page)
├── javascript/
│   └── script.js           # Scroll-to-top button functionality
├── stylesheets/            # Modular CSS (one per section)
│   ├── style.css           # CSS imports orchestrator
│   ├── global.css          # Reset and utilities
│   ├── header.css
│   ├── introducao.css
│   ├── experiencia.css
│   ├── formacao.css
│   ├── projetos.css
│   ├── sobre-mim.css
│   └── footer.css
└── img/                    # SVG and PNG assets
```

## Main Flows

### Navigation Flow

```
User lands on page
  → Hero section visible
  → Clicks nav link (e.g., "Experiência")
  → Page scrolls to #experiencia section
  → Can scroll back to top via floating button
```

### Content Sections Flow

```
Header (Navigation)
  ↓
Introducao (Hero)
  ↓
Experiência (Work History)
  ↓
Formação (Education & Certifications)
  ↓
Projetos (Portfolio)
  ↓
Sobre Mim (About)
  ↓
Footer (Contact & Social Links)
```

## External Integrations

| System | Type | Description |
|--------|------|-------------|
| Google Fonts | CDN | Roboto (300) and Titillium Web (400, 600, 700) |
| GitHub Pages | Hosting | Static site deployment from master branch |
| WhatsApp | Link | Direct contact via `wa.me` link |

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
