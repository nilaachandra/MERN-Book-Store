import express from "express";
import { Book } from "../models/model.js";

const router = express.Router();
// Route to save a new book
router.post("/", async (request, response) => {
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
router.get("/", async (request, response) => {
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
router.get("/:id", async (request, response) => {
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
router.put("/:id", async (request, response) => {
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
router.delete("/:id", async (request, response) => {
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

export default router;
