<template>
  <UCarousel v-slot="{ item }" dots loop auto-height :autoplay="{ delay: 3000 }" :items="slides" :ui="{
    dots: 'bottom-50!',
    dot: 'w-16 h-1 data-[state=active]:bg-primary-500',
  }">
    <img class="swiper-slide" :src="item.src" alt="banner">
    <div class=" absolute top-0 z-10 w-full pt-20 banner-text">
      <UContainer class="space-y-6">
        <div class="title text-5xl font-bold">{{ item.title }}</div>
        <div class="sub-title text-3xl mt-2">{{ item.subTitle }}</div>
        <p v-for="(desc, index) in item.descs" :key="index" class="mt-4 text-lg">
          {{ desc }}
        </p>
        <UButton class="mt-6 px-8 py-3" to="/markets/">
          立即注册
        </UButton>
      </UContainer>
    </div>
  </UCarousel>
</template>

<script lang="ts" setup>
const slides = [
  {
    src: '/banner/index-3.png?random=1',
    title: '暖冬首充100送10算力体验金',
    subTitle: '算力新势力邀你一键畅享',
    descs: [
      '企业认证最高可得200元算力额度',
      'RTX4090免费用5小时'
    ]
  },
  {
    src: '/banner/index-4.png?random=2',
    title: '彻底突破GPU性能边界',
    subTitle: '简单算力秒速调用',
    descs: [
      '2秒即开随取随用 覆盖全系算力裸金属集群',
      '4090时租1.9元不排队'
    ]
  },
  {
    src: '/banner/index-5.png?random=3',
    title: '算力过剩？',
    subTitle: 'xxx纳管，资源高效变现与收益共享！',
    descs: [
      '一键接入资产盘活',
      '企业级算力资产化管理',
      '智能平台账单一目了然',
      '弹性透明收益分配模式'
    ]
  }
]
</script>

<style scoped>
.swiper-slide {
  position: relative;
  width: 100%;
  height: 700px;
  min-height: 700px;
  aspect-ratio: 1920 / 700;
}

.banner-text {
  min-height: 700px;
}
</style>