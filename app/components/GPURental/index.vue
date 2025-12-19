<template>
    <div>
        <UTabs size="md" color="secondary" variant="link" :content="false" :items="items" class="w-full" />
    </div>
</template>

<script setup lang="ts">
import { tabsItems } from './constants'
const items = ref(tabsItems)
</script>

<style scoped lang="scss"></style>