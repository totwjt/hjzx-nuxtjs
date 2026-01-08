<template>
  <UModal v-model:open="open" :dismissible="false" title="确认订单" :ui="{ content: 'max-w-4xl' }">
    <template #body>

      <ResourceSpec :column="3" bordered>
        <ResourceSpecItem label="GPU">
          {{ marketsStore.selectItem?.name || '-' }} × {{ marketsStore.selected.quantity }}
        </ResourceSpecItem>

        <!-- vCPU 和内存使用 getters 中的 total 值 -->
        <ResourceSpecItem label="vCPU">
          {{ marketsStore.totalCpuCores }}核
        </ResourceSpecItem>
        <ResourceSpecItem label="内存">
          {{ marketsStore.totalMemoryGb }}GB
        </ResourceSpecItem>
        <ResourceSpecItem label="存储" :span="3">
          系统盘：{{ marketsStore.selectItem?.systemDiskGb }}GB　数据盘：{{ marketsStore.selectItem?.dataDiskGb }}GB
        </ResourceSpecItem>

        <!-- 镜像 -->
        <ResourceSpecItem label="镜像" :span="3">
          <div class="flex gap-4 justify-start items-center bg-gray-50 p-4 cursor-pointer rounded-sm"
            v-if="!!marketsStore.selectedImage">
            <div>
              <UIcon :name="marketsStore.selectedImage.icon" size="30" class="align-middle pr-4" />
            </div>
            <div>
              <div class="font-bold">{{ marketsStore.selectedImage?.name }}</div>
              <div class="text-xs text-gray-400">{{ marketsStore.selectedImage?.desc }} </div>
            </div>
          </div>
        </ResourceSpecItem>

        <ResourceSpecItem label="计费">
          <!-- {{ billingLabel || '-' }} -->
            按时计费
        </ResourceSpecItem>
        <ResourceSpecItem label="计费周期">{{ marketsStore.rentalDurationHours }}{{ marketsStore.selected.unit }}
        </ResourceSpecItem>
        <ResourceSpecItem label="续期">不自动续期</ResourceSpecItem>
        <ResourceSpecItem label="应付" :span="3">
          <span class="text-red-500 font-semibold">¥ {{ marketsStore.price }}</span>
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

const marketsStore = useMyMarketsStore()
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