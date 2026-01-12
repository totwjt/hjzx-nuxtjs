export default defineEventHandler(async (event) => {

  const id = event.context.params?.id

  if (!id) {
    throw createError({
      statusCode: 404,
      statusMessage: '订单不存在'
    })
  }

  return {
    orderNo: '2010560186611179520',
    productName: 'NVIDIA RTX 4090 24G * 1 / vCPU: 100核 / 内存: 64G / 系统盘: nullG / 数据盘: 500G',
    orderTypeStr: '新购容器实例',
    actualAmount: null,
    status: 0,
    statusStr: '待支付',
    createdAt: '2026-01-12 11:51:18',
    paidAt: null,
    rentalDurationHours: 1,
    gpuCount: 1,
    customPorts: '6006',
    cpuCores: 100,
    memoryGb: 64,
    systemDiskGb: null,
    dataStorageGb: 500,
    selectedPricePerHour: 3
  }
})
