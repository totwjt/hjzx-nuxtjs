<template>
  <UModal v-model:open="open" :dismissible="false" title="确认订单" :ui="{ content: 'max-w-4xl' }">
    <template #body>
      <ResourceSpec :column="3" bordered>

        <ResourceSpecItem label="GPU">NVIDIA 4090 × 1</ResourceSpecItem>
        <ResourceSpecItem label="vCPU">12核</ResourceSpecItem>
        <ResourceSpecItem label="内存">64GB</ResourceSpecItem>
        <ResourceSpecItem label="存储" :span="3">系统盘：50GB　数据盘：50GB</ResourceSpecItem>
        <ResourceSpecItem label="镜像" :span="3">64GB</ResourceSpecItem>
        <ResourceSpecItem label="计费">按时计费</ResourceSpecItem>
        <ResourceSpecItem label="计费周期">1时</ResourceSpecItem>
        <ResourceSpecItem label="续期">不自动续期</ResourceSpecItem>
        <ResourceSpecItem label="应付" :span="3">
          <span class="text-red-500 font-semibold">¥ 1.90</span>
        </ResourceSpecItem>

      </ResourceSpec>
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
  const toast = useToast()
  const route = useRoute()

  try {
    await useMyMarketsStore().submit()

    handleOpen(false)
    await navigateTo('/console/container')
  } catch (error: any) {
    // 401：未登录
    if (error?.statusCode === 401) {
      toast.add({
        title: '需要登录',
        description: '请登录后再继续操作',
        color: 'error'
      })

      await navigateTo({
        path: '/login',
        query: {
          redirect: route.fullPath
        }
      })

      return
    }

    // 其它错误，直接抛给全局 errorHandler / error.vue
    throw error
  }
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