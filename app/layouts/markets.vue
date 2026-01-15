<template>
  <div class="bg min-h-screen flex flex-col">
    <Menu />

    <div class="flexw-full bg-muted">
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
