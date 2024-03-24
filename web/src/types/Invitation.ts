export interface Invitation {
    id: number
    code: string
    expire: number
    creator: string
    used: boolean
    used_by: string

    // sequelize sqlite bug
    // createdAt: string
    // updatedAt: string
}
