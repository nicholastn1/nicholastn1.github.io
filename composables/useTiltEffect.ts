// composables/useTiltEffect.ts
// Mouse-tracking tilt effect for cards and interactive elements

import type { Ref } from 'vue'

export interface TiltOptions {
  maxTilt?: number // Max tilt angle in degrees (default: 5)
  perspective?: number // Perspective distance in px (default: 1000)
  scale?: number // Scale on hover (default: 1.02)
  speed?: number // Transition speed in ms (default: 400)
  glare?: boolean // Add glare effect (default: false)
  glareMaxOpacity?: number // Max glare opacity (default: 0.2)
}

export const useTiltEffect = () => {
  // Check if we should reduce motion
  const prefersReducedMotion = ref(false)
  const isTouchDevice = ref(false)

  onMounted(() => {
    if (import.meta.client) {
      prefersReducedMotion.value = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches

      // Detect touch device
      isTouchDevice.value =
        'ontouchstart' in window || navigator.maxTouchPoints > 0
    }
  })

  const tilt = (
    element: Ref<HTMLElement | undefined>,
    options: TiltOptions = {}
  ) => {
    const {
      maxTilt = 5,
      perspective = 1000,
      scale = 1.02,
      speed = 400,
      glare = false,
      glareMaxOpacity = 0.2,
    } = options

    let glareElement: HTMLDivElement | null = null

    const handleMouseMove = (e: MouseEvent) => {
      if (
        !element.value ||
        prefersReducedMotion.value ||
        isTouchDevice.value
      ) {
        return
      }

      const el = element.value
      const rect = el.getBoundingClientRect()

      // Calculate mouse position relative to element center
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const mouseX = e.clientX - centerX
      const mouseY = e.clientY - centerY

      // Calculate tilt angles (invert for natural feel)
      const tiltX = (mouseY / (rect.height / 2)) * -maxTilt
      const tiltY = (mouseX / (rect.width / 2)) * maxTilt

      // Apply transform
      el.style.transform = `
        perspective(${perspective}px)
        rotateX(${tiltX}deg)
        rotateY(${tiltY}deg)
        scale(${scale})
      `

      // Update glare position if enabled
      if (glare && glareElement) {
        const glareX = ((mouseX + rect.width / 2) / rect.width) * 100
        const glareY = ((mouseY + rect.height / 2) / rect.height) * 100
        const distanceFromCenter = Math.sqrt(mouseX ** 2 + mouseY ** 2)
        const maxDistance = Math.sqrt(
          (rect.width / 2) ** 2 + (rect.height / 2) ** 2
        )
        const glareOpacity =
          (distanceFromCenter / maxDistance) * glareMaxOpacity

        glareElement.style.background = `
          radial-gradient(
            circle at ${glareX}% ${glareY}%,
            rgba(255, 255, 255, ${glareOpacity}) 0%,
            transparent 60%
          )
        `
      }
    }

    const handleMouseEnter = () => {
      if (!element.value || prefersReducedMotion.value || isTouchDevice.value) {
        return
      }

      const el = element.value
      el.style.transition = `transform ${speed}ms ease-out`
      el.style.willChange = 'transform'
    }

    const handleMouseLeave = () => {
      if (!element.value) return

      const el = element.value
      el.style.transform = `
        perspective(${perspective}px)
        rotateX(0deg)
        rotateY(0deg)
        scale(1)
      `

      // Reset glare
      if (glare && glareElement) {
        glareElement.style.background = 'transparent'
      }

      // Clean up will-change after animation
      setTimeout(() => {
        if (el) {
          el.style.willChange = 'auto'
        }
      }, speed)
    }

    // Setup function to initialize event listeners
    const setup = () => {
      if (!element.value || prefersReducedMotion.value || isTouchDevice.value) {
        return
      }

      const el = element.value

      // Set initial styles
      el.style.transformStyle = 'preserve-3d'

      // Create glare element if enabled
      if (glare) {
        glareElement = document.createElement('div')
        glareElement.style.cssText = `
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          border-radius: inherit;
          z-index: 10;
        `
        el.style.position = 'relative'
        el.appendChild(glareElement)
      }

      // Add event listeners
      el.addEventListener('mouseenter', handleMouseEnter)
      el.addEventListener('mousemove', handleMouseMove)
      el.addEventListener('mouseleave', handleMouseLeave)
    }

    // Cleanup function
    const destroy = () => {
      if (!element.value) return

      const el = element.value
      el.removeEventListener('mouseenter', handleMouseEnter)
      el.removeEventListener('mousemove', handleMouseMove)
      el.removeEventListener('mouseleave', handleMouseLeave)

      // Reset styles
      el.style.transform = ''
      el.style.transformStyle = ''
      el.style.willChange = ''

      // Remove glare element
      if (glareElement && el.contains(glareElement)) {
        el.removeChild(glareElement)
        glareElement = null
      }
    }

    return { setup, destroy }
  }

  return {
    tilt,
    prefersReducedMotion,
    isTouchDevice,
  }
}
