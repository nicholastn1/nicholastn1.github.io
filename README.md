# Nicholas Nogueira - Portfolio

Portfolio pessoal desenvolvido com Nuxt.js 3, TypeScript e Tailwind CSS.

**Site:** [nicholastn1.github.io](https://nicholastn1.github.io)

## Stack

- **Framework:** Nuxt.js 3 + TypeScript
- **Styling:** Tailwind CSS
- **Content:** Nuxt Content (YAML/Markdown)
- **Animations:** GSAP + ScrollTrigger
- **Dark Mode:** @nuxtjs/color-mode
- **Hosting:** GitHub Pages (SSG)

## Features

- Portfolio com seções de experiência, formação, projetos e sobre mim
- Blog integrado com Nuxt Content
- Dark mode com persistência
- Animações de scroll suaves
- SEO otimizado com meta tags e JSON-LD
- Responsivo para todos os dispositivos

## Desenvolvimento

### Com Docker (Recomendado)

```bash
# Iniciar servidor de desenvolvimento
docker compose up

# Rodar comandos npm
docker compose exec app npm run <comando>
```

### Sem Docker

```bash
npm install
npm run dev
```

### Comandos Disponíveis

```bash
npm run dev        # Servidor de desenvolvimento
npm run build      # Build para produção
npm run generate   # Gerar site estático
npm run preview    # Preview da build
npm run typecheck  # Verificar tipos TypeScript
npm run lint       # Verificar código com ESLint
```

## Deploy

O deploy é automático via GitHub Actions quando há push na branch `master`.

O site é gerado estaticamente e publicado no GitHub Pages.

## Estrutura do Projeto

```
├── components/          # Componentes Vue
│   ├── ui/              # Componentes base (Button, Card, etc)
│   ├── layout/          # Header, Footer
│   ├── sections/        # Seções do portfolio
│   └── blog/            # Componentes do blog
├── content/
│   ├── data/            # Dados em YAML (experiências, projetos, etc)
│   └── posts/           # Posts do blog em Markdown
├── pages/               # Páginas (/, /blog, /posts/*)
├── layouts/             # Layouts (default, blog)
├── composables/         # Composables Vue
├── plugins/             # Plugins Nuxt
├── public/              # Assets estáticos
└── types/               # Tipos TypeScript
```

## Contato

- **LinkedIn:** [linkedin.com/in/nicholastn](https://www.linkedin.com/in/nicholastn/)
- **GitHub:** [github.com/nicholastn1](https://github.com/nicholastn1)
- **Email:** nicholastimbo2022@gmail.com
