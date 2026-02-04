<script setup lang="ts">
import type { ParsedContent } from '@nuxt/content'

defineProps<{
  post: ParsedContent
}>()

const formatDate = (date?: string) => {
  if (!date) return ''
  return new Date(date).toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}
</script>

<template>
  <article class="group overflow-hidden rounded-lg bg-gray-50 transition-all hover:shadow-lg dark:bg-white/5">
    <!-- Image -->
    <div v-if="post.image" class="aspect-video overflow-hidden">
      <img
        :src="String(post.image)"
        :alt="post.title || 'Post'"
        class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
    </div>
    <div v-else class="aspect-video bg-gradient-primary" />

    <!-- Content -->
    <div class="p-6">
      <!-- Category & Date -->
      <div class="mb-3 flex items-center gap-3 text-sm">
        <span v-if="post.category" class="rounded bg-primary/10 px-2 py-0.5 font-medium capitalize text-primary dark:bg-primary-light/20 dark:text-primary-light">
          {{ post.category }}
        </span>
        <span v-if="post.date" class="text-text-muted">{{ formatDate(String(post.date)) }}</span>
        <span v-if="post.readingTime" class="text-text-muted">
          · {{ post.readingTime }} min de leitura
        </span>
      </div>

      <!-- Title -->
      <h2 class="mb-2 text-xl font-bold transition-colors group-hover:text-primary dark:group-hover:text-primary-light">
        <NuxtLink :to="post._path || '#'">
          {{ post.title || 'Sem título' }}
        </NuxtLink>
      </h2>

      <!-- Description -->
      <p v-if="post.description" class="mb-4 line-clamp-2 text-text-secondary dark:text-text-muted">
        {{ post.description }}
      </p>

      <!-- Tags -->
      <div v-if="Array.isArray(post.tags) && post.tags.length" class="flex flex-wrap gap-2">
        <span
          v-for="tag in post.tags.slice(0, 3)"
          :key="String(tag)"
          class="text-xs text-text-muted"
        >
          #{{ tag }}
        </span>
      </div>

      <!-- Read More -->
      <NuxtLink
        :to="post._path || '#'"
        class="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline dark:text-primary-light"
      >
        Ler mais
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </NuxtLink>
    </div>
  </article>
</template>
