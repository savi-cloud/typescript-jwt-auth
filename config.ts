require("dotenv").config();

const ACCESS_TOKEN_PUBLIC_KEY: String = process.env.ACCESS_TOKEN_PUBLIC_KEY
const ACCESS_TOKEN_PRIVATE_KEY: String = process.env.ACCESS_TOKEN_PRIVATE_KEY
const REFRESH_TOKEN_PUBLIC_KEY: String = process.env.REFRESH_TOKEN_PUBLIC_KEY
const REFRESH_TOKEN_PRIVATE_KEY: String = process.env.REFRESH_TOKEN_PRIVATE_KEY



const config = {
    HTTP_PORT:              process.env.HTTP_PORT,
    DB_HOST:                process.env.DB_HOST,
    DB_USER:                process.env.DB_USER,
    DB_PASSWORD:            process.env.DB_PASSWORD,
    DB_DEFAULT_DB:          process.env.DB_DEFAULT_DB,
    DB_PORT:                Number(process.env.DB_PORT),
    ACCESS_TOKEN_EXPIRE:    process.env.ACCESS_TOKEN_EXPIRE,
    REFRESH_TOKEN_EXPIRE:   process.env.REFRESH_TOKEN_EXPIRE,
    
    accessTokenPrivateKey: ACCESS_TOKEN_PRIVATE_KEY,
    accessTokenPublicKey: ACCESS_TOKEN_PUBLIC_KEY,
    refreshTokenPrivateKey: REFRESH_TOKEN_PRIVATE_KEY,
    refreshTokenPublicKey: REFRESH_TOKEN_PUBLIC_KEY
}

export default config