import { Router } from 'express'

import { Request } from '@/types/request'

const router = Router()

router.get('/', (req: Request, res) => {
    return res.send({
        status: 200,
        msg: '获取用户信息成功',
        data: {
            userInfo: req.auth
        }
    })
})

export default router
