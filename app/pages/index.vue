<template>
    <div>
        <SwiperUi />
        <UContainer>
            <ContentBanner />

            <!-- GPU服务器容器实例租用 gpu server container instance rental -->
            <div>
                <div class=" w-full text-center mt-20 text-2xl  font-medium ">GPU服务器容器实例租用</div>
                <div class="w-full text-center desc text-sm font-light mt-4 hidden lg:inline-block">
                    仅需两步，即可拥有一台高性能GPU服务器容器实例云主机，秒级拉取AI镜像，轻松开展智算工作！
                </div>

                <GPURental />

                <h2 class="w-full text-center mt-20 text-2xl  font-medium">算力强劲的裸金属服务器租用</h2>
                <p class="w-full text-center desc text-sm font-light mt-4 hidden lg:inline-block">
                    裸金属形式交付，提供专属算力资源，适配企业级AI服务、深度学习等场景</p>

                <BMSRental />

                <!-- ad-banner -->
                <AdBanner />

                <h2 class="w-full text-center mt-20 text-2xl  font-medium">丰富的模型与镜像可供选择</h2>
                <p class="w-full text-center desc text-sm font-light mt-4 hidden lg:inline-block">
                    极智算平台预设多种热门镜像与AI模型，结合容器的快速拉起特性，用户零门槛可一键部署，在几分钟内启动一个预置的AI环境
                </p>
                <Model />

                <h2 class="w-full text-center mt-20 text-2xl  font-medium">极智算平台优势</h2>
                <p class="w-full text-center desc text-sm font-light mt-4 hidden lg:inline-block">
                    ①种类多：从入门级GPU到专业GPU全覆盖，②价格实惠：同类产品价格最优，③灵活租赁：可按小时、按天、按月等方式租赁
                </p>

                <YouShi />

                <h2 class="w-full text-center mt-20 text-2xl  font-medium">丰富多样的算力交付形式</h2>
                <p class="w-full text-center desc text-sm font-light mt-4 hidden lg:inline-block">
                    通过容器化和裸金属两种主要方式，为用户提供灵活、高效且高性能的算力租赁服务，以满足从弹性计算到高性能计算的不同业务需求，实现算力资源的高效利用和优化配置。
                </p>

                <JiaoFu />
            </div>


        </UContainer>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: 'menu-nav'
})

</script>

<style lang="scss"></style>