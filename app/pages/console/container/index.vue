<!-- pages/containers/index.vue -->

<template>
    <UCard>
        <UTable :columns="columns" :data="data || []" :loading="pending">

            <!-- 实例名称/ID 列 -->
            <template #name-cell="{ row }">
                <div class="flex flex-col">
                    <span class="font-medium text-blue-600">{{ row.original?.name }}</span>
                </div>
            </template>

            <!-- 状态列 -->
            <template #status-cell="{ row }">
                <UBadge :color="getStatusColor(row.original?.status)" variant="subtle" size="sm">
                    {{ getStatusText(row.original?.status) }}
                </UBadge>
            </template>

            <!-- 配置详情列 -->
            <template #config-cell="{ row }">
                <div class="flex flex-col gap-1 text-sm">
                    <span>{{ row.original?.config.gpu }}</span>
                    <span class="text-gray-600">{{ row.original?.config.cpu }}/{{ row.original?.config.memory }}</span>
                </div>
            </template>

            <!-- 存储列 -->
            <template #storage-cell="{ row }">
                <div class="flex flex-col gap-1 text-sm">
                    <span>系统盘 {{ row.original?.storage.system }}</span>
                    <span>数据盘 {{ row.original?.storage.data }}</span>
                </div>
            </template>

            <!-- 付费类型列 -->
            <template #paymentType-cell="{ row }">
                <div class="flex flex-col text-sm">
                    <span>{{ row.original?.paymentType.split('（')[0] }}</span>
                    <span class="text-gray-500 text-xs">{{ row.original?.paymentType.split('（')[1]?.replace('）', '')
                        }}</span>
                </div>
            </template>

            <!-- 创建时间列 -->
            <template #createdAt-cell="{ row }">
                <div class="text-sm">
                    {{ row.original?.createdAt }}
                </div>
            </template>

            <!-- 到期时间列 -->
            <template #expiredAt-cell="{ row }">
                <div class="text-sm">
                    {{ row.original?.expiredAt }}
                </div>
            </template>

            <!-- SSH列 -->
            <template #ssh-cell="{ row }">
                <div class="flex flex-col gap-2">
                    <div class="flex items-center gap-2 text-sm">
                        <span class="text-blue-600">ssh -p {{ row.original?.ssh.port }} {{ row.original?.ssh.user }}@{{
                            row.original?.ssh.host
                            }}</span>
                        <UButton icon="i-heroicons-clipboard-document" size="xs" color="gray" variant="ghost"
                            @click="copySshInfo(row.original?.ssh)" />
                    </div>
                    <div class="flex items-center gap-2 text-sm">
                        <span class="text-gray-600">密码: {{ row.original?.ssh.password }}</span>
                        <UButton icon="i-heroicons-eye" size="xs" color="gray" variant="ghost"
                            @click="showPassword(row.original?.ssh.password)" />
                    </div>
                </div>
            </template>

            <!-- 操作列 -->
            <template #actions-cell="{ row }">
                <UButton color="primary" variant="link" size="sm">
                    修改
                </UButton>
            </template>
        </UTable>
    </UCard>
</template>

<script setup lang="ts">
import type { ContainerInstance } from './types';
import {
    columns,
    getStatusColor,
    getStatusText
} from "./constance";

// 获取数据

const { data, pending } = useFetch('/api/console/container/list');

// 复制SSH信息
const copySshInfo = (ssh: ContainerInstance['ssh']) => {
    const sshCommand = `ssh -p ${ssh.port} ${ssh.user}@${ssh.host}`;
    navigator.clipboard.writeText(sshCommand);
    // 这里可以添加 toast 提示
};

// 显示密码
const showPassword = (password: string) => {
    // 这里可以实现密码显示逻辑
    alert(`密码: ${password}`);
};
</script>
