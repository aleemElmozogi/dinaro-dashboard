<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from 'src/core/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <span :class="cn('ml-auto text-xs tracking-widest text-muted-foreground', props.class)">
    <slot />
  </span>
</template>
