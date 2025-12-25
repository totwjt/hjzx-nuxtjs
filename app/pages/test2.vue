<template>
    <div>
        <div>{{ data }}</div>
        <div>{{ data?.code }}</div>
        <div>{{ data?.message }}</div>
        <div>{{ data?.data }}</div>
        <div>{{ data?.data?.token }}</div>
        <!-- <div>{{ data.data }}</div> -->
        <!-- <div>{{ pending }}</div>
        <div>{{ error }}</div> -->
    </div>
</template>

<script setup lang="ts">

const { data, status, error, refresh, clear } = await useHttpFetch('https://m1.apifoxmock.com/m1/7602696-7341408-default/auth/login', {
    method: 'POST',
})

console.log('www', data.value);

</script>

<style scoped></style>