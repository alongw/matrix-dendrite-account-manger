import { ref } from 'vue'

import { getLoginState as getLoginStateApi, login as loginApi } from '@/apis/user'

enum LoginStatus {
    BEFORE_AUTH = '正在准备授权...',
    AFTER_AUTH = '正在效验...'
}

export const useLogin = () => {
    const showStatusTitle = ref(LoginStatus.BEFORE_AUTH)

    const updateStatusTitle = () => {
        showStatusTitle.value = LoginStatus.AFTER_AUTH
    }

    const getLoginState = async () => {
        const { data: result } = await getLoginStateApi()
        if (result.status !== 200) {
            return false
        }
        return result.data.state
    }

    const login = async (data: { state: string; code: string }) => {
        const { data: result } = await loginApi(data)
        if (result.status !== 200) {
            return false
        }
        return result.data.token
    }

    return {
        showStatusTitle,
        updateStatusTitle,
        getLoginState,
        login
    }
}
