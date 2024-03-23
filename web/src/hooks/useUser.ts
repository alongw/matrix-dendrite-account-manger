import { ref } from 'vue'

import {
    getUserInfo as getUserInfoApi,
    getMatrixInfo as getMatrixInfoApi
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

    return {
        userInfo,
        getUserInfo,
        getMatrixInfo,
        matrixAccount
    }
}
