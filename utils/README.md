# API 请求层使用说明

## Mock 功能说明

项目支持 Mock 模式，可以在开发阶段使用 Mock 地址进行调试，生产环境使用真实 API 地址。

### 配置方式

1. **环境变量配置**

   在 `.env` 文件中配置：

   ```env
   # 启用 Mock 模式（开发阶段）
   NUXT_PUBLIC_USE_MOCK=true

   # Mock 基础地址（可选，用于动态拼接）
   NUXT_PUBLIC_MOCK_BASE=https://m1.apifoxmock.com/m1/7602696-7341408-default

   # 真实 API 基础地址（空字符串表示不使用 /api/ 前缀）
   # 实际地址：xxx.com/test
   # 如果设置为 /api，则地址为：xxx.com/api/test
   NUXT_PUBLIC_API_BASE=
   ```

2. **Mock 地址映射配置**

   在 `utils/mockConfig.ts` 中配置真实路径到 Mock 地址的映射：

   ```typescript
   export const mockUrlMap: Record<string, string> = {
     '/test': 'https://m1.apifoxmock.com/m1/7602696-7341408-default/test',
     '/user/list': 'https://m1.apifoxmock.com/m1/7602696-7341408-default/user/list',
     // 添加更多映射...
   }
   ```

### 使用方式

在代码中使用真实 API 路径，系统会根据配置自动转换：

```typescript
import { get, post } from '~/utils/api'

// 使用真实路径（不带 /api/ 前缀），Mock 模式下会自动转换为 Mock 地址
// 实际地址：xxx.com/test
// Mock 地址：https://m1.apifoxmock.com/m1/7602696-7341408-default/test
const data = await get('/test')

// POST 请求
const result = await post('/user/create', { name: 'test' })
```

### 工作原理

1. **Mock 模式开启时**：
   - 检查 `mockUrlMap` 中是否有对应的映射
   - 如果有，使用 Mock 地址
   - 如果没有，使用真实地址并输出警告
   - 示例：`/test` -> `https://m1.apifoxmock.com/m1/7602696-7341408-default/test`

2. **Mock 模式关闭时**：
   - 直接使用真实 API 地址（不带 /api/ 前缀）
   - 示例：`/test` -> `xxx.com/test`

3. **开发环境日志**：
   - Mock 模式下会在控制台输出地址转换日志，方便调试

### 切换 Mock 模式

- **启用 Mock**：设置 `NUXT_PUBLIC_USE_MOCK=true`
- **禁用 Mock**：设置 `NUXT_PUBLIC_USE_MOCK=false` 或不设置

修改后需要重启开发服务器。

### 示例

```typescript
// 在组件中使用
<script setup lang="ts">
import { get } from '~/utils/api'

const fetchData = async () => {
  try {
    // 真实路径：/test（不带 /api/ 前缀）
    // 实际地址：xxx.com/test
    // Mock 模式下会自动转换为：https://m1.apifoxmock.com/m1/7602696-7341408-default/test
    const data = await get('/test')
    console.log(data)
  } catch (error) {
    console.error(error)
  }
}
</script>
```

