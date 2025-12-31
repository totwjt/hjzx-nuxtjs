<template>
    <!-- 主容器：两列布局 -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-16">

        <!-- 左侧：容器化算力租赁 -->
        <div class="space-y-4">
            <!-- 顶部大卡片 -->
            <div
                class="bg-linear-to-br from-primary-200 to-secondary-200 rounded-xl p-8 relative overflow-hidden min-h-40">
                <h2 class="text-2xl font-bold text-gray-800 mb-3">容器化算力租赁</h2>
                <p class="text-sm text-gray-700 leading-relaxed">
                    基于容器虚拟化技术的轻量级计算资源，通过容器封装实现应用隔离与快速部署。具备弹性伸缩、高资源利用率和跨平台迁移的特性。
                </p>

            </div>

            <!-- 底部4个特性卡片 - 2x2网格 -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <!-- 卡片1 -->
                <div
                    class="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div class="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-4">
                        <svg class="w-6 h-6 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z">
                            </path>
                        </svg>
                    </div>
                    <h3 class="font-bold text-gray-800 mb-2">弹性扩展与敏捷部署</h3>
                    <p class="text-sm text-gray-600">支持按需动态调整资源分配，适应业务负载变化</p>
                </div>

                <!-- 卡片2 -->
                <div
                    class="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div class="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-4">
                        <svg class="w-6 h-6 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10">
                            </path>
                        </svg>
                    </div>
                    <h3 class="font-bold text-gray-800 mb-2">微服务架构友好</h3>
                    <p class="text-sm text-gray-600">支持分布式和异构计算，便于独立部署</p>
                </div>

                <!-- 卡片3 -->
                <div
                    class="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div class="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-4">
                        <svg class="w-6 h-6 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                        </svg>
                    </div>
                    <h3 class="font-bold text-gray-800 mb-2">算力池化优化</h3>
                    <p class="text-sm text-gray-600">将异构算力资源统一管理，实现资源的按需申请与使用</p>
                </div>

                <!-- 卡片4 -->
                <div
                    class="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div class="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-4">
                        <svg class="w-6 h-6 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z">
                            </path>
                        </svg>
                    </div>
                    <h3 class="font-bold text-gray-800 mb-2">轻量级隔离</h3>
                    <p class="text-sm text-gray-600">通过控制组等技术实现轻量级隔离，减少资源消耗</p>
                </div>
            </div>
        </div>

        <!-- 右侧：裸金属算力租赁 -->
        <div class="space-y-4">
            <!-- 顶部大卡片 -->
            <div
                class="bg-linear-to-bl from-primary-200 to-secondary-200 rounded-xl p-8 relative overflow-hidden min-h-40">
                <h2 class="text-2xl font-bold text-gray-800 mb-3">裸金属算力租赁</h2>
                <p class="text-sm text-gray-700 leading-relaxed">
                    直接运行在GPU服务器上的算力资源，具备高计算性能、资源独占、高稳定性和强安全性的特点。适合对性能和安全性要求极高的大模业务场景。
                </p>
                <!-- 装饰圆圈 -->
                <div class="absolute -right-12 -bottom-12 w-48 h-48 bg-white/40 rounded-full blur-3xl"></div>
                <div class="absolute right-12 -top-12 w-64 h-64 bg-purple-400/20 rounded-full blur-3xl"></div>
            </div>

            <!-- 底部4个特性卡片 - 2x2网格 -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <!-- 卡片1 -->
                <div
                    class="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div class="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center mb-4">
                        <svg class="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                        </svg>
                    </div>
                    <h3 class="font-bold text-gray-800 mb-2">高性能算力输出</h3>
                    <p class="text-sm text-gray-600">无虚拟化开销，适合密集型AI任务</p>
                </div>

                <!-- 卡片2 -->
                <div
                    class="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div class="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center mb-4">
                        <svg class="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z">
                            </path>
                        </svg>
                    </div>
                    <h3 class="font-bold text-gray-800 mb-2">高安全性</h3>
                    <p class="text-sm text-gray-600">物理机隔离，适合对安全要求较高的场景</p>
                </div>

                <!-- 卡片3 -->
                <div
                    class="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div class="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center mb-4">
                        <svg class="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4">
                            </path>
                        </svg>
                    </div>
                    <h3 class="font-bold text-gray-800 mb-2">适合高负载应用</h3>
                    <p class="text-sm text-gray-600">对性能要求极高的AI应用，如深度学习等</p>
                </div>

                <!-- 卡片4 -->
                <div
                    class="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div class="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center mb-4">
                        <svg class="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                        </svg>
                    </div>
                    <h3 class="font-bold text-gray-800 mb-2">算力资源独占</h3>
                    <p class="text-sm text-gray-600">避免算力资源争抢，确保AI应用运行的稳定性</p>
                </div>
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">

</script>

<style scoped></style>