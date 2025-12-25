/**
 * Mock 地址映射配置
 * 将真实 API 路径映射到 Mock 地址
 *
 * 格式：真实路径 -> Mock 完整地址
 */
export const mockUrlMap: Record<string, string> = {
  // 示例：'/test' -> 'https://m1.apifoxmock.com/m1/7602696-7341408-default/test'
  '/test': 'https://m1.apifoxmock.com/m1/7602696-7341408-default/test',

  // 可以继续添加其他 API 的映射
  // '/user/list': 'https://m1.apifoxmock.com/m1/7602696-7341408-default/user/list',
  // '/gpu/list': 'https://m1.apifoxmock.com/m1/7602696-7341408-default/gpu/list',
}

/**
 * 获取 Mock 地址
 * @param url 真实 API 路径
 * @returns Mock 地址，如果未配置则返回 null
 */
export function getMockUrl(url: string): string | null {
  // 精确匹配
  if (mockUrlMap[url]) {
    return mockUrlMap[url]
  }

  // 前缀匹配（支持动态路径）
  for (const [pattern, mockUrl] of Object.entries(mockUrlMap)) {
    if (url.startsWith(pattern)) {
      // 如果 pattern 以 / 结尾，直接替换
      if (pattern.endsWith('/')) {
        return url.replace(pattern, mockUrl)
      }
      // 否则需要处理路径拼接
      const restPath = url.substring(pattern.length)
      return mockUrl + restPath
    }
  }

  return null
}

