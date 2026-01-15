<template>
  <div class="p-4 ring-1 ring-gray-50 bg-white rounded-lg mb-4">
    <div class="text-sm font-bold text-highlighted mb-4">单机GPU数量</div>
    <div class="inline-flex items-center gap-3 flex-wrap">

      <div v-for="count in idleGpuCount" v-bind:key="count" @click="() => selected.quantity = count"
        v-bind:class="getCountButtonClass(count)">
        <div class="flex items-center gap-2 my-2 ">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
          </svg>
          <span>{{ count }}卡</span>
        </div>
        <div class="text-xs font-semibold">
          <div>FP16 {{f16Tflops * count}}T</div>
          <div>VRAM {{gpuMemory * count}}G</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import { useMyMarketsStore } from "@/stores/markets/index";

const { selected, idleGpuCount, f16Tflops, gpuMemory } = storeToRefs(useMyMarketsStore())

// const { idleGpuCount } = selectItem.value

const countOptions = [1, 2, 3, 4, 5, 6, 7]

watch(() => selected.value.quantity, () => {
  useMyMarketsStore().calculatePrice()
})

function getCountButtonClass(count: number) {
  const base = 'cursor-pointer px-6 py-2 border'
  return selected.value.quantity === count
    ? `${base} bg-primary-50 border-primary-500`
    : `${base} border-gray-300`
}
</script>

<style></style>