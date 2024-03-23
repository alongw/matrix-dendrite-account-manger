<script setup lang="ts">
import { ref } from 'vue'
import { message } from 'ant-design-vue'
import dayjs from 'dayjs'
import type { Dayjs } from 'dayjs'
import { createInvitation, getInvitationList } from '@/apis/admin'

import type { Invitation } from '@/types/Invitation'

defineOptions({
    name: 'AdminPage'
})

const columns = [
    {
        dataIndex: 'id',
        title: 'ID'
    },
    {
        dataIndex: 'code',
        title: '邀请码'
    },
    {
        dataIndex: 'expire',
        title: '过期时间',
        customRender: ({ text }: { text: string }) => {
            return dayjs(text).format('YYYY-MM-DD HH:mm:ss')
        }
    },
    {
        dataIndex: 'used',
        title: '是否使用',
        customRender: ({ text }: { text: boolean }) => {
            return text ? '是' : '否'
        }
    },
    {
        dataIndex: 'used_by',
        title: '使用者',
        customRender: ({ text }: { text: string }) => {
            return text || '/'
        }
    },

    {
        dataIndex: 'updatedAt',
        title: '使用时间（更新时间）',
        customRender: ({ text }: { text: string }) => {
            return text ? dayjs(text).format('YYYY-MM-DD HH:mm:ss') : '/'
        }
    },
    {
        dataIndex: 'creator',
        title: '创建者'
    },
    {
        dataIndex: 'createdAt',
        title: '创建时间',
        customRender: ({ text }: { text: string }) => {
            return dayjs(text).format('YYYY-MM-DD HH:mm:ss')
        }
    }
]

const numIpt = ref('')
const timeIpt = ref<Dayjs>()
const resultIpt = ref('')
const addBtnLoading = ref(false)

const dataSource = ref<Invitation[]>([])

const handleAdd = async () => {
    if (!numIpt.value || !timeIpt.value) {
        return message.error('请正确填写表单')
    }
    addBtnLoading.value = true
    const { data: result } = await createInvitation(
        +numIpt.value,
        timeIpt.value?.valueOf()
    )
    addBtnLoading.value = false
    if (result.status !== 200) {
        return message.error(result.msg)
    }
    resultIpt.value = result.data.codeList.join('\n')
}

const fetch = async () => {
    const { data: result } = await getInvitationList()
    if (result.status !== 200) {
        return message.error(result.msg)
    }
    dataSource.value = result.data.invitationList
}
</script>

<template>
    <h1>管理员页面</h1>
    <p>22世纪最先进最美观的后台管理界面 以后再重构</p>
    <a-divider />
    <h2>创建邀请码</h2>
    <a-space direction="vertical" style="width: 100%">
        <a-row>
            <a-col span="8">数量：</a-col>
            <a-col span="16">
                <a-input v-model:value="numIpt" type="number" />
            </a-col>
        </a-row>
        <a-row>
            <a-col span="8">过期时间：</a-col>
            <a-col span="16">
                <a-date-picker v-model:value="timeIpt" />
            </a-col>
        </a-row>
        <a-button type="primary" @click="handleAdd" :loading="addBtnLoading">
            生成
        </a-button>
        <a-textarea v-model:value="resultIpt" :rows="10" />
    </a-space>

    <a-divider />
    <h2>邀请码列表</h2>
    <a-button type="primary" @click="fetch">刷新</a-button>
    <a-table
        :dataSource="dataSource"
        :columns="columns"
        :pagination="false"
        :scroll="{
            x: 'max-content'
        }"
    />
</template>
