<template>
  <div class="p-4 ring-1 ring-gray-50 bg-white rounded-lg mt-6">
  <!-- <div class="border border-gray-200 rounded-sm p-6 mt-6"> -->
    <div class="flex justify-start gap-8 items-start">
      <div class="text-sm font-bold text-highlighted pt-2">本机存储</div>

      <!--  -->
      <div class="text-sm font-semibold text-gray-500">
        <div class="border border-gray-200 rounded-sm p-2 w-120 flex justify-between items-center">
          <div class="align-middle">
            <UIcon class="align-middle font-black px-3 text-sm" name="icon-park-outline:hard-disk-one" />
            <span>系统盘 </span>
            <UBadge class="ml-2" variant="soft" color="secondary" label="50G" />
          </div>
          <div class="w-60">
            挂载路径
            <UBadge variant="soft" color="neutral" label="/" />
          </div>
        </div>

        <div class="mt-2 border border-gray-200 rounded-sm p-2 w-120 flex justify-between items-center">
          <div class="align-middle">
            <UIcon class="align-middle font-black px-3 text-sm" name="icon-park-outline:hard-disk-one" />
            <span>数据盘 </span>
            <UBadge class="ml-2" variant="soft" color="secondary" label="500G" />
          </div>
          <div class="w-60">
            挂载路径
            <UBadge variant="soft" color="neutral" label="/data" />
          </div>

        </div>
      </div>
    </div>

    <div class="flex justify-start gap-8 items-center mt-4">
      <div class="text-sm font-bold text-highlighted">文件存储</div>

      <div class="flex justify-between items-center text-sm text-gray-400 bg-gray-50 p-3 w-120 rounded-sm">
        <div>
          <UIcon class="align-middle font-black px-3 text-sm" name="icon-park-outline:hard-disk-one" />
          <span>暂无文件存储卷</span>
        </div>
        <NuxtLink to="">
          <span class="text-xs text-secondary">立即创建 ></span>
        </NuxtLink>
      </div>
    </div>

    <UAlert variant="soft" color="error" class="mt-4 text-xs" icon="i-lucide-terminal"
      description="推荐您将重要数据保存到文件存储卷，文件存储卷不会随实例释放而删除" />
  </div>
</template>

<script lang="ts" setup>

</script>

<style></style>