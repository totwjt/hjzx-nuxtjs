import { defineStore } from 'pinia'
import type { IGpuGroupList, IGpuItem } from "./gpu.type";

export const useMyMarketsStore = defineStore('myMarketsStore', {

  state: () => ({
    loading: false,

    gpuGroupList: [] as IGpuGroupList[],
    selectGpu: {} as IGpuGroupList,

    // 实时价格参数：
    unit: '',
    selectedGPU: 0,   // 套餐子模板ID
    type: 1 | 2 | 3,     // 1-按小时计费，2-按天计费，3-按月计费
    quantity: 0,  // 数量

    price: 0,
  }),
  getters: {
  },
  actions: {
    async gpuListAction() {
      const { rows } = await $fetch<{
        code: number,
        rows: IGpuGroupList[]
      }>('/api/markets/gpuList')

      this.gpuGroupList = rows

      return rows
    },

    selectGPU(item: IGpuItem) {
      const { id, type, quantity, unit } = item
      console.log('selectGPU', item);
      this.selectedGPU = id;
      this.type = 1;
      this.quantity = 1;
      this.unit = unit || '时'

      // this.selectGpu = item
    },

    /** 实时价格计算 */
    async calculatePrice() {
      if (!this.selectedGPU || !this.type || !this.quantity) return

      this.loading = true
      try {
        const res = await $fetch<{
          price: number
        }>('/api/markets/calculatePrice', {
          params: {
            itemId: this.selectedGPU,
            type: this.type,
            quantity: this.quantity
          }
        })

        this.price = res.price
      } finally {
        this.loading = false
      }
    },

    async initWatch() {
      console.log('initWatch', 123);
      watch(
        () => [this.selectedGPU, this.type, this.quantity],
        () => {
          this.calculatePrice()
        }, {
        immediate: true
      })
    }
  }
})
