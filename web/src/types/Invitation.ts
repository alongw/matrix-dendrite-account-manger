export interface Invitation {
    id: number
    code: string
    expire: number
    creator: string
    used: boolean
    used_by: string
    createdAt: string
    updatedAt: string
}
