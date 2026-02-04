<script setup lang="ts">
interface TocLink {
  id: string
  text: string
  depth: number
  children?: TocLink[]
}

defineProps<{
  links: TocLink[]
}>()

const isOpen = ref(true)
</script>

<template>
  <nav v-if="links?.length" class="mb-8 rounded-lg bg-gray-50 p-4 dark:bg-white/5">
    <button
      class="flex w-full items-center justify-between font-medium"
      @click="isOpen = !isOpen"
    >
      <span>Índice</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5 transition-transform"
        :class="{ 'rotate-180': isOpen }"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </button>

    <Transition name="toc">
      <ul v-if="isOpen" class="mt-4 space-y-2">
        <li v-for="link in links" :key="link.id">
          <a
            :href="`#${link.id}`"
            class="block text-sm text-text-secondary transition-colors hover:text-primary dark:text-text-muted dark:hover:text-primary-light"
            :class="{ 'pl-4': link.depth === 3 }"
          >
            {{ link.text }}
          </a>
          <ul v-if="link.children?.length" class="mt-2 space-y-2 pl-4">
            <li v-for="child in link.children" :key="child.id">
              <a
                :href="`#${child.id}`"
                class="block text-sm text-text-muted transition-colors hover:text-primary dark:hover:text-primary-light"
              >
                {{ child.text }}
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </Transition>
  </nav>
</template>

<style scoped>
.toc-enter-active,
.toc-leave-active {
  transition: all 0.2s ease;
}

.toc-enter-from,
.toc-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
