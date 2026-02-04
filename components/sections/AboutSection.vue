<script setup lang="ts">
const { t, locale } = useI18n()
const { getDataPath } = useLocalizedContent()

// Fetch personal data from YAML (locale-aware)
const { data: personal } = await useAsyncData(`personal-about-${locale.value}`, () =>
  queryContent(getDataPath('/data/personal')).findOne()
)

const bio = computed<string[]>(() => personal.value?.bio || [])

// Company links for highlighting in the bio
const companyLinks: Record<string, { url: string; class: string }> = {
  'Intersol': { url: 'https://www.linkedin.com/company/intersol---solu%C3%A7%C3%B5es-internet/', class: 'text-primary dark:text-primary-light hover:underline' },
  'FitBank': { url: 'https://fitbank.com.br', class: 'text-primary dark:text-primary-light hover:underline' },
  'inChurch': { url: 'https://inchurch.com.br', class: 'text-primary dark:text-primary-light hover:underline' },
  'Gocase': { url: 'https://www.gocase.com.br', class: 'text-accent-green hover:underline' },
}

// Process bio text to add links and formatting
const processedBio = computed(() => {
  return bio.value.map((paragraph) => {
    let processed = paragraph
    // Add links for company names
    Object.entries(companyLinks).forEach(([company, { url, class: className }]) => {
      const regex = new RegExp(`(${company})`, 'g')
      if (url !== '#') {
        processed = processed.replace(
          regex,
          `<a href="${url}" target="_blank" rel="noopener noreferrer" class="${className}">$1</a>`
        )
      }
    })
    return processed
  })
})

// Animation refs
const titleRef = ref<HTMLElement>()
const contentRef = ref<HTMLElement>()
const imageContainerRef = ref<HTMLElement>()
const shapeRef = ref<HTMLElement>()

const { fadeInUp, staggerChildren, scaleIn, fadeIn } = useScrollAnimation()
const { tilt } = useTiltEffect()

// Tilt effect instance
let tiltInstance: { setup: () => void; destroy: () => void } | null = null

onMounted(() => {
  if (titleRef.value) {
    fadeInUp(titleRef.value, { y: 30 })
  }
  if (contentRef.value) {
    staggerChildren(contentRef.value, '.bio-paragraph', { stagger: 0.1, y: 30 })
  }
  if (shapeRef.value) {
    scaleIn(shapeRef.value, { duration: 1.2, scale: 0.6, delay: 0.2 })
  }
  if (imageContainerRef.value) {
    fadeIn(imageContainerRef.value, { duration: 0.8, delay: 0.4 })

    // Setup tilt effect on the image container
    tiltInstance = tilt(imageContainerRef, {
      maxTilt: 8,
      scale: 1.02,
      speed: 400,
      glare: false,
    })
    tiltInstance.setup()
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
  <section id="sobre_mim" class="relative overflow-hidden py-20">
    <!-- Decorative shape -->
    <div
      class="section-shape -right-10 top-1/2 h-40 w-40 -translate-y-1/2 rounded-full bg-primary blur-3xl md:h-64 md:w-64"
      aria-hidden="true"
    />
    <div class="container-main relative z-10 grid gap-10 lg:grid-cols-[1fr_2fr]">
      <!-- Left Column: Title + Profile Image -->
      <div ref="titleRef" class="flex flex-col gap-8">
        <h2 class="section-subtitle text-gray-200 dark:text-gray-800">
          {{ t('about.title') }}
        </h2>

        <!-- Profile Image with Geometric Shape -->
        <div class="relative mx-auto w-fit lg:mx-0">
          <!-- Electric Blue Shape Behind Photo -->
          <div
            ref="shapeRef"
            class="hero-shape glow-blue absolute -rotate-3 opacity-80"
            :class="[
              'left-2 top-2 h-[calc(100%-0.5rem)] w-[calc(100%-0.5rem)]',
              'md:left-3 md:top-3 md:h-[calc(100%-0.75rem)] md:w-[calc(100%-0.75rem)]'
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
              class="w-full max-w-[200px] rounded object-cover shadow-2xl sm:max-w-[220px] lg:max-w-[250px]"
            >
          </div>
        </div>
      </div>

      <!-- Right Column: Content -->
      <div ref="contentRef">
        <h3 class="bio-paragraph mb-6 text-2xl font-bold">
          {{ t('about.tagline') }}
          <span class="inline-block animate-pulse">⚡</span>
        </h3>

        <div class="space-y-4">
          <p
            v-for="(paragraph, idx) in processedBio"
            :key="idx"
            class="bio-paragraph text-lg leading-relaxed text-text-secondary dark:text-text-muted"
            v-html="paragraph"
          />
        </div>
      </div>
    </div>
  </section>
</template>
