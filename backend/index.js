import express from "express";
import { PORT, mongodbURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/model.js";

const app = express();

//middleware to parse requset body
app.use(express.json())

//sending http request
app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Kyou Hilla dala na");
});

// Route to save a new book
app.post('/books', async (request, response) => {
  try {
    if(!request.body.title || !request.body.author || !request.body.publisher || !request.body.publishYear)
    {
      return response.status(400).send({
        message: 'send all required fields'
      });
    }
    const newBook = {
      title: request.body.title,
      author: request.body.author,
      publisher: request.body.publisher,
      publishYear: request.body.publishYear
    }
    const book = await Book.create(newBook)
    return response.status(201).send(book)
  } catch (error) {
    console.log(error.message)
    response.status(500).send({message: error.message})
  }
})

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
