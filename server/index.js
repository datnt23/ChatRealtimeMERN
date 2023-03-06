const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const color = require("colors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const { notFound, errorHandler } = require("./middleware/error");

const app = express();
dotenv.config();
connectDB();

app.use(cors());
app.use(express.json()); //to accept JSON data

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);

app.use(notFound);
app.use(errorHandler);

const Port = process.env.PORT;
app.listen(Port, console.log(`Server Started on Port ${Port}`.yellow.bold));
