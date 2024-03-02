const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const { mongoose } = require("mongoose");
const cookieParser = require("cookie-parser");
const app = express();

// database connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Database connected"))
  .catch((error) => console.log("Database not connected", error));

// middleware
app.use(express.json());
app.use(cookieParser());

app.use("/", require("./routes/authRoutes"));
app.use(express.urlencoded({ extended: false }));

// setup port to listen on
const port = 8000;
app.listen(port, () => console.log(`Server running on port ${port}`));
