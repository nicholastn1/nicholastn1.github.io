<script setup lang="ts">
const colorMode = useColorMode()

const navLinks = [
  { href: '#experiencia', label: 'Experiência' },
  { href: '#formacao', label: 'Formação' },
  { href: '#projetos', label: 'Projetos' },
  { href: '#sobre_mim', label: 'Sobre Mim' },
  { href: '#contato', label: 'Contato' },
]

const toggleColorMode = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}
</script>

<template>
  <header class="py-6">
    <div class="container-main flex flex-wrap items-center justify-between gap-4">
      <!-- Logo -->
      <a href="/" class="flex-shrink-0">
        <img
          src="/images/Nicholas_Marca.svg"
          alt="Nicholas Nogueira"
          class="h-8 w-auto"
        />
      </a>

      <!-- Navigation -->
      <nav class="flex flex-wrap items-center gap-2">
        <a
          v-for="link in navLinks"
          :key="link.href"
          :href="link.href"
          class="rounded px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 dark:hover:bg-white/10"
        >
          {{ link.label }}
        </a>

        <!-- Theme Toggle -->
        <UiThemeToggle @click="toggleColorMode" />
      </nav>
    </div>
  </header>
</template>
