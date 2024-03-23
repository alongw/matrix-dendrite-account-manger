import axios, { type Response } from '@/utils/axios'

import type { Invitation } from '@/types/Invitation'

export const getInvitationList = async () => {
    return axios.get<
        Response<{
            invitationList: Invitation[]
        }>
    >('/admin/invitation')
}

export const createInvitation = async (number: number, expire: number) => {
    return axios.post<
        Response<{
            codeList: string[]
        }>
    >('/admin/invitation', {
        number,
        expire
    })
}
