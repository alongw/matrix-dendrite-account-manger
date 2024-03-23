import { Router } from 'express'

import { checkValue } from '@/utils/common'

import { Request } from '@/types/request'

const router = Router()

// 修改密码
router.post(
    '/',
    async (
        req: Request<{
            password: string
        }>,
        res
    ) => {
        if (!checkValue(req.body.password)) {
            return res.send({
                status: 400,
                msg: '密码不能为空'
            })
        }

        try {
            // TODO: 修改密码
        } catch (error) {}
    }
)

export default router
