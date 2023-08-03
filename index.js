require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 4000;
const mongoose = require("mongoose");
const cors = require("cors");
const taskRouter = require("./routes/taskRouter");

//middleware
app.use(express.json());
app.use(cors());

//routes
app.use("/api/task", taskRouter);

app.use((req, res) => {
  res.status(404).send("Resourse Not Found");
});

//db connection
const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log(`server running`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();

app.use((req, res) => {
  res.status(404).send("Resource Not Found");
});
