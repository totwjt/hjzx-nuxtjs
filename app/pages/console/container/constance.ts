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
        running: 'green',
        stopped: 'red',
        pending: 'yellow'
    };
    return colors[status] || 'gray';
};

export const getStatusText = (status: string) => {
    const texts: Record<string, string> = {
        running: '运行中',
        stopped: '已停止',
        pending: '待启动'
    };
    return texts[status] || status;
};