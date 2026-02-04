<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  href?: string
  external?: boolean
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  external: false,
  disabled: false,
})

const baseClasses =
  'inline-flex items-center justify-center font-medium transition-all duration-200 rounded focus:outline-none focus:ring-2 focus:ring-offset-2'

const variantClasses = {
  primary:
    'bg-gradient-primary text-white hover:opacity-90 focus:ring-primary-light',
  secondary:
    'bg-accent-green text-black hover:bg-accent-green/90 focus:ring-accent-green',
  outline:
    'border-2 border-current text-primary hover:bg-primary hover:text-white dark:text-white dark:border-white dark:hover:bg-white dark:hover:text-black focus:ring-primary',
  ghost:
    'text-text-secondary hover:bg-gray-100 dark:text-text-muted dark:hover:bg-white/10 focus:ring-gray-400',
}

const sizeClasses = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-5 py-2.5 text-base',
  lg: 'px-7 py-3.5 text-lg',
}

const classes = computed(() => [
  baseClasses,
  variantClasses[props.variant],
  sizeClasses[props.size],
  props.disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
])

const externalAttrs = computed(() =>
  props.external ? { target: '_blank', rel: 'noopener noreferrer' } : {}
)
</script>

<template>
  <component
    :is="href ? 'a' : 'button'"
    :href="href"
    :class="classes"
    :disabled="disabled && !href"
    v-bind="externalAttrs"
  >
    <slot />
  </component>
</template>
