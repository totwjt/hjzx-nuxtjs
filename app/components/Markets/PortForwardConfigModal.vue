<!-- components/PortForwardConfigModal.vue -->
<template>
  <UModal v-model:open="open" title="配置端口转发" :ui="{ content: 'max-w-2xl' }">
    <template #body>
      <div class="space-y-6">
        <div class="text-sm text-gray-600 flex items-center">
          <UIcon name="tabler:exclamation-circle" class="text-orange-500 mr-1" />
          GPU云实例暂不开放 80、443、8080 端口
        </div>

        <!-- 默认端口（固定开启） -->
        <div class="flex items-center">
          <div class="font-semibold mr-10">默认端口</div>
          <div class="flex items-center gap-6">
            <UCheckbox disabled :model-value="true" label="SSH(22)" />
            <UCheckbox disabled :model-value="true" label="JupyterLab(8888)" />
          </div>
        </div>

        <!-- 自定义端口列表 -->
        <div class="space-y-3">
          <div v-for="(port, index) in localPorts" :key="index"
            class="flex items-center gap-3 p-3 border border-gray-200 rounded-lg">
            <UInput v-model.number="localPorts[index]" type="number" placeholder="容器端口" :min="1" :max="65535"
              class="w-full" size="md" />
            <UButton icon="tabler:trash" variant="ghost" color="secondary" size="sm" @click="removePort(index)" />
          </div>
        </div>

        <!-- 添加按钮 -->
        <UButton icon="tabler:plus" variant="soft" color="secondary" :disabled="localPorts.length >= 5"
          @click="addPort">
          添加自定义端口 {{ localPorts.length }}/5
        </UButton>
      </div>
    </template>

    <template #footer>
      <div class="flex justify-end gap-4">
        <UButton variant="outline" @click="handleCancel">取消</UButton>
        <UButton @click="handleConfirm">确定</UButton>
      </div>
    </template>
  </UModal>
</template>

<script setup lang="ts">

const props = defineProps<{
  open: boolean
  ports: number[]
}>()

const emit = defineEmits<{
  (e: 'update:open', value: boolean): void
  (e: 'confirm', ports: number[]): void
}>()

const open = computed({
  get: () => props.open,
  set: (val) => emit('update:open', val)
})

// 本地副本：只存容器端口 number[]
const localPorts = ref<number[]>(structuredClone(toRaw(props.ports || [])))

const FORBIDDEN_PORTS = [80, 443, 8080]
const DEFAULT_PORTS = [22, 8888] // 固定开启，不出现在自定义列表

const addPort = () => {
  if (localPorts.value.length < 5) {
    localPorts.value.push(6006) // 默认建议一个常见端口，可改成空也行
  }
}

const removePort = (index: number) => {
  localPorts.value.splice(index, 1)
}

const handleCancel = () => {
  localPorts.value = structuredClone(toRaw(props.ports || []))
  emit('update:open', false)
}

const handleConfirm = () => {
  const toast = useToast()

  // 过滤有效端口：去空、去重、排除禁用端口、排除默认端口（避免重复）
  const validPorts = localPorts.value
    .map(p => Number(p))
    .filter(p => {
      if (isNaN(p) || p < 1 || p > 65535) return false
      if (FORBIDDEN_PORTS.includes(p)) return false
      if (DEFAULT_PORTS.includes(p)) return false // 默认端口已固定开启，无需重复添加
      return true
    })

  // 去重
  const uniquePorts = Array.from(new Set(validPorts))

  if (uniquePorts.length < validPorts.length) {
    toast.add({
      title: '提示',
      description: '已自动去除重复和无效端口',
      color: 'primary'
    })
  }

  if (localPorts.value.some(p => FORBIDDEN_PORTS.includes(Number(p)))) {
    toast.add({
      title: '禁止端口',
      description: '80、443、8080 端口不可开放',
      color: 'error'
    })
    return
  }

  emit('confirm', uniquePorts)
  emit('update:open', false)
}

watch(
  () => props.ports,
  (val) => {
    localPorts.value = structuredClone(toRaw(val || []))
  },
  { immediate: true }
)
</script>