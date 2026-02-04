<script setup lang="ts">
definePageMeta({
  layout: 'blog',
})

const route = useRoute()
const slug = route.params.slug as string[]

// Fetch the post
const { data: post } = await useAsyncData(`post-${slug.join('-')}`, () =>
  queryContent('/posts', ...slug).findOne()
)

// Set page meta
useHead(() => ({
  title: post.value?.title ? `${post.value.title} - Blog` : 'Blog - Nicholas Nogueira',
  meta: [
    { name: 'description', content: post.value?.description || '' },
    // Open Graph
    { property: 'og:title', content: post.value?.title || '' },
    { property: 'og:description', content: post.value?.description || '' },
    { property: 'og:type', content: 'article' },
    { property: 'og:image', content: post.value?.image || '' },
    // Twitter
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: post.value?.title || '' },
    { name: 'twitter:description', content: post.value?.description || '' },
  ],
}))

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
</script>

<template>
  <article v-if="post" class="py-12">
    <div class="container-main max-w-3xl">
      <!-- Header -->
      <header class="mb-8">
        <!-- Category & Date -->
        <div class="mb-4 flex flex-wrap items-center gap-3 text-sm">
          <span v-if="post.category" class="rounded bg-primary/10 px-2 py-0.5 font-medium capitalize text-primary dark:bg-primary-light/20 dark:text-primary-light">
            {{ post.category }}
          </span>
          <span class="text-text-muted">{{ formatDate(post.date) }}</span>
          <span v-if="post.readingTime" class="text-text-muted">
            · {{ post.readingTime }} min de leitura
          </span>
        </div>

        <!-- Title -->
        <h1 class="mb-4 text-3xl font-bold lg:text-4xl">
          {{ post.title }}
        </h1>

        <!-- Description -->
        <p v-if="post.description" class="text-lg text-text-secondary dark:text-text-muted">
          {{ post.description }}
        </p>

        <!-- Tags -->
        <div v-if="post.tags?.length" class="mt-4 flex flex-wrap gap-2">
          <span
            v-for="tag in post.tags"
            :key="tag"
            class="rounded-full bg-gray-100 px-3 py-1 text-xs text-text-secondary dark:bg-white/10 dark:text-text-muted"
          >
            #{{ tag }}
          </span>
        </div>
      </header>

      <!-- Featured Image -->
      <div v-if="post.image" class="mb-8 overflow-hidden rounded-lg">
        <img
          :src="post.image"
          :alt="post.title"
          class="w-full"
        />
      </div>

      <!-- Table of Contents -->
      <BlogTableOfContents v-if="post.body?.toc?.links?.length" :links="post.body.toc.links" />

      <!-- Content -->
      <div class="prose prose-lg dark:prose-invert max-w-none">
        <ContentRenderer :value="post" />
      </div>

      <!-- Footer -->
      <footer class="mt-12 border-t border-gray-100 pt-8 dark:border-white/10">
        <div class="flex items-center justify-between">
          <NuxtLink
            to="/blog"
            class="flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-primary dark:text-text-muted dark:hover:text-primary-light"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Voltar ao Blog
          </NuxtLink>
        </div>
      </footer>
    </div>
  </article>

  <!-- 404 -->
  <div v-else class="container-main py-20 text-center">
    <h1 class="mb-4 text-2xl font-bold">Post não encontrado</h1>
    <p class="mb-8 text-text-muted">O post que você está procurando não existe.</p>
    <NuxtLink to="/blog" class="text-primary hover:underline dark:text-primary-light">
      Voltar ao Blog
    </NuxtLink>
  </div>
</template>

<style>
/* Prose styles for blog content */
.prose {
  @apply text-text-primary dark:text-white;
}

.prose h2 {
  @apply mt-8 mb-4 text-2xl font-bold;
}

.prose h3 {
  @apply mt-6 mb-3 text-xl font-bold;
}

.prose p {
  @apply mb-4 leading-relaxed;
}

.prose a {
  @apply text-primary hover:underline dark:text-primary-light;
}

.prose ul,
.prose ol {
  @apply mb-4 ml-6 list-outside;
}

.prose ul {
  @apply list-disc;
}

.prose ol {
  @apply list-decimal;
}

.prose li {
  @apply mb-2;
}

.prose code {
  @apply rounded bg-gray-100 px-1.5 py-0.5 text-sm dark:bg-white/10;
}

.prose pre {
  @apply mb-4 overflow-x-auto rounded-lg bg-gray-900 p-4 text-sm text-white;
}

.prose pre code {
  @apply bg-transparent p-0;
}

.prose blockquote {
  @apply mb-4 border-l-4 border-primary pl-4 italic text-text-secondary dark:text-text-muted;
}

.prose img {
  @apply mb-4 rounded-lg;
}

.prose hr {
  @apply my-8 border-gray-200 dark:border-white/10;
}
</style>
