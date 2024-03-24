import { Sequelize } from 'sequelize'
import { dbLogger } from '@/utils/log'
import config from '@/utils/config'

let sequelize: Sequelize

if (config.db.type === 'sqlite') {
    sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: './data/database.db',
        logging: (msg) => dbLogger.debug.bind(msg),
        define: {
            timestamps: false // 禁用所有模型的 timestamps
        }
    })
} else {
    const db = config.db.mysql
    sequelize = new Sequelize({
        dialect: 'mysql',
        host: db.host,
        port: db.port,
        username: db.username,
        password: db.password,
        database: db.database,
        logging: (msg) => dbLogger.debug.bind(msg)
    })
}

export default sequelize
