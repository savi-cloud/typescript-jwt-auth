import mysql from 'mysql2/promise'
import config from './config';

const dbCon = mysql.createPool({
        host:config.DB_HOST,
        user:config.DB_USER,
        password:config.DB_PASSWORD,
        database:config.DB_DEFAULT_DB,
        port:config.DB_PORT,
    })

export default dbCon;