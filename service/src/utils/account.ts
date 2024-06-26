import axios from 'axios'

import config from '@/utils/config'

export const getToken = async (code: string) => {
    try {
        const { data: result } = await axios.post('https://api.liyxi.com/node/v0/token', {
            code: code,
            client_id: config.nya_account.appid,
            client_secret: config.nya_account.appsecret,
            grant_type: 'authorization_code',
            redirect_uri: config.nya_account.redirectUrl,
            // 无需获取 token ，仅获取用户基本信息既可
            type: 'info'
        })

        return result as {
            uid: string
            nickname: string
            status: number
            avatar: string
        }
    } catch (error) {
        return false
    }
}
