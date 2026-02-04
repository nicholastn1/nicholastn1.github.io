<script setup lang="ts">
import type { Experience } from '~/types'

// Fetch experiences data from YAML
const { data: experiencesData } = await useAsyncData('experiences', () =>
  queryContent('/data/experiences').findOne()
)

const experiences = computed<Experience[]>(() => experiencesData.value?.experiences || [])
const summary = computed(() => experiencesData.value?.summary || '')

// Animation refs
const titleRef = ref<HTMLElement>()
const summaryRef = ref<HTMLElement>()
const cardsRef = ref<HTMLElement>()

const { fadeInUp, staggerChildren } = useScrollAnimation()

onMounted(() => {
  if (titleRef.value) {
    fadeInUp(titleRef.value, { y: 30 })
  }
  if (summaryRef.value) {
    fadeInUp(summaryRef.value, { y: 30, delay: 0.1 })
  }
  if (cardsRef.value) {
    staggerChildren(cardsRef.value, '.experience-card', { stagger: 0.15, y: 40 })
  }
})
</script>

<template>
  <section id="experiencia" class="py-20">
    <div class="container-main grid gap-10 lg:grid-cols-[1fr_2fr]">
      <!-- Section Title -->
      <div ref="titleRef">
        <h2 class="section-subtitle text-gray-200 dark:text-gray-800">
          Experiência
        </h2>
      </div>

      <!-- Content -->
      <div>
        <!-- Summary -->
        <p
          v-if="summary"
          ref="summaryRef"
          class="mb-8 text-lg text-text-secondary dark:text-text-muted"
          v-html="summary.replace(/\*\*(.*?)\*\*/g, '<strong class=\'text-text-primary dark:text-white\'>$1</strong>')"
        />

        <!-- Experience Cards -->
        <div ref="cardsRef" class="space-y-6">
          <UiCard
            v-for="exp in experiences"
            :key="exp.id"
            decorated
            class="experience-card relative"
          >
            <!-- Period -->
            <span class="mb-2 inline-block text-sm font-medium text-accent-green">
              {{ exp.period.start }} - {{ exp.period.end }}
            </span>

            <!-- Company & Role -->
            <h3 class="text-xl font-bold">
              <a
                v-if="exp.companyUrl"
                :href="exp.companyUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="hover:text-primary dark:hover:text-primary-light"
              >
                {{ exp.company }}
              </a>
              <span v-else>{{ exp.company }}</span>
            </h3>
            <p class="mb-3 text-text-secondary dark:text-text-muted">
              {{ exp.role }}
            </p>

            <!-- Description -->
            <p class="mb-4 text-sm text-text-secondary dark:text-text-muted">
              {{ exp.description }}
            </p>

            <!-- Achievements -->
            <ul v-if="exp.achievements?.length" class="mb-4 space-y-2">
              <li
                v-for="(achievement, idx) in exp.achievements"
                :key="idx"
                class="flex items-start gap-2 text-sm text-text-secondary dark:text-text-muted"
              >
                <span class="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent-green" />
                {{ achievement }}
              </li>
            </ul>

            <!-- Technologies -->
            <div v-if="exp.technologies?.length" class="flex flex-wrap gap-2">
              <UiSkillTag v-for="tech in exp.technologies" :key="tech">
                {{ tech }}
              </UiSkillTag>
            </div>
          </UiCard>
        </div>
      </div>
    </div>
  </section>
</template>
