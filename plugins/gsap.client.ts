// plugins/gsap.client.ts
// Register GSAP and ScrollTrigger globally (client-side only)

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default defineNuxtPlugin(() => {
  // Register ScrollTrigger plugin
  gsap.registerPlugin(ScrollTrigger)

  // Configure ScrollTrigger defaults
  ScrollTrigger.defaults({
    toggleActions: 'play none none none',
    markers: false, // Set to true for debugging
  })

  // Provide gsap instance globally if needed
  return {
    provide: {
      gsap,
      ScrollTrigger,
    },
  }
})
