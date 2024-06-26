import express from 'express'
import { expressjwt } from 'express-jwt'
import bodyParser from 'body-parser'
import cors from 'cors'

import config from '@/utils/config'
import logger from '@/utils/log'

import type { Request } from '@/types/request'

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('*', (req: Request, res, next) => {
    try {
        req.userIp =
            (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress
    } catch (e) {
        console.log(e)
    }
    next()
    logger.info(
        `ip:${req.userIp}  请求:${req.path}  user-agent:${req.headers['user-agent']}`
    )
})

app.use(
    expressjwt({ secret: config.api.jwt_secret, algorithms: ['HS256'] }).unless({
        path: config.api.jwt_unless.map((e: string) => {
            return new RegExp(
                `^${config.api.base_url == '/' ? '' : config.api.base_url}${e}`
            )
        })
    })
)

app.use(
    (
        err: express.Errback,
        req: express.Request,
        res: express.Response,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        next: express.NextFunction
    ) => {
        // 捕获身份认证失败的错误
        if (err.name === 'UnauthorizedError')
            return res.send({
                status: 401,
                msg: '鉴权失败'
            })

        // 其他错误
        if (err.name === 'SyntaxError') {
            return res.send({
                status: 418,
                msg: '不..这样的请求...不可以〇〇！已经要变成...不知道该怎么处理的笨蛋了...❤'
            })
        }

        logger.error(`拦截到 express 报错 ${err.name} 具体内容 ${err.toString()}`)
    }
)

app.use(config.api.base_url, async (req, res, next) =>
    (await import('@/router/index')).default(req, res, next)
)

app.listen(config.listen_port, async () => {
    await import('@/database/table')
    logger.info(
        `matrix-dendrite-account-manger 服务器正在端口 ${config.listen_port} 上运行`
    )
})
