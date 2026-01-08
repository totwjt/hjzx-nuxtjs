<template>
  <div class="spec-card" :class="{ bordered }">
    <div
      class="spec-grid"
      :style="{
        gridTemplateColumns: `repeat(${column * 2}, minmax(0, 1fr))`
      }"
    >
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  column?: number
  bordered?: boolean
}>()
</script>

<style scoped>
.spec-card {
  font-size: 14px;
  color: #333;
}

.bordered {
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  overflow: hidden;
}

/* 核心：用 gap 当分隔线 */
.spec-grid {
  display: grid;
  gap: 1px;
  background: #e5e7eb; /* 分割线颜色 */
}
</style>