import { Op } from 'sequelize'
import { Router } from 'express'
import dayjs from 'dayjs'

import { User, InvitationCode } from '@/database/table'

import { checkValue } from '@/utils/common'
import logger from '@/utils/log'
import { register } from '@/utils/matrix'

import type { Request } from '@/types/request'

const router = Router()

// 获取用户 matrix 账号信息
router.get('/', async (req: Request, res) => {
    try {
        const result = await User.findOne({
            where: {
                uid: req.auth?.uid
            }
        })

        if (!result) {
            return res.send({
                status: 500,
                msg: '发生了不可能发生的错误'
            })
        }

        return res.send({
            status: 200,
            msg: '获取用户信息成功',
            data: {
                matrix_user_id: result.toJSON().matrix_user_id || false
            }
        })
    } catch (error) {
        return res.send({
            status: 500,
            msg: '获取用户 matrix 账号信息失败'
        })
    }
})

// 检查用户名
router.post('/checkName', async (req: Request<{ username: string }>, res) => {
    if (!checkValue(req.body, req.body.username)) {
        return res.send({
            status: 400,
            msg: '参数错误'
        })
    }

    try {
        const result = await User.findOne({
            where: {
                matrix_user_id: req.body.username
            }
        })

        if (result) {
            return res.send({
                status: 403,
                msg: '用户名已被占用',
                data: {
                    ability: false
                }
            })
        }

        return res.send({
            status: 200,
            msg: '用户名可用',
            data: {
                ability: true
            }
        })
    } catch (error) {
        return res.send({
            status: 500,
            msg: '检查用户名失败'
        })
    }
})

// 注册用户 matrix 账号
router.post(
    '/',
    async (
        req: Request<{
            username: string
            password: string
            nickname: string
            inviteCode: string
        }>,
        res
    ) => {
        if (
            !checkValue(
                req.body,
                req.body.username,
                req.body.password,
                req.body.nickname,
                req.body.inviteCode
            )
        ) {
            return res.send({
                status: 400,
                msg: '参数错误'
            })
        }

        // 检查邀请码
        try {
            const result = await InvitationCode.findOne({
                where: {
                    code: req.body.inviteCode,
                    used: {
                        [Op.or]: [false, null, undefined]
                    },
                    expire: {
                        [Op.gte]: dayjs().valueOf()
                    }
                }
            })

            if (!result || result.toJSON().used) {
                return res.send({
                    status: 403,
                    msg: '邀请码无效'
                })
            }
        } catch (error) {
            logger.error(`检查邀请码失败 ${error}`)
            return res.send({
                status: 500,
                msg: '检查邀请码失败'
            })
        }

        // 判断用户是否已经注册 或者用户名是否已经被占用
        try {
            const result = await User.findOne({
                where: {
                    uid: req.auth?.uid
                }
            })

            if (result.toJSON().matrix_user_id) {
                return res.send({
                    status: 403,
                    msg: '你已经注册过啦，不可以再注册了哦！！'
                })
            }

            const result2 = await User.findOne({
                where: {
                    matrix_user_id: req.body.username
                }
            })

            if (result2) {
                return res.send({
                    status: 403,
                    msg: '用户名已被占用'
                })
            }
        } catch (error) {
            logger.error(`注册失败 ${error}`)
            return res.send({
                status: 500,
                msg: '初始化注册失败'
            })
        }

        // 注册用户
        const result = await register({
            username: req.body.username,
            password: req.body.password,
            nickname: req.body.nickname
        })

        if (!result) {
            return res.send({
                status: 500,
                msg: '注册失败'
            })
        }

        // 更新用户信息
        try {
            await User.update(
                {
                    matrix_user_id: req.body.username
                },
                {
                    where: {
                        uid: req.auth?.uid
                    }
                }
            )
        } catch (error) {
            logger.error(`更新用户信息失败 ${error}`)
            return res.send({
                status: 500,
                msg: '更新用户信息失败'
            })
        }

        // 使用邀请码
        try {
            await InvitationCode.update(
                {
                    used: true,
                    used_by: req.auth?.uid
                },
                {
                    where: {
                        code: req.body.inviteCode
                    }
                }
            )
        } catch (error) {
            logger.error(`使用邀请码失败 ${error}`)
            return res.send({
                status: 500,
                msg: '使用邀请码失败'
            })
        }

        return res.send({
            status: 200,
            msg: '注册成功'
        })
    }
)

export default router
