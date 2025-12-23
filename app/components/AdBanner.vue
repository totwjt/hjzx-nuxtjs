<!-- ad 广告跳转链接 -->

<template>
    <div class="ad-container flex justify-between items-center my-8">
        <div class="texts">
            <div class="text1"><span class="text2">15分钟内</span>即可租用开通</div>
            <div class="text3">8卡 NVIDIA RTX4090 GPU裸金属服务器</div>
        </div>
        <div class="btn">
            <UButton to="/markets/bms" block size="lg">订阅</UButton>
        </div>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.ad-container {
    height: 144px;
    background-image: url("/ad/index-ad-bg.png");
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    margin-bottom: 20px;
    border-radius: 8px;
    padding: 0 68px;

    .texts {
        color: #fff;

        .text1 {
            font-size: 44px;
            font-weight: bold;

            .text2 {
                color: #00BAFF;
            }

        }

        .text3 {
            font-size: 25px;
            font-weight: 500;

        }

    }

    .btn {
        width: 152px;
        height: 40px;
        // text-align: center;
    }
}
</style>