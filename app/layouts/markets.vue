<template>
  <div class="bg-gray-50">
    <Menu />

    <div class="w-full dark:bg-gray-800 bg-white shadow-sm py-2 ">
      <UContainer>
        <Markets-RouterBanner />
      </UContainer>
    </div>

      <slot></slot>

      <div class="footer text-center h-50 leading-50">
        <div class="">footer</div>
      </div>
  </div>

</template>
