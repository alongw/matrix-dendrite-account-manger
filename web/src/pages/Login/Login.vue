<script setup lang="ts">
import { useLogin } from '@/hooks/useLogin'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { message } from 'ant-design-vue'

defineOptions({
    name: 'LoginPage'
})

const route = useRoute()
const router = useRouter()

const { showStatusTitle, updateStatusTitle, getLoginState, login } = useLogin()

const showReLoginButton = ref(false)

const handleReLogin = async () => {
    const state = await getLoginState()
    if (!state) {
        return message.error('无法获取 state ，请稍后再试')
    }
    // 重定向
    window.location.href = `https://account.lolinya.net/authorize?state=${state}&client_id=01b35859-850b-454c-9256-3f036ab217ae`
}

onMounted(async () => {
    if (route.query && route.query.code) {
        updateStatusTitle()
        if (!route.query.state) {
            return message.error('无法获取 state ，请稍后再试')
        }
        if (route.query.code == 'deny') {
            showReLoginButton.value = true
            return message.error('您拒绝了授权')
        }
        const token = await login({
            code: route.query.code.toString(),
            state: route.query.state.toString()
        })
        if (!token) {
            showReLoginButton.value = true
            return message.error('登录失败，请稍后再试')
        }
        window.localStorage.setItem('token', token)
        message.success('登录成功')
        router.push('/user')
    } else {
        await handleReLogin()
    }
})
</script>

<template>
    <h1>请稍后...</h1>
    <h2>{{ showStatusTitle }}</h2>
    <a-button v-if="showReLoginButton" type="primary" @click="handleReLogin">
        重新登录
    </a-button>
</template>
