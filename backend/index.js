import express from 'express';
import { PORT, mongodbURL } from './config.js';
import mongoose from 'mongoose';
const app = express();

//sending http request
app.get('/', (request, response) => {
    console.log(request)
    return response.status(234).send('Kyou Hilla dala na')
})

//listener
app.listen(PORT, () => {
    console.log(`app is listening to port: ${PORT}`)
})

//mongodb connection

mongoose.connect(mongodbURL)
.then(()=>{
    console.log("Database Connection")
}).catch((error)=>{
    console.log(error)
})