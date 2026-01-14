<!-- components/Logo.vue -->
<template>
  <NuxtLink to="/">
    <div class="logo-lay py-2">
      <img src="/logo3.png" alt="Logo" class="logo-image" />
    </div>
  </NuxtLink>
</template>

<style lang="scss" scoped>
.logo-lay {
  height: 63px;

  .logo-image {
    width: auto;
    height: 100%;
    object-fit: contain;
  }
}
</style>