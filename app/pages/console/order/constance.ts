
export const columns = [
    {
        accessorKey: 'orderNo',
        header: '订单号',
    },
    {
        accessorKey: 'createdAt',
        header: '创建时间',
    },
    {
        accessorKey: 'productName',
        header: '产品名称',
    },
    {
        accessorKey: 'billingMethod',
        header: '计费方式',
    },
    {
        accessorKey: 'orderType',
        header: '订单类型',
    },
    {
        accessorKey: 'status',
        header: '订单状态',
    },
    {
        accessorKey: 'amount',
        header: '订单金额',
    },
    {
        accessorKey: 'actions',
        header: '操作',
    }
];

// 状态配置 0-待支付, 1-已支付, 2-已取消, 3-已退款
export const getStatusConfig = (status: string | number) => {
    const configs = [
        { color: 'error', text: '待支付', icon: 'i-heroicons-clock' },
        { color: 'success', text: '已支付', icon: 'i-heroicons-check-circle' },
        { color: 'warning', text: '已取消', icon: 'i-heroicons-x-circle' },
        { color: 'info', text: '已退款', icon: 'i-heroicons-arrow-path' }
    ];
    return configs[status];
};