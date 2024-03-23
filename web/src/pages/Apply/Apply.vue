<script setup lang="ts">
import ApplyStepComponent from '@/components/ApplyStep.vue'

import { useApply } from '@/hooks/useApply'
import { message } from 'ant-design-vue'
import { onMounted } from 'vue'
import router from '@/router'

defineOptions({
    name: 'ApplyPage'
})

const { formData, checkUserName, step, btnLoading, submit } = useApply()

const handleCheckUserName = async () => {
    const result = await checkUserName()
    if (!result.status) {
        return message.error(result.msg)
    }
    message.success(result.msg)
}

const handleSubmit = async () => {
    await submit()
}

onMounted(() => {
    if (window.localStorage.getItem('applyDate')) {
        router.push('/finish')
    }
})
</script>

<template>
    <h2>申请 Matrix 账号</h2>

    <a-typography-paragraph>
        每位用户只能申请一个 Matrix 账号，为了防止滥用，您需要提供邀请码才能提交申请
    </a-typography-paragraph>

    <a-typography-paragraph>
        邀请码的获取方式请参阅
        <a-typography-link>获取邀请码</a-typography-link>
        页面以了解更多
    </a-typography-paragraph>

    <div class="step">
        <apply-step-component :current="step" />
    </div>

    <div class="content">
        <!-- 设置用户名 -->
        <div v-if="step === 0" class="form">
            <a-typography-paragraph>
                请确保用户名符合最基本的格式要求，比如长度、字符类型等，否则可能会导致申请失败
            </a-typography-paragraph>
            <a-space>
                <a-input-search
                    v-model:value="formData.username"
                    placeholder="键入用户名"
                    enter-button="检查用户名"
                    @search="handleCheckUserName"
                    :loading="btnLoading"
                />

                <a-button type="primary" @click="step++" :disabled="!formData.username">
                    下一步
                </a-button>
            </a-space>
        </div>
        <!-- 设置密码和昵称 -->
        <div v-if="step === 1">
            <a-typography-paragraph>
                请设置您的密码和昵称，密码请自觉符合安全要求（不少于8位），否则可能会导致申请不通过
            </a-typography-paragraph>
            <a-typography-paragraph> 显示昵称和密码注册后可修改 </a-typography-paragraph>
            <a-button @click="step--"> 上一步 </a-button>
            <br />
            <br />
            <a-space>
                <a-input v-model:value="formData.nickname" placeholder="显示昵称" />
                <a-input-password v-model:value="formData.password" placeholder="密码" />
                <a-button
                    type="primary"
                    @click="step++"
                    :disabled="!formData.password || !formData.nickname"
                >
                    下一步
                </a-button>
            </a-space>
            <p v-if="formData.password">请核实你的密码：{{ formData.password }}</p>
        </div>
        <!-- 键入邀请码 -->
        <div v-if="step === 2">
            <a-typography-paragraph>
                请键入您的邀请码，如果您没有邀请码，您将无法提交申请
            </a-typography-paragraph>
            <a-button @click="step--"> 上一步 </a-button>
            <br />
            <br />
            <a-space>
                <a-input v-model:value="formData.inviteCode" placeholder="邀请码" />
                <a-button
                    type="primary"
                    @click="handleSubmit"
                    :disabled="!formData.inviteCode"
                    :loading="btnLoading"
                >
                    提交申请
                </a-button>
            </a-space>
        </div>

        <!-- 注册成功 -->
        <div v-if="step === 3">
            <a-result
                status="success"
                title="好耶！太棒啦！"
                sub-title="你的注册申请已通过，现在可以使用刚才填写的信息登录 Matrix 了！返回主页可查看更多信息。"
            >
                <template #extra>
                    <a-button @click="$router.push('/user')" type="primary">
                        返回首页
                    </a-button>
                    <a-button>跳转登录</a-button>
                </template>
            </a-result>
        </div>
    </div>

    <a-typography-paragraph>
        我们无法得知您的邮箱，也不会保存您的密码，请您放心注册。虽然如此，但是我们仍建议您使用一个不同于其他程序的密码
    </a-typography-paragraph>
</template>

<style scoped lang="less">
.step {
    margin: 25px auto;
    padding: 15px;
    width: 100%;
    max-width: 1000px;
}

.content {
    margin: 25px;
}
</style>
