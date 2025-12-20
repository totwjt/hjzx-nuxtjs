<template>
  <div class="container mx-auto p-6 space-y-6">
    <h1 class="text-3xl font-bold mb-6">API Request 功能测试</h1>

    <!-- 测试 1: 使用基础的 request 方法 -->
    <UCard>
      <template #header>
        <h2 class="text-xl font-semibold">测试 1: 基础 request 方法</h2>
      </template>
      <div class="space-y-4">
        <UButton
          :loading="loading1"
          @click="testRequest"
          color="primary"
        >
          发送请求
        </UButton>
        <div v-if="result1" class="mt-4">
          <p class="font-semibold mb-2">响应结果：</p>
          <pre class="bg-gray-100 p-4 rounded overflow-auto text-sm">{{ JSON.stringify(result1, null, 2) }}</pre>
        </div>
        <UAlert
          v-if="error1"
          color="error"
          variant="soft"
          :title="error1"
        />
      </div>
    </UCard>

    <!-- 测试 2: 使用 get 便捷方法 -->
    <UCard>
      <template #header>
        <h2 class="text-xl font-semibold">测试 2: get 便捷方法</h2>
      </template>
      <div class="space-y-4">
        <UButton
          :loading="loading2"
          @click="testGet"
          color="primary"
        >
          发送 GET 请求
        </UButton>
        <div v-if="result2" class="mt-4">
          <p class="font-semibold mb-2">响应结果：</p>
          <pre class="bg-gray-100 p-4 rounded overflow-auto text-sm">{{ JSON.stringify(result2, null, 2) }}</pre>
        </div>
        <UAlert
          v-if="error2"
          color="error"
          variant="soft"
          :title="error2"
        />
      </div>
    </UCard>

    <!-- 测试 3: 使用 useApi composable（响应式） -->
    <UCard>
      <template #header>
        <h2 class="text-xl font-semibold">测试 3: useApi Composable（响应式）</h2>
      </template>
      <div class="space-y-4">
        <UButton
          :loading="apiComposable.loading.value"
          @click="testComposable"
          color="primary"
        >
          发送请求（响应式）
        </UButton>
        <div v-if="result3" class="mt-4">
          <p class="font-semibold mb-2">响应结果：</p>
          <pre class="bg-gray-100 p-4 rounded overflow-auto text-sm">{{ JSON.stringify(result3, null, 2) }}</pre>
        </div>
        <UAlert
          v-if="apiComposable.error.value"
          color="error"
          variant="soft"
          :title="apiComposable.error.value.message"
        />
      </div>
    </UCard>

    <!-- 测试 4: 带参数的请求 -->
    <UCard>
      <template #header>
        <h2 class="text-xl font-semibold">测试 4: 带查询参数的请求</h2>
      </template>
      <div class="space-y-4">
        <div class="flex gap-2">
          <UInput
            v-model="queryParams.page"
            type="number"
            placeholder="页码"
            class="w-32"
          />
          <UInput
            v-model="queryParams.pageSize"
            type="number"
            placeholder="每页数量"
            class="w-32"
          />
          <UButton
            :loading="loading4"
            @click="testWithParams"
            color="primary"
          >
            发送带参数请求
          </UButton>
        </div>
        <div v-if="result4" class="mt-4">
          <p class="font-semibold mb-2">响应结果：</p>
          <pre class="bg-gray-100 p-4 rounded overflow-auto text-sm">{{ JSON.stringify(result4, null, 2) }}</pre>
        </div>
        <UAlert
          v-if="error4"
          color="error"
          variant="soft"
          :title="error4"
        />
      </div>
    </UCard>

    <!-- 测试 5: 直接使用 $fetch（备选方案） -->
    <UCard>
      <template #header>
        <h2 class="text-xl font-semibold">测试 5: 直接使用 $fetch（备选方案）</h2>
      </template>
      <div class="space-y-4">
        <UButton
          :loading="loading5"
          @click="testDirectFetch"
          color="primary"
        >
          直接使用 $fetch
        </UButton>
        <div v-if="result5" class="mt-4">
          <p class="font-semibold mb-2">响应结果：</p>
          <pre class="bg-gray-100 p-4 rounded overflow-auto text-sm">{{ JSON.stringify(result5, null, 2) }}</pre>
        </div>
        <UAlert
          v-if="error5"
          color="error"
          variant="soft"
          :title="error5"
        />
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { request, get } from '~/utils/api'
import { useApi } from '~/composables/useApi'

// Mock API 地址
const MOCK_API_URL = 'http://127.0.0.1:4523/m1/620884-0-default/operationLogList'

// 测试 1: 基础 request 方法
const loading1 = ref(false)
const result1 = ref<unknown>(null)
const error1 = ref<string>('')

const testRequest = async () => {
  loading1.value = true
  error1.value = ''
  result1.value = null

  try {
    // 注意：如果 mock API 返回的不是标准格式 { code, message, data }
    // 可能需要调整 request 函数或直接使用 $fetch
    const data = await request(MOCK_API_URL, {
      method: 'GET',
      showError: false
    })
    result1.value = data
  } catch (err) {
    error1.value = err instanceof Error ? err.message : String(err)
    console.error('Request error:', err)
  } finally {
    loading1.value = false
  }
}

// 测试 2: get 便捷方法
const loading2 = ref(false)
const result2 = ref<unknown>(null)
const error2 = ref<string>('')

const testGet = async () => {
  loading2.value = true
  error2.value = ''
  result2.value = null

  try {
    const data = await get(MOCK_API_URL)
    result2.value = data
  } catch (err) {
    error2.value = err instanceof Error ? err.message : String(err)
    console.error('Get error:', err)
  } finally {
    loading2.value = false
  }
}

// 测试 3: useApi composable
const apiComposable = useApi()
const result3 = ref<unknown>(null)

const testComposable = async () => {
  result3.value = null
  const data = await apiComposable.execute(MOCK_API_URL)
  result3.value = data
}

// 测试 4: 带参数的请求
const loading4 = ref(false)
const result4 = ref<unknown>(null)
const error4 = ref<string>('')
const queryParams = ref({
  page: 1,
  pageSize: 10
})

const testWithParams = async () => {
  loading4.value = true
  error4.value = ''
  result4.value = null

  try {
    const data = await get(MOCK_API_URL, {
      page: queryParams.value.page,
      pageSize: queryParams.value.pageSize
    })
    result4.value = data
  } catch (err) {
    error4.value = err instanceof Error ? err.message : String(err)
    console.error('Request with params error:', err)
  } finally {
    loading4.value = false
  }
}

// 测试 5: 直接使用 $fetch（如果 mock API 返回格式不标准）
const loading5 = ref(false)
const result5 = ref<unknown>(null)
const error5 = ref<string>('')

const testDirectFetch = async () => {
  loading5.value = true
  error5.value = ''
  result5.value = null

  try {
    const data = await $fetch(MOCK_API_URL)
    result5.value = data
  } catch (err) {
    error5.value = err instanceof Error ? err.message : String(err)
    console.error('Direct fetch error:', err)
  } finally {
    loading5.value = false
  }
}
</script>

<style lang="scss" scoped>
pre {
  max-height: 400px;
}
</style>