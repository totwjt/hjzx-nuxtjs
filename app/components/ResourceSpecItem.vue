<template>
  <div class="label" v-if="label">
    {{ label }}
  </div>

  <div class="value" :class="{ highlight }" :style="valueStyle">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  label?: string
  span?: number
  highlight?: boolean
}>()

const valueStyle = computed(() => {
  if (!props.span || props.span <= 1) return {}
  return {
    gridColumn: `span ${props.span * 2 - 1}`
  }
})
</script>

<style scoped>
.label,
.value {
  background: #fff;
  padding: 10px 10px;
}

.label {
  background: #f8fafc;
  font-weight: 500;
  color: #666;
}

.highlight {
  font-weight: 600;
  color: #e11d48;
}
</style>