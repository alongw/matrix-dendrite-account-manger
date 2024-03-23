import fse from 'fs-extra'
import yaml from 'js-yaml'
import logger from './log'
const defaultConfig = {
    listen_port: 10099,
    api: {
        base_url: '/api',
        jwt_secret: 'e10adc3949ba59abbe56e057f20f883e',
        jwt_unless: ['/public']
    },
    db: {
        type: 'sqlite',
        sync: true,
        mysql: {
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: 'password',
            database: 'database'
        }
    },
    matrix: {
        base_url: 'https://matrix.gov.cn',
        registration_shared_secret: '114514',
        access_token: '1919810'
    },
    nya_account: {
        appid: 'appid',
        appsecret: 'admin123',
        redirectUrl: 'https://www.gov.cn/'
    }
}

if (!fse.existsSync('./config.yaml')) {
    logger.warn('未找到配置文件，正在创建默认配置文件...')
    try {
        fse.writeFileSync('./config.yaml', yaml.dump(defaultConfig))
    } catch (error) {
        logger.error('创建默认配置文件失败' + error)
        process.exit(1)
    }
    process.exit(0)
}

const config = yaml.load(
    fse.readFileSync('./config.yaml', 'utf8')
) as typeof defaultConfig

export default config
