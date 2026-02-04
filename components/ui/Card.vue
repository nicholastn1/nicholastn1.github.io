<script setup lang="ts">
interface Props {
  decorated?: boolean
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<Props>(), {
  decorated: false,
  padding: 'md',
})

const paddingClasses = {
  none: '',
  sm: 'p-4',
  md: 'p-5',
  lg: 'p-8',
}

const classes = computed(() => [
  'rounded-lg bg-gray-100/50 dark:bg-white/5',
  paddingClasses[props.padding],
  props.decorated && 'card-decorated',
])
</script>

<template>
  <div :class="classes">
    <slot />
  </div>
</template>
