# Skill: Add New Blog Post

## When to Use

- Creating a new technical article or career insight post
- Publishing content to the blog section

## Step by Step

### 1. Choose Category

Posts are organized in `/content/posts/` by category:
- `tech/` - Technical articles (tutorials, deep-dives, best practices)
- `carreira/` - Career insights (experiences, advice, reflections)

### 2. Create Markdown File

Create a new file in the appropriate category folder:

```
/content/posts/tech/my-new-post.md
```

Use slug-friendly naming (lowercase, hyphens, no special characters).

### 3. Add Frontmatter

Every post requires frontmatter at the top:

```markdown
---
title: "Título do Post em Português"
description: "Uma breve descrição do conteúdo do post (aparece nos cards e SEO)"
date: "2026-02-04"
category: "tech"  # or "carreira"
tags:
  - "typescript"
  - "vue"
  - "nuxt"
image: "/images/blog/post-cover.png"  # optional
readingTime: 8  # estimated minutes
author: "Nicholas Nogueira"
---
```

### 4. Write Content

Write the post content in Markdown below the frontmatter:

```markdown
---
# ... frontmatter ...
---

Introdução do post com contexto sobre o tema.

## Primeira Seção

Conteúdo da primeira seção...

### Subseção

Detalhes adicionais...

## Código de Exemplo

```typescript
const example = "código aqui"
```

## Conclusão

Resumo e próximos passos...
```

### 5. Add Images (if needed)

Place blog images in `/public/images/blog/`:
- Use descriptive names: `post-slug-image-description.png`
- Optimize for web (compress before adding)
- Reference in markdown: `![Alt text](/images/blog/image-name.png)`

### 6. Test Locally

```bash
docker compose up
```

Visit:
- `http://localhost:3000/blog` - Verify post appears in listing
- `http://localhost:3000/posts/tech/my-new-post` - Check post renders correctly

### 7. Verify

- [ ] Post appears in blog listing
- [ ] Title and description display correctly
- [ ] Table of contents generates from headings
- [ ] Code blocks have syntax highlighting
- [ ] Images load correctly
- [ ] Reading time displays
- [ ] Tags are clickable (if filtering enabled)

## Frontmatter Reference

| Field | Required | Description |
|-------|----------|-------------|
| `title` | Yes | Post title (displayed in card and page) |
| `description` | Yes | Short summary for SEO and cards |
| `date` | Yes | Publication date (YYYY-MM-DD) |
| `category` | Yes | Either "tech" or "carreira" |
| `tags` | Yes | Array of relevant topic tags |
| `image` | No | Cover image path |
| `readingTime` | No | Estimated reading time in minutes |
| `author` | No | Author name (defaults to site owner) |

## Anti-Patterns

**Don't:**
- Use very long titles (keep under 60 characters for SEO)
- Skip the description (important for SEO and cards)
- Use future dates unless intentionally scheduling
- Add unoptimized large images

**Do:**
- Write in Portuguese (pt-BR) for consistency
- Include code examples with proper syntax highlighting
- Use descriptive headings for the table of contents
- Add relevant tags for discoverability
