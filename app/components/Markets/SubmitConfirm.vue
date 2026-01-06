<template>
  <UModal :dismissible="false" title="确认订单" :ui="{
    content: 'w-200!'
  }">
    <UButton label="Open" color="neutral" variant="subtle" />

    <template #body>
      <div>

        <Descriptions title="" :bordered="true" :column="3" :items="userInfo">

          <!-- 自定义某个字段的内容 -->
          <template #content-status="{ item }">
            <UBadge :color="item.value === '在线' ? 'green' : 'gray'">
              {{ item.value }}
            </UBadge>
          </template>
        </Descriptions>

      </div>
    </template>

    <template #footer="{ close }">
      <UButton label="取消" color="neutral" variant="outline" @click="close" />
      <UButton label="确认" color="primary" />
    </template>
  </UModal>
</template>

<script lang="ts" setup>

const emit = defineEmits<{ close: [boolean] }>()

const userInfo = [
  { key: 'name', label: 'GPU', value: 'NVIDIA 4090 * 1' },
  { key: 'phone', label: 'vCPU', value: '12核' },
  { key: 'status', label: '内存', value: '64G' },
  { key: 'address', label: '地址', value: '浙江省杭州市西湖区', span: 2 },
  { key: 'remark', label: '备注', value: '这是一段很长的备注信息...', span: 3 },
]

</script>

<style></style>