// composables/useScrollAnimation.ts
// GSAP ScrollTrigger animations for portfolio sections

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register GSAP plugins only on client side
if (import.meta.client) {
  gsap.registerPlugin(ScrollTrigger)
}

export const useScrollAnimation = () => {
  // Check if we should reduce motion
  const prefersReducedMotion = ref(false)

  onMounted(() => {
    if (import.meta.client) {
      prefersReducedMotion.value = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches
    }
  })

  // Fade in from bottom animation
  const fadeInUp = (
    element: string | Element | Element[],
    options: {
      delay?: number
      duration?: number
      y?: number
      stagger?: number
      trigger?: string | Element
    } = {}
  ) => {
    if (import.meta.server || prefersReducedMotion.value) return

    const {
      delay = 0,
      duration = 0.8,
      y = 50,
      stagger = 0,
      trigger,
    } = options

    gsap.from(element, {
      y,
      opacity: 0,
      duration,
      delay,
      stagger,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: trigger || element,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    })
  }

  // Fade in animation (no movement)
  const fadeIn = (
    element: string | Element | Element[],
    options: {
      delay?: number
      duration?: number
      trigger?: string | Element
    } = {}
  ) => {
    if (import.meta.server || prefersReducedMotion.value) return

    const { delay = 0, duration = 0.8, trigger } = options

    gsap.from(element, {
      opacity: 0,
      duration,
      delay,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: trigger || element,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    })
  }

  // Scale in animation
  const scaleIn = (
    element: string | Element | Element[],
    options: {
      delay?: number
      duration?: number
      scale?: number
      stagger?: number
      trigger?: string | Element
    } = {}
  ) => {
    if (import.meta.server || prefersReducedMotion.value) return

    const {
      delay = 0,
      duration = 0.6,
      scale = 0.9,
      stagger = 0,
      trigger,
    } = options

    gsap.from(element, {
      scale,
      opacity: 0,
      duration,
      delay,
      stagger,
      ease: 'back.out(1.7)',
      scrollTrigger: {
        trigger: trigger || element,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    })
  }

  // Stagger children animation
  const staggerChildren = (
    parent: string | Element,
    childSelector: string,
    options: {
      delay?: number
      duration?: number
      y?: number
      stagger?: number
    } = {}
  ) => {
    if (import.meta.server || prefersReducedMotion.value) return

    const { delay = 0, duration = 0.6, y = 30, stagger = 0.1 } = options

    // Get children elements - handle both string selectors and DOM elements
    let children: Element[] = []
    if (typeof parent === 'string') {
      const parentEl = document.querySelector(parent)
      if (parentEl) {
        children = Array.from(parentEl.querySelectorAll(childSelector))
      }
    } else if (parent instanceof Element) {
      children = Array.from(parent.querySelectorAll(childSelector))
    }

    if (children.length === 0) return

    gsap.from(children, {
      y,
      opacity: 0,
      duration,
      delay,
      stagger,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: parent,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    })
  }

  // Parallax effect for hero section
  const parallax = (
    element: string | Element,
    options: {
      yPercent?: number
      ease?: string
    } = {}
  ) => {
    if (import.meta.server || prefersReducedMotion.value) return

    const { yPercent = -20, ease = 'none' } = options

    gsap.to(element, {
      yPercent,
      ease,
      scrollTrigger: {
        trigger: element,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    })
  }

  // Text reveal animation (character by character)
  const textReveal = (
    element: string | Element,
    options: {
      delay?: number
      duration?: number
      stagger?: number
    } = {}
  ) => {
    if (import.meta.server || prefersReducedMotion.value) return

    const { delay = 0, duration = 0.05, stagger = 0.02 } = options

    // This requires the text to be split into spans
    gsap.from(`${element} .char`, {
      opacity: 0,
      y: 20,
      duration,
      delay,
      stagger,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    })
  }

  // Refresh ScrollTrigger (useful after content changes)
  const refresh = () => {
    if (import.meta.client) {
      ScrollTrigger.refresh()
    }
  }

  // Kill all ScrollTrigger instances
  const killAll = () => {
    if (import.meta.client) {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }

  return {
    fadeInUp,
    fadeIn,
    scaleIn,
    staggerChildren,
    parallax,
    textReveal,
    refresh,
    killAll,
    prefersReducedMotion,
  }
}
