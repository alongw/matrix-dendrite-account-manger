export interface UserTable {
    uid: string
    name: string
    avatar: string
    group: number
    matrix_user_id: string
}

export interface InvitationCodeTable {
    id: number
    code: string
    expire: number
    creator: string
    used: boolean
    used_by: string
}
