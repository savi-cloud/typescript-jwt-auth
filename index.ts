import express, { Request, Response } from 'express'
import config from './config'

import log from './utils/logger'
import dbCon from './dbcon'
import router from './routes'
import deserializeUser from './middleware/deserializeUser'

const app = express()
const port = config.HTTP_PORT

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(deserializeUser)

app.use(router)


//start the server if db connection is valid
const startTheServer = async () => {

    try{
        const [rows] = await dbCon.execute('select 1');

        log.info("Connected to the database")
        app.listen(port, () => log.info(`Sever running on localhost:${port}`))

    }catch(e){
        if(e.code === 'ECONNREFUSED'){
            log.fatal("Error connecting to database")

            await new Promise(resolve => setTimeout(resolve, 2000))
            
            log.info("Reconnecting to the database")
            startTheServer()
        }else{
            log.fatal('Error connecting to the database')
            log.fatal(e)
            process.exit(1)
        }
    }
}

startTheServer()