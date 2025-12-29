<template>
  <div class="p-4 ring-1 ring-gray-50 bg-white rounded-lg">
    <div class="text-sm font-bold text-gray-800 mb-4">实例配置</div>

    <div class="border border-gray-200 rounded-sm p-6">
      <div class="flex justify-start gap-8 items-center">
        <div class="text-sm font-bold text-gray-800">选择镜像</div>
        <div class="text-sm text-gray-400 bg-gray-100 py-6 w-120 text-center cursor-pointer rounded-sm">
          <UIcon name="tabler:plus" class="align-middle pr-4" /><span class="text-xs"> 选择镜像</span>
        </div>
      </div>

      <div class="flex justify-start gap-8 items-center mt-4">
        <div class="text-sm font-bold text-gray-800">端口转发</div>
        <div class="text-sm text-gray-400 bg-gray-100 py-3 w-120 text-center cursor-pointer rounded-sm">
          <UIcon name="tabler:filter-edit" class="align-middle pr-4" /><span class="text-xs"> 配置端口</span>
        </div>
      </div>

      <UAlert
        variant="soft"
        color="error"
        class="mt-4 text-xs"
        title="注意!"
        icon="i-lucide-terminal"
        description="实例配置完成后，无法修改镜像和端口转发，请谨慎操作。"
        />


    </div>

  </div>
</template>

<script lang="ts" setup>

</script>

<style></style>