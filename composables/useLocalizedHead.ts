// composables/useLocalizedHead.ts
// Composable for locale-aware SEO meta tags

export const useLocalizedHead = () => {
  const { locale } = useI18n()
  const route = useRoute()

  const siteUrl = 'https://nicholastn1.github.io'

  // Default meta content for each locale
  const defaultMeta = computed(() => {
    const isEnglish = locale.value === 'en'

    return {
      title: 'Nicholas Nogueira - Software Engineer',
      description: isEnglish
        ? 'Portfolio of Nicholas Nogueira, Full Stack Software Engineer with 5+ years of experience in Ruby on Rails, Vue.js, React and more.'
        : 'Portfolio de Nicholas Nogueira, Full Stack Software Engineer com 5+ anos de experiência em Ruby on Rails, Vue.js, React e mais.',
      ogLocale: isEnglish ? 'en_US' : 'pt_BR',
    }
  })

  // Get current page URL
  const currentUrl = computed(() => {
    return `${siteUrl}${route.fullPath}`
  })

  // Get alternate language URL
  const alternateUrl = computed(() => {
    const isEnglish = locale.value === 'en'
    const path = route.fullPath

    if (isEnglish) {
      // Remove /en prefix for Portuguese version
      return `${siteUrl}${path.replace(/^\/en/, '') || '/'}`
    } else {
      // Add /en prefix for English version
      return `${siteUrl}/en${path}`
    }
  })

  // Set localized head
  const setLocalizedHead = (options?: {
    title?: string
    description?: string
    image?: string
  }) => {
    const title = options?.title || defaultMeta.value.title
    const description = options?.description || defaultMeta.value.description
    const image = options?.image

    useHead({
      htmlAttrs: {
        lang: locale.value === 'en' ? 'en-US' : 'pt-BR',
      },
      title,
      meta: [
        { name: 'description', content: description },
        // Open Graph
        { property: 'og:title', content: title },
        { property: 'og:description', content: description },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: currentUrl.value },
        { property: 'og:locale', content: defaultMeta.value.ogLocale },
        ...(image ? [{ property: 'og:image', content: image }] : []),
        // Twitter
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: title },
        { name: 'twitter:description', content: description },
        ...(image ? [{ name: 'twitter:image', content: image }] : []),
      ],
      link: [
        // Alternate language links
        {
          rel: 'alternate',
          hreflang: locale.value === 'en' ? 'pt-BR' : 'en-US',
          href: alternateUrl.value,
        },
        {
          rel: 'alternate',
          hreflang: locale.value === 'en' ? 'en-US' : 'pt-BR',
          href: currentUrl.value,
        },
        {
          rel: 'alternate',
          hreflang: 'x-default',
          href: `${siteUrl}/`,
        },
      ],
    })
  }

  return {
    defaultMeta,
    currentUrl,
    alternateUrl,
    setLocalizedHead,
  }
}
