import { Router } from 'express'

const router = Router()

router.use('/register', async (req, res, next) =>
    (await import('./register')).default(req, res, next)
)

router.use('/password', async (req, res, next) =>
    (await import('./password')).default(req, res, next)
)

router.use('/info', async (req, res, next) =>
    (await import('./info')).default(req, res, next)
)

export default router
