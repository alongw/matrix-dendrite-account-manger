import { Router } from 'express'

const router = Router()

router.use('/invitation', async (req, res, next) =>
    (await import('./invitation')).default(req, res, next)
)

export default router
