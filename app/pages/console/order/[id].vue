<script setup lang="ts">
const route = useRoute()

// 订单 ID
const orderId = route.params.id as string

// 示例：拉取订单详情
const { data, pending, error } = await useFetch(`/api/orders/${orderId}`)
</script>

<template>
  <div>
    <h1>订单详情</h1>

    <div v-if="pending">加载中...</div>
    <div v-else-if="error">订单不存在</div>
    <pre v-else>{{ data }}</pre>
  </div>
</template>