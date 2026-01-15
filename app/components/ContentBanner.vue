<template>
    <UContainer class="bg-muted dark:bg-muted grid grid-cols-4 items-center justify-items-center h-27 mx-auto -mt-40 z-10 shadow">
        <div class="cb relative">
            <img src="/banner/icon-banner-menu-1.png" class="w-8 h-8" alt="" srcset="">
            <div>
                <div>算力免费领</div>
                <div class="sub-text text-sm">注册实名认证得10元现金</div>
            </div>
            <UIcon name="material-symbols:chevron-right" />
            <span class="absolute right-0 top-1/4 h-1/2 w-px bg-gray-200"></span>
        </div>
        <div class="cb relative">
            <img src="/banner/icon-banner-menu-2.png" class="w-8 h-8" alt="" srcset="">
            <div>
                <div><span class="text-secondary">召唤</span>好算友</div>
                <div>邀请好友各得5元算力金</div>
            </div>
            <UIcon name="material-symbols:chevron-right" />
            <span class="absolute right-0 top-1/4 h-1/2 w-px bg-gray-200"></span>
        </div>
        <div class="cb relative">
            <img src="/banner/icon-banner-menu-3.png" class="w-8 h-8" alt="" srcset="">
            <div>
                <div class="text-error">暖冬算力季</div>
                <div>首充100赠10现金余额</div>
            </div>
            <UIcon name="material-symbols:chevron-right" />
            <span class="absolute right-0 top-1/4 h-1/2 w-px bg-gray-200"></span>
        </div>
        <div class="cb relative">
            <img src="/banner/icon-banner-menu-4.png" class="w-8 h-8" alt="" srcset="">
            <div>
                <div>算力智能托管</div>
                <div>算力服务器托管与集群建设</div>
            </div>
            <UIcon name="material-symbols:chevron-right" />
        </div>
    </UContainer>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
.cb {
    font-weight: 600;
    font-size: 16px;
    z-index: 1;
    height: 108px;
    width: 100%;
    padding: 0;

    display: flex;
    justify-content: space-evenly;
    align-items: center;
    gap: 12;
}

.sub-text {
    color: #989898;
}
</style>