
export const columns = [
    {
        accessorKey: 'orderNo',
        header: '订单号',
    },
    {
        accessorKey: 'createdAt',
        header: '订单创建时间',
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

// 状态配置
export const getStatusConfig = (status: string) => {
    const configs: Record<string, { color: string; text: string; icon: string }> = {
        paid: { color: 'green', text: '已支付', icon: 'i-heroicons-check-circle' },
        unpaid: { color: 'yellow', text: '待支付', icon: 'i-heroicons-clock' },
        cancelled: { color: 'gray', text: '已取消', icon: 'i-heroicons-x-circle' },
        refunded: { color: 'red', text: '已退款', icon: 'i-heroicons-arrow-path' }
    };
    return configs[status] || configs.unpaid;
};