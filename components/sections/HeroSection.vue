<script setup lang="ts">
// Fetch personal data from YAML
const { data: personal } = await useAsyncData('personal-hero', () =>
  queryContent('/data/personal').findOne()
)

// Animation refs
const imageRef = ref<HTMLElement>()
const textRef = ref<HTMLElement>()

const { fadeInUp, scaleIn } = useScrollAnimation()

onMounted(() => {
  // Animate hero section elements
  if (imageRef.value) {
    scaleIn(imageRef.value, { duration: 1, scale: 0.8, delay: 0.2 })
  }
  if (textRef.value) {
    fadeInUp(textRef.value, { duration: 0.8, y: 40, delay: 0.4 })
  }
})
</script>

<template>
  <section class="py-20">
    <div class="container-main grid items-center gap-10 lg:grid-cols-[1fr_2fr]">
      <!-- Profile Image -->
      <div ref="imageRef" class="flex justify-center lg:justify-start">
        <img
          :src="personal?.profileImage || '/images/Perfil.png'"
          :alt="personal?.name || 'Nicholas Nogueira'"
          class="h-64 w-64 rounded-full object-cover shadow-lg lg:h-80 lg:w-80"
        />
      </div>

      <!-- Text Content -->
      <div ref="textRef" class="text-center lg:text-left">
        <h1 class="mb-4 text-3xl font-bold lg:text-5xl">
          Olá, eu sou
          <br />
          <span class="gradient-text">{{ personal?.name || 'Nicholas Nogueira' }}</span>
        </h1>
        <p class="text-xl text-text-secondary dark:text-text-muted lg:text-2xl">
          {{ personal?.title || 'Full Stack Software Engineer' }}
        </p>
      </div>
    </div>
  </section>
</template>
