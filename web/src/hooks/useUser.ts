import { ref } from 'vue'

import {
    getUserInfo as getUserInfoApi,
    getMatrixInfo as getMatrixInfoApi,
    updatePassword
} from '@/apis/user'

export const useUser = () => {
    const userInfo = ref<{
        uid: string
        name: string
        avatar: string
        group: number
    }>()

    const matrixAccount = ref<string | false>()

    const getUserInfo = async () => {
        const { data: result } = await getUserInfoApi()
        if (result.status !== 200) {
            return false
        }
        return result.data
    }

    const getMatrixInfo = async () => {
        const { data: result } = await getMatrixInfoApi()
        if (result.status !== 200) {
            return false
        }
        return result.data.matrix_user_id
    }

    const editPassword = async (newPassword: string, loginout: boolean) => {
        const { data: result } = await updatePassword({
            password: newPassword,
            loginout: loginout
        })
        if (result.status !== 200) {
            return false
        }
        return true
    }

    return {
        userInfo,
        getUserInfo,
        getMatrixInfo,
        matrixAccount,
        editPassword
    }
}
