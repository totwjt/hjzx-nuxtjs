<script setup lang="ts">
import { computed } from 'vue'

const route = useRoute()
const orderId = route.params.id as string

const { data, pending, error } = await useFetch(`/api/console/order/${orderId}`)

// 基础信息
const baseInfo = computed(() => {
  if (!data.value) return []
  return [
    { label: '订单号', value: data.value.orderNo },
    { label: '订单类型', value: data.value.orderTypeStr },
    { label: '订单状态', value: data.value.statusStr },
    { label: '创建时间', value: data.value.createdAt },
    { label: '支付时间', value: data.value.paidAt ?? '—' }
  ]
})

// 资源配置
const resourceInfo = computed(() => {
  if (!data.value) return []
  return [
    { label: 'GPU 数量', value: data.value.gpuCount },
    { label: 'CPU 核数', value: `${data.value.cpuCores} 核` },
    { label: '内存', value: `${data.value.memoryGb} GB` },
    {
      label: '系统盘',
      value: data.value.systemDiskGb ? `${data.value.systemDiskGb} GB` : '无'
    },
    { label: '数据盘', value: `${data.value.dataStorageGb} GB` },
    { label: '开放端口', value: data.value.customPorts }
  ]
})

// 费用信息
const priceInfo = computed(() => {
  if (!data.value) return []
  return [
    { label: '租用时长', value: `${data.value.rentalDurationHours} 小时` },
    { label: '单价', value: `${data.value.selectedPricePerHour} 元 / 小时` },
    {
      label: '实付金额',
      value: data.value.actualAmount ?? '待支付'
    }
  ]
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 py-4">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- 加载状态 -->
      <div v-if="pending" class="flex items-center justify-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>

      <!-- 错误状态 -->
      <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-lg p-6">
        <div class="flex items-start">
          <div class="flex-shrink-0">
            <svg class="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div class="ml-3">
            <h3 class="text-sm font-medium text-red-800">加载失败</h3>
            <p class="mt-2 text-sm text-red-700">{{ error.message }}</p>
          </div>
        </div>
      </div>

      <!-- 订单详情内容 -->
      <div v-else-if="data" class="space-y-6">

        <!-- 基础信息 -->
        <div class="bg-white rounded-lg shadow">
          <div class="px-6 py-5 border-b border-gray-200">
            <h2 class="text-lg font-medium text-gray-900">基础信息</h2>
          </div>
          <div class="px-6 py-5">
            <dl class="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
              <div v-for="item in baseInfo" :key="item.label" class="sm:col-span-1">
                <dt class="text-sm font-medium text-gray-500">{{ item.label }}</dt>
                <dd class="mt-1 text-sm text-gray-900">{{ item.value }}</dd>
              </div>
            </dl>
          </div>
        </div>

        <!-- 资源配置 -->
        <div class="bg-white rounded-lg shadow">
          <div class="px-6 py-5 border-b border-gray-200">
            <h2 class="text-lg font-medium text-gray-900">资源配置</h2>
          </div>
          <div class="px-6 py-5">
            <dl class="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
              <div v-for="item in resourceInfo" :key="item.label" class="sm:col-span-1">
                <dt class="text-sm font-medium text-gray-500">{{ item.label }}</dt>
                <dd class="mt-1 text-sm text-gray-900">{{ item.value }}</dd>
              </div>
            </dl>
          </div>
        </div>

        <!-- 费用信息 -->
        <div class="bg-white rounded-lg shadow">
          <div class="px-6 py-5 border-b border-gray-200">
            <h2 class="text-lg font-medium text-gray-900">费用信息</h2>
          </div>
          <div class="px-6 py-5">
            <dl class="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
              <div v-for="item in priceInfo" :key="item.label" class="sm:col-span-1">
                <dt class="text-sm font-medium text-gray-500">{{ item.label }}</dt>
                <dd class="mt-1 text-sm"
                  :class="item.label === '实付金额' ? 'text-lg font-semibold text-secondary-600' : 'text-gray-900'">
                  {{ item.value }}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>