<template>
    <div class="bms-rental-container mt-8">

        <!-- tabs -->
        <div class="flex justify-between items-center pb-4">
            <UTabs size="md" :content="false" :items="tabsItems" variant="link" class="" />
            <div class="text-right"><a href="#" class="text-secondary text-sm font-bold"></a>
                <ULink raw to="/markets/bms" disabled class="text-secondary text-sm font-bold">查看完整价格列表</ULink>
            </div>
        </div>

        <!-- 主要内容区域：四个卡片使用 flex 布局 -->
        <div class="main-content flex gap-6 max-w-[90vw] mx-auto">
            <UCard :ui="{
                body: ' h-full flex flex-col'
            }" v-for="bms in bmsList" :key="bms.id" class="bms-card flex-1 hover:shadow-lg transition-shadow">
                <div class="flex flex-col justify-between items-center h-full">
                    <div class="text-left mb-4">
                        <h3 class="text-lg font-bold text-muted mb-2">{{ bms.title }}</h3>
                        <div class="text-sm">{{ bms.subtitle }}</div>
                        <div class="flex flex-wrap gap-1 my-2 justify-start items-center">
                            <UBadge v-for="tag in bms.tags" :key="tag" size="sm" icon="i-lucide-rocket" color="neutral" variant="outline">{{ tag }}</UBadge>
                        </div>

                        <USeparator />

                        <div class="mt-2">
                            <div class="text-sm text-gray-400 line-through">
                                ¥{{ bms.price.original }}/时
                                <UBadge color="warning" class="ml-4">{{ bms.price.discount }}</UBadge>
                            </div>
                            <div class="">
                                <span class="text-2xl font-bold text-red-600"> <span class="text-sm">¥</span> {{ bms.price.current }}</span> <span
                                    class="text-sm">/月</span>
                            </div>
                        </div>
                    </div>

                    <UButton disabled size="lg" block>立即租用</UButton>

                    <div class="flex flex-col justify-around gap-4 items-start text-sm mt-4 text-left">
                        <div v-for="spec in bms.specs" :key="spec">
                            <UIcon name="i-lucide-check" class="text-primary mr-2 size-5 font-black align-middle" />
                            {{ spec }}
                        </div>
                    </div>

                    <ContactAdvisor />
                </div>
            </UCard>
        </div>
    </div>
</template>

<script setup lang="ts">
/*----------------------------------------------------*\
｜                       tabs
\*----------------------------------------------------*/

import { tabsItems, bmsList } from './typs'

</script>

<style scoped lang="scss">
.bms-rental-container {
    width: 100%;
}

.main-content {
    flex-wrap: wrap;

    @media (max-width: 1024px) {
        flex-direction: column;

        .bms-card {
            width: 100%;
            height: 100%;
        }
    }
}

.bms-card {
    transition: all 0.3s ease;

    &:hover {
        transform: translateY(-2px);
    }
}

</style>