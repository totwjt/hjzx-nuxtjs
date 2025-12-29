<template>
  <div class="p-4 ring-1 ring-gray-50 bg-white rounded-lg mb-4">
    <div class="text-sm font-bold text-gray-800 mb-4">单机GPU数量</div>
    <div class="inline-flex items-center gap-3">
      <div v-for="count in countOptions" v-bind:key="count" v-on:click="selectCount(count)"
        v-bind:class="getCountButtonClass(count)">
        <div class="flex items-center gap-2 my-2">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
          </svg>
          <span>{{ count }}卡</span>
        </div>
        <div class="text-xs font-semibold">
          <div>FP16 312T</div>
          <div>VRAM 40G</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

const selectedCount = ref(0)


const countOptions = ref([0, 1, 2, 4, 8]);


function selectCount(count) {
  selectedCount.value = count;
}


function getCountButtonClass(count) {
  const baseClass = "text-lg text-bold cursor-pointer px-6 py-2 border-1 rounded-lg transition-all ";
  if (selectedCount.value === count) {
    return baseClass + " bg-blue-50 border-blue-500 text-blue-600";
  }
  return baseClass + " bg-white border-gray-300 text-gray-700 hover:bg-gray-50";
}
</script>

<style></style>