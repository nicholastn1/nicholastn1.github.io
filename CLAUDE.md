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

- HTML5
- CSS3 (Vanilla, modular organization)
- JavaScript (ES5, Vanilla)
- Google Fonts (Roboto, Titillium Web)
- GitHub Pages (hosting)

## Commands

No Docker or build tools. This is a static site.

```bash
# Local Development (choose one)
python -m http.server 8000
npx http-server
# Or open index.html directly in browser

# Deploy
git push origin master  # Auto-deploys via GitHub Pages
```

## Critical Rules

1. **Always ask before assuming** - When there is ambiguity, multiple valid approaches, or decisions to be made, use the AskUserQuestion tool to clarify before proceeding. Never assume user intent.
2. **Keep CSS modular** - Each section has its own stylesheet in `/stylesheets/`. Add new sections as separate files and import in `style.css`.
3. **Preserve responsive design** - Test changes across breakpoints (500px, 800px, 900px, 1000px). Mobile-first approach.
4. **Maintain semantic HTML** - Use appropriate HTML5 semantic tags (`<section>`, `<article>`, `<nav>`, etc.) with `aria-label` for accessibility.

## Architecture

### CSS Organization

Modular stylesheets in `/stylesheets/`:
- `style.css` - Main entry point with `@import` statements
- `global.css` - Reset, utilities, shared styles
- `header.css`, `introducao.css`, `experiencia.css`, etc. - Section-specific styles

### Single Page Layout

All content in `index.html` with anchor navigation (`#experiencia`, `#formacao`, `#projetos`, `#sobre_mim`, `#contato`).

---

## Additional Context

- Domain and architecture → `.context/CONTEXT.md`
- Architectural decisions → `.context/decisions/`
- Task-specific skills → `.context/skills/`
