// utils/console-navigation.ts
import type { NavigationMenuItem } from '@nuxt/ui'

// 扩展类型：为有 to 的菜单项添加页面元数据
interface ConsoleNavItem extends NavigationMenuItem {
  // 只在有 to 的项上使用这些字段
  title?: string          // 页面标题（通常和 label 一样，可自定义）
  description?: string    // 页面描述
  group?: string          // 所属分组名（用于面包屑中间层）
  key?: string            // 路由 key，手动指定或自动从 to 提取（推荐手动指定，避免出错）
}

export const consoleNavigationItems: ConsoleNavItem[][] = [
  [
    {
      label: '总览',
      to: '/console/overview',
      icon: 'tabler:layout-dashboard',
      title: '总览',
      description: '您的算力资源、费用、订单等整体概况',
      key: 'overview'
    }
  ],
  [
    { label: '算力资源', type: 'label' },
    {
      label: 'GPU容器实例',
      to: '/console/container',
      icon: 'tabler:device-desktop-code',
      title: 'GPU容器实例',
      description: '管理您的 GPU 容器实例，支持一键部署、监控和扩缩容',
      group: '算力资源',
      key: 'container'
    },
    {
      label: 'CPU容器实例',
      to: '/console/cpu',
      icon: 'tabler:cpu-2',
      title: 'CPU容器实例',
      description: '管理您的 CPU 容器实例，支持一键部署、监控和扩缩容',
      group: '算力资源',
      key: 'cpu'
    },
    {
      label: '裸金属资源',
      to: '/console/bms',
      icon: 'tabler:server',
      title: '裸金属资源',
      description: '专属物理服务器，提供极致性能与隔离性',
      group: '算力资源',
      key: 'bms'
    },
    {
      label: '文件存储',
      to: '/console/disk',
      icon: 'tabler:database',
      title: '文件存储',
      description: '高性能分布式文件存储，适合大数据与模型存储',
      group: '算力资源',
      key: 'disk'
    }
  ],
  [
    { label: '模型与镜像', type: 'label' },
    {
      label: '模型管理',
      to: '/console/model',
      icon: 'tabler:puzzle',
      title: '模型管理',
      description: '上传、管理、版本控制您的 AI 模型',
      group: '模型与镜像',
      key: 'model'
    },
    {
      label: '镜像管理',
      to: '/console/image',
      icon: 'tabler:photo',
      title: '镜像管理',
      description: '自定义容器镜像，加速环境部署',
      group: '模型与镜像',
      key: 'image'
    }
  ],
  [
    { label: '费用中心', type: 'label' },
    {
      label: '费用总览',
      to: '/console/check',
      icon: 'tabler:receipt',
      title: '费用总览',
      description: '查看余额、消费趋势与费用分布',
      group: '费用中心',
      key: 'check'
    },
    {
      label: '订单明细',
      to: '/console/order',
      icon: 'tabler:shopping-cart',
      title: '订单明细',
      description: '所有订单记录、支付状态与资源使用详情',
      group: '费用中心',
      key: 'order'
    }
  ],
  [
    { label: '我的账号', type: 'label' },
    {
      label: '账号设置',
      to: '/console/user',
      icon: 'tabler:user-cog',
      title: '账号设置',
      description: '个人信息、安全设置、API Key 等',
      group: '我的账号',
      key: 'user'
    }
  ]
]