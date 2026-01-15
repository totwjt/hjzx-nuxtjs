<!-- Footer 组件 -->
<template>
  <footer class="mt-16 bg-muted">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

      <!-- 主要内容区：5列网格布局 -->
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-8">

        <!-- 第1列：品牌介绍 -->
        <div class="col-span-2 md:col-span-3 lg:col-span-1">
          <div class="flex items-center gap-2 mb-4">
            <div class="w-auto px-2 h-8 bg-secondary rounded-lg flex items-center justify-center">
              <span class="text-white font-bold text-sm">{{ footer.brand.logoText }}</span>
            </div>
            <span class="text-xl font-bold text-highlighted">{{ footer.brand.name }}</span>
          </div>
          <p class="text-sm text-toned leading-relaxed mb-4">
            {{ footer.brand.slogan }}
          </p>
          <p class="text-xs text leading-relaxed">
            {{ footer.brand.description }}
          </p>
        </div>

        <!-- 第2列：联系我们 -->
        <div>
          <h3 class="font-bold text-highlighted mb-4">联系我们</h3>
          <ul class="space-y-3 text-sm text-toned">
            <li>
              <span class="text-highlighted">合作热线：</span>
              <a href="tel:028-65773958" class="hover:text-secondary-600 transition-colors">{{ footer.contact.phone
              }}</a>
            </li>
            <li>
              <span class="text-highlighted">邮箱：</span>
              <a href="mailto:jizhisuan@cdijyun.com" class="hover:text-secondary-600 transition-colors break-all">{{
                footer.contact.email }}</a>
            </li>
            <li class="text-highlighted">
              <span>地址：</span>
              <span class="text-xs leading-relaxed">{{ footer.contact.address }}</span>
            </li>
          </ul>
        </div>

        <!-- 第3列：算力入口 -->
        <div>
          <h3 class="font-bold text-highlighted mb-4">算力入口</h3>
          <ul class="space-y-3 text-sm">
            <li><a href="#" class="text-toned hover:text-secondary-600 transition-colors">GPU容器实例</a></li>
            <li><a href="#" class="text-toned hover:text-secondary-600 transition-colors">GPU裸金属</a></li>
            <li><a href="#" class="text-toned hover:text-secondary-600 transition-colors">模型部署</a></li>
            <li><a href="#" class="text-toned hover:text-secondary-600 transition-colors">JStack平台</a></li>
          </ul>
        </div>

        <!-- 第4列：关于 -->
        <div>
          <h3 class="font-bold text-highlighted mb-4">关于我们</h3>
          <ul class="space-y-3 text-sm">
            <li><a href="#" class="text-toned hover:text-secondary-600 transition-colors">算力图</a></li>
            <li><a href="#" class="text-toned hover:text-secondary-600 transition-colors">AI课堂</a></li>
            <li><a href="#" class="text-toned hover:text-secondary-600 transition-colors">文档中心</a></li>
            <li><a href="#" class="text-toned hover:text-secondary-600 transition-colors">关于我们</a></li>
          </ul>
        </div>

        <!-- 第5列：关注我们（二维码） -->
        <div>
          <h3 class="font-bold text-highlighted mb-4">关注我们</h3>
          <div class="flex gap-4">
            <!-- 公众号二维码 -->
            <div class="text-center">
              <div class="w-24 h-24 bg-gray-200 rounded-lg mb-2 flex items-center justify-center">
                <svg class="w-16 h-16 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 3h8v8H3V3zm10 0h8v8h-8V3zM3 13h8v8H3v-8zm10 0h8v8h-8v-8z" />
                </svg>
              </div>
              <p class="text-xs text-gray-500">关注公众号</p>
            </div>
            <!-- 视频号二维码 -->
            <div class="text-center">
              <div class="w-24 h-24 bg-gray-200 rounded-lg mb-2 flex items-center justify-center">
                <svg class="w-16 h-16 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 3h8v8H3V3zm10 0h8v8h-8V3zM3 13h8v8H3v-8zm10 0h8v8h-8v-8z" />
                </svg>
              </div>
              <p class="text-xs text-gray-500">观看视频号</p>
            </div>
          </div>
        </div>

      </div>

      <!-- 友情链接 -->
      <div class="flex flex-wrap items-center gap-4 text-sm text-toned">
        <span class="font-medium text-highlighted">友情链接</span>
        <a href="#" class="hover:text-secondary-600 transition-colors">AIDC托管租用</a>
        <a href="#" class="hover:text-secondary-600 transition-colors">成都活动策划</a>
      </div>

      <USeparator class="my-4" />

      <!-- 版权信息 -->
      <div class="space-y-2 text-xs text-gray-500">
        <div class="flex flex-wrap items-center gap-4">
          <p>©2025 华璟智璇（北京）科技有限公司 版权所有</p>
          <a href="#" class="hover:text-secondary-600 transition-colors">ICP备案xxxxxxx</a>
        </div>
        <div class="flex flex-wrap items-center gap-4">
          <a href="#" class="hover:text-secondary-600 transition-colors">《中华人民共和国增值电信业务经营许可证》经营许可证编号 xxxxx</a>
        </div>
        <div class="flex items-center gap-2">
          <a href="#" class="hover:text-secondary-600 transition-colors">公安备案xxxxxxx</a>
        </div>
      </div>

    </div>
  </footer>
</template>

<script lang="ts" setup>
const appConfig = useAppConfig()
const { footer } = appConfig
</script>

<style></style>