import { Router } from 'express'

const router = Router()

// router.use('/', async (req, res, next) =>
//     (await import('@/router/index')).default(req, res, next)
// )

router.all('*', async (req, res) => {
    return res.send(
        '[matrix-dendrite-account-manger] Status: OK | reference: https://github.com/alongw/matrix-dendrite-account-manger/'
    )
})

export default router
