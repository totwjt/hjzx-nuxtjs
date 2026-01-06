<template>
  <div :class="['w-full', { 'descriptions-bordered': bordered }]">
    <!-- 标题 -->
    <div
      v-if="title || $slots.title || extra || $slots.extra"
      class="flex items-center justify-between mb-4"
    >
      <div class="text-lg font-semibold text-gray-900 dark:text-gray-100">
        <slot name="title">{{ title }}</slot>
      </div>
      <div v-if="extra || $slots.extra" class="text-sm text-gray-600 dark:text-gray-400">
        <slot name="extra">{{ extra }}</slot>
      </div>
    </div>

    <!-- 内容 -->
    <div class="w-full overflow-x-auto">
      <table :class="['w-full table-fixed', sizeClass, { 'border border-gray-200 dark:border-gray-700': bordered }]">
        <tbody>
          <tr
            v-for="(row, rowIndex) in rows"
            :key="rowIndex"
            :class="{ 'border-b border-gray-200 dark:border-gray-700': !bordered && rowIndex < rows.length - 1 }"
          >
            <template v-for="(item, colIndex) in row" :key="colIndex">
              <th
                v-if="!colon || item.label"
                :class="[
                  'py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/50 text-left align-top',
                  { 'border border-gray-200 dark:border-gray-700': bordered },
                  item.labelClass
                ]"
                :style="item.labelStyle"
                :colspan="bordered ? 1 : item.span || 1"
              >
                <slot :name="`label-${item.key}`" :item="item">
                  {{ item.label }}
                  <span v-if="colon && item.label" class="ml-1">:</span>
                </slot>
              </th>
              <td
                :class="[
                  'py-3 px-4 text-sm text-gray-900 dark:text-gray-100 break-words align-top',
                  { 'border border-gray-200 dark:border-gray-700': bordered },
                  item.contentClass
                ]"
                :style="item.contentStyle"
                :colspan="bordered ? item.span * 2 - 1 : (colon ? item.span : item.span || 1)"
              >
                <slot :name="`content-${item.key}`" :item="item">
                  <slot :name="item.key" :item="item">
                    {{ item.value }}
                  </slot>
                </slot>
              </td>
            </template>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface DescriptionItem {
  key: string
  label?: string
  value?: any
  span?: number
  labelClass?: string
  labelStyle?: Record<string, any>
  contentClass?: string
  contentStyle?: Record<string, any>
}

interface Props {
  title?: string
  extra?: string
  bordered?: boolean
  column?: number
  size?: 'small' | 'default' | 'large'
  colon?: boolean
  items?: DescriptionItem[]
}

const props = withDefaults(defineProps<Props>(), {
  column: 3,
  size: 'default',
  colon: true,
  bordered: false,
  items: () => []
})

// 尺寸类名
const sizeClass = computed(() => {
  switch (props.size) {
    case 'small':
      return 'text-xs [&_th]:py-2 [&_th]:px-3 [&_td]:py-2 [&_td]:px-3'
    case 'large':
      return 'text-base [&_th]:py-4 [&_th]:px-5 [&_td]:py-4 [&_td]:px-5'
    default:
      return ''
  }
})

// 计算行数据
const rows = computed(() => {
  const result: DescriptionItem[][] = []
  let currentRow: DescriptionItem[] = []
  let currentCol = 0

  props.items.forEach((item) => {
    const span = item.span || 1

    // 如果当前行加上新项会超出列数，开始新行
    if (currentCol + span > props.column) {
      if (currentRow.length > 0) {
        result.push(currentRow)
      }
      currentRow = []
      currentCol = 0
    }

    currentRow.push({ ...item, span })
    currentCol += span

    // 如果正好填满一行，开始新行
    if (currentCol === props.column) {
      result.push(currentRow)
      currentRow = []
      currentCol = 0
    }
  })

  // 添加最后一行
  if (currentRow.length > 0) {
    result.push(currentRow)
  }

  return result
})
</script>

<style scoped>
.descriptions-bordered {
  /* 边框样式通过内联类处理 */
}
</style>