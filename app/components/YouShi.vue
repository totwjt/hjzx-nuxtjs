<script setup lang="ts">
const links = ref([
    {
        label: 'Get started',
        color: 'neutral'
    },
    {
        label: 'Learn more',
        color: 'neutral',
        variant: 'subtle',
        trailingIcon: 'i-lucide-arrow-right'
    }
])
</script>

<template>
    <UPageCTA :ui="{
        container: 'py-0!'
    }" title="高性能GPU服务器集群" orientation="horizontal" :links="[]" class="cta cta1">
        <img src="/index/advantage-1.png" width="320" height="364" alt="Illustration" class="w-full rounded-lg" />
        <template #description>
            <div class="text-sm">
                <div>提供多种高性能GPU型号，如 <span class="text-primary font-black">NVIDIA A100、H100、H800 </span>等，具备强大的计算能力和高显存带宽。支持FP32、TF32等多种混合精度计算，能够满足不同精度需求的计算任务，提升计算效率和资源利用率。同时，优化了对稀疏矩阵运算的支持，减少了AI模型运算中的冗余计算。
                </div>
                <div class="mt-4">支持根据项目需求弹性扩展或收缩算力资源，能够灵活应对不同阶段的算力需求波动，确保资源的高效利用。为用户提供定制化的算力解决方案，满足不同行业和应用场景的特定需求。
                </div>
            </div>
        </template>
    </UPageCTA>

    <UPageCTA :ui="{
        container: 'py-0!'
    }" reverse title="灵活的算力租赁模式" orientation="horizontal" :links="[]" class="cta cta2">
        <img src="/index/advantage-1.png" width="320" height="364" alt="Illustration" class="w-full rounded-lg" />
        <template #description>
            <div class="text-sm">
                <div>提供按 <span class="text-secondary font-semibold"> 小时、按天、按月</span>按等多种灵活的算力租赁方式，用户可以根据实际需求选择合适的计费模式，避免算力资源浪费，降低使用成本。
                </div>
                <div class="mt-4">支持根据项目需求弹性扩展或收缩算力资源，能够灵活应对不同阶段的算力需求波动，确保资源的高效利用。为用户提供定制化的算力解决方案，满足不同行业和应用场景的特定需求。
                </div>
            </div>
        </template>
    </UPageCTA>
</template>

<style lang="scss" scoped>
.cta {
    border: none;
    box-shadow: none;

    padding: 0;
}

.cta2 {
    padding: 0;
}
</style>