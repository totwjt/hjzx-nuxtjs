
# 技术栈
nuxtjs

# 版本号
node v20.11.1
npm v10.2.4

# 开发
> 搭建mono repo 脚手架
NuxtJs
脚手架搭建
==[bug] app.config.ts 全局参数没生效==
集成 @nuxt/ui @nuxt/icon
国际化 zh_cn

# todo

1. Gpu类型数据是一个数组，现在取第0个配置：
  ```
  bandwidthMbps: number; // 带宽
  gpuCount: number; // gpu个数
  ```
2. icon 细化

3. 首屏 ssr Hydration水合警告⚠️

4. 参数 crypto 加密

5. server端日志

6. middleware鉴权

7. setCookie 在 ip地址访问、非https访问时会拦截传输 ```secure``` ```sameSite```
```
setCookie(event, 'auth_token', data?.token, {
    httpOnly: true,
    //secure: process.env.NODE_ENV === 'production',
    secure: false,    // 1
    sameSite: 'none', // 2
    maxAge: 60 * 60 * 24 * 7, // 7天
    path: '/'
})
```