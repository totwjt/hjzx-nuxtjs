<template>
  <div class="sticky bottom-0 bg-white p-4 ring-1 ring-gray-50 rounded-lg h-24 shadow">
    <UContainer class="flex justify-between items-center h-full">
      <!-- <div>优惠码</div> -->
      <div></div>

      <div class="flex justify-end items-center gap-6">

        <div>
          <MarketsSelectRentalDuration />
          <UCheckbox disabled :model-value="false" label="到期按天自动续费" class="mt-2" />
        </div>

        <USeparator orientation="vertical" class="h-16" />

        <div class="text-neutral-600 text-sm">
          <div>总费用：
            <span class="text-red-500 font-bold">
              <span class="text-sm">¥</span>
              <span class="text-xl">{{ price }}</span>
            </span>
            <span class="text-sm">{{ unit ? `/${unit}` : '' }} </span>
            <UBadge class="ml-4" color="secondary">明细</UBadge>
          </div>
          <div class="text-right">余额：¥{{ user?.balance }} <span class="text-secondary cursor-pointer">充值</span></div>
        </div>

        <UButton @click="handleCreated" class="py-3 px-12 cursor-pointer" :loading="loading" :disabled="price <= 0">创建
        </UButton>
      </div>

    </UContainer>


    <MarketsSubmitConfirm ref="MarketsSubmitConfirmRef" @confirm="handleConfirm" />
  </div>
</template>
<script lang="ts" setup>
import { useMyMarketsStore } from "@/stores/markets/index";
import { useUserStore } from "@/stores/user";

const { user } = storeToRefs(useUserStore())
const { price, unit, loading } = storeToRefs(useMyMarketsStore())


const MarketsSubmitConfirmRef = ref(null)
const toast = useToast()

const handleCreated = () => {
  const result = useMyMarketsStore().validateBeforeSubmit()
  if (!result.ok) {
    confirm
    toast.add({
      icon: 'tabler:face-id-error',
      color: 'error',
      title: '无法创建订单',
      description: result.message
    })
    return
  }

  MarketsSubmitConfirmRef.value.handleOpen(true)
}

const handleConfirm = () => {
  console.log('handleConfirm');
}

</script>

<style></style>