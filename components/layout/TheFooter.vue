<script setup lang="ts">
const currentYear = new Date().getFullYear()

const socialLinks = [
  {
    platform: 'instagram',
    url: 'https://www.instagram.com/nicholastn_/',
    label: 'Instagram',
    icon: '/images/instagram-white.svg',
  },
  {
    platform: 'linkedin',
    url: 'https://www.linkedin.com/in/nicholastn/',
    label: 'LinkedIn',
    icon: '/images/linkedin-white.svg',
  },
  {
    platform: 'github',
    url: 'https://github.com/nicholastn1',
    label: 'GitHub',
    icon: '/images/github-white.svg',
  },
]
</script>

<template>
  <footer id="contato" class="bg-black py-16 text-white">
    <div class="container-main">
      <div class="grid gap-10 md:grid-cols-2">
        <!-- Contact Info -->
        <div>
          <p class="mb-4 text-lg text-gray-400">
            Interessado em trabalharmos juntos? Entre em
            <a
              href="https://wa.me/5585996016568?text=Ol%C3%A1%21+Estou+entrando+em+contato+atrav%C3%A9s+do+seu+portfolio%21"
              target="_blank"
              rel="noopener noreferrer"
              class="gradient-text font-semibold hover:underline"
            >
              contato
            </a>
            comigo!
          </p>

          <div class="space-y-2">
            <p class="text-2xl font-bold">Contato</p>
            <p class="text-gray-400">nicholastimbo2022@gmail.com</p>
            <p class="text-gray-400">Fortaleza, Ceará, Brasil</p>
          </div>
        </div>

        <!-- Social Links -->
        <div class="flex flex-col items-end justify-between">
          <div class="flex gap-6">
            <a
              v-for="social in socialLinks"
              :key="social.platform"
              :href="social.url"
              target="_blank"
              rel="noopener noreferrer"
              :aria-label="social.label"
              class="transition-opacity hover:opacity-70"
            >
              <img :src="social.icon" :alt="social.label" class="h-8 w-8" />
            </a>
          </div>

          <p class="mt-8 text-sm text-gray-500">
            &copy; {{ currentYear }} Nicholas Nogueira. Todos os direitos
            reservados.
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>
