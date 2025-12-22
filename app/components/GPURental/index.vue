<template>
    <div class="gpu-rental-container mt-8">
        <!-- 主要内容区域：四个卡片使用 flex 布局 -->
        <div class="main-content flex gap-6 max-w-[90vw] mx-auto">
            <!-- 第一个卡片：左侧边栏（容器环境和卡型丰富） -->
            <UCard class="sidebar-card flex-1 text-left">
                <!-- 容器环境 -->
                <div class="mb-6">
                    <h3 class="text-lg font-semibold mb-2">容器环境</h3>
                    <p class="text-sm text-gray-600 mb-4">内置常见模型运行环境一键部署</p>
                    <div class="flex flex-wrap gap-2">
                        <UBadge v-for="framework in frameworks" :key="framework" color="primary" variant="soft"
                            size="lg">
                            {{ framework }}
                        </UBadge>
                    </div>
                </div>

                <!-- 卡型丰富 -->
                <div>
                    <h3 class="text-lg font-semibold mb-2">卡型丰富</h3>
                    <p class="text-sm text-gray-600 mb-4">支持多种异构显卡按小时租用</p>
                    <div
                        class="diagram-placeholder bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 text-center">
                        <div class="text-blue-600 font-semibold mb-2">JYGPU</div>
                        <div class="text-xs text-blue-500 space-y-1">
                            <div>METAX • Centurion</div>
                            <div>Ascend • Agent</div>
                            <div>工作流</div>
                        </div>
                    </div>
                </div>
            </UCard>

            <!-- 后三个GPU卡片使用 for 循环渲染 -->
            <UCard v-for="gpu in gpuList" :key="gpu.id" class="gpu-card flex-1 hover:shadow-lg transition-shadow">
                <div class="flex justify-between items-start mb-4">
                    <div>
                        <h3 class="text-2xl font-bold text-gray-900 mb-2">{{ gpu.name }}</h3>
                        <div class="flex items-center gap-4 text-sm text-gray-600">
                            <span>显存{{ gpu.vram }}</span>
                            <span>•</span>
                            <span>AI算力 {{ gpu.computePower }} FLOPS</span>
                        </div>
                    </div>
                    <div class="text-right">
                        <div class="text-sm text-gray-400 line-through mb-1">
                            ¥{{ gpu.originalPrice }}/时
                        </div>
                        <div class="text-2xl font-bold text-red-600">
                            ¥{{ gpu.price }}/时
                        </div>
                    </div>
                </div>

                <div class="mb-4">
                    <UButton :color="gpu.buttonColor" :variant="gpu.buttonVariant" size="lg" block>
                        <template v-if="gpu.buttonIcon" #leading>
                            <UIcon :name="gpu.buttonIcon" class="w-5 h-5" />
                        </template>
                        {{ gpu.buttonText }}
                    </UButton>
                </div>

                <div class="border-t pt-4">
                    <div class="flex flex-col gap-4 text-sm">
                        <div>
                            <div class="text-gray-500 mb-1">CPU</div>
                            <div class="font-semibold">{{ gpu.cpu }}</div>
                        </div>
                        <div>
                            <div class="text-gray-500 mb-1">内存</div>
                            <div class="font-semibold">{{ gpu.memory }}</div>
                        </div>
                        <div>
                            <div class="text-gray-500 mb-1">数据盘</div>
                            <div class="font-semibold">{{ gpu.disk }}</div>
                        </div>
                    </div>
                </div>
            </UCard>
        </div>
    </div>
</template>

<script setup lang="ts">
interface GPUItem {
    id: string
    name: string
    vram: string
    computePower: string
    originalPrice: string
    price: string
    buttonText: string
    buttonColor: 'primary' | 'secondary' | 'success' | 'warning' | 'error'
    buttonVariant: 'solid' | 'outline' | 'soft' | 'ghost'
    buttonIcon?: string
    cpu: string
    memory: string
    disk: string
}

const frameworks = ['PyTorch', 'TensorFlow', 'JAX', 'PaddlePaddle']

const gpuList: GPUItem[] = [
    {
        id: '4090',
        name: 'NVIDIA 4090',
        vram: '24GB',
        computePower: '330',
        originalPrice: '2.25',
        price: '1.80',
        buttonText: '免费用5小时',
        buttonColor: 'primary',
        buttonVariant: 'solid',
        buttonIcon: 'heroicons:gift',
        cpu: '15核',
        memory: '60GB',
        disk: '100GB'
    },
    {
        id: '4090-48g',
        name: 'NVIDIA 4090(48G)',
        vram: '48GB',
        computePower: '330',
        originalPrice: '2.85',
        price: '2.28',
        buttonText: '立即试用',
        buttonColor: 'primary',
        buttonVariant: 'solid',
        cpu: '15核',
        memory: '96GB',
        disk: '500GB'
    },
    {
        id: 'h20',
        name: 'NVIDIA H20',
        vram: '96GB',
        computePower: '148',
        originalPrice: '7.75',
        price: '6.20',
        buttonText: '企业福利',
        buttonColor: 'warning',
        buttonVariant: 'solid',
        buttonIcon: 'heroicons:currency-dollar',
        cpu: '24核',
        memory: '128GB',
        disk: '50GB'
    }
]
</script>

<style scoped lang="scss">
.gpu-rental-container {
    width: 100%;
}

.main-content {
    flex-wrap: wrap;

    @media (max-width: 1024px) {
        flex-direction: column;

        .sidebar-card {
            width: 100%;
        }

        .gpu-card {
            width: 100%;
        }
    }
}

.sidebar-card {
    height: fit-content;
    background: linear-gradient(180deg, #e6f1ff, #eeecfe)
}

.gpu-card {
    transition: all 0.3s ease;

    &:hover {
        transform: translateY(-2px);
    }
}

.diagram-placeholder {
    min-height: 120px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
</style>