<!-- pages/containers/index.vue -->

<template>
    <UCard>
        <UTable v-model:column-pinning="columnPinning" :columns="columns" :data="data || []" :loading="pending">

            <!-- 实例名称/ID 列 -->
            <template #name-cell="{ row }">
                <div class="flex items-center">
                    <div class="font-medium text-secondary-600">{{ row.original?.name }}</div>
                    <UButton class="cursor-pointer" icon="tabler:copy" size="xs" color="primary" variant="ghost"
                        @click="handleCopy(row.original?.name)" />
                </div>
            </template>

            <!-- 状态列 -->
            <template #status-cell="{ row }">
                <UBadge :icon="getIcon(row.original?.status)" :color="getStatusColor(row.original?.status)"
                    variant="soft" size="lg">
                    {{ getStatusText(row.original?.status) }}
                </UBadge>
            </template>

            <!-- 配置详情列 -->
            <template #config-cell="{ row }">
                <div class="flex flex-col gap-1 text-sm">
                    <span>{{ row.original?.productName }}</span>
                </div>
            </template>

            <!-- 存储列 -->
            <template #storage-cell="{ row }">
                <div class="flex flex-col gap-1 text-sm">
                    <pre>{{ row.original?.storageName }}</pre>
                </div>
            </template>

            <!-- 付费类型列 -->
            <template #paymentType-cell="{ row }">
                <UBadge variant="soft" color="secondary">按一小时付费</UBadge>
            </template>

            <!-- 创建时间列 -->
            <template #createdAt-cell="{ row }">
                <div class="text-sm">
                    {{ row.original?.rentalStartTime }}
                </div>
            </template>

            <!-- 到期时间列 -->
            <template #expiredAt-cell="{ row }">
                <div class="text-sm">
                    {{ row.original?.rentalEndTime }}
                </div>
            </template>

            <!-- SSH列 -->
            <template #ssh-cell="{ row }">
                <div class="flex flex-col gap-2">
                    <div class="flex items-center gap-2 text-sm">
                        <span class="text-secondary-600">
                            ssh -p {{ row.original?.sshPort }} {{ row.original?.sshUserName
                            }}@{{ row.original?.sshIpAddress }}
                        </span>
                        <UButton class="cursor-pointer" icon="tabler:copy" size="xs" color="primary" variant="ghost"
                            @click="copySshInfo(row.original?.ssh)" />
                    </div>
                    <div class="flex items-center gap-2 text-sm">
                        <span class="text-gray-600">密码: ************</span>
                        <UButton class="cursor-pointer" icon="tabler:copy" size="xs" color="primary" variant="ghost"
                            @click="copyPassword(row.original?.sshPassword)" />
                    </div>
                </div>
            </template>
        </UTable>
    </UCard>
</template>

<script setup lang="ts">
import type { ContainerInstance } from './types';

import {
    columns,
    getIcon,
    getStatusColor,
    getStatusText
} from "./constance";

const toast = useToast()

// 获取数据
const { data, pending } = useFetch<
    ContainerInstance[]
>('/api/console/container/list', {
    query: {
        instanceType: 0
    }
});

const columnPinning = ref({
    left: ['name'],
    right: ['ssh']
})

// 复制name
const handleCopy = (txt: string) => {
    navigator.clipboard.writeText(txt);

    toast.add({
        icon: 'tabler:cash-edit',
        title: '成功',
        description: '复制到到剪切板',
        color: 'primary'
    })
};

// 复制SSH信息
const copySshInfo = (ssh: ContainerInstance['ssh']) => {
    const sshCommand = `ssh -p ${ssh.port} ${ssh.user}@${ssh.host}`;
    navigator.clipboard.writeText(sshCommand);

    toast.add({
        icon: 'tabler:cash-edit',
        title: '成功',
        description: '复制到到剪切板',
        color: 'primary'
    })
};

// 显示密码
const copyPassword = (password: string) => {
    navigator.clipboard.writeText(password);
    toast.add({
        icon: 'tabler:cash-edit',
        title: '成功',
        description: '复制到到剪切板',
        color: 'primary'
    })
};
</script>
