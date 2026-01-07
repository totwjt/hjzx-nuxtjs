<!-- pages/orders/index.vue -->
<script setup lang="ts">
import type { Order } from './types';
import {
  columns,
  getStatusConfig
} from './constance'

// 分页状态
const page = ref(1);
const pageSize = ref(10);

// 获取数据
const { data, pending, refresh } = useFetch('/api/console/order/list', {
  query: {
    page,
    pageSize
  }
});

// 查看订单详情
const viewOrderDetail = (orderNo: string) => {
  // 跳转到订单详情页面
  navigateTo(`/orders/${orderNo}`);
};

// 分页变化处理
const handlePageChange = (newPage: number) => {
  page.value = newPage;
  refresh();
};
</script>

<template>
  <UCard>
    <UTable :columns="columns" :data="data || []" :loading="pending">

      <!-- 订单号列 -->
      <template #orderNo-cell="{ row }">
        <span class="font-mono text-sm">{{ row.original.orderNo }}</span>
      </template>

      <!-- 订单创建时间列 -->
      <template #createdAt-cell="{ row }">
        <span class="text-sm text-gray-700">{{ row.original.createdAt }}</span>
      </template>

      <!-- 产品名称列 -->
      <template #productName-cell="{ row }">
        <span class="text-sm">{{ row.original.productName }}</span>
      </template>

      <!-- 计费方式列 -->
      <template #billingMethod-cell="{ row }">
        <span class="text-sm text-gray-600">{{ row.original.billingMethod }}</span>
      </template>

      <!-- 订单类型列 -->
      <template #orderType-cell="{ row }">
        <span class="text-sm text-gray-700">{{ row.original.orderType }}</span>
      </template>

      <!-- 订单状态列 -->
      <template #status-cell="{ row }">
        <UBadge :color="getStatusConfig(row.original.status).color" variant="subtle" size="sm">
          <div class="flex items-center gap-1">
            <UIcon :name="getStatusConfig(row.original.status).icon" class="w-3 h-3" />
            <span>{{ getStatusConfig(row.original.status).text }}</span>
          </div>
        </UBadge>
      </template>

      <!-- 订单金额列 -->
      <template #amount-cell="{ row }">
        <span class="text-red-500 font-medium">¥ {{ row.original.amount.toFixed(2) }}</span>
      </template>

      <!-- 操作列 -->
      <template #actions-cell="{ row }">
        <NuxtLink :to="`/console/order/${row.original.orderNo}`">
          <UButton color="primary" variant="link" size="sm">
            查看详情
          </UButton>
        </NuxtLink>
      </template>

    </UTable>
  </UCard>
</template>