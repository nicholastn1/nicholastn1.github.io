// composables/useMouseGlow.ts
// Mouse-tracking glow effect for interactive backgrounds

import type { Ref, ComputedRef, CSSProperties } from 'vue'

export interface UseMouseGlowOptions {
  intensity?: number        // 0-1, intensity of the glow (default: 0.3)
  size?: number             // Size of the glow in px (default: 300)
  color?: string            // CSS color or gradient (default: blue-green gradient)
  smoothing?: number        // Smoothing factor for movement (default: 0.1)
}

export interface UseMouseGlowReturn {
  glowStyle: ComputedRef<CSSProperties>
  isHovering: Ref<boolean>
  mousePosition: Ref<{ x: number; y: number }>
}

export const useMouseGlow = (
  containerRef: Ref<HTMLElement | null>,
  options: UseMouseGlowOptions = {}
): UseMouseGlowReturn => {
  const {
    intensity = 0.3,
    size = 300,
    color = 'radial-gradient(circle, rgba(59, 130, 246, 0.3), rgba(0, 229, 155, 0.2), transparent)',
    smoothing = 0.1,
  } = options

  // Mouse position (raw and smoothed)
  const mousePosition = ref({ x: 0, y: 0 })
  const targetPosition = ref({ x: 0, y: 0 })
  const isHovering = ref(false)

  // Animation frame ID for cleanup
  let animationFrameId: number | null = null

  // Check for reduced motion preference
  const prefersReducedMotion = ref(false)

  // Smooth animation loop using requestAnimationFrame
  const animate = () => {
    if (prefersReducedMotion.value) {
      mousePosition.value = targetPosition.value
    } else {
      // Lerp (linear interpolation) for smooth movement
      mousePosition.value = {
        x: mousePosition.value.x + (targetPosition.value.x - mousePosition.value.x) * smoothing,
        y: mousePosition.value.y + (targetPosition.value.y - mousePosition.value.y) * smoothing,
      }
    }

    animationFrameId = requestAnimationFrame(animate)
  }

  // Mouse move handler
  const handleMouseMove = (e: MouseEvent) => {
    if (!containerRef.value) return

    const rect = containerRef.value.getBoundingClientRect()
    targetPosition.value = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    }
  }

  // Mouse enter/leave handlers
  const handleMouseEnter = () => {
    isHovering.value = true
  }

  const handleMouseLeave = () => {
    isHovering.value = false
  }

  // Computed glow style
  const glowStyle = computed<CSSProperties>(() => {
    if (!isHovering.value) {
      return {
        opacity: 0,
        transition: 'opacity 0.5s ease-out',
      }
    }

    return {
      position: 'absolute',
      pointerEvents: 'none',
      width: `${size}px`,
      height: `${size}px`,
      left: `${mousePosition.value.x - size / 2}px`,
      top: `${mousePosition.value.y - size / 2}px`,
      background: color,
      opacity: intensity,
      borderRadius: '50%',
      filter: 'blur(40px)',
      transition: 'opacity 0.3s ease-out',
      zIndex: 1,
    }
  })

  // Setup and cleanup
  onMounted(() => {
    if (!import.meta.client) return

    // Check reduced motion preference
    prefersReducedMotion.value = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    // Start animation loop
    animate()

    // Add event listeners
    if (containerRef.value) {
      containerRef.value.addEventListener('mousemove', handleMouseMove)
      containerRef.value.addEventListener('mouseenter', handleMouseEnter)
      containerRef.value.addEventListener('mouseleave', handleMouseLeave)
    }
  })

  onUnmounted(() => {
    // Cancel animation frame
    if (animationFrameId !== null) {
      cancelAnimationFrame(animationFrameId)
    }

    // Remove event listeners
    if (containerRef.value) {
      containerRef.value.removeEventListener('mousemove', handleMouseMove)
      containerRef.value.removeEventListener('mouseenter', handleMouseEnter)
      containerRef.value.removeEventListener('mouseleave', handleMouseLeave)
    }
  })

  return {
    glowStyle,
    isHovering,
    mousePosition,
  }
}
