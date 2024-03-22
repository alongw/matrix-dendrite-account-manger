import crypto from 'crypto'

export const generateMAC = (
    nonce: string,
    user: string,
    password: string,
    isAdmin: boolean,
    sharedSecret: string
) => {
    const hmac = crypto.createHmac('sha1', sharedSecret)

    hmac.update(nonce)
    hmac.update('\x00')
    hmac.update(user)
    hmac.update('\x00')
    hmac.update(password)
    hmac.update('\x00')
    hmac.update(isAdmin ? 'admin' : 'notadmin')

    return hmac.digest('hex')
}
