<template>
  <div class="flex justify-around items-center gap-2">

    <!-- 调试信息（可删） -->
    <span v-if="false" class="text-xs text-gray-400">
      active: {{ active }} /
      hours: {{ rentalDurationHours }}
    </span>

    <!-- 按小时 -->
    <USelectMenu
      v-model="selectedHour"
      @change="active = 0"
      :highlight="activeColor(0)"
      class="w-30"
      :searchInput="false"
      :items="durationOptionsH"
      placeholder="选择小时"
    />

    <!-- 按天 -->
    <USelectMenu
      v-model="selectedDay"
      @change="active = 1"
      :highlight="activeColor(1)"
      class="w-30"
      :searchInput="false"
      :items="durationOptionsD"
      placeholder="选择天数"
    />

    <!-- 按月 -->
    <USelectMenu
      v-model="selectedMonth"
      @change="active = 2"
      :highlight="activeColor(2)"
      class="w-30"
      :searchInput="false"
      :items="durationOptionsM"
      placeholder="选择月数"
    />
  </div>
</template>

<script setup lang="ts">
import { useMyMarketsStore } from '@/stores/markets'
import { storeToRefs } from 'pinia'

/**
 * store
 * rentalDurationHours: number
 */
const { rentalDurationHours } = storeToRefs(useMyMarketsStore())

/**
 * UI state
 * 0: 小时  1: 天  2: 月
 */
const active = ref<0 | 1 | 2>(1)

const selectedHour = ref<any>(null)
const selectedDay = ref<any>(null)
const selectedMonth = ref<any>(null)

/**
 * 小时：1 ~ 24
 */
const durationOptionsH = Array.from({ length: 24 }, (_, i) => ({
  label: `${i + 1} 小时`,
  value: { type: 'hour', count: i + 1 }
}))

/**
 * 天：1 ~ 30
 */
const durationOptionsD = Array.from({ length: 30 }, (_, i) => ({
  label: `${i + 1} 天`,
  value: { type: 'day', count: i + 1 }
}))

/**
 * 月：1 ~ 12
 */
const durationOptionsM = Array.from({ length: 12 }, (_, i) => ({
  label: `${i + 1} 个月`,
  value: { type: 'month', count: i + 1 }
}))

/**
 * 高亮
 */
const activeColor = (sta: number) => sta === active.value

/**
 * 统一换算为小时
 */
function toHours(type: 'hour' | 'day' | 'month', count: number) {
  if (type === 'hour') return count
  if (type === 'day') return count * 24
  if (type === 'month') return count * 30 * 24
  return 1
}

/**
 * 小时
 */
watch(selectedHour, (val) => {
  if (!val) return
  active.value = 0
  selectedDay.value = null
  selectedMonth.value = null
  rentalDurationHours.value = toHours(val.value.type, val.value.count)
})

/**
 * 天
 */
watch(selectedDay, (val) => {
  if (!val) return
  active.value = 1
  selectedHour.value = null
  selectedMonth.value = null
  rentalDurationHours.value = toHours(val.value.type, val.value.count)
})

/**
 * 月
 */
watch(selectedMonth, (val) => {
  if (!val) return
  active.value = 2
  selectedHour.value = null
  selectedDay.value = null
  rentalDurationHours.value = toHours(val.value.type, val.value.count)
})

/**
 * 默认选中：1 天
 */
onMounted(() => {
  selectedDay.value = durationOptionsD[0] // 1 天
  rentalDurationHours.value = 24
  active.value = 1
})
</script>

<style scoped></style>