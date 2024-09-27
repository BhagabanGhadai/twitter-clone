import { initServer } from './app';
import dotenv from 'dotenv';

dotenv.config()
async function init() {
    const app = await initServer()
    app.listen(process.env.PORT,()=>{
        console.log(`server started at port : 8000`)
    })
}
init()