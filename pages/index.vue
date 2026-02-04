<script setup lang="ts">
// Homepage - Portfolio single page
useSeoMeta({
  title: 'Nicholas Nogueira - Full Stack Software Engineer',
  description: 'Portfolio de Nicholas Nogueira, Full Stack Software Engineer com 5+ anos de experiência em Ruby on Rails, Vue.js, React e mais.',
  ogTitle: 'Nicholas Nogueira - Full Stack Software Engineer',
  ogDescription: 'Engenheiro de Software com experiência em Ruby on Rails, Vue.js, React, PostgreSQL e Docker. Especializado em otimização de sistemas e desenvolvimento web.',
  ogImage: 'https://nicholastn1.github.io/images/Perfil.png',
  ogUrl: 'https://nicholastn1.github.io',
  ogType: 'website',
  ogLocale: 'pt_BR',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Nicholas Nogueira - Full Stack Software Engineer',
  twitterDescription: 'Engenheiro de Software Full Stack com 5+ anos de experiência.',
  twitterImage: 'https://nicholastn1.github.io/images/Perfil.png',
})

// Canonical URL
useHead({
  link: [
    { rel: 'canonical', href: 'https://nicholastn1.github.io' },
  ],
})
</script>

<template>
  <div>
    <!-- Hero Section -->
    <SectionsHeroSection />

    <!-- Experience Section -->
    <SectionsExperienceSection />

    <!-- Education Section -->
    <SectionsEducationSection />

    <!-- Projects Section -->
    <SectionsProjectsSection />

    <!-- About Section -->
    <SectionsAboutSection />
  </div>
</template>
