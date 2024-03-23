import { Router } from 'express'
import { InvitationCode } from '@/database/table'

import { checkValue } from '@/utils/common'

import type { Request } from '@/types/request'
import logger from '@/utils/log'

const router = Router()

// 获取所有邀请码
router.get('/', async (req, res) => {
    const invitationList = await InvitationCode.findAll()
    res.send({
        status: 200,
        msg: '获取邀请码列表成功',
        data: {
            invitationList
        }
    })
})

// 创建邀请码
router.post(
    '/',
    async (
        req: Request<{
            number: number
            expire: number
        }>,
        res
    ) => {
        if (!checkValue(req.body, req.body.number, req.body.expire)) {
            return res.send({
                status: 400,
                msg: '参数错误'
            })
        }

        const number = req.body.number

        try {
            // 创建邀请码
            const result = await InvitationCode.bulkCreate(
                Array.from({ length: number }).map(() => ({
                    expire: req.body.expire,
                    creator: req.auth.uid
                }))
            )
            return res.send({
                status: 200,
                msg: '创建邀请码成功',
                data: {
                    codeList: result.map((e) => e.toJSON().code)
                }
            })
        } catch (error) {
            logger.error(`创建邀请码失败 ${error}`)
            return res.send({
                status: 500,
                msg: '创建邀请码失败'
            })
        }
    }
)

// 删除邀请码
router.delete(
    '/',
    async (
        req: Request<{
            code: string
        }>,
        res
    ) => {
        if (!checkValue(req.body, req.body.code)) {
            return res.send({
                status: 400,
                msg: '参数错误'
            })
        }

        try {
            await InvitationCode.update(
                {
                    used: true,
                    used_by: 'Delete'
                },
                {
                    where: {
                        code: req.body.code
                    }
                }
            )
            return res.send({
                status: 200,
                msg: '删除邀请码成功'
            })
        } catch (error) {
            logger.error(`删除邀请码失败 ${error}`)
            return res.send({
                status: 500,
                msg: '删除邀请码失败'
            })
        }
    }
)

export default router
