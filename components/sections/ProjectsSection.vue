<script setup lang="ts">
import type { Project } from '~/types'

const { t, locale } = useI18n()
const { getDataPath } = useLocalizedContent()

// Fetch projects data from YAML (locale-aware)
const { data: projectsData } = await useAsyncData(`projects-${locale.value}`, () =>
  queryContent(getDataPath('/data/projects')).findOne()
)

const projects = computed<Project[]>(() => projectsData.value?.projects || [])

// Animation refs
const titleRef = ref<HTMLElement>()
const cardsRef = ref<HTMLElement>()

const { fadeInUp, staggerChildren } = useScrollAnimation()

onMounted(() => {
  if (titleRef.value) {
    fadeInUp(titleRef.value, { y: 30 })
  }
  if (cardsRef.value) {
    staggerChildren(cardsRef.value, '.project-card', { stagger: 0.15, y: 40 })
  }
})
</script>

<template>
  <section id="projetos" class="py-20">
    <div class="container-main grid gap-10 lg:grid-cols-[1fr_2fr]">
      <!-- Section Title -->
      <div ref="titleRef">
        <h2 class="section-subtitle text-gray-200 dark:text-gray-800">
          {{ t('projects.title') }}
        </h2>
      </div>

      <!-- Content -->
      <div ref="cardsRef" class="space-y-6">
        <UiCard
          v-for="project in projects"
          :key="project.id"
          decorated
          hover-enhanced
          tilt
          class="project-card"
        >
          <!-- Header -->
          <div class="mb-3 flex items-start justify-between gap-4">
            <h3 class="text-xl font-bold">
              <a
                v-if="project.url"
                :href="project.url"
                target="_blank"
                rel="noopener noreferrer"
                class="hover:text-primary dark:hover:text-primary-light"
              >
                {{ project.name }}
              </a>
              <span v-else>{{ project.name }}</span>
            </h3>
            <span class="whitespace-nowrap text-sm text-accent-green">
              {{ project.period.start }} - {{ project.period.end }}
            </span>
          </div>

          <!-- Description -->
          <p class="mb-4 text-sm text-text-secondary dark:text-text-muted">
            {{ project.description }}
          </p>

          <!-- Links -->
          <div v-if="project.github || project.url" class="mb-4 flex gap-4">
            <a
              v-if="project.github"
              :href="project.github"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center gap-1 text-sm text-text-secondary hover:text-primary dark:text-text-muted dark:hover:text-primary-light"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub
            </a>
            <a
              v-if="project.url"
              :href="project.url"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center gap-1 text-sm text-text-secondary hover:text-primary dark:text-text-muted dark:hover:text-primary-light"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              {{ t('projects.viewProject') }}
            </a>
          </div>

          <!-- Technologies -->
          <div v-if="project.technologies?.length" class="flex flex-wrap gap-2">
            <UiSkillTag v-for="tech in project.technologies" :key="tech">
              {{ tech }}
            </UiSkillTag>
          </div>
        </UiCard>
      </div>
    </div>
  </section>
</template>
