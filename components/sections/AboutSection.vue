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

const { fadeInUp, staggerChildren } = useScrollAnimation()

onMounted(() => {
  if (titleRef.value) {
    fadeInUp(titleRef.value, { y: 30 })
  }
  if (contentRef.value) {
    staggerChildren(contentRef.value, '.bio-paragraph', { stagger: 0.1, y: 30 })
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
      <!-- Section Title -->
      <div ref="titleRef">
        <h2 class="section-subtitle text-gray-200 dark:text-gray-800">
          {{ t('about.title') }}
        </h2>
      </div>

      <!-- Content -->
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
