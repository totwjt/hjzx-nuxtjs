/**
 * 全局类型定义
 * 用于存放业务相关的 TypeScript 类型定义
 */

// 用户相关类型
export interface User {
  id: number
  username: string
  email: string
  avatar?: string
  role: 'admin' | 'user'
  createdAt: string
  updatedAt: string
}

// 算力资源类型
export interface ComputeResource {
  id: number
  name: string
  type: string
  price: number
  specs: {
    cpu: string
    memory: string
    gpu?: string
  }
  status: 'available' | 'occupied' | 'maintenance'
}

// 分页响应类型
export interface PaginationResponse<T> {
  list: T[]
  total: number
  page: number
  pageSize: number
}

// 通用分页请求参数
export interface PaginationParams {
  page?: number
  pageSize?: number
}


