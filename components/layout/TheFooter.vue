<script setup lang="ts">
import type { SocialLink } from '~/types'

// Fetch personal data from YAML
const { data: personal } = await useAsyncData('personal-footer', () =>
  queryContent('/data/personal').findOne()
)

const currentYear = new Date().getFullYear()

const socialLinks = computed<SocialLink[]>(() => {
  const links = personal.value?.socialLinks || []
  // Filter to only show links with icons (github, linkedin, instagram)
  return links.filter((link: SocialLink) =>
    ['github', 'linkedin', 'instagram'].includes(link.platform)
  )
})

const whatsappUrl = computed(() => {
  const phone = personal.value?.phone?.replace(/\D/g, '') || '5585997041828'
  const message = encodeURIComponent(personal.value?.whatsappMessage || 'Olá!')
  return `https://api.whatsapp.com/send/?phone=${phone}&text=${message}&app_absent=0`
})

const footerText = computed(() => personal.value?.footerText || '')
const email = computed(() => personal.value?.email || '')
const location = computed(() => personal.value?.location || '')
const name = computed(() => personal.value?.name || 'Nicholas Nogueira')

// Icon mapping for social platforms
const socialIcons: Record<string, string> = {
  instagram: '/images/instagram-white.svg',
  linkedin: '/images/linkedin-white.svg',
  github: '/images/github-white.svg',
}
</script>

<template>
  <footer id="contato" class="bg-black py-16 text-white">
    <div class="container-main">
      <div class="grid gap-10 md:grid-cols-2">
        <!-- Contact Info -->
        <div>
          <p class="mb-6 text-lg text-gray-400">
            {{ footerText.replace('whatsapp', '') }}
            <a
              :href="whatsappUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="gradient-text font-semibold hover:underline"
            >
              whatsapp
            </a>
            {{ footerText.includes('whatsapp') ? footerText.split('whatsapp')[1]?.split('.')[0] : '' }}.
          </p>

          <div class="space-y-2">
            <p class="text-2xl font-bold">Contato</p>
            <p class="text-gray-400">{{ email }}</p>
            <p class="text-gray-400">{{ location }}</p>
          </div>
        </div>

        <!-- Social Links & Copyright -->
        <div class="flex flex-col items-start justify-between md:items-end">
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
              <img
                :src="socialIcons[social.platform] || social.icon"
                :alt="social.label"
                class="h-8 w-8"
              />
            </a>
          </div>

          <div class="mt-8 text-sm text-gray-500">
            <p>&copy; {{ currentYear }} {{ name }}. Todos os direitos reservados.</p>
            <p class="mt-1">Full Stack Software Engineer</p>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
