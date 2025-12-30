<template>
  <div class="p-4 ring-1 ring-gray-50 bg-white rounded-lg mb-4">

    <div class="text-sm font-bold text-gray-800 mb-4">选择GPU类型</div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
      <div v-for="gpu in displayedGPUs" v-bind:key="gpu.id" v-on:click="selectGPU(gpu.id)"
        v-bind:class="getGPUCardClass(gpu.id)" :disabled=true>
        <div class="flex items-start justify-between mb-6">
          <h3 v-bind:class="getGPUTitleClass(gpu.id)">
            {{ gpu.name }}
          </h3>
          <div class="text-xs flex items-center gap-1 bg-primary-50 p-1 rounded-sm">
            <UIcon name="mdi:location" />
            <div>{{ gpu.location || '北京一区' }}</div>
          </div>
        </div>

        <div class="space-y-3 mb-6">
          <div class="grid grid-cols-2 gap-4">
            <div class="flex items-center gap-2 text-sm text-gray-500">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
              </svg>
              <span>vCPU</span>
              <span class="ml-auto text-gray-700">{{ gpu.cpuCores }}核</span>
            </div>
            <div class="flex items-center gap-2 text-sm text-gray-500">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
              </svg>
              <span>内存</span>
              <span class="ml-auto text-gray-700">{{ gpu.dataDiskGb }}G</span>
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

        <div class="flex items-center justify-between pt-4 border-t border-gray-100">
          <div class="flex items-center gap-2">
            <span class="text-sm text-secondary font-semibold">
              <UIcon name="bi:gpu-card" class="align-middle " />
              {{ gpu.memoryGb }}卡可租
            </span>
          </div>

          <UPopover mode="hover">

            <div class="flex items-baseline gap-1">
              <span class="text-xs font-black text-red-600">¥</span>
              <span class="text-3xl font-black text-red-600">
                {{ getSelectPrice(gpu.id).price }}
              </span>
              <span class="text-xs">
                / {{ getSelectPrice(gpu.id).unit }}
              </span>
            </div>

            <template #content>
              <div class="text-lg text-center cursor-pointer">
                <div class="p-2 mx-8" @click="HandleSelectPrice(gpu.id, gpu.items[0].pricePerHour, '时')">
                  <span class="text-red-500 font-black">
                    ¥{{ gpu.items[0].pricePerHour }}
                  </span>
                  <span class="text-sm">/时</span>
                </div>
                <USeparator />
                <div class="p-3 mx-8" @click="HandleSelectPrice(gpu.id, gpu.items[0].pricePerDay, '天')">
                  <span class="text-red-500 font-black">
                    ¥{{ gpu.items[0].pricePerDay }}
                  </span>
                  <span class="text-sm">/天</span>
                </div>
                <USeparator />
                <div class="p-2 mx-8" @click="HandleSelectPrice(gpu.id, gpu?.items[0].pricePerMonth, '月')">
                  <span class="text-red-500 font-black">
                    ¥{{ gpu.items[0].pricePerMonth }}
                  </span>
                  <span class="text-sm">/月</span>
                </div>
              </div>
            </template>
          </UPopover>

        </div>
      </div>
    </div>

    <div class="flex justify-end" v-if="gpuOptions && gpuOptions?.length > 3">
      <button v-on:click="toggleExpand"
        class=" flex justify-end items-center gap-2 text-sm font-medium text-blue-500 cursor-pointer transition-colors">
        <span>更多类型GPU</span>
        <svg v-bind:class="getExpandIconClass()" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
    </div>

  </div>
</template>

<script lang="ts" setup>
import { useMyMarketsStore } from "@/stores/markets";
const marketsStore = useMyMarketsStore()
const aa = marketsStore.gpuGroupList
const gpuOptions = toRef(marketsStore.gpuGroupList)

const selectedGPU = ref(null),
  selectedCount = ref(0),
  isExpanded = ref(false)

// const gpuOptions = ref([
//   {
//     id: 1,
//     name: "NVIDIA 4090 24G",
//     location: "四川三区",
//     vCPU: "15核",
//     memory: "60G",
//     systemDisk: "50G",
//     dataDisk: "100G",
//     price: "1.80",
//     status: "已租完"
//   },
//   {
//     id: 2,
//     name: "NVIDIA 3090 24G",
//     location: "成都一区",
//     vCPU: "16核",
//     memory: "64G",
//     systemDisk: "50G",
//     dataDisk: "50G",
//     price: "1.45",
//     status: "已租完"
//   },
//   {
//     id: 3,
//     name: "NVIDIA H20 96G",
//     location: "成都一区",
//     vCPU: "24核",
//     memory: "128G",
//     systemDisk: "50G",
//     dataDisk: "50G",
//     price: "6.20",
//     status: "已租完"
//   },
//   {
//     id: 4,
//     name: "NVIDIA A100 40G",
//     location: "成都二区",
//     vCPU: "32核",
//     memory: "256G",
//     systemDisk: "100G",
//     dataDisk: "200G",
//     price: "8.50",
//     status: "已租完"
//   },
//   {
//     id: 5,
//     name: "NVIDIA A100 80G",
//     location: "成都二区",
//     vCPU: "48核",
//     memory: "512G",
//     systemDisk: "100G",
//     dataDisk: "200G",
//     price: "12.00",
//     status: "已租完"
//   },
//   {
//     id: 6,
//     name: "NVIDIA V100 32G",
//     location: "四川三区",
//     vCPU: "16核",
//     memory: "64G",
//     systemDisk: "50G",
//     dataDisk: "100G",
//     price: "4.50",
//     status: "已租完"
//   }
// ])

const displayedGPUs = computed(() => {
  if (isExpanded.value) {
    return gpuOptions.value;
  }
  return gpuOptions.value?.slice(0, 3) || [];
})

/*----------------------------------------------------*\
｜                       选择价格
\*----------------------------------------------------*/

type PriceState = {
  price: number
  unit: '时' | '天' | '月'
}

const priceMap = ref<Record<string | number, PriceState>>({})

const getSelectPrice = (gpuId: string | number) => {
  return priceMap.value[gpuId] ?? {
    price: 0,
    unit: '小时'
  }
}

watch(
  gpuOptions,
  (list) => {
    if (!list?.length) return

    list.forEach((gpu) => {
      // 已有用户选择，不覆盖
      if (priceMap.value[gpu.id]) return

      priceMap.value[gpu.id] = {
        price: gpu.items?.[0]?.pricePerHour ?? 0,
        unit: '时'
      }
    })
  },
  { immediate: true }
)

const SelectPrice = ref({
  price: 0,
  extra: '小时'

})

const HandleSelectPrice = (
  gpuId: string | number,
  price: number,
  unit: '时' | '天' | '月'
) => {
  priceMap.value[gpuId] = { price, unit }
  selectGPU(gpuId)
}

const countOptions = ref([0, 1, 2, 4, 8]);

function getGPUCardClass(id: string | number) {
  const baseClass = "bg-white rounded-lg border-2 p-6 cursor-pointer transition-all";
  if (selectedGPU.value === id) {
    return baseClass + " border-primary/80 shadow-lg border-2";
  }
  return baseClass + " border-gray-200 hover:shadow-md";
}

function getGPUTitleClass(id) {
  const baseClass = "text-xl font-bold";
  if (selectedGPU.value === id) {
    return baseClass + " text-primary";
  }
  return baseClass
}

function getExpandIconClass() {
  const baseClass = "w-4 h-4 transition-transform";
  if (isExpanded.value) {
    return baseClass + " rotate-180";
  }
  return baseClass;
}

function selectGPU(id) {
  selectedGPU.value = id;
}

function selectCount(count) {
  selectedCount.value = count;
}

function getCountButtonClass(count) {
  const baseClass = "px-6 py-2 border-2 rounded transition-all";
  if (selectedCount.value === count) {
    return baseClass + " bg-blue-50 border-blue-500 text-blue-600";
  }
  return baseClass + " bg-white border-gray-300 text-gray-700 hover:bg-gray-50";
}

function toggleExpand() {
  isExpanded.value = !isExpanded.value;
}


</script>

<style></style>