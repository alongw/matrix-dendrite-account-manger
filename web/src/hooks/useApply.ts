/* eslint-disable @typescript-eslint/no-unused-vars */
import { ref } from 'vue'

import dayjs from 'dayjs'

import { message, Modal } from 'ant-design-vue'

import { checkMatrixName as checkMatrixNameApi, registerMatrix } from '@/apis/user'

import router from '@/router'

export const useApply = () => {
    const step = ref(0)

    const btnLoading = ref(false)

    const formData = ref({
        username: '',
        password: '',
        nickname: '',
        inviteCode: ''
    })

    const checkUserName = async (username: string = formData.value.username) => {
        if (!username) {
            return {
                status: false,
                msg: '用户名不能为空'
            }
        }
        btnLoading.value = true
        const { data: result } = await checkMatrixNameApi({ username })
        btnLoading.value = false
        if (result.status !== 200) {
            return {
                status: false,
                msg: '获取用户名信息失败'
            }
        }
        return {
            status: result.data.ability,
            msg: result.msg
        }
    }

    const showModel = (success: boolean, msg: string) => {
        if (success) {
            Modal.success({
                title: '注册成功',
                content: msg,
                onOk: () => {
                    step.value++
                }
            })
        } else {
            // 中国模式
            // Modal.info({
            //     title: '你的注册请求已经提交',
            //     content:
            //         '我们已经收到你的注册申请，我们将会在7个工作日内完成对您账号的审核',
            //     onOk: () => {
            //         window.localStorage.setItem('applyDate', dayjs().format('YYYY-MM-DD'))
            //         router.push('/finish')
            //     }
            // })

            // 正常模式
            Modal.error({
                title: '注册失败',
                content: msg
            })
        }
    }

    const submit = async () => {
        const { username, password, nickname, inviteCode } = formData.value
        if (!username || !password || !nickname || !inviteCode) {
            return message.error('请填写完整信息')
        }
        btnLoading.value = true
        const { data: result } = await registerMatrix({
            username,
            password,
            nickname,
            inviteCode
        })
        btnLoading.value = false
        showModel(result.status === 200, result.msg)
    }

    return {
        formData,
        checkUserName,
        step,
        btnLoading,
        submit
    }
}
