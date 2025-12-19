# Stores 目录

用于存放 Pinia 状态管理相关的 store 文件。

## 使用示例

```typescript
// stores/user.ts
import { defineStore } from 'pinia'
import type { User } from '~/types'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null as User | null,
    token: ''
  }),
  getters: {
    isLoggedIn: (state) => !!state.token
  },
  actions: {
    async login(username: string, password: string) {
      // 登录逻辑
    },
    logout() {
      this.user = null
      this.token = ''
    }
  }
})
```


