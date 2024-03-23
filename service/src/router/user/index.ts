import { Router } from 'express'

const router = Router()

router.use('/register', async (req, res, next) =>
    (await import('./register')).default(req, res, next)
)

export default router
