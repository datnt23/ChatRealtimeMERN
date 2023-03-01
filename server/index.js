const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const color = require("colors");

const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());

app.get("/api/chat", (req, res) => {
  res.send(chats);
});
app.get("/api/chat/:id", (req, res) => {
  const singleChat = chats.find((c) => c._id === req.params.id);
  res.send(singleChat);
});

// Connect Database MongoDB
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(
      `DB Connection Successful: ${mongoose.connection.host}`.cyan.underline
    );
  })
  .catch((err) => {
    console.log(`Error: ${err.message}`.red.bold);
  });

const Port = process.env.PORT;
app.listen(Port, console.log(`Server Started on Port ${Port}`.yellow.bold));
