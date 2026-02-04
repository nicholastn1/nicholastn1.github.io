<script setup lang="ts">
const { t, locale } = useI18n()

definePageMeta({
  layout: 'blog',
})

const siteUrl = 'https://nicholastn1.github.io'
const isEnglish = computed(() => locale.value === 'en')

useSeoMeta({
  title: 'Blog - Nicholas Nogueira',
  description: () =>
    isEnglish.value
      ? 'Articles about software development, career, and technology.'
      : 'Artigos sobre desenvolvimento de software, carreira e tecnologia.',
  ogTitle: 'Blog - Nicholas Nogueira',
  ogDescription: () =>
    isEnglish.value
      ? 'Articles about software development, career, and technology.'
      : 'Artigos sobre desenvolvimento de software, carreira e tecnologia.',
  ogType: 'website',
  ogLocale: () => (isEnglish.value ? 'en_US' : 'pt_BR'),
})

useHead({
  htmlAttrs: {
    lang: () => (isEnglish.value ? 'en-US' : 'pt-BR'),
  },
  link: [
    { rel: 'canonical', href: () => (isEnglish.value ? `${siteUrl}/en/blog` : `${siteUrl}/blog`) },
    { rel: 'alternate', hreflang: 'pt-BR', href: `${siteUrl}/blog` },
    { rel: 'alternate', hreflang: 'en-US', href: `${siteUrl}/en/blog` },
    { rel: 'alternate', hreflang: 'x-default', href: `${siteUrl}/blog` },
  ],
})

// Get blog posts path based on locale
const blogPostsPath = computed(() => {
  return locale.value === 'en' ? '/posts/en' : '/posts/pt'
})

// Fetch blog posts for current locale
const { data: posts } = await useAsyncData(`blog-posts-${locale.value}`, () =>
  queryContent(blogPostsPath.value)
    .where({ _draft: { $ne: true } })
    .sort({ date: -1 })
    .find()
)

// Get unique categories
const categories = computed(() => {
  const cats = new Set<string>()
  posts.value?.forEach((post) => {
    if (post.category) cats.add(post.category)
  })
  return Array.from(cats)
})

// Filter state
const selectedCategory = ref<string | null>(null)

const filteredPosts = computed(() => {
  if (!selectedCategory.value) return posts.value
  return posts.value?.filter((post) => post.category === selectedCategory.value)
})
</script>

<template>
  <div class="py-12">
    <div class="container-main">
      <!-- Header -->
      <div class="mb-12 text-center">
        <h1 class="mb-4 text-4xl font-bold">{{ t('blog.title') }}</h1>
        <p class="text-lg text-text-secondary dark:text-text-muted">
          {{ t('blog.subtitle') }}
        </p>
      </div>

      <!-- Category Filter -->
      <div v-if="categories.length" class="mb-8 flex flex-wrap justify-center gap-2">
        <button
          :class="[
            'rounded-full px-4 py-2 text-sm font-medium transition-colors',
            !selectedCategory
              ? 'bg-primary text-white'
              : 'bg-gray-100 text-text-secondary hover:bg-gray-200 dark:bg-white/10 dark:text-text-muted dark:hover:bg-white/20',
          ]"
          @click="selectedCategory = null"
        >
          {{ t('blog.all') }}
        </button>
        <button
          v-for="category in categories"
          :key="category"
          :class="[
            'rounded-full px-4 py-2 text-sm font-medium capitalize transition-colors',
            selectedCategory === category
              ? 'bg-primary text-white'
              : 'bg-gray-100 text-text-secondary hover:bg-gray-200 dark:bg-white/10 dark:text-text-muted dark:hover:bg-white/20',
          ]"
          @click="selectedCategory = category"
        >
          {{ category }}
        </button>
      </div>

      <!-- Posts Grid -->
      <div v-if="filteredPosts?.length" class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <BlogPostCard
          v-for="post in filteredPosts"
          :key="post._path"
          :post="post"
        />
      </div>

      <!-- Empty State -->
      <div v-else class="py-20 text-center">
        <p class="text-lg text-text-muted">
          {{ t('blog.noPostsFound') }}
        </p>
        <p class="mt-2 text-sm text-text-muted">
          {{ t('blog.comingSoon') }}
        </p>
      </div>
    </div>
  </div>
</template>
