<script setup lang="ts">
import type { CSSProperties } from 'vue'

interface Props {
  gridSize?: number          // Grid cell size in px (default: 40)
  gridOpacity?: number       // Grid line opacity (default: 0.1)
  glowIntensity?: number     // Glow intensity 0-1 (default: 0.4)
  glowSize?: number          // Glow size in px (default: 400)
  showGlow?: boolean         // Whether to show mouse glow (default: true)
}

const props = withDefaults(defineProps<Props>(), {
  gridSize: 40,
  gridOpacity: 0.1,
  glowIntensity: 0.4,
  glowSize: 400,
  showGlow: true,
})

const containerRef = ref<HTMLElement | null>(null)

// Mouse glow effect
const { glowStyle } = useMouseGlow(containerRef, {
  intensity: props.glowIntensity,
  size: props.glowSize,
  color: 'radial-gradient(circle, rgba(59, 130, 246, 0.4), rgba(0, 229, 155, 0.25), transparent 70%)',
  smoothing: 0.15,
})

// Grid pattern style
const gridStyle = computed<CSSProperties>(() => ({
  backgroundImage: `
    linear-gradient(rgba(59, 130, 246, ${props.gridOpacity}) 1px, transparent 1px),
    linear-gradient(90deg, rgba(59, 130, 246, ${props.gridOpacity}) 1px, transparent 1px)
  `,
  backgroundSize: `${props.gridSize}px ${props.gridSize}px`,
}))
</script>

<template>
  <div
    ref="containerRef"
    class="grid-background absolute inset-0 overflow-hidden"
    aria-hidden="true"
  >
    <!-- Grid Pattern -->
    <div
      class="absolute inset-0 transition-opacity duration-500"
      :class="[
        'dark:opacity-100 opacity-50'
      ]"
      :style="gridStyle"
    />

    <!-- Center Mesh Gradient (static) -->
    <div
      class="absolute inset-0 opacity-30 dark:opacity-40"
      style="background: radial-gradient(ellipse at 50% 50%, rgba(59, 130, 246, 0.15) 0%, transparent 60%)"
    />

    <!-- Mouse Glow Effect -->
    <div
      v-if="showGlow"
      :style="glowStyle"
      class="glow-element"
    />
  </div>
</template>

<style scoped>
.grid-background {
  z-index: 0;
}

.glow-element {
  will-change: transform, opacity;
}

/* Reduce intensity in light mode */
:not(.dark) .grid-background {
  opacity: 0.7;
}
</style>
