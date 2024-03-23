import axios from 'axios'

import config from './config'

import { checkValue } from './common'
import { generateMAC } from './mac'

const getNonce = async () => {
    try {
        const { data: result } = await axios.get(
            `${config.matrix.base_url}/_synapse/admin/v1/register`
        )
        return result.nonce
    } catch (e) {
        return false
    }
}

export const register = async (user: {
    username: string
    password: string
    nickname: string
}) => {
    if (!checkValue(user, user.username, user.password, user.nickname)) {
        return false
    }

    const nonce = await getNonce()

    if (!nonce) {
        return false
    }

    const mac = generateMAC(nonce, user.username, user.password)

    try {
        const { data: result } = await axios.post(
            `${config.matrix.base_url}/_synapse/admin/v1/register`,
            {
                nonce,
                username: user.username,
                password: user.password,
                admin: false,
                displayname: user.nickname,
                mac
            }
        )

        if (!result.user_id) {
            return false
        }

        return true
    } catch (error) {
        return false
    }
}
