# Skill: Add New Project

## When to Use

- Adding a new project to the portfolio showcase
- Updating the Projetos section with recent work

## Step by Step

### 1. Prepare Project Assets

Place any project images in `/img/`:
- Use descriptive names: `projeto-nome.png`
- Optimize images for web (compress PNGs)
- Recommended size: ~600x400px or similar aspect ratio

### 2. Add Project Card HTML

Add a new project card in the `#projetos` section of `index.html`:

```html
<div class="projeto-card">
  <div class="projeto-img">
    <img src="img/projeto-nome.png" alt="Nome do Projeto">
  </div>
  <div class="projeto-info">
    <h3>Nome do Projeto</h3>
    <p>Breve descrição do projeto explicando o que ele faz e qual problema resolve.</p>
    <div class="projeto-tecnologias">
      <span>React</span>
      <span>Node.js</span>
      <span>PostgreSQL</span>
    </div>
    <div class="projeto-links">
      <a href="https://github.com/user/repo" target="_blank" rel="noopener">
        <img src="img/github.svg" alt="GitHub">
        Código
      </a>
      <a href="https://projeto-demo.com" target="_blank" rel="noopener">
        <img src="img/link.svg" alt="Link">
        Demo
      </a>
    </div>
  </div>
</div>
```

### 3. Verify Card Layout

The projects section uses CSS Grid. Ensure the new card fits the existing layout:

```css
/* Existing grid in projetos.css */
.projetos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
}
```

### 4. Test Display

- Check card alignment with existing projects
- Verify responsive behavior on mobile
- Test external links open in new tabs

## Anti-Patterns

**Don't:**
- Use very large unoptimized images
- Skip the `alt` attribute on images
- Forget `rel="noopener"` on external links
- Add projects without descriptions

**Do:**
- Keep descriptions concise (2-3 sentences)
- List relevant technologies used
- Include both code repo and live demo when available
- Use consistent image sizes across project cards
