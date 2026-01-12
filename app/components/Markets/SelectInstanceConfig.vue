<template>
  <div>
    <div class="p-4 ring-1 ring-gray-50 bg-white rounded-lg">
      <div class="text-sm font-bold text-gray-800 mb-4">实例配置</div>

      <div class="border border-gray-200 rounded-sm p-6">
        <div class="flex justify-start gap-8 items-center">
          <div class="text-sm font-bold text-gray-800">选择镜像</div>

          <!-- select image pop -->
          <UPopover v-model:open="openImagePopover">
            <div>
              <div
                class="flex gap-4 justify-start items-center bg-gray-50 p-4 cursor-pointer rounded-sm min-w-120 text-center"
                v-if="!!marketsStore.selectedImage">
                <div>
                  <UIcon :name="marketsStore.selectedImage.icon ?? 'logos:docker-icon'" size="20"
                    class="align-middle pr-4" />
                </div>
                <div>
                  <div class="font-bold">{{ marketsStore.selectedImage?.name }}</div>
                  <div class="text-xs text-gray-400">{{ marketsStore.selectedImage?.desc }} </div>
                </div>
              </div>
              <div v-else class="text-sm text-gray-400 bg-gray-50 py-6 w-120 text-center cursor-pointer rounded-sm">
                <UIcon name="tabler:plus" class="align-middle pr-4" /><span class="text-xs"> 选择镜像</span>
              </div>
            </div>

            <template #content>
              <div class="w-160 h-80 flex">

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
                        marketsStore.selectedImage?.id === image.id
                          ? 'bg-primary-50'
                          : 'hover:bg-gray-50'
                      ]">
                        <!-- 图标 -->
                        <UIcon :name="image.icon"></UIcon>

                        <!-- 镜像名称 -->
                        <div class="flex-1 text-sm">
                          <span
                            :class="marketsStore.selectedImage?.id === image.id ? 'text-primary-600' : 'text-gray-700'">
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
          <div
            class="text-sm bg-gray-50 p-3 w-120 text-center cursor-pointer rounded-sm hover:bg-gray-100 transition-colors"
            :class="marketsStore.customPorts.length > 0 ? 'font-semibold text-primary-500' : 'text-gray-400'"
            @click="HandleSetPort">

            <!-- <template v-if="marketsStore?.customPorts && marketsStore?.customPorts.length">
              <span class="text-sm">{{ `已配置 ${marketsStore.customPorts.length} 个端口` }}</span>
            </template> -->

            {{ defaultPorts }}
            <template v-if="!!marketsStore.selectedImage">
              <div class=" font-black text-gray-500 space-y-2">
                <div class="flex justify-start items-center gap-3">
                  <div>
                    <!-- <UIcon name="tabler:progress-bolt" class="align-middle" /> -->
                    默认端口
                  </div>
                  <UBadge v-for="defaultPort in marketsStore?.selectedImage?.defaultPorts || []" color="secondary" class="ml-4"
                    variant="soft">{{defaultPort?.name}} {{defaultPort?.port}}</UBadge>
                  <UBadge color="secondary" variant="soft">JupyterLab(8888)</UBadge>
                </div>
                <div class="flex justify-start items-center">
                  <div>
                    <!-- <UIcon name="tabler:progress-bolt" class="align-middle" /> -->
                    自定义端口
                  </div>
                  <UBadge v-for="port in marketsStore.customPorts" color="secondary" class="ml-2" variant="soft">{{ port
                    }}</UBadge>
                  <div class="text-primary ml-4">去配置</div>

                </div>
              </div>
            </template>

            <template v-else>
              <UIcon name="tabler:filter-edit" class="align-middle pr-6" />
              <span class="text-xs">配置端口</span>
            </template>

          </div>
        </div>

        <UAlert variant="soft" color="error" class="mt-4 text-xs" icon="i-lucide-terminal"
          description="实例配置完成后，无法修改镜像和端口转发，请谨慎操作。" />

      </div>

    </div>

    <MarketsSelectLocalStore />

    <MarketsPortForwardConfigModal v-model:open="openPortModal" :ports="marketsStore.customPorts"
      @confirm="handlePortConfirm" />
  </div>
</template>

<script lang="ts" setup>

import { useMyMarketsStore } from '@/stores/markets'
const marketsStore = useMyMarketsStore()
const { defaultPorts } = storeToRefs(useMyMarketsStore())

const {
  images,
  tabs,
} = useGpuImage();

/*----------------------------------------------------*\
｜                       选择镜像
\*----------------------------------------------------*/
const toast = useToast()

const activeTab = ref('base');
const openImagePopover = ref(false)     // 镜像选择 popover
const openPortModal = ref(false)       // 新增：端口配置弹框
const bool = ref(false)

const boolSet = () => {
  bool.value = !bool.value
}

const selectImage = (image: any) => {
  marketsStore.setSelectedImage(image)
  openImagePopover.value = false
}

const HandleSetPort = () => {
  if (!marketsStore.selectedImage) {
    toast.add({
      color: 'error',
      icon: 'fluent-color:error-circle-48',
      title: '提示',
      description: '请先选择镜像再配置端口号'
    })
    return
  }

  openPortModal.value = true
}

const handlePortConfirm = (ports: number[]) => {
  marketsStore.setCustomPorts(ports)
}

</script>

<style></style>