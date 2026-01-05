import { defineStore } from 'pinia'
import type { IGpuGroupList } from "./gpu.type";

export const useMyMarketsStore = defineStore('myMarketsStore', {
  state: () => ({
    gpuGroupList: [] as IGpuGroupList[],
    loading: false,

    selected: {
      gpuId: 0,
      type: 1 as 1 | 2 | 3,
      quantity: 1,
      unit: '时' as '时' | '天' | '月'
    },

    price: 0
  }),

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
      console.log('www', gpuId, type, quantity);
      if (!gpuId || !quantity) return

      this.loading = true
      try {
        const res = await $fetch<{ price: number }>(
          '/api/markets/calculatePrice',
          {
            params: {
              itemId: gpuId,
              type,
              quantity
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
