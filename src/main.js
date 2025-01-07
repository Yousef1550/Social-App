import express from 'express'
import { database_connetion } from './DB/connection.js'
import routerHandler from './utils/router-handler.utils.js'





const bootstrab = async () => {

    const app = express()

    await database_connetion()

    app.use(express.json())


    routerHandler(app)




    const port = 3000
    app.listen(port, () => {
        console.log(`Server is listening on port ${port}!`);
    })
}


export default bootstrab