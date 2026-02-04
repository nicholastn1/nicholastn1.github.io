<script setup lang="ts">
import type { Skill } from '~/types'

const { t } = useI18n()

// Fetch skills data from YAML
const { data: skillsData } = await useAsyncData('skills', () =>
  queryContent('/data/skills').findOne()
)

const proficient = computed<Skill[]>(() => skillsData.value?.proficient || [])
const intermediate = computed<Skill[]>(() => skillsData.value?.intermediate || [])
const beginner = computed<Skill[]>(() => skillsData.value?.beginner || [])

// Animation refs
const titleRef = ref<HTMLElement>()
const contentRef = ref<HTMLElement>()

const { fadeInUp } = useScrollAnimation()

onMounted(() => {
  if (titleRef.value) {
    fadeInUp(titleRef.value, { y: 30 })
  }
  if (contentRef.value) {
    fadeInUp(contentRef.value, { y: 40, delay: 0.2 })
  }
})

// Category colors for visual grouping (light and dark mode compatible)
const getCategoryColor = (category: string) => {
  const colors: Record<string, string> = {
    backend: 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400',
    frontend: 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400',
    database: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-400',
    devops: 'bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-400',
    cloud: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-500/20 dark:text-cyan-400',
    architecture: 'bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-400',
    methodology: 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400',
    design: 'bg-pink-100 text-pink-700 dark:bg-pink-500/20 dark:text-pink-400',
    documentation: 'bg-gray-100 text-gray-700 dark:bg-gray-500/20 dark:text-gray-400',
  }
  return colors[category] || 'bg-gray-100 text-gray-700 dark:bg-gray-500/20 dark:text-gray-400'
}
</script>

<template>
  <section id="skills" class="relative overflow-hidden bg-background py-20 text-text-primary dark:text-white">
    <!-- Decorative shape -->
    <div
      class="section-shape -left-20 bottom-20 h-48 w-48 rounded-full bg-accent-green blur-3xl md:h-72 md:w-72"
      aria-hidden="true"
    />
    <div class="container-main relative z-10 grid gap-10 lg:grid-cols-[1fr_2fr]">
      <!-- Section Title -->
      <div ref="titleRef">
        <h2 class="section-subtitle text-black/20 dark:text-white/20">{{ t('skills.title') }}</h2>
      </div>

      <!-- Content -->
      <div ref="contentRef" class="space-y-8">
        <!-- Proficient -->
        <div v-if="proficient.length">
          <h3 class="mb-4 flex items-center gap-2 text-lg font-semibold text-text-primary dark:text-white">
            <span class="inline-block h-2 w-2 rounded-full bg-accent-green" />
            {{ t('skills.proficient') }}
          </h3>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="skill in proficient"
              :key="skill.name"
              class="rounded-full px-3 py-1 text-sm font-medium transition-all hover:scale-105"
              :class="getCategoryColor(skill.category)"
            >
              {{ skill.name }}
            </span>
          </div>
        </div>

        <!-- Intermediate -->
        <div v-if="intermediate.length">
          <h3 class="mb-4 flex items-center gap-2 text-lg font-semibold text-text-primary dark:text-white">
            <span class="inline-block h-2 w-2 rounded-full bg-yellow-500" />
            {{ t('skills.intermediate') }}
          </h3>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="skill in intermediate"
              :key="skill.name"
              class="rounded-full px-3 py-1 text-sm font-medium transition-all hover:scale-105"
              :class="getCategoryColor(skill.category)"
            >
              {{ skill.name }}
            </span>
          </div>
        </div>

        <!-- Beginner -->
        <div v-if="beginner.length">
          <h3 class="mb-4 flex items-center gap-2 text-lg font-semibold text-text-primary dark:text-white">
            <span class="inline-block h-2 w-2 rounded-full bg-gray-500" />
            {{ t('skills.beginner') }}
          </h3>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="skill in beginner"
              :key="skill.name"
              class="rounded-full px-3 py-1 text-sm font-medium transition-all hover:scale-105"
              :class="getCategoryColor(skill.category)"
            >
              {{ skill.name }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
