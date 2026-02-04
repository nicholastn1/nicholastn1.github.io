<script setup lang="ts">
const navLinks = [
  { href: '#experiencia', label: 'Experiência' },
  { href: '#formacao', label: 'Formação' },
  { href: '#projetos', label: 'Projetos' },
  { href: '#sobre_mim', label: 'Sobre Mim' },
  { href: '#contato', label: 'Contato' },
  { href: '/blog', label: 'Blog' },
]

// Mobile menu state
const isMobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

// Close mobile menu when clicking on a link
const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}
</script>

<template>
  <header class="sticky top-0 z-50 bg-white/80 backdrop-blur-md dark:bg-background-dark/80">
    <div class="container-main flex items-center justify-between py-4">
      <!-- Logo -->
      <a href="/" class="flex-shrink-0">
        <img
          src="/images/Nicholas_Marca.svg"
          alt="Nicholas Nogueira"
          class="h-8 w-auto dark:brightness-0 dark:invert"
        />
      </a>

      <!-- Desktop Navigation -->
      <nav class="hidden items-center gap-1 md:flex">
        <a
          v-for="link in navLinks"
          :key="link.href"
          :href="link.href"
          class="rounded-lg px-4 py-2 text-sm font-medium text-text-secondary transition-colors hover:bg-gray-100 hover:text-text-primary dark:text-text-muted dark:hover:bg-white/10 dark:hover:text-white"
        >
          {{ link.label }}
        </a>

        <!-- Theme Toggle -->
        <UiThemeToggle class="ml-2" />
      </nav>

      <!-- Mobile Menu Button -->
      <div class="flex items-center gap-2 md:hidden">
        <UiThemeToggle />
        <button
          type="button"
          class="flex h-10 w-10 items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-white/10"
          aria-label="Menu"
          @click="toggleMobileMenu"
        >
          <svg
            v-if="!isMobileMenuOpen"
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile Navigation -->
    <Transition name="mobile-menu">
      <nav
        v-if="isMobileMenuOpen"
        class="border-t border-gray-100 bg-white px-4 py-4 dark:border-white/10 dark:bg-background-dark md:hidden"
      >
        <div class="flex flex-col gap-1">
          <a
            v-for="link in navLinks"
            :key="link.href"
            :href="link.href"
            class="rounded-lg px-4 py-3 text-sm font-medium text-text-secondary transition-colors hover:bg-gray-100 hover:text-text-primary dark:text-text-muted dark:hover:bg-white/10 dark:hover:text-white"
            @click="closeMobileMenu"
          >
            {{ link.label }}
          </a>
        </div>
      </nav>
    </Transition>
  </header>
</template>

<style scoped>
.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: all 0.2s ease;
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
