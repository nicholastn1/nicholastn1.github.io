<script setup lang="ts">
import type { Education, Certification, Volunteering, Language } from '~/types'

const { t, locale } = useI18n()
const { getDataPath } = useLocalizedContent()

// Fetch education data from YAML (locale-aware)
const { data: educationData } = await useAsyncData(`education-${locale.value}`, () =>
  queryContent(getDataPath('/data/education')).findOne()
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
  <section id="formacao" class="relative overflow-hidden bg-background-dark py-20 text-white">
    <!-- Decorative shape -->
    <div
      class="section-shape right-0 top-20 h-64 w-64 rounded-full bg-accent-blue blur-3xl md:h-96 md:w-96"
      aria-hidden="true"
    />
    <div class="container-main relative z-10 grid gap-10 lg:grid-cols-[1fr_2fr]">
      <!-- Section Title -->
      <div ref="titleRef">
        <h2 class="section-subtitle text-black/20">{{ t('education.title') }}</h2>
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
              {{ t('education.activities') }}: {{ edu.activities.join(', ') }}
            </p>
          </div>
        </div>

        <!-- Grid for Certifications, Volunteering, Languages -->
        <div class="grid gap-8 md:grid-cols-3">
          <!-- Certifications -->
          <div v-if="certifications.length">
            <h3 class="mb-4 text-lg font-semibold">{{ t('education.certifications') }}</h3>
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
            <h3 class="mb-4 text-lg font-semibold">{{ t('education.volunteering') }}</h3>
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
            <h3 class="mb-4 text-lg font-semibold">{{ t('education.languages') }}</h3>
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
