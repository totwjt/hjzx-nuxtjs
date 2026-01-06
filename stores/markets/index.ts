import { defineStore } from 'pinia'
import type { IGpuGroupList } from "./gpu.type";

export const useMyMarketsStore = defineStore('myMarketsStore', {
  state: () => ({
    /*----------------------------------------------------*\
    ｜                       选择配置
    \*----------------------------------------------------*/
    gpuGroupList: [] as IGpuGroupList[],
    loading: false,

    selected: {
      gpuId: 0,
      type: 1 as 1 | 2 | 3,
      quantity: 1,
      unit: '时' as '时' | '天' | '月'
    },

    rentalDurationHours: 1,  // 租赁时常
    price: 0,

    /*----------------------------------------------------*\
    ｜                       配置镜像
    \*----------------------------------------------------*/
  }),

  getters: {
    selectItem: (state) => {
      return state.gpuGroupList.find(item => item.id === state?.selected?.gpuId)
    },
    idleGpuCount() {
      return this.selectItem?.idleGpuCount ?? 0
    },
    f16Tflops() {
      return this.selectItem?.f16Tflops ?? 0
    },
    gpuMemory() {
      return this.selectItem?.gpuMemory ?? 0
    }
  },

  actions: {
    async fetchGpuList() {
      const { rows } = await $fetch<{ rows: IGpuGroupList[] }>(
        '/api/markets/gpuList'
      )
      this.gpuGroupList = rows
      return rows
    },

    async calculatePrice() {
      const { gpuId, type, quantity } = this.selected

      if (!gpuId || !quantity) return

      this.loading = true
      try {
        const res = await $fetch<{ price: number }>(
          '/api/markets/calculatePrice',
          {
            params: {
              templateId: gpuId,
              gpuCount: quantity,
              rentalDurationHours: this.rentalDurationHours // 租赁时长(1:  一小时;    24: 1天;    720: 1个月)
            }
          }
        )
        this.price = res.price
      } finally {
        this.loading = false
      }
    }
  }
})
