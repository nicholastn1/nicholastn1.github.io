<script setup lang="ts">
// Homepage - Portfolio single page
const { locale } = useI18n()

const siteUrl = 'https://nicholastn1.github.io'
const isEnglish = computed(() => locale.value === 'en')

// Localized SEO meta
useSeoMeta({
  title: 'Nicholas Nogueira - Full Stack Software Engineer',
  description: () =>
    isEnglish.value
      ? 'Portfolio of Nicholas Nogueira, Full Stack Software Engineer with 5+ years of experience in Ruby on Rails, Vue.js, React and more.'
      : 'Portfolio de Nicholas Nogueira, Full Stack Software Engineer com 5+ anos de experiência em Ruby on Rails, Vue.js, React e mais.',
  ogTitle: 'Nicholas Nogueira - Full Stack Software Engineer',
  ogDescription: () =>
    isEnglish.value
      ? 'Software Engineer with experience in Ruby on Rails, Vue.js, React, PostgreSQL, and Docker. Specialized in system optimization and web development.'
      : 'Engenheiro de Software com experiência em Ruby on Rails, Vue.js, React, PostgreSQL e Docker. Especializado em otimização de sistemas e desenvolvimento web.',
  ogImage: `${siteUrl}/images/Perfil.png`,
  ogUrl: () => (isEnglish.value ? `${siteUrl}/en` : siteUrl),
  ogType: 'website',
  ogLocale: () => (isEnglish.value ? 'en_US' : 'pt_BR'),
  twitterCard: 'summary_large_image',
  twitterTitle: 'Nicholas Nogueira - Full Stack Software Engineer',
  twitterDescription: () =>
    isEnglish.value
      ? 'Full Stack Software Engineer with 5+ years of experience.'
      : 'Engenheiro de Software Full Stack com 5+ anos de experiência.',
  twitterImage: `${siteUrl}/images/Perfil.png`,
})

// Localized head with hreflang
useHead({
  htmlAttrs: {
    lang: () => (isEnglish.value ? 'en-US' : 'pt-BR'),
  },
  link: [
    { rel: 'canonical', href: () => (isEnglish.value ? `${siteUrl}/en` : siteUrl) },
    { rel: 'alternate', hreflang: 'pt-BR', href: siteUrl },
    { rel: 'alternate', hreflang: 'en-US', href: `${siteUrl}/en` },
    { rel: 'alternate', hreflang: 'x-default', href: siteUrl },
  ],
})
</script>

<template>
  <div>
    <!-- Hero Section -->
    <SectionsHeroSection />

    <!-- Divider -->
    <div class="section-divider" aria-hidden="true" />

    <!-- Experience Section -->
    <SectionsExperienceSection />

    <!-- Education Section (dark bg - no divider needed) -->
    <SectionsEducationSection />

    <!-- Skills Section -->
    <SectionsSkillsSection />

    <!-- Divider -->
    <div class="section-divider" aria-hidden="true" />

    <!-- Projects Section -->
    <SectionsProjectsSection />

    <!-- Divider -->
    <div class="section-divider" aria-hidden="true" />

    <!-- About Section -->
    <SectionsAboutSection />
  </div>
</template>
