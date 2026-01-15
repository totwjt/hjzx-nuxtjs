<template>
    <div class="h-screen flex flex-col bg-gray-50">
        <!-- 顶部 Header -->
        <Menu class="shrink-0" />

        <!-- 主体区域 -->
        <div class="flex flex-1 min-h-0" style="min-height:calc(100vh - 65px)">
            <!-- 左侧导航 -->
            <aside class="w-56 border-r border-b border-gray-300 bg-white overflow-y-auto">
                <SideNav />
            </aside>

            <!-- 内容区 -->
            <main class="flex-1 overflow-y-auto p-6 ">
                <UBreadcrumb :items="breadcrumbItems">

                    <template #separator>
                        <span class="mx-2 text-muted">/</span>
                    </template>
                </UBreadcrumb>
                <div class="flex justify-start items-center">
                    <LazyAniLottie />
                    <div class="space-y-3">
                        <!-- manbanner 区域 -->

                        <!-- 标题和描述 -->
                        <div class="text-xl font-semibold text-gray-900">
                            {{ currentItem.title || currentItem.label }}
                        </div>
                        <div class="text-sm text-gray-600">
                            {{ currentItem.description }}
                        </div>
                    </div>

                </div>

                <USeparator class="py-4" color="neutral" />

                <!-- 路由页面 -->
                <NuxtPage />
            </main>

        </div>
    </div>
</template>

<script setup lang="ts">
import { lazy } from 'zod'

const items = ref([
    {
        label: '当前位置',
    },
    {
        label: '总览',
        to: '/console/overview',
    }
])

const route = useRoute()

// 拍平所有有 to 的项，便于查找
const flatNavItems = consoleNavigationItems.flat(2).filter((item): item is ConsoleNavItem => !!item.to)

const currentItem = computed(() => {
    // 先用手动指定的 key 匹配
    let item = flatNavItems.find(i => i.key && route.path.startsWith(i.to!))

    // 备选：如果没 key，就用路径精确匹配
    if (!item) {
        item = flatNavItems.find(i => i.to === route.path)
    }

    return item || flatNavItems.find(i => i.key === 'overview')! // 默认总览
})

// 面包屑
const breadcrumbItems = computed(() => {
    const items = [{ label: '控制台', to: '/console/overview' }]

    if (currentItem.value.group) {
        items.push({ label: currentItem.value.group, to: null })
    }

    items.push({ label: currentItem.value.label, to: route.path })

    return items
})
</script>