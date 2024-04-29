import express, { response } from "express";
import { PORT, mongodbURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/model.js";

const app = express();

//middleware to parse requset body
app.use(express.json());

//sending http request
app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Kyou Hilla dala na");
});

// Route to save a new book
app.post("/books", async (request, response) => {
  try {
    console.log("Request Body:", request.body); // Log request body
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publisher ||
      !request.body.publishYear
    ) {
      return response.status(400).send({
        message: "send all required fields",
      });
    }
    const newBook = {
      title: request.body.title,
      author: request.body.author,
      publisher: request.body.publisher,
      publishYear: request.body.publishYear,
    };
    const book = await Book.create(newBook);
    return response.status(201).send(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route to get all the books from database
app.get("/books", async (request, response) => {
  try {
    const books = await Book.find({});
    return response.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// route to get books by ID
app.get("/books/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const book = await Book.findById(id);
    return response.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//Route to update a Book
app.put("/books/:id", async (request, response) => {
  // we need a put method to update
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publisher ||
      !request.body.publishYear
    ) {
      return response.status(400).send({
        message: "Some Field(s) are missing. Check and Try again!",
      });
    }
    const { id } = request.params;
    const result = await Book.findByIdAndUpdate(id, request.body);

    if (!result) {
      return response.status(404).json({ message: "Book Not found" });
    }
    return response.status(200).send({ message: "Book Updated Succesfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//Route to delete a book
app.delete("/books/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const result = await Book.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).json({ message: "Book Not Found" });
    }
    return response.status(200).send({ message: "Book Deleted Succesfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500);
  }
});

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
