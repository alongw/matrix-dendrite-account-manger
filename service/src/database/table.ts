import { DataTypes, Model } from 'sequelize'

import config from '@/utils/config'

import logger from '@/utils/log'

import db from '@/utils/db'

import type { UserTable, InvitationCodeTable, LoginStateTable } from '@/types/database'

export const User = db.define<Model<UserTable>>('user', {
    uid: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING
    },
    avatar: {
        type: DataTypes.STRING
    },
    group: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
        allowNull: false
    },
    matrix_user_id: {
        type: DataTypes.STRING
    }
})

export const InvitationCode = db.define<Model<InvitationCodeTable>>('invitation_code', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    code: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4
    },
    expire: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    creator: {
        type: DataTypes.STRING,
        allowNull: false
    },
    used: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    used_by: {
        type: DataTypes.STRING
    }
})

export const LoginState = db.define<Model<LoginStateTable>>('login_state', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    state: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4
    },
    method: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'login'
    },
    expire: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    used: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    used_by: {
        type: DataTypes.STRING
    }
})

User.hasMany(InvitationCode, {
    foreignKey: 'creator',
    sourceKey: 'uid'
})
InvitationCode.belongsTo(User, {
    foreignKey: 'creator',
    targetKey: 'uid'
})

User.hasMany(LoginState, {
    foreignKey: 'used_by',
    sourceKey: 'uid'
})

LoginState.belongsTo(User, {
    foreignKey: 'used_by',
    targetKey: 'uid'
})

if (config.db.sync === true) {
    logger.info('开始同步数据库，如果您不需要，请在配置文件中禁用')
    try {
        await db.sync({ alter: true })
        logger.info('数据库同步成功')
    } catch (error) {
        logger.error('数据库同步失败')
        logger.error(error)
        process.exit(0)
    }
}
