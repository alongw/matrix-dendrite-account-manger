import { Request as ExpressRequest } from 'express'
// import { ParsedQs } from 'qs'

// interface SystemHeader {
//     fingerprint: string
// }

export interface User {
    uid: string
    name: string
    avatar: string
    group: number
}

export interface Request<
    B = Partial<Record<string, never>>,
    Q extends ExpressRequest['query'] = Partial<Record<string, never>>,
    P extends ExpressRequest['params'] = Partial<Record<string, never>>,
    H extends ExpressRequest['headers'] = ExpressRequest['headers']
> extends ExpressRequest {
    // headers: H & SystemHeader
    headers: H
    params: P
    query: Q
    body: B
    userIp: string
    auth: User
}
