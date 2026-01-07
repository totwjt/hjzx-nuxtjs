<template>
  <div class="spec-card">
    <div
      v-for="(row, index) in rows"
      :key="index"
      class="spec-row"
      :class="row.type"
    >
      <template v-for="(item, i) in row.items" :key="i">
        <div class="label">
          {{ item.label }}
        </div>
        <div class="value" :class="{ highlight: item.highlight }">
          {{ item.value }}
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
interface SpecItem {
  label: string
  value: string
  highlight?: boolean
}

interface SpecRow {
  type: 'grid2' | 'grid6'
  items: SpecItem[]
}

defineProps<{
  rows: SpecRow[]
}>()
</script>

<style scoped>
.spec-card {
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  overflow: hidden;
  font-size: 14px;
  color: #333;
}

/* 行通用 */
.spec-row {
  display: grid;
  border-bottom: 1px solid #e5e7eb;
}

.spec-row:last-child {
  border-bottom: none;
}

/* 3 组 label/value */
.grid6 {
  grid-template-columns: 80px 1fr 100px 1fr 80px 1fr;
}

/* 1 组 label/value */
.grid2 {
  grid-template-columns: 80px 1fr;
}

.label {
  background: #f8fafc;
  padding: 10px 12px;
  border-right: 1px solid #e5e7eb;
  font-weight: 500;
  color: #666;
}

.value {
  padding: 10px 12px;
}

.highlight {
  font-weight: 600;
  color: #e11d48;
}
</style>