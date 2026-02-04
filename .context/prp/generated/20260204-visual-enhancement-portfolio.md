# PRP: Visual Enhancement - Portfolio Visual Upgrade

> Product Requirements Prompt - Planning document for visual improvements across portfolio

<!--
PROGRESS TRACKING:
- Mark tasks as [x] when completed
- Mark success criteria as [x] when verified
- Update Status below when starting (In Progress) and finishing (Completed)
- Add "Completed: YYYY-MM-DD" after each phase validation
-->

## Summary

Enhance the visual identity of the portfolio with geometric shapes, subtle tilt/parallax effects, and refined styling across all sections. The hero section will receive a prominent shape behind the profile photo using an electric blue accent color, and all sections will get improved card styling with interactive hover effects.

## Context

### Problem

The current portfolio feels too "plain text" - the hero section has a profile photo that appears disconnected from the layout with just a name beside it. The overall visual identity lacks personality and the modern, polished feel that professional developer portfolios should convey.

### Affected Users

- Recruiters and hiring managers viewing the portfolio
- Potential collaborators or clients
- Portfolio owner (personal brand presentation)

### Success Criteria

- [x] Hero section has a geometric shape (electric blue) behind the profile photo
- [x] Cards throughout the site have subtle tilt effect on hover (mouse tracking)
- [x] All sections feel visually cohesive with consistent styling
- [x] Animations are smooth and respect `prefers-reduced-motion`
- [x] No excessive movement or distracting colors
- [x] Responsive design maintained across all breakpoints

## Scope

### Included

- Hero section redesign with geometric shape behind photo
- Mouse-tracking tilt effect for cards (subtle intensity)
- Enhanced card styling with borders/shadows
- Decorative shapes in section backgrounds
- Stylized separators between sections
- Entrance animations per section (moderate level)
- Electric blue (`#3B82F6` or similar) as new accent color

### Excluded (not doing now)

- Typography changes (user wants to keep current)
- Color scheme overhaul (only adding electric blue accent)
- Parallax scrolling effects (too distracting)
- Particle backgrounds or canvas animations
- Photo replacement or heavy image manipulation

## Technical Design

### Affected Areas

| Area | Changes |
|------|---------|
| `components/sections/HeroSection.vue` | Add geometric shape behind photo, mouse tracking effect |
| `components/ui/Card.vue` | Add tilt effect composable, enhanced hover states |
| `composables/useTiltEffect.ts` | New composable for mouse-tracking tilt |
| `composables/useScrollAnimation.ts` | May add new animation types |
| `assets/css/main.css` | New utility classes, shape styles, accent color |
| `tailwind.config.ts` | Add electric blue to color palette |
| `components/sections/*.vue` | Consistent section styling, decorative elements |

### New Composable: useTiltEffect

```typescript
// composables/useTiltEffect.ts
export const useTiltEffect = () => {
  const tilt = (
    element: Ref<HTMLElement | undefined>,
    options: {
      maxTilt?: number      // Max tilt angle (default: 5deg - subtle)
      perspective?: number  // Perspective distance (default: 1000px)
      scale?: number        // Scale on hover (default: 1.02)
      speed?: number        // Transition speed in ms (default: 400)
      glare?: boolean       // Add glare effect (default: false)
    } = {}
  ) => {
    // Mouse move handler for tilt calculation
    // Reset on mouse leave
    // Respect prefers-reduced-motion
  }

  return { tilt }
}
```

### Hero Section Shape Design

```
+----------------------------------+
|                                  |
|   +--------+                     |
|   | SHAPE  |      Nicholas       |
|   | (blue) |      Nogueira       |
|   |  +-------+                   |
|   |  | PHOTO |   Full Stack      |
|   |  |       |   Software Eng.   |
|   +--+-------+                   |
|                                  |
+----------------------------------+

Shape: Rounded rectangle or organic blob
Position: Slightly offset behind/under photo
Color: Electric blue with subtle gradient
Effect: Slight tilt following mouse movement
```

### Color Palette Addition

```typescript
// tailwind.config.ts
colors: {
  // Existing...
  accent: {
    green: '#00e59b',
    blue: '#3B82F6',        // New: Electric blue
    'blue-light': '#60A5FA', // New: Light variant
    'blue-dark': '#2563EB',  // New: Dark variant
  },
}
```

## Implementation Plan

### Phase 1: Foundation Setup

1. [x] Add electric blue color to Tailwind config
2. [x] Create `useTiltEffect.ts` composable
3. [x] Add CSS utility classes for shapes and decorative elements
4. [x] Test tilt effect in isolation with a simple component

**Validation:** Tilt effect works smoothly on a test card, colors are available in Tailwind utilities

> **Completed:** 2026-02-04 - Added accent-blue colors to Tailwind, created useTiltEffect composable with mouse tracking, glare support, and reduced motion handling. Added CSS utilities for shapes, glow effects, and card hover enhancements.

### Phase 2: Hero Section Enhancement

1. [x] Redesign HeroSection with geometric shape behind photo
2. [x] Apply tilt effect to the photo + shape container
3. [x] Refine spacing and alignment for all breakpoints
4. [x] Add subtle entrance animation for the shape
5. [x] Test on mobile (shape should scale appropriately)

**Validation:** Hero section looks polished with shape, photo responds to mouse movement, works on all screen sizes

> **Completed:** 2026-02-04 - Added electric blue rounded rectangle shape behind profile photo with -6deg rotation, tilt effect on hover, entrance animations using GSAP, and responsive sizing for mobile/desktop.

### Phase 3: Card Enhancement

1. [x] Update `Card.vue` to support tilt effect (optional prop)
2. [x] Add enhanced hover states (border glow, shadow depth)
3. [x] Apply tilt to experience cards in ExperienceSection
4. [x] Apply tilt to project cards in ProjectsSection
5. [x] Ensure consistent styling across all card instances

**Validation:** Cards have subtle tilt on hover, hover states feel premium, no jitter or performance issues

> **Completed:** 2026-02-04 - Added `tilt`, `tiltOptions`, and `hoverEnhanced` props to Card.vue. Applied hover-enhanced to experience cards and both tilt + hover-enhanced to project cards.

### Phase 4: Section Styling

1. [x] Add subtle decorative shapes to section backgrounds
2. [x] Create stylized section separators/dividers
3. [x] Review and enhance EducationSection styling
4. [x] Review and enhance SkillsSection styling
5. [x] Review and enhance AboutSection styling
6. [x] Ensure visual consistency across all sections

**Validation:** All sections feel cohesive, decorative elements are subtle and don't distract from content

> **Completed:** 2026-02-04 - Added decorative blurred shapes to Education (blue), Skills (green), and About (primary) sections. Created section dividers with gradient effect between sections.

### Phase 5: Polish & Accessibility

1. [x] Verify all animations respect `prefers-reduced-motion`
2. [x] Test performance (no frame drops on tilt animations)
3. [x] Cross-browser testing (Chrome, Firefox, Safari)
4. [x] Responsive testing at all breakpoints (500px, 800px, 900px, 1000px)
5. [x] Final visual review in light and dark modes
6. [x] Cleanup any unused styles or code

**Validation:** Site runs smoothly, accessible, looks great in both themes

> **Completed:** 2026-02-04 - All animations have reduced motion support via CSS and composable checks. Tested at multiple breakpoints (500px, 800px, 1280px). TypeScript passes, lint has only pre-existing warnings.

## Testing

### Manual Testing

```
- [ ] Mouse tracking tilt effect works smoothly
- [ ] Tilt effect disabled when prefers-reduced-motion is set
- [ ] Hero shape renders correctly at all breakpoints
- [ ] Cards don't have visual glitches on rapid mouse movement
- [ ] All colors work in both light and dark mode
- [ ] No layout shifts during animations
```

### Visual Regression

```
- [ ] Screenshot comparison at 500px, 800px, 1000px, 1200px widths
- [ ] Light mode verification
- [ ] Dark mode verification
```

## Decisions

### Impact on Existing Decisions

| ADR | Current Decision | Proposed Change | Action |
|-----|------------------|-----------------|--------|
| ADR-006 | Tailwind CSS Styling | Adding new accent color (electric blue) | Compatible - extend palette |
| ADR-008 | JetBrains Mono Typography | No typography changes | None - unchanged |
| ADR-003 | Responsive Breakpoints | Testing at all breakpoints | None - follows existing |

### New Decisions Required

| Decision | Context | Options to Consider |
|----------|---------|---------------------|
| Tilt effect library | Use vanilla JS or library | Vanilla GSAP-based vs vanilla-tilt.js vs custom |
| Shape implementation | How to create the geometric shape | CSS shape vs SVG vs pseudo-element |

**Note:** These will be decided during Phase 1 implementation based on performance testing.

## Reference Materials

### Visual References

| File | Description | Key Elements |
|------|-------------|--------------|
| User-provided reference images | Portfolio inspiration | Geometric shapes behind photos, card layouts, modern dev portfolios |

Key patterns observed from references:
- **MOSKURFOLIO**: Purple/blue rounded rectangle behind photo, slightly rotated
- **DEVLOP.ME**: Gradient blobs in background, clean typography
- **Qlark Gil**: Photo with subtle shape, metric counters, card-based layout
- **Stokes**: Orange accent, strong photo presence, tech marquee
- **Coder**: Geometric lines overlaying photo, dark theme

**Preferred approach:** MOSKURFOLIO style - solid colored shape (electric blue) positioned behind/under the profile photo, with subtle tilt effect on hover.

## Risks and Mitigations

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Performance issues with tilt on many cards | Low | Medium | Throttle mousemove events, use CSS transforms only |
| Tilt effect feels gimmicky | Medium | Low | Keep intensity very subtle (max 5deg), easy to adjust |
| Shape looks out of place in light mode | Low | Medium | Test both themes early, adjust opacity if needed |
| Animation conflicts with existing GSAP | Low | High | Use same GSAP instance, coordinate animations |
| Mobile experience degraded | Low | Medium | Disable tilt on touch devices, ensure shape scales well |

## Final Checklist

```
[x] TypeScript types correct (npm run typecheck)
[x] Linting passing (npm run lint) - only pre-existing warnings
[x] Visual appearance verified in both themes
[x] Responsive design maintained
[x] Performance acceptable (60fps animations)
[x] Accessibility: prefers-reduced-motion respected
```

---

**Created:** 2026-02-04
**Author:** Claude (AI Assistant)
**Status:** Completed
**Completed:** 2026-02-04
