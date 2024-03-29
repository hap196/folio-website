const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const { mongoose } = require("mongoose");
const cookieParser = require("cookie-parser");
const authMiddleware = require("./routes/authMiddleware");

const app = express();

// database connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Database connected"))
  .catch((error) => console.log("Database not connected", error));

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

// routes
app.use("/", require("./routes/authRoutes"));
app.use("/", authMiddleware, require("./routes/coursesRoutes"));
app.use("/", authMiddleware, require("./routes/extracurricularsRoutes"));
app.use("/", authMiddleware, require("./routes/awardsRoutes"));
app.use("/", authMiddleware, require("./routes/testScoresRoutes"));

// setup port to listen on
const port = 8000;
app.listen(port, () => console.log(`Server running on port ${port}`));
