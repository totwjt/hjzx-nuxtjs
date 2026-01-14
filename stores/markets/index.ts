import { defineStore } from 'pinia'
import type { IGpuGroupList } from "./gpu.type";
import type { IImage, normalizePorts } from '~/types/markets/index'
import { templateLiteral } from 'zod';

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

    templateType: 0 | 1 | 2,

    /*----------------------------------------------------*\
    ｜                       租赁时常
    \*----------------------------------------------------*/
    rentalDurationHours: 1,  // 租赁时常

    /*----------------------------------------------------*\
    ｜                       价格
    \*----------------------------------------------------*/
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
    _imageDefaultPorts(state): string[] {
      const image = state.selectedImage
      if (!image) return []

      const ports = image.defaultPorts
      if (Array.isArray(ports)) return ports

      try {
        const parsed = JSON.parse(ports)
        return Array.isArray(parsed) ? parsed : []
      } catch {
        return []
      }
    },
    // 选择镜像的默认端口号
    defaultPorts() {
      return this._imageDefaultPorts
    }
  },

  actions: {

    /*----------------------------------------------------*\
    ｜                       gpu
    \*----------------------------------------------------*/
    async fetchGpuList() {
      const rows = await $fetch<{ rows: IGpuGroupList[] }>(
        '/api/markets/gpuList', {
        query: {
          type: this.templateType
        }
      })

      this.gpuGroupList = rows
      return rows
    },

    /*----------------------------------------------------*\
    ｜                       选择镜像 & 端口
    \*----------------------------------------------------*/

    setSelectedImage(image: IImage | null) {
      this.selectedImage = image
      this.defaultPorts = image?.defaultPorts || []
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
        const { finalPrice } = await $fetch<number>(
          '/api/markets/calculatePrice',
          {
            params: {
              templateId: gpuId,
              gpuCount: quantity,
              rentalDurationHours: this.rentalDurationHours // 租赁时长(1:  一小时;    24: 1天;    720: 1个月)
            }
          }
        )

        this.price = finalPrice

      } finally {
        this.loading = false
      }
    },

    async submit() {
      return await $fetch('/api/markets/orderSubmit', {
        method: 'POST',
        body: this._buildSubmitParams()
      })
    },

    // post params:
    //       {
    //     "rentalDurationHours": 1,
    //     "packageTemplateItemId": 1,
    //     "gpuCount": 7,
    //     "resourceTemplateId": 1,
    //     "customPorts": "22,8888"
    // }
    _buildSubmitParams() {
      if (!this.selectedImage?.id) {
        throw new Error('未选择镜像')
      }

      return {
        rentalDurationHours: this.rentalDurationHours,
        packageTemplateItemId: this.selected.gpuId,
        gpuCount: this.selected.quantity,
        resourceTemplateId: this.selectedImage.id,
        customPorts: this.customPorts.join(',')
      }
    },

    /** -----------------------------
     *  提交前校验（不发请求）
     *  ----------------------------- */

    validateBeforeSubmit() {
      if (!this.selectedImage?.id) {
        return {
          ok: false,
          message: '请选择一个镜像'
        }
      }

      return { ok: true }
    },

    setTemplateType(type: 0 | 1 | 2) {
      this.templateType = type
    },

    resetByTemplateType() {

      // 根据模板类型做一次状态归零 / 调整
      this.selected = {
        gpuId: 0,
        type: 1 as 1 | 2 | 3,
        quantity: this.templateType == 1 ? 1 : 0,
        unit: '时' as '时' | '天' | '月'
      }

      this.selectedImage = null
      this.customPorts = []
      this.price = 0
    }
  }
})
