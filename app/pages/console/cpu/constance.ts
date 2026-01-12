// 表格列配置
export const columns = [
    {
        accessorKey: 'name',
        header: '实例名称/ID',
    },
    {
        accessorKey: 'status',
        header: '状态',
    },
    {
        accessorKey: 'config',
        header: '配置详情',
    },
    {
        accessorKey: 'storage',
        header: '存储',
    },
    {
        accessorKey: 'paymentType',
        header: '付费类型',
    },
    {
        accessorKey: 'createdAt',
        header: '创建时间',
    },
    {
        accessorKey: 'expiredAt',
        header: '到期时间',
    },
    {
        accessorKey: 'ssh',
        header: 'SSH',
    },
    {
        accessorKey: 'actions',
        header: '',
    }
];

// 状态标签配置
export const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
        0: 'warning',
        1: 'success',
        2: 'error',
        3: 'neutral',
        4: 'error',
    };
    return colors[status] || 'error';
};

// 实例状态：0-创建中, 1-运行中, 2-已停止, 3-已删除, 4-错误
export const getStatusText = (status: string) => {
    const texts: Record<string, string> = {
        0: '创建中',
        1: '运行中',
        2: '已停止',
        3: '已删除',
        4: '错误',
    };
    return texts[status] || status;
};

export const getIcon = (status: string) => {
    const texts: Record<string, string> = {
        0: 'tabler:world-exclamation',
        1: 'tabler:world',
        2: 'tabler:world-bolt',
        3: 'tabler:world-cancel',
        4: 'tabler:world-x',
    };
    return texts[status] || status;
};