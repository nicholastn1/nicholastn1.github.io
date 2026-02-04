<script setup lang="ts">
const { locale, t } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const isEnglish = computed(() => locale.value === 'en')

const toggleLanguage = () => {
  const newLocale = isEnglish.value ? 'pt-BR' : 'en'
  // Navigate to the new locale path
  // The i18n module handles cookie setting automatically
  const path = switchLocalePath(newLocale)
  if (path) {
    navigateTo(path)
  }
}
</script>

<template>
  <button
    type="button"
    class="flex h-10 items-center justify-center gap-1.5 rounded-full bg-gray-100 px-3 text-sm font-medium transition-all duration-300 hover:bg-gray-200 hover:scale-105 dark:bg-white/10 dark:hover:bg-white/20"
    :aria-label="t('language.switchTo')"
    @click="toggleLanguage"
  >
    <!-- Language indicator -->
    <span class="text-xs uppercase tracking-wider">
      {{ isEnglish ? 'EN' : 'PT' }}
    </span>
    <!-- Arrow icon -->
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-3.5 w-3.5 transition-transform"
      :class="{ 'rotate-180': isEnglish }"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      stroke-width="2"
    >
      <path stroke-linecap="round" stroke-linejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
    </svg>
  </button>
</template>
