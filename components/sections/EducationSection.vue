<script setup lang="ts">
import type { Education, Certification, Volunteering, Language } from '~/types'

// Fetch education data from YAML
const { data: educationData } = await useAsyncData('education', () =>
  queryContent('/data/education').findOne()
)

const summary = computed(() => educationData.value?.summary || '')
const education = computed<Education[]>(() => educationData.value?.education || [])
const certifications = computed<Certification[]>(() => educationData.value?.certifications || [])
const volunteering = computed<Volunteering[]>(() => educationData.value?.volunteering || [])
const languages = computed<Language[]>(() => educationData.value?.languages || [])

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
</script>

<template>
  <section id="formacao" class="bg-background-dark py-20 text-white">
    <div class="container-main grid gap-10 lg:grid-cols-[1fr_2fr]">
      <!-- Section Title -->
      <div ref="titleRef">
        <h2 class="section-subtitle text-black/20">Formação</h2>
      </div>

      <!-- Content -->
      <div ref="contentRef">
        <!-- Summary -->
        <p
          v-if="summary"
          class="mb-8 text-lg text-text-muted"
          v-html="summary.replace(/\*\*(.*?)\*\*/g, '<strong class=\'text-white\'>$1</strong>')"
        />

        <!-- Education -->
        <div v-if="education.length" class="mb-10">
          <div v-for="edu in education" :key="edu.id" class="mb-6">
            <div class="flex items-start justify-between gap-4">
              <div>
                <span class="inline-block rounded bg-accent-green/20 px-2 py-0.5 text-xs font-medium text-accent-green">
                  {{ edu.degree }}
                </span>
                <h3 class="mt-2 text-xl font-bold">{{ edu.course }}</h3>
                <p class="text-text-muted">{{ edu.institution }}</p>
              </div>
              <span class="whitespace-nowrap text-sm text-text-muted">
                {{ edu.period.start }} - {{ edu.period.end }}
              </span>
            </div>
            <p v-if="edu.activities?.length" class="mt-2 text-sm text-text-muted">
              Atividades: {{ edu.activities.join(', ') }}
            </p>
          </div>
        </div>

        <!-- Grid for Certifications, Volunteering, Languages -->
        <div class="grid gap-8 md:grid-cols-3">
          <!-- Certifications -->
          <div v-if="certifications.length">
            <h3 class="mb-4 text-lg font-semibold">Certificações & Treinamentos</h3>
            <ul class="space-y-3">
              <li
                v-for="cert in certifications"
                :key="cert.id"
                class="flex items-start justify-between gap-2 text-sm"
              >
                <span class="text-text-muted">
                  {{ cert.name }}
                  <span class="text-xs text-text-muted/70">({{ cert.provider }})</span>
                </span>
                <span class="whitespace-nowrap text-xs text-text-muted/70">{{ cert.date }}</span>
              </li>
            </ul>
          </div>

          <!-- Volunteering -->
          <div v-if="volunteering.length">
            <h3 class="mb-4 text-lg font-semibold">Voluntariado</h3>
            <ul class="space-y-3">
              <li
                v-for="vol in volunteering"
                :key="vol.id"
                class="text-sm"
              >
                <p class="text-text-muted">{{ vol.role }}</p>
                <p class="text-xs text-text-muted/70">
                  {{ vol.organization }} · {{ vol.period.start }} - {{ vol.period.end }}
                </p>
              </li>
            </ul>
          </div>

          <!-- Languages -->
          <div v-if="languages.length">
            <h3 class="mb-4 text-lg font-semibold">Idiomas</h3>
            <ul class="space-y-3">
              <li
                v-for="lang in languages"
                :key="lang.name"
                class="flex items-center justify-between text-sm"
              >
                <span class="text-text-muted">{{ lang.name }}</span>
                <span class="text-xs text-text-muted/70">{{ lang.level }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
