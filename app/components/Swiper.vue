<script setup lang="ts">
import { ref, onMounted } from 'vue'

const containerRef = ref<any>(null)
const swiper = useSwiper(containerRef)

onMounted(() => {
  requestAnimationFrame(() => {
    // swiper.instance?.loopCreate()
    // swiper.instance?.autoplay?.start()
  })
})
</script>

<template>
  <ClientOnly>
    <!-- Swiper 主体 -->
    <swiper-container class="swiper-basic" :loop="false" Autoplay :pagination="{
      clickable: true
    }" ref="containerRef">
      <!-- Slide 1（首屏 LCP） -->
      <swiper-slide class="swiper-slide">
        <img class="slide-bg" src="/banner/index-3.png" alt="banner" loading="eager" fetchpriority="high"
          decoding="async" />
        <UContainer class="slide-text-content">
          <div class="title">暖冬首充100送10算力体验金</div>
          <div class="sub-title">算力新势力邀你一键畅享</div>
          <p>企业认证最高可得200元算力额度</p>
          <p>RTX4090免费用5小时</p>
          <NuxtLink to="/markets/">
            <button>立即注册</button>
          </NuxtLink>
        </UContainer>
      </swiper-slide>

      <!-- Slide 2 -->
      <swiper-slide class="swiper-slide">
        <img class="slide-bg" src="/banner/index-4.png" alt="banner" loading="lazy" decoding="async" />
        <UContainer class="slide-text-content">
          <div class="title">彻底突破GPU性能边界</div>
          <div class="sub-title">简单算力秒速调用</div>
          <p>2秒即开随取随用 覆盖全系算力裸金属集群</p>
          <p>4090时租1.9元不排队</p>
          <NuxtLink to="/markets/">
            <button>立即注册</button>
          </NuxtLink>
        </UContainer>
      </swiper-slide>

      <!-- Slide 3 -->
      <swiper-slide class="swiper-slide">
        <img class="slide-bg" src="/banner/index-5.png" alt="banner" loading="lazy" decoding="async" />
        <UContainer class="slide-text-content">
          <div class="title">算力过剩？</div>
          <div class="sub-title">极智算纳管，资源高效变现与收益共享！</div>
          <p>一键接入资产盘活</p>
          <p>企业级算力资产化管理</p>
          <p>智能平台账单一目了然</p>
          <p>弹性透明收益分配模式</p>
          <NuxtLink to="/markets/">
            <button>立即注册</button>
          </NuxtLink>
        </UContainer>
      </swiper-slide>
    </swiper-container>

    <!-- SSR fallback，避免首屏白屏 -->
    <template #fallback>
      <div class="swiper-basic fallback">
        <img src="/banner/index-3.png" class="slide-bg" loading="eager" fetchpriority="high" />
      </div>
    </template>
  </ClientOnly>
</template>

<style lang="scss">
.swiper-basic {
  position: relative;
  width: 100%;
  height: 700px;
  min-height: 700px;
  aspect-ratio: 1920 / 700;
}

.swiper-slide {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #FBFBFB;
}

.slide-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
}

.slide-text-content {
  position: relative;
  z-index: 1;
  // width: 700px;
  height: 480px;
  margin: 100px auto;


  button {
    margin-top: 24px;
    padding: 10px 24px;
    background: #1677ff;
    border: none;
    color: #fff;
    cursor: pointer;
  }
}

.title {
  font-size: 40px;
  font-weight: 600;
}

.sub-title {
  font-size: 20px;
  margin: 12px 0;
}

.swiper-basic::part(pagination) {
  bottom: 200px;
}

.swiper-basic::part(bullet) {
  width: 60px;
  height: 2px;
  border-radius: 2px;
}

.swiper-basic::part(bullet-active) {
  height: 3px;
  width: 70px;
  border-radius: 2px;
}
</style>