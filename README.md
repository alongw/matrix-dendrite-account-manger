# matrix-dendrite-account-manger

This is a simple account manager for the Matrix Dendrite server. It is written in Typescript and uses the Matrix API to create and manage accounts.

### About Configuration Files

```yaml
# 2024-03-23 version 1.0.0
# default config file

# Application api listening port
listen_port: 10099

# Application api configuration
api:
    # Base url of the api
    base_url: /api

    # Secret key for jwt
    # This secret key is used to generate the token on the user's web
    # And must be kept in the same formats
    jwt_secret: e10adc3949ba59abbe56e057f20f883e

    # Urls that do not need to be verified by jwt
    # Do not modify without special needs
    jwt_unless:
        - /public

# Database configuration
db:
    # Database type
    # sqlite or mysql
    type: sqlite

    # Whether to synchronize the database
    # If set to true, the database will be synchronized with the model
    sync: true

    # Mysql configuration
    # Only valid when the database type is mysql
    mysql:
        # Mysql host
        host: localhost

        # Mysql port
        port: 3306

        # Mysql username
        username: root

        # Mysql password
        password: password

        # Mysql database
        database: database

# Matrix Server Information Configuration
matrix:
    # Matrix server url
    # Don't end with "/"
    base_url: https://matrix.gov.cn

    # Matrix server registration shared secret
    # https://matrix-org.github.io/synapse/latest/admin_api/register_api.html
    registration_shared_secret: '114514'

    # Matrix server access token
    # https://matrix-org.github.io/dendrite/administration/adminapi
    access_token: '1919810'
    
    # Matrix server name
    # It's the "gov.cn" in "@admin:gov.cn".
    server_name: 'gov.cn'

# Nya account configuration
# https://account.lolinya.net/docs/quickly-start.html
nya_account:
    # Nya account appid
    appid: appid

    # Nya account appsecret
    appsecret: admin123

    # Nya account redirect url
    redirectUrl: https://www.gov.cn/login

```

