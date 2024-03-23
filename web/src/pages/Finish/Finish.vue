<script setup lang="ts">
import { onMounted, ref } from 'vue'

import dayjs from 'dayjs'
import router from '@/router'

defineOptions({
    name: 'FilishPage'
})

const status = ref<'wait' | 'finish'>()
const date = ref<string>()

const showLine = ref(false)

const handleReSubmit = () => {
    window.localStorage.setItem('applyDate', '')
    router.push('/apply')
}

onMounted(() => {
    const datew = window.localStorage.getItem('applyDate')
    if (!datew) {
        return router.push('/apply')
    }
    date.value = datew

    if (dayjs(date.value).add(2, 'day').valueOf() <= dayjs().valueOf()) {
        status.value = 'finish'
    } else {
        status.value = 'wait'
    }
})
</script>

<template>
    <div v-if="showLine" class="result">
        <div v-if="status == 'wait'">
            <a-steps
                direction="vertical"
                :current="1"
                :items="[
                    {
                        title: '提交审核',
                        description: '您已提交注册申请',
                        subTitle: dayjs(date).format('YYYY-MM-DD HH:mm:ss')
                    },
                    {
                        title: '审核中',
                        description: '我们将会在七个工作日内完成对您注册账号申请的审核'
                    }
                ]"
            ></a-steps>
            <a-button @click="showLine = !showLine">返回</a-button>
        </div>
        <div v-else>
            <a-steps
                direction="vertical"
                :current="1"
                :items="[
                    {
                        title: '提交审核',
                        description: '您已提交注册申请',
                        subTitle: dayjs(date).format('YYYY-MM-DD')
                    },
                    {
                        title: '审核不通过',
                        description: '您的注册申请未通过审核，请检查注册信息并重新提交',
                        subTitle: dayjs().format('YYYY-MM-DD'),
                        status: 'error'
                    }
                ]"
            ></a-steps>
            <a-space>
                <a-button @click="showLine = !showLine">返回</a-button>
                <a-button type="primary" @click="handleReSubmit">重新提交</a-button>
            </a-space>
        </div>
    </div>
    <a-result
        v-else
        title="您的注册申请我们已经受理"
        sub-title="我们将会在七个工作日内完成对您注册账号申请的审核"
    >
        <template #extra>
            <a-button @click="$router.push('/user')" type="primary">返回</a-button>
            <a-button @click="showLine = !showLine">查看进度</a-button>
        </template>
    </a-result>
</template>

<style scoped lang="less">
.result {
    margin: 0 auto;
    padding: 15px;
    width: 100%;
    max-width: 800px;
}
</style>
