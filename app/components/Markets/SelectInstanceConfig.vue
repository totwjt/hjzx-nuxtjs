<template>
  <div class="p-4 ring-1 ring-gray-50 bg-white rounded-lg">
    <div class="text-sm font-bold text-gray-800 mb-4">实例配置</div>

    <div class="border border-gray-200 rounded-sm p-6">
      <div class="flex justify-start gap-8 items-center">
        <div class="text-sm font-bold text-gray-800">选择镜像</div>

        <!-- select image pop -->
        <UPopover v-model:open="open" :content="{
          side:'right'
        }">
          <div class="flex gap-4 justify-start items-center bg-gray-50 p-4 cursor-pointer rounded-sm"
            v-if="!!selectedImage">
            <div>
              <UIcon :name="selectedImage.icon" size="30" class="align-middle pr-4" />
            </div>
            <div>
              <div class="font-bold">{{ selectedImage?.name }}</div>
              <div class="text-xs text-gray-400">{{ selectedImage?.desc }} </div>
            </div>
          </div>
          <div v-else class="text-sm text-gray-400 bg-gray-50 py-6 w-120 text-center cursor-pointer rounded-sm">
            <UIcon name="tabler:plus" class="align-middle pr-4" /><span class="text-xs"> 选择镜像</span>
          </div>

          <template #content>
            <div class="w-150 h-100 flex">

              <!-- 左侧标签栏 -->
              <div class="w-32 border-r border-gray-200 py-4">
                <div v-for="tab in tabs" :key="tab.id" @click="activeTab = tab.id" :class="[
                  'px-4 py-3 text-sm cursor-pointer transition-colors',
                  activeTab === tab.id
                    ? 'text-primary-500 bg-primary-50 border-r-2 border-primary-500'
                    : 'text-gray-600 hover:bg-gray-50'
                ]">
                  {{ tab.label }}
                </div>
              </div>

              <!-- 右侧镜像列表 -->
              <div class="flex-1 overflow-y-auto">
                <div class="p-4 space-y-2">
                  <template v-for="image in images" :key="image.id">
                    <div @click="selectImage(image)" :class="[
                      'flex items-center gap-3 px-4 py-3 rounded cursor-pointer transition-colors',
                      selectedImage?.id === image.id
                        ? 'bg-primary-50'
                        : 'hover:bg-gray-50'
                    ]">
                      <!-- 图标 -->
                      <UIcon :name="image.icon"></UIcon>
                      <!-- <div :class="[
                      'flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center',
                      getIconClass(image.icon)
                    ]">
                      <span class="text-white text-xs font-bold">{{ getIconText(image.icon) }}</span>
                    </div> -->

                      <!-- 镜像名称 -->
                      <div class="flex-1 text-sm">
                        <span :class="selectedImage?.id === image.id ? 'text-primary-600' : 'text-gray-700'">
                          {{ image.name }}
                        </span>
                      </div>
                    </div>
                    <USeparator color="neutral" />
                  </template>
                </div>
              </div>

            </div>
          </template>
        </UPopover>

      </div>

      <div class="flex justify-start gap-8 items-center mt-4">
        <div class="text-sm font-bold text-gray-800">端口转发</div>
        <div class="text-sm text-gray-400 bg-gray-50 py-3 w-120 text-center cursor-pointer rounded-sm"
          @click="HandleSetPort">
          <UIcon name="tabler:filter-edit" class="align-middle pr-4" /><span class="text-xs"> 配置端口</span>
        </div>
      </div>

      <UAlert variant="soft" color="warning" class="mt-4 text-xs" icon="i-lucide-terminal"
        description="实例配置完成后，无法修改镜像和端口转发，请谨慎操作。" />


    </div>

  </div>
</template>

<script lang="ts" setup>

const {
  images,
  getList
} = useGpuImage();
console.log('images', images);
/*----------------------------------------------------*\
｜                       选择镜像
\*----------------------------------------------------*/
const toast = useToast()

const activeTab = ref('base');
const selectedImage = ref(null);
const open = ref(false)

const tabs = [
  { id: 'base', label: '基础镜像' },
  { id: 'ai', label: 'AI镜像' },
  { id: 'my', label: '我的镜像' }
];

const selectImage = (image) => {
  // selectedImage.value = image;
  // open.value = !open.value
};

const HandleSetPort = () => {
  if (!selectedImage.value) {
    toast.add({ color: 'error', icon: 'fluent-color:error-circle-48', title: '提示', description: '请先选择镜像再配置端口号' })
  }
}

</script>

<style></style>