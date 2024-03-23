<script setup lang="ts">
import { useUser } from '@/hooks/useUser'
import { message } from 'ant-design-vue'
import { onMounted } from 'vue'

defineOptions({
    name: 'UserPage'
})

const { getUserInfo, userInfo, getMatrixInfo, matrixAccount } = useUser()

const fetch = async () => {
    userInfo.value && (userInfo.value.uid = '')
    const result = await getUserInfo()
    if (!result) {
        return message.error('获取用户信息失败')
    }
    userInfo.value = result
}

onMounted(async () => {
    await fetch()
    const result = await getMatrixInfo()
    matrixAccount.value = result
})
</script>

<template>
    <div class="title">
        <a-skeleton :loading="!userInfo?.uid" active>
            <h2>您好，{{ userInfo?.name || '未命名' }}！</h2>

            <a-card title="我的 Matrix 账号" class="my-account">
                <template #extra>
                    <a-button type="link">刷新</a-button>
                </template>
                <div v-if="matrixAccount">
                    <h3>你的 Matrix 账号：@{{ matrixAccount }}:nekos.chat</h3>
                    <a-button type="primary">修改密码</a-button>
                </div>
                <div v-else>
                    <h3>你还未有 Matrix 账号</h3>
                    <a-button type="primary" @click="$router.push('/apply')">
                        去申请
                    </a-button>
                </div>
            </a-card>
        </a-skeleton>
    </div>
</template>

<style scoped lang="less">
.my-account {
    margin: 25px auto;
    width: 100%;
    max-width: 1200px;
}
</style>
