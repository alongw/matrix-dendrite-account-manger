import { Router } from 'express'
import { Request } from '@/types/request'

const router = Router()

// router.use('/', async (req, res, next) =>
//     (await import('@/router/index')).default(req, res, next)
// )

router.use('/public', async (req, res, next) =>
    (await import('./public/index')).default(req, res, next)
)

router.use('/admin', async (req: Request, res, next) => {
    if (req.auth?.group < 10) {
        return res.send({
            status: 403,
            msg: '权限不足'
        })
    }
    return (await import('./admin/index')).default(req, res, next)
})

router.all('*', async (req, res) => {
    return res.send(
        '[matrix-dendrite-account-manger] Status: OK | reference: https://github.com/alongw/matrix-dendrite-account-manger/'
    )
})

export default router
