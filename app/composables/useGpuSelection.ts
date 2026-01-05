import type { IGpuGroupList, IGpuItem } from '@/stores/markets/gpu.type'
import { useMyMarketsStore } from '@/stores/markets'

export type BillingType = 1 | 2 | 3
export type BillingUnit = '时' | '天' | '月'

export function useGpuSelection() {
  const marketsStore = useMyMarketsStore()

  /** ---------------- 基础选择状态 ---------------- */

  const gpuId = ref<number>(0)
  const itemId = ref<number>(0)

  const type = ref<BillingType>(1)
  const unit = ref<BillingUnit>('时')
  const quantity = ref<number>(1)

  /** ---------------- 单价（UI 使用） ---------------- */

  const pricePerUnit = ref<number>(0)

  /** ---------------- 派生：总价展示 ---------------- */

  const totalPriceText = computed(() => {
    if (!marketsStore.price) return `¥0 / ${unit.value}`
    return `¥${marketsStore.price} / ${unit.value}`
  })

  /** ---------------- 初始化首选 GPU ---------------- */

  function initByGpuList(list: IGpuGroupList[]) {
    if (!list?.length) return

    const firstGpu = list[0]
    const firstItem = firstGpu.items?.[0]
    if (!firstItem) return

    selectGpu({
      gpuGroupId: firstGpu.id,
      item: firstItem,
      type: 1
    })
  }

  /** ---------------- 选择 GPU + 计费方式 ---------------- */

  function selectGpu(payload: {
    gpuGroupId: number
    item: IGpuItem
    type: BillingType
  }) {

    gpuId.value = payload.gpuGroupId
    itemId.value = payload.item.id
    type.value = payload.type
    quantity.value = 1

    switch (payload.type) {
      case 1:
        unit.value = '时'
        pricePerUnit.value = Number(payload.item.pricePerHour)
        break
      case 2:
        unit.value = '天'
        pricePerUnit.value = Number(payload.item.pricePerDay)
        break
      case 3:
        unit.value = '月'
        pricePerUnit.value = Number(payload.item.pricePerMonth)
        break
    }

    syncToStore()
  }

  const UnitToBillingTypeMap: Record<BillingUnit, BillingType> = {
    '时': 1,
    '天': 2,
    '月': 3
  }

  function unitToBillingType(unit: BillingUnit): BillingType {
    return UnitToBillingTypeMap[unit]
  }

  function clickSelectGpuCard(_gid, _price, _unit) {
    gpuId.value = _gid
    type.value = unitToBillingType(_unit)
    unit.value = _unit

    syncToStore()
  }

  /** ---------------- 选择数量 ---------------- */

  function selectQuantity(count: number) {
    quantity.value = count
    syncToStore()
  }

  /** ---------------- 同步到 Store 并算价 ---------------- */

  function syncToStore() {
    marketsStore.selected.gpuId = gpuId.value
    marketsStore.selected.type = type.value
    marketsStore.selected.quantity = quantity.value
    marketsStore.selected.unit = unit.value

    marketsStore.calculatePrice()
  }

  return {
    // state
    gpuId,
    itemId,
    type,
    unit,
    quantity,
    pricePerUnit,

    // getters
    totalPriceText,

    // actions
    clickSelectGpuCard,
    initByGpuList,
    selectGpu,
    selectQuantity
  }
}