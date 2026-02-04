# Skill: Add New Section

## When to Use

- Adding a new content section to the portfolio (e.g., Awards, Publications, Testimonials)
- Creating a new page area with consistent styling

## Step by Step

### 1. Create the CSS File

Create a new stylesheet in `/stylesheets/` named after the section:

```css
/* stylesheets/nova-secao.css */

.nova-secao {
  padding: 80px 0;
  background: #fff; /* or #f5f5f5 for alternating */
}

.nova-secao .container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.nova-secao h2 {
  font-family: "Titillium Web", sans-serif;
  font-weight: 700;
  font-size: 32px;
  margin-bottom: 40px;
}

/* Add responsive breakpoints */
@media (max-width: 800px) {
  .nova-secao {
    padding: 60px 0;
  }
}

@media (max-width: 500px) {
  .nova-secao {
    padding: 40px 0;
  }
}
```

### 2. Import in style.css

Add the import to `/stylesheets/style.css`:

```css
@import url("nova-secao.css");
```

### 3. Add HTML Section

Add the section in `index.html` at the appropriate position:

```html
<section id="nova_secao" class="nova-secao" aria-label="Nova Seção">
  <div class="container">
    <h2>Título da Seção</h2>
    <!-- Section content -->
  </div>
</section>
```

### 4. Add Navigation Link (if needed)

Add to the header nav in `index.html`:

```html
<li><a href="#nova_secao">Nova Seção</a></li>
```

### 5. Test Responsiveness

Check the section at all breakpoints:
- Desktop (>1000px)
- Tablet (800-1000px)
- Mobile (500-800px)
- Small mobile (<500px)

## Anti-Patterns

**Don't:**
- Add styles directly in `index.html` with `<style>` tags
- Put section styles in `global.css`
- Skip responsive breakpoints
- Use inline styles

**Do:**
- Create a dedicated CSS file per section
- Follow existing naming conventions (Portuguese section names)
- Include all four responsive breakpoints
- Use semantic HTML5 tags with aria-labels
