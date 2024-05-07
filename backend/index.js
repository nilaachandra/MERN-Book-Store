import express from "express";
import mongoose from "mongoose";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";
import dotenv from "dotenv";
import { PORT, mongodbURL } from "./config.js";

dotenv.config();

const app = express();

// Middleware to parse request body
app.use(express.json());

// CORS configuration to allow requests from a specific origin with credentials
app.use(
  cors({
    origin: ["https://kitaabeinapi.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Sending HTTP request
app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Server Is Working Fine");
});

app.use("/books", booksRoute);

// MongoDB connection
mongoose
  .connect(mongodbURL)
  .then(() => {
    console.log("Database Connection Successful");
    // Listener
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
