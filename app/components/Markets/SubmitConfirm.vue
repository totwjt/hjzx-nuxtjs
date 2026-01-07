<template>
  <UModal v-model:open="open" :dismissible="false" title="确认订单" :ui="{ content: 'max-w-3xl' }">
    <template #body>
      <ResourceSpec :rows="specRows" />
    </template>

    <template #footer>
      <div class="flex-1 flex justify-around">
        <UButton class="w-50 text-center" block size="xl" variant="outline" @click="handleCancel">
          取消
        </UButton>
        <UButton class="w-50 text-center" block size="xl" @click="handleSubmit">
          确认
        </UButton>
      </div>
    </template>
  </UModal>
</template>

<script setup lang="ts">
import { useMyMarketsStore } from '@/stores/markets'

/* ---------------- props / emits ---------------- */

// const props = defineProps<{
//   open: boolean
// }>()

const open = ref(false)

const emit = defineEmits<{
  (e: 'update:open', value: boolean): void
  (e: 'confirm', value: boolean): void
}>()

const handleOpen = (bool: boolean) => {
  open.value = bool
};
defineExpose({ handleOpen });

/* ---------------- handlers ---------------- */

const handleCancel = () => {
  emit('update:open', false)
  emit('confirm', false)

  handleOpen(false)
}

const handleSubmit = async () => {
  emit('update:open', false)
  emit('confirm', true)

  await useMyMarketsStore().submit()
  handleOpen(false)
  await navigateTo('/console/container')

}

/* ---------------- static data ---------------- */

const specRows = [
  {
    type: 'grid6',
    items: [
      { label: 'GPU', value: 'NVIDIA 4090 × 1' },
      { label: 'vCPU', value: '12核' },
      { label: '内存', value: '64GB' }
    ]
  },
  {
    type: 'grid2',
    items: [
      { label: '存储', value: '系统盘：50GB　数据盘：50GB' }
    ]
  },
  {
    type: 'grid2',
    items: [
      {
        label: '镜像',
        value: 'Python3.10.12 + Ubuntu22.04 + CUDA12.4.1 + Jupyter'
      }
    ]
  },
  {
    type: 'grid6',
    items: [
      { label: '计费', value: '按时计费' },
      { label: '计费周期', value: '1时' },
      { label: '续期', value: '不自动续期' }
    ]
  },
  {
    type: 'grid2',
    items: [
      { label: '应付', value: '¥ 1.90', highlight: true }
    ]
  }
]
</script>