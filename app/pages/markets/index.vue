<template>
  <div>
    <UContainer class="py-8">
      <markets-select-types />
      <!-- <markets-select-gpu-counts /> -->
      <markets-select-instance-config />
    </UContainer>
    <markets-selct-order-price />
  </div>
</template>

<script lang="ts" setup>
import { useMyMarketsStore } from "@/stores/markets";
const marketsStore = useMyMarketsStore()
marketsStore.gpuListAction()

</script>

<style></style>
