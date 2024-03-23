import { Op } from 'sequelize'
import { Router } from 'express'
import dayjs from 'dayjs'

import { LoginState, User } from '@/database/table'
import logger from '@/utils/log'

import { getToken } from '@/utils/account'
import { checkValue } from '@/utils/common'
import createToken from '@/utils/token'

const router = Router()

// 生成 state
router.get('/', async (req, res) => {
    try {
        const state = await LoginState.create({
            expire: dayjs().add(10, 'minute').valueOf()
        })

        return res.send({
            status: 200,
            msg: '生成 state 成功',
            data: {
                state: state.toJSON().state
            }
        })
    } catch (e) {
        logger.error(`生成 state 失败 ${e}`)
        return res.send({
            status: 500,
            msg: '生成 state 失败'
        })
    }
})

// 效验登录
router.post('/', async (req, res) => {
    // 效验参数
    if (!checkValue(req.body, req.body.state, req.body.code)) {
        return res.send({
            status: 400,
            msg: '参数错误'
        })
    }
    // 效验 state
    try {
        const result = await LoginState.findOne({
            where: {
                state: req.body.state,
                expire: {
                    [Op.gt]: dayjs().valueOf()
                }
            }
        })

        if (!result) {
            return res.send({
                status: 400,
                msg: '无效的登录状态'
            })
        }
    } catch (error) {
        return res.send({
            status: 500,
            msg: '效验登录状态失败'
        })
    }

    // 获取 token
    const userInfo = await getToken(req.body.code)
    if (!userInfo) {
        return res.send({
            status: 400,
            msg: '无效的 code'
        })
    }

    // 更新 state
    try {
        await LoginState.update(
            {
                used: true,
                used_by: userInfo.uid
            },
            {
                where: {
                    state: req.body.state
                }
            }
        )
    } catch (error) {
        logger.error(`更新登录状态失败 ${error}`)
        return res.send({
            status: 500,
            msg: '更新登录状态失败'
        })
    }

    // 创建用户
    try {
        const result = await User.findOrCreate({
            where: {
                uid: userInfo.uid
            },
            defaults: {
                uid: userInfo.uid,
                name: userInfo.nickname,
                avatar: userInfo.avatar,
                group: 1
            }
        })

        // 生成 token
        const token = createToken(
            {
                uid: userInfo.uid,
                name: userInfo.nickname,
                avatar: userInfo.avatar,
                group: result[0].toJSON().group
            },
            60 * 60 * 6
        )

        return res.send({
            status: 200,
            msg: '登录成功',
            data: {
                token: token
            }
        })
    } catch (error) {
        logger.error(`创建用户失败 ${error}`)
        return res.send({
            status: 500,
            msg: '初始化用户信息失败'
        })
    }
})

export default router
