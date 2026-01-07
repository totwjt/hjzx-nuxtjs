<template>
  <div class="sticky bottom-0 bg-white p-4 ring-1 ring-gray-50 rounded-lg h-24 shadow">
    <UContainer class="flex justify-between items-center h-full">
      <!-- <div>优惠码</div> -->
      <div></div>

      <div class="flex justify-end items-center gap-6">

        <div>
          <div class="flex justify-around items-center gap-2">
            <div>按量计费</div>
            <div>包天/29天</div>
            <div>包月/1月</div>
          </div>
          <div>到期按天自动续费</div>
        </div>

        <USeparator orientation="vertical" class="h-16" />

        <div>
          <div>总费用：
            <span class="text-red-500 font-bold">
              <span class="text-sm">¥</span>
              <span class="text-xl">{{ price }}</span>
            </span>
            <span class="text-sm">{{ unit ? `/${unit}` : '' }} </span>
            <UBadge class="ml-4" color="secondary">明细</UBadge>
          </div>
          <div>余额：¥5.00 充值</div>
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
const { price, unit, loading } = storeToRefs(useMyMarketsStore())

const MarketsSubmitConfirmRef = ref(null)

const handleCreated = () => {
  MarketsSubmitConfirmRef.value.handleOpen(true)
}

const handleConfirm = () =>{
  console.log('handleConfirm');
}

</script>

<style></style>