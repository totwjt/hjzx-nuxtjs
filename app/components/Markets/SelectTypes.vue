<template>
  <div class="p-4 ring-1 ring-gray-50 bg-white rounded-lg mb-4">
    <div class="text-sm font-bold text-gray-800 mb-4">选择GPU类型</div>

    <!-- skeleton -->
    <div class="grid gap-2" v-if="displayedGPUs?.length <= 0">
      <USkeleton class="h-4 w-162.5" />
      <USkeleton class="h-4 w-162.5" />
      <USkeleton class="h-4 w-62.5" />
      <USkeleton class="h-4 w-62.5" />
      <USkeleton class="h-4 w-212.5" />
      <USkeleton class="h-4 w-212.5" />
    </div>

    <!-- gpu cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6" v-else>
      <div v-for="gpu in displayedGPUs" :key="gpu.id" :class="getGPUCardClass(gpu.id)"
        @click="HandleClickSelectGpuCard(gpu.id)">
        <!-- header -->
        <div class="flex items-start justify-between mb-6">
          <h3 :class="getGPUTitleClass(gpu.id)">
            {{ gpu.name }}
          </h3>
          <div class="text-xs flex items-center gap-1 bg-primary-50 p-1 rounded-sm">
            <UIcon name="mdi:location" />
            <div>{{ gpu.location || '北京一区' }}</div>
          </div>
        </div>

        <!-- specs -->
        <div class="space-y-3 mb-6">
          <div class="grid grid-cols-2 gap-4">
            <div class="flex items-center gap-2 text-sm text-gray-500">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
              </svg>
              <span>vCPU</span>
              <span class="ml-auto text-gray-700">{{ gpu.cpuCores * selected.quantity }}核</span>
            </div>
            <div class="flex items-center gap-2 text-sm text-gray-500">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
              </svg>
              <span>内存</span>
              <span class="ml-auto text-gray-700">{{ gpu.memoryGb * selected.quantity }}G</span>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div class="flex items-center gap-2 text-sm text-gray-500">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z" />
              </svg>
              <span>系统盘</span>
              <span class="ml-auto text-gray-700">{{ gpu.systemDiskGb }}G</span>
            </div>
            <div class="flex items-center gap-2 text-sm text-gray-500">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
              </svg>
              <span>数据盘</span>
              <span class="ml-auto text-gray-700">{{ gpu.dataDiskGb }}G</span>
            </div>
          </div>
        </div>

        <!-- footer -->
        <div class="flex items-center justify-between pt-4 border-t border-gray-100">
          <span class="text-sm text-secondary font-semibold flex items-center gap-2">
            <UIcon name="bi:gpu-card" />
            {{ gpu.idleGpuCount }}卡可租
          </span>

          <!-- price popover -->
          <UPopover mode="hover">
            <div class="flex items-baseline gap-1 cursor-pointer">
              <span class="text-xs font-black text-red-600">¥</span>
              <span class="text-3xl font-black text-red-600">
                {{ getSelectPrice(gpu.id).price * selected.quantity }}
              </span>
              <span class="text-xs">
                / {{ getSelectPrice(gpu.id).unit }}
              </span>
            </div>

            <template #content>
              <div class="text-lg text-center">
                <div class="p-2 mx-8 cursor-pointer" @click="onSelectPrice(gpu, 1)">
                  <span class="text-red-500 font-black">
                    ¥{{ gpu.pricePerHour * selected.quantity }}
                  </span>
                  <span class="text-sm">/时</span>
                </div>

                <USeparator />

                <div class="p-2 mx-8 cursor-pointer" @click="onSelectPrice(gpu, 2)">
                  <span class="text-red-500 font-black">
                    ¥{{ gpu.pricePerDay * selected.quantity }}
                  </span>
                  <span class="text-sm">/天</span>
                </div>

                <USeparator />

                <div class="p-2 mx-8 cursor-pointer" @click="onSelectPrice(gpu, 3)">
                  <span class="text-red-500 font-black">
                    ¥{{ gpu.pricePerMonth * selected.quantity }}
                  </span>
                  <span class="text-sm">/月</span>
                </div>
              </div>
            </template>
          </UPopover>
        </div>
      </div>
    </div>

    <!-- expand -->
    <div class="flex justify-end" v-if="gpuGroupList?.length > 3">
      <button @click="toggleExpand" class="flex items-center gap-2 text-sm font-medium text-secondary-500">
        <span>更多类型GPU</span>
        <svg :class="getExpandIconClass()" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useMyMarketsStore } from '@/stores/markets/index'
import type { IGpuGroupList } from '@/stores/markets/gpu.type'

/* ---------------- store ---------------- */

const marketsStore = useMyMarketsStore()
const { gpuGroupList } = storeToRefs(marketsStore)

/* ---------------- composable ---------------- */

const {
  gpuId,
  quantity,
  selected,
  unit,
  pricePerUnit,
  clickSelectGpuCard,
  selectGpu,
  initByGpuList
} = useGpuSelection()

const HandleClickSelectGpuCard = (gid) => {
  const { price, unit } = getSelectPrice(gid)
  clickSelectGpuCard(gid, price, unit)
}

/* ---------------- UI state ---------------- */

const isExpanded = ref(false)

const displayedGPUs = computed(() => {
  if (!Array.isArray(gpuGroupList.value)) return []
  return isExpanded.value
    ? gpuGroupList.value
    : gpuGroupList.value.slice(0, 3)
})

/* ---------------- 卡片价格状态（关键） ---------------- */

type PriceState = {
  price: number
  unit: '时' | '天' | '月'
}

const priceMap = ref<Record<number, PriceState>>({})

function getSelectPrice(gpuId: number): PriceState {
  return (
    priceMap.value[gpuId] ?? {
      price: 0,
      unit: '时'
    }
  )
}

/* 初始化每个卡片的默认价格 */
watch(
  gpuGroupList,
  (list) => {
    if (!list?.length) return
    list.forEach((gpu) => {
      if (priceMap.value[gpu.id]) return
      priceMap.value[gpu.id] = {
        price: Number(gpu?.pricePerHour ?? 0),
        unit: '时'
      }
    })
  },
  { immediate: true }
)

/* ---------------- handlers ---------------- */

function onSelectPrice(gpu: IGpuGroupList, type: 1 | 2 | 3) {

  const map = {
    1: { price: Number(gpu.pricePerHour), unit: '时' },
    2: { price: Number(gpu.pricePerDay), unit: '天' },
    3: { price: Number(gpu.pricePerMonth), unit: '月' }
  } as const

  // 1️⃣ 只更新当前卡片显示
  priceMap.value[gpu.id] = map[type]

  // 2️⃣ 如果这是当前选中 GPU，同步到业务状态
  selectGpu({
    gpuGroupId: gpu.id,
    pricePerHour: gpu.pricePerHour,
    pricePerDay: gpu.pricePerDay,
    pricePerMonth: gpu.pricePerMonth,
    type
  })
}

function toggleExpand() {
  isExpanded.value = !isExpanded.value
}

/* ---------------- class helpers ---------------- */

function getGPUCardClass(id: number) {
  const base =
    'bg-white rounded-lg border-2 p-6 cursor-pointer transition-all'
  return gpuId.value === id
    ? `${base} border-primary shadow-lg`
    : `${base} border-gray-200 hover:shadow-md`
}

function getGPUTitleClass(id: number) {
  return gpuId.value === id
    ? 'text-xl font-bold text-primary'
    : 'text-xl font-bold'
}

function getExpandIconClass() {
  return isExpanded.value
    ? 'w-4 h-4 transition-transform rotate-180'
    : 'w-4 h-4 transition-transform'
}

/* ---------------- lifecycle ---------------- */

onMounted(async () => {
  const list = await marketsStore.fetchGpuList()
  initByGpuList(list)
})
</script>