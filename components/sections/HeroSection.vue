<script setup lang="ts">
const { t, locale } = useI18n()
const { getDataPath } = useLocalizedContent()

// Fetch personal data from YAML (locale-aware)
const { data: personal } = await useAsyncData(`personal-hero-${locale.value}`, () =>
  queryContent(getDataPath('/data/personal')).findOne()
)

// Animation refs
const imageContainerRef = ref<HTMLElement>()
const textRef = ref<HTMLElement>()
const shapeRef = ref<HTMLElement>()

const { fadeInUp, scaleIn, fadeIn } = useScrollAnimation()
const { tilt } = useTiltEffect()

// Tilt effect instance
let tiltInstance: { setup: () => void; destroy: () => void } | null = null

onMounted(() => {
  // Animate hero section elements
  if (shapeRef.value) {
    scaleIn(shapeRef.value, { duration: 1.2, scale: 0.6, delay: 0 })
  }
  if (imageContainerRef.value) {
    fadeIn(imageContainerRef.value, { duration: 0.8, delay: 0.3 })

    // Setup tilt effect on the image container
    tiltInstance = tilt(imageContainerRef, {
      maxTilt: 8,
      scale: 1.02,
      speed: 400,
      glare: false,
    })
    tiltInstance.setup()
  }
  if (textRef.value) {
    fadeInUp(textRef.value, { duration: 0.8, y: 40, delay: 0.5 })
  }
})

onUnmounted(() => {
  // Cleanup tilt effect
  if (tiltInstance) {
    tiltInstance.destroy()
  }
})
</script>

<template>
  <section class="overflow-hidden py-20">
    <div class="container-main grid items-center gap-10 lg:grid-cols-[1fr_2fr]">
      <!-- Profile Image with Geometric Shape -->
      <div class="relative mx-auto flex justify-center lg:mx-0 lg:justify-start">
        <!-- Electric Blue Shape Behind Photo -->
        <div
          ref="shapeRef"
          class="hero-shape glow-blue absolute -rotate-6 opacity-90"
          :class="[
            '-left-3 -top-3 h-[calc(100%+1.5rem)] w-[calc(100%+1.5rem)]',
            'md:-left-4 md:-top-4 md:h-[calc(100%+2rem)] md:w-[calc(100%+2rem)]'
          ]"
          aria-hidden="true"
        />

        <!-- Image Container with Tilt Effect -->
        <div
          ref="imageContainerRef"
          class="tilt-container relative z-10"
        >
          <img
            :src="personal?.profileImage || '/images/Perfil.png'"
            :alt="personal?.name || 'Nicholas Nogueira'"
            class="w-full max-w-[280px] object-cover shadow-2xl xs:max-w-xs lg:max-w-sm"
          >
        </div>
      </div>

      <!-- Text Content -->
      <div ref="textRef" class="text-center lg:text-left">
        <h1 class="mb-4 text-3xl font-bold lg:text-5xl">
          {{ t('hero.greeting') }}
          <br >
          <span class="gradient-text">{{ personal?.name || 'Nicholas Nogueira' }}</span>
        </h1>
        <p class="text-xl text-text-secondary dark:text-text-muted lg:text-2xl">
          {{ personal?.title || 'Full Stack Software Engineer' }}
        </p>
      </div>
    </div>
  </section>
</template>
