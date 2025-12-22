<template>

    <Menu />
    <Swiper />
    <UContainer>
        <ContentBanner />

        <!-- GPU服务器容器实例租用 gpu server container instance rental -->
        <div class="text-center">
            <h2 class="mt-20 text-2xl  font-medium">GPU服务器容器实例租用</h2>
            <div class="desc text-sm font-light mt-4 hidden lg:inline-block">
                仅需两步，即可拥有一台高性能GPU服务器容器实例云主机，秒级拉取AI镜像，轻松开展智算工作！
            </div>
            <GPURental />

            <h2 class="mt-20 text-2xl  font-medium">算力强劲的裸金属服务器租用</h2>
            <p class="desc text-sm font-light mt-4 hidden lg:inline-block">裸金属形式交付，提供专属算力资源，适配企业级AI服务、深度学习等场景</p>
            <BMSRental />
        </div>
    </UContainer>
</template>


<style lang="scss">
.title {}
</style>