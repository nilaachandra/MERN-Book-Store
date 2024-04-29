import express, { response } from "express";
import { PORT, mongodbURL } from "./config.js";
import mongoose from "mongoose";
import booksRoute from './routes/booksRoute.js'
const app = express();

//middleware to parse requset body
app.use(express.json());

//sending http request
app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Kyou Hilla dala na");
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
