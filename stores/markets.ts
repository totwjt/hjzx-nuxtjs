import { defineStore } from 'pinia'
/**
 * 套餐
 */
export interface IGpuGroupList {
  /**
   * 算例值
   */
  aiPerformanceTflops: string;
  /**
   * cpu核心
   */
  cpuCores: number;
  /**
   * 数据盘大小
   */
  dataDiskGb: number;
  /**
   * 描述
   */
  description: null;
  /**
   * gpu显存
   */
  gpuMemory: number;
  /**
   * gpu规格主键
   */
  gpuSpecsId: number;
  /**
   * 套餐模板主键
   */
  id: number;
  /**
   * gpu闲置数量
   */
  idleGpuCount: number;
  items: Item[];
  /**
   * 内存大小
   */
  memoryGb: number;
  /**
   * 套餐名称
   */
  name: string;
  /**
   * 系统盘大小
   */
  systemDiskGb: number;
  [property: string]: any;
}

export interface Item {
  /**
   * 带宽
   */
  bandwidthMbps: number;
  /**
   * gpu个数
   */
  gpuCount: number;
  /**
   * 子表主键
   */
  id: number;
  /**
   * 套餐模板主键
   */
  packageTemplateId: number;
  /**
   * 天价格
   */
  pricePerDay: string;
  /**
   * 小时价格
   */
  pricePerHour: string;
  /**
   * 月价格
   */
  pricePerMonth: string;

  [property: string]: any;
}
export const useMyMarketsStore = defineStore('myMarketsStore', {

  state: () => ({
    gpuGroupList: null as IGpuGroupList[],
    selectGpu: null as IGpuGroupList,
  }),
  getters: {
    canSubmit: (state) => {
      return !!state.selectGpu
    }
  },
  actions: {
    async gpuListAction() {
      const { rows } = await $fetch<{
        code: number,
        rows: IGpuGroupList[]
      }>('/api/markets/gpuList')

      this.gpuGroupList = rows
    }
  }
})
