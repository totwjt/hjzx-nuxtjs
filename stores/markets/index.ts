import { defineStore } from 'pinia'
import type { IGpuGroupList } from "./gpu.type";
import type { IImage } from '~/types/markets/index'

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
    ｜                       选择镜像 & 端口
    \*----------------------------------------------------*/

    selectedImage: null as IImage | null,
    customPorts: [] as number[]

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
    },
    // 镜像名称快捷获取
    selectedImageName(): string {
      return this.selectedImage?.name || '未选择镜像'
    },
    // 新增：计算后的 vCPU 和内存（乘以 quantity）
    totalCpuCores(): number {
      return (this.selectItem?.cpuCores ?? 0) * this.selected.quantity
    },
    totalMemoryGb(): number {
      return (this.selectItem?.memoryGb ?? 0) * this.selected.quantity
    },
  },

  actions: {

    /*----------------------------------------------------*\
    ｜                       gpu
    \*----------------------------------------------------*/
    async fetchGpuList() {
      const rows = await $fetch<{ rows: IGpuGroupList[] }>(
        '/api/markets/gpuList'
      )
      this.gpuGroupList = rows
      return rows
    },

    /*----------------------------------------------------*\
    ｜                       选择镜像 & 端口
    \*----------------------------------------------------*/

    setSelectedImage(image: IImage | null) {
      this.selectedImage = image
    },

    setCustomPorts(ports: typeof this.customPorts) {
      this.customPorts = ports
    },

    /*----------------------------------------------------*\
    ｜                       动态价格
    \*----------------------------------------------------*/

    async calculatePrice() {
      const { gpuId, type, quantity } = this.selected

      if (!gpuId || !quantity) return

      this.loading = true
      try {
        this.price = await $fetch<number>(
          '/api/markets/calculatePrice',
          {
            params: {
              templateId: gpuId,
              gpuCount: quantity,
              rentalDurationHours: this.rentalDurationHours // 租赁时长(1:  一小时;    24: 1天;    720: 1个月)
            }
          }
        )

      } finally {
        this.loading = false
      }
    },

    async submit() {

      return await $fetch('/api/markets/orderSubmit', {
        method: 'POST',
        body: {}
      })
    }

  }
})
