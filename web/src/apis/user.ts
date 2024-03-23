import axios, { type Response } from '@/utils/axios'

export const getLoginState = () => {
    return axios.get<
        Response<{
            state: string
        }>
    >('/public/login')
}

export const login = (data: { state: string; code: string }) => {
    return axios.post<
        Response<{
            token: string
        }>
    >('/public/login', data)
}

export const getUserInfo = () => {
    return axios.get<
        Response<{
            uid: string
            avatar: string
            name: string
            group: number
        }>
    >('/user/info')
}

export const getMatrixInfo = () => {
    return axios.get<
        Response<{
            matrix_user_id: string | false
        }>
    >('/user/register')
}

export const checkMatrixName = (data: { username: string }) => {
    return axios.post<Response>('/user/register/checkName', data)
}

export const registerMatrix = (data: {
    username: string
    password: string
    nickname: string
    inviteCode: string
}) => {
    return axios.post<Response>('/user/register', data)
}

export const updatePassword = (data: { password: string }) => {
    return axios.post<Response>('/user/password', data)
}
