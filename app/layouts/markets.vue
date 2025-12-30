<template>
  <div class="bg-gray-50 min-h-screen flex flex-col">
    <Menu />

    <div class="flexw-full dark:bg-gray-800 bg-white shadow-sm py-2">
      <UContainer>
        <Markets-RouterBanner />
      </UContainer>
    </div>

    <div class="flex-1">
      <slot></slot>
    </div>

    <Footer />
  </div>

</template>
