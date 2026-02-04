<script setup lang="ts">
// Blog layout - simpler header, focused on reading
const { t } = useI18n()
const localePath = useLocalePath()
</script>

<template>
  <div class="min-h-screen bg-white dark:bg-background-dark">
    <!-- Simplified Header for Blog -->
    <header class="sticky top-0 z-50 border-b border-gray-100 bg-white/80 backdrop-blur-md dark:border-white/10 dark:bg-background-dark/80">
      <div class="container-main grid grid-cols-3 items-center py-4">
        <!-- Logo / Back to Home -->
        <NuxtLink :to="localePath('/')" class="flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-text-primary dark:text-text-muted dark:hover:text-white">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          {{ t('blog.backToPortfolio') }}
        </NuxtLink>

        <!-- Blog Title -->
        <NuxtLink :to="localePath('/blog')" class="text-center text-lg font-bold">
          {{ t('blog.title') }}
        </NuxtLink>

        <!-- Language & Theme Toggle -->
        <div class="flex items-center justify-end gap-2">
          <UiLanguageSwitcher />
          <UiThemeToggle />
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main>
      <slot />
    </main>

    <!-- Simple Footer -->
    <footer class="border-t border-gray-100 py-8 dark:border-white/10">
      <div class="container-main text-center text-sm text-text-muted">
        <p>&copy; {{ new Date().getFullYear() }} Nicholas Nogueira. {{ t('footer.rights') }}</p>
      </div>
    </footer>
  </div>
</template>
