<template>
    <!-- 主容器：左右两列 -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10">

        <!-- 左侧：大卡片 -->
        <div
            class="box1 bg-linear-to-bl dark:from-primary-700 from-primary-200 to-secondary-200 dark:to-secondary-700 rounded-3xl p-8 h-100">
            <div class="text-xl font-bold">满足企业级AI应用</div>
            <div class="text-xl font-bold">平台支持异构混合部署，突破大模型算力瓶颈</div>
            <div class="mt-4 text-sm text-toned">
                提供的主流镜像包括基础镜像、应用镜像、自定义镜像等，模型涵盖大语言模型（如DeepSeek、Qwen、Llama）、视觉模型（如Stable Diffusion）和多模态模型等。</div>
        </div>

        <!-- 右侧：2x2 网格 -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div class="border border-gray-100 rounded-3xl p-6 min-h-40">
                <div class="relative z-10">
                    <h3 class="text-xl font-bold mb-2">DeepSeek-R1</h3>
                    <div class="flex gap-2 mb-3">
                        <UBadge color="secondary" variant="soft" class="font-bold rounded-full">对话</UBadge>
                        <UBadge color="secondary" variant="soft" class="font-bold rounded-full">知识库</UBadge>
                    </div>
                    <p class="text-sm opacity-90">
                        开源且基于MIT协议，推理能力强，模块化支持中文理解、支持复杂任务
                    </p>
                </div>
                <!-- 装饰图片 -->
                <div class="absolute right-0 top-0 w-32 h-32 opacity-30">
                    <div class="w-full h-full bg-white/10 rounded-full blur-2xl"></div>
                </div>
            </div>
            <div class="border border-gray-100 rounded-3xl p-6 min-h-40">
                <div class="relative z-10">
                    <h3 class="text-xl font-bold mb-2">GLM-Z1</h3>
                    <div class="flex gap-2 mb-3">
                        <UBadge color="secondary" variant="soft" class="font-bold rounded-full">多语言对话</UBadge>
                        <UBadge color="secondary" variant="soft" class="font-bold rounded-full">智能客服</UBadge>
                    </div>
                    <p class="text-sm opacity-90">
                        推理速度快，性价比高，出能胜任DeepSeek-R1
                    </p>
                </div>
                <div class="absolute right-0 bottom-0 w-32 h-32 opacity-20">
                    <div class="w-full h-full bg-blue-400 rounded-full blur-2xl"></div>
                </div>
            </div>
            <div class="border border-gray-100 rounded-3xl p-6 min-h-40">
                <div class="relative z-10">
                    <h3 class="text-xl font-bold mb-2">Llama 4 Maverick</h3>

                    <div class="flex gap-2 mb-3">
                        <UBadge color="secondary" variant="soft" class="font-bold rounded-full">通用复写作</UBadge>
                        <UBadge color="secondary" variant="soft" class="font-bold rounded-full">图像识别</UBadge>
                    </div>
                    <p class="text-sm opacity-90">
                        混合专家架构，图像理解能力强，适合创意写作和通用助手
                    </p>
                </div>
                <div class="absolute left-0 bottom-0 w-32 h-32 opacity-20">
                    <div class="w-full h-full bg-purple-400 rounded-full blur-2xl"></div>
                </div>
            </div>
            <div class="border border-gray-100 rounded-3xl p-6 min-h-40">
                <div class="relative z-10">
                    <h3 class="text-xl font-bold mb-2">Qwen 2.5-VL</h3>
                    <div class="flex gap-2 mb-3">
                        <UBadge color="secondary" variant="soft" class="font-bold rounded-full">辅助设计</UBadge>
                        <UBadge color="secondary" variant="soft" class="font-bold rounded-full">智能编辑</UBadge>
                    </div>
                    <p class="text-sm opacity-90">
                        支持文本、视觉、音频等多种输入，能够生成高质量的图文内容
                    </p>
                </div>
                <div class="absolute right-0 top-0 w-32 h-32 opacity-20">
                    <div class="w-full h-full bg-cyan-400 rounded-full blur-2xl"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.box1 {
    // background: linear-gradient(180deg, #c0dbff, #d3e9ff 27%, #f5fdff);
    box-shadow: 0 0 1rem .06rem #e3e3e329;
    flex-shrink: 0;
    overflow: hidden;
    padding-top: 4.5rem;
    position: relative;
}

// .card {
//     background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//     position: relative;
//     overflow: hidden;
// }

// .card-blue {
//     background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
// }

// .card-light {
//     background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
//     color: #1e40af;
// }</style>