<script setup lang="ts">
import type { SocialLink } from '~/types'

const { t, locale } = useI18n()
const { getDataPath } = useLocalizedContent()

// Fetch personal data from YAML (locale-aware)
const { data: personal } = await useAsyncData(`personal-hero-${locale.value}`, () =>
  queryContent(getDataPath('/data/personal')).findOne()
)

// Social links for display (filtered to main platforms)
const socialLinks = computed<SocialLink[]>(() => {
  const links = personal.value?.socialLinks || []
  return links.filter((link: SocialLink) =>
    ['github', 'linkedin', 'instagram'].includes(link.platform)
  )
})

// WhatsApp URL for contact CTA
const whatsappUrl = computed(() => {
  const phone = personal.value?.phone?.replace(/\D/g, '') || '5585997041828'
  const message = encodeURIComponent(personal.value?.whatsappMessage || 'Olá!')
  return `https://api.whatsapp.com/send/?phone=${phone}&text=${message}&app_absent=0`
})

// Icon mapping for social platforms
const socialIcons: Record<string, { light: string; dark: string }> = {
  github: { light: '/images/github.svg', dark: '/images/github-white.svg' },
  linkedin: { light: '/images/linkedin.svg', dark: '/images/linkedin-white.svg' },
  instagram: { light: '/images/instagram.svg', dark: '/images/instagram-white.svg' },
}

// Get appropriate icon based on color mode
const colorMode = useColorMode()
const getSocialIcon = (platform: string) => {
  const icons = socialIcons[platform]
  if (!icons) return ''
  return colorMode.value === 'dark' ? icons.dark : icons.light
}

// Animation refs
const textRef = ref<HTMLElement>()
const socialRef = ref<HTMLElement>()
const ctaRef = ref<HTMLElement>()

const { fadeInUp, fadeIn } = useScrollAnimation()

onMounted(() => {
  if (textRef.value) {
    fadeInUp(textRef.value, { duration: 0.8, y: 40, delay: 0.2 })
  }
  if (socialRef.value) {
    fadeIn(socialRef.value, { duration: 0.6, delay: 0.6 })
  }
  if (ctaRef.value) {
    fadeInUp(ctaRef.value, { duration: 0.6, y: 20, delay: 0.8 })
  }
})
</script>

<template>
  <section class="hero-section relative min-h-[90vh] overflow-hidden py-16 md:py-20 lg:py-24">
    <!-- Grid Background with Mouse Glow -->
    <UiGridBackground
      :grid-size="40"
      :grid-opacity="0.08"
      :glow-intensity="0.5"
      :glow-size="500"
    />

    <!-- Content -->
    <div class="container-main relative z-10 flex min-h-[70vh] items-center">
      <div class="grid w-full gap-10 lg:grid-cols-2 lg:gap-16">
        <!-- Left: Text Content -->
        <div class="flex flex-col justify-center text-center lg:text-left">
          <!-- Greeting & Name -->
          <div ref="textRef">
            <p class="mb-2 font-mono text-lg text-accent-green">
              &lt;{{ t('hero.greeting') }}&gt;
            </p>
            <h1 class="mb-3 text-3xl font-bold text-text-primary dark:text-white md:text-4xl lg:text-5xl">
              {{ t('hero.im') }}
              <span class="gradient-text">{{ personal?.name || 'Nicholas Nogueira' }}</span>
            </h1>
            <p class="mb-6 text-lg text-text-secondary dark:text-text-muted md:text-xl lg:text-2xl">
              {{ personal?.title || 'Full Stack Software Engineer' }}
            </p>
          </div>

          <!-- Social Links -->
          <div ref="socialRef" class="mb-8 flex justify-center gap-5 lg:justify-start">
            <a
              v-for="social in socialLinks"
              :key="social.platform"
              :href="social.url"
              target="_blank"
              rel="noopener noreferrer"
              :aria-label="social.label"
              class="social-icon-link transition-all duration-200 hover:scale-110 hover:opacity-80"
            >
              <img
                :src="getSocialIcon(social.platform)"
                :alt="social.label"
                class="h-6 w-6 md:h-7 md:w-7"
              >
            </a>
          </div>

          <!-- CTA UiButtons -->
          <div ref="ctaRef" class="flex flex-wrap justify-center gap-4 lg:justify-start">
            <UiButton
              variant="secondary"
              size="md"
              :href="whatsappUrl"
              :external="true"
            >
              <span class="mr-2">💬</span>
              {{ t('hero.contact') }}
            </UiButton>
            <UiButton
              variant="outline"
              size="md"
              href="#skills"
            >
              <span class="mr-2">📄</span>
              {{ t('hero.viewSkills') }}
            </UiButton>
          </div>
        </div>

        <!-- Right: Code Snippet -->
        <div class="flex items-center justify-center lg:justify-end">
          <UiHeroCodeSnippet initial-tab="ruby" />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-section {
  background: linear-gradient(
    180deg,
    transparent 0%,
    rgba(59, 130, 246, 0.02) 50%,
    transparent 100%
  );
}

.dark .hero-section {
  background: linear-gradient(
    180deg,
    transparent 0%,
    rgba(59, 130, 246, 0.05) 50%,
    transparent 100%
  );
}

/* Social icon hover glow in dark mode */
.dark .social-icon-link:hover {
  filter: drop-shadow(0 0 8px rgba(59, 130, 246, 0.5));
}
</style>
