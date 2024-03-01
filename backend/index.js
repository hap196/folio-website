const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");

const app = express();

app.use('/', require('./routes/authRoutes'))

// setup port to listen on
const port = 8000;
app.listen(port, () => console.log(`Server running on port ${8000}`));
