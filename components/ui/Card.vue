<script setup lang="ts">
import type { TiltOptions } from '~/composables/useTiltEffect'

interface Props {
  decorated?: boolean
  padding?: 'none' | 'sm' | 'md' | 'lg'
  tilt?: boolean
  tiltOptions?: TiltOptions
  hoverEnhanced?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  decorated: false,
  padding: 'md',
  tilt: false,
  tiltOptions: () => ({
    maxTilt: 4,
    scale: 1.02,
    speed: 400,
  }),
  hoverEnhanced: false,
})

const cardRef = ref<HTMLElement>()
const { tilt: applyTilt } = useTiltEffect()

let tiltInstance: { setup: () => void; destroy: () => void } | null = null

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
  props.hoverEnhanced && 'card-hover-enhanced border-hover-accent',
  props.tilt && 'tilt-container',
])

onMounted(() => {
  if (props.tilt && cardRef.value) {
    tiltInstance = applyTilt(cardRef, props.tiltOptions)
    tiltInstance.setup()
  }
})

onUnmounted(() => {
  if (tiltInstance) {
    tiltInstance.destroy()
  }
})
</script>

<template>
  <div ref="cardRef" :class="classes">
    <slot />
  </div>
</template>
