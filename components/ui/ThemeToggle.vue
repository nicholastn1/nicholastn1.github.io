<script setup lang="ts">
const { t } = useI18n()
const colorMode = useColorMode()

const isDark = computed(() => colorMode.value === 'dark')

const toggleColorMode = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}
</script>

<template>
  <button
    type="button"
    class="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 transition-all duration-300 hover:bg-gray-200 hover:scale-110 dark:bg-white/10 dark:hover:bg-white/20"
    :aria-label="isDark ? t('theme.lightMode') : t('theme.darkMode')"
    @click="toggleColorMode"
  >
    <!-- Sun icon (shown in dark mode) -->
    <Transition name="theme-icon" mode="out-in">
      <svg
        v-if="isDark"
        key="sun"
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5 text-yellow-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>

      <!-- Moon icon (shown in light mode) -->
      <svg
        v-else
        key="moon"
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5 text-gray-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
        />
      </svg>
    </Transition>
  </button>
</template>

<style scoped>
.theme-icon-enter-active,
.theme-icon-leave-active {
  transition: all 0.2s ease;
}

.theme-icon-enter-from {
  opacity: 0;
  transform: rotate(-90deg) scale(0.8);
}

.theme-icon-leave-to {
  opacity: 0;
  transform: rotate(90deg) scale(0.8);
}
</style>
