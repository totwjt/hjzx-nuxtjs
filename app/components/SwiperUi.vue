<template>
  <UCarousel v-slot="{ item }" dots loop auto-height :autoplay="{ delay: 3000 }" :items="items" :ui="{
    dots: 'bottom-50!',
    dot: 'w-16 h-1 data-[state=active]:bg-primary-500',
  }">
    <img :src="item">
  </UCarousel>
</template>

<script lang="ts" setup>
const items = [
  '/banner/index-3.png?random=1',
  '/banner/index-4.png?random=2',
  '/banner/index-5.png?random=3'
]
</script>

<style></style>