import { Router } from 'express'

import { User } from '@/database/table'

import { checkValue } from '@/utils/common'

import { Request } from '@/types/request'

import { updatePassword } from '@/utils/matrix'

const router = Router()

// 修改密码
router.post(
    '/',
    async (
        req: Request<{
            password: string
            loginout: boolean
        }>,
        res
    ) => {
        if (!checkValue(req.body.password)) {
            return res.send({
                status: 400,
                msg: '密码不能为空'
            })
        }

        const user = await User.findOne({
            where: {
                uid: req.auth.uid
            }
        })

        const result = await updatePassword(
            req.body.password,
            user.toJSON().matrix_user_id,
            req.body.loginout
        )

        if (!result) {
            return res.send({
                status: 500,
                msg: '修改失败'
            })
        }

        return res.send({
            status: 200,
            msg: '修改成功'
        })
    }
)

export default router
