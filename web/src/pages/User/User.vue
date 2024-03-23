<script setup lang="ts">
import { useUser } from '@/hooks/useUser'
import { message } from 'ant-design-vue'
import { onMounted, ref } from 'vue'

defineOptions({
    name: 'UserPage'
})

const { getUserInfo, userInfo, getMatrixInfo, matrixAccount, editPassword } = useUser()

const fetch = async () => {
    userInfo.value && (userInfo.value.uid = '')
    const result = await getUserInfo()
    if (!result) {
        return message.error('获取用户信息失败')
    }
    userInfo.value = result
}

const open = ref(false)

const pwdIpt = ref('')
const checked = ref(false)

const editPasswordBtnLoading = ref(false)
const handleEditPassword = async () => {
    if (!pwdIpt.value) {
        return message.error('请输入密码')
    }
    editPasswordBtnLoading.value = true
    const result = await editPassword(pwdIpt.value, checked.value)
    editPasswordBtnLoading.value = false
    if (!result) {
        return message.error('修改密码失败')
    }
    message.success('修改密码成功')
    open.value = false
    pwdIpt.value = ''
    checked.value = false
}

onMounted(async () => {
    await fetch()
    const result = await getMatrixInfo()
    matrixAccount.value = result
})
</script>

<template>
    <a-skeleton :loading="!userInfo?.uid" active>
        <div class="title">
            <h2>您好，{{ userInfo?.name || '未命名' }}！</h2>
            <a-space>
                <a-button
                    v-if="userInfo && userInfo?.group >= 10"
                    type="link"
                    @click="$router.push('/admin')"
                >
                    管理后台
                </a-button>
                <a-button
                    v-if="userInfo && userInfo.uid"
                    type="link"
                    @click="$router.push('/logout')"
                >
                    退出登录
                </a-button>
            </a-space>
        </div>

        <a-card title="我的 Matrix 账号" class="my-account">
            <template #extra>
                <a-button type="link" @click="fetch">刷新</a-button>
            </template>
            <div v-if="matrixAccount">
                <h3>你的 Matrix 账号：@{{ matrixAccount }}:nekos.chat</h3>
                <a-button type="primary" @click="open = !open">修改密码</a-button>
            </div>
            <div v-else>
                <h3>你还未有 Matrix 账号</h3>
                <a-button type="primary" @click="$router.push('/apply')">
                    去申请
                </a-button>
            </div>
        </a-card>
    </a-skeleton>

    <a-modal v-model:open="open" title="修改密码">
        <p>密码不能少于8个字符</p>
        <a-input v-model:value="pwdIpt" placeholder="请输入新密码" />
        <a-checkbox v-model:checked="checked">在所有设备上退出登录</a-checkbox>
        <p>（同时吊销所有访问令牌，可能会导致加密信息丢失，请谨慎选择）</p>

        <template #footer>
            <a-button key="back" @click="open = !open">取消</a-button>
            <a-button
                key="submit"
                type="primary"
                :loading="editPasswordBtnLoading"
                @click="handleEditPassword"
            >
                确定
            </a-button>
        </template>
    </a-modal>
</template>

<style scoped lang="less">
.title {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.my-account {
    margin: 25px auto;
    width: 100%;
    max-width: 1200px;
}
</style>
