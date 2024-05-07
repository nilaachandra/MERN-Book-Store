import express, { response } from "express";
import { PORT, mongodbURL } from "./config.js";
import mongoose from "mongoose";
import booksRoute from './routes/booksRoute.js'
import cors from 'cors';
import dotenv from 'dotenv'
dotenv.config();

const app = express();

//middleware to parse requset body
app.use(express.json());

//Middleware for handling CORS Policy
//option 1 : Allow all origins with default of Cors(*)
app.use(cors())

//option 2 : Allow Custom origins. It gives us flexibility
// app.use(
//   cors({
//     origin: 'https://localhost:3000',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type']
//   })
// )

//sending http request
app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Server Is Working Fine");
});

app.use('/books', booksRoute)

//mongodb connection
mongoose
  .connect(mongodbURL)
  .then(() => {
    console.log("Database Connection Succesfull");
    //listener
    app.listen(PORT, () => {
      console.log(`app is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
