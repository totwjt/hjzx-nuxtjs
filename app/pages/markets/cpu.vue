<template>
  <div>
    <UContainer class="py-8">
      <markets-select-types :type="0" />
      <markets-select-instance-config />
    </UContainer>
    <markets-selct-order-price />
  </div>
</template>

<script lang="ts" setup>
import { useMyMarketsStore } from "@/stores/markets/index";
const marketsStore = useMyMarketsStore()

// await useAsyncData(
//   'cpu-list',
//   () => marketsStore.gpuListAction()
// )
// marketsStore.gpuListAction()

</script>

<style></style>
