<script setup lang="ts">
interface Props {
  variant?: 'default' | 'primary' | 'accent'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
})

const variantClasses = {
  default: 'bg-white text-text-secondary dark:bg-background-dark dark:text-text-muted',
  primary: 'bg-primary/10 text-primary dark:bg-primary-light/20 dark:text-primary-light',
  accent: 'bg-accent-green/10 text-accent-green',
}

const classes = computed(() => [
  'inline-flex items-center rounded px-2 py-1 text-xs font-medium',
  variantClasses[props.variant],
])
</script>

<template>
  <span :class="classes">
    <slot />
  </span>
</template>
