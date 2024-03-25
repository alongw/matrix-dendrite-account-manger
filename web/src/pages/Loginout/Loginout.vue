<script setup lang="ts">
import { onMounted } from 'vue'

defineOptions({
    name: 'LoginoutPage'
})

onMounted(() => {
    window.localStorage.clear()
})
</script>

<template>
    <h1>你已成功退出登录</h1>
    <a-space>
        <a-button @click="$router.push('/user')">返回首页</a-button>
        <a-button type="primary" @click="$router.push('/')">返回主页</a-button>
    </a-space>
</template>
