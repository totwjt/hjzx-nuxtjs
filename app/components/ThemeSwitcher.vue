<script setup lang="ts">
const { theme, setTheme } = useUiTheme()

const items = [
  {
    slot: 'c2',
  },
  {
    slot: 'c1',
  },
  {
    slot: 'colorButton'
  },
]
</script>

<template>
  <UDropdownMenu arrow :items="items">
    <UButton color="primary" variant="ghost" icon="tabler:pencil-question" />

    <template #c1>

      <USeparator class="h-4" :ui="{
        border: 'border-2 border-blue-500'
      }" @click="() => {
        setTheme('blue')
      }" />
    </template>

    <template #c2>
      <USeparator class="h-4" :ui="{
        border: 'border-2 border-green-500'
      }" @click="() => {
        setTheme('green')
      }" />
    </template>


    <template #colorButton>

      <UColorModeButton />

    </template>

  </UDropdownMenu>
</template>