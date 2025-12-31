export default defineAppConfig({
  ui: {
    colors: {
      primary: 'blue',
      secondary: 'sky',
      neutral: 'slate'
    }
  },

  /*----------------------------------------------------*\
  ｜                       footer
  \*----------------------------------------------------*/

  footer: {
    brand: {
      logoText: 'HJ',
      name: 'GPU华璟智璇',
      slogan: '找算力 就上极智算',
      description:
        '中小企业算力服务专家，普惠算力引擎。异构并行，秒级调度，即取即用'
    },

    contact: {
      phone: 'xxx-xxxxxx',
      email: 'xxx@xxxx.com',
      address:
        'xxxxxxxx路xx号x栋x层xxxxxxxxx号'
    },

    sections: [
      {
        title: '算力入口',
        links: [
          { label: 'GPU容器实例', href: '#' },
          { label: 'GPU裸金属', href: '#' },
          { label: '模型部署', href: '#' },
          { label: 'JStack平台', href: '#' }
        ]
      },
      {
        title: '关于极智算',
        links: [
          { label: '算力图', href: '#' },
          { label: 'AI课堂', href: '#' },
          { label: '文档中心', href: '#' },
          { label: '关于我们', href: '#' }
        ]
      }
    ],

    qrs: [
      { label: '关注公众号' },
      { label: '观看视频号' }
    ],

    friends: [
      { label: 'AIDC托管租用', href: '#' },
      { label: 'AIDC托管租用', href: '#' }
    ],

    copyright: {
      company: '©2025 华璟智璇（北京）科技有限公司 版权所有',
      icp: { label: 'ICP备案xxxxxxx', href: '#' },
      license: {
        label: '《增值电信业务经营许可证》编号 xxxxx',
        href: '#'
      },
      police: { label: '公安备案xxxxxxx', href: '#' }
    }
  }
})