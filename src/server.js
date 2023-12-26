require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3500;
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const { logger } = require("./middlewares/logEvents");
const errorHandler = require("./middlewares/errorHandler");
const cookieParser = require("cookie-parser");
const verifyJWT = require("./middlewares/verifyJWT");
const credentials = require("./middlewares/credentials");
const mongoose = require("mongoose");
const connectDB = require("./db/DBconnection");
app.use(logger);

// connect to mongoDB
connectDB();

// CORS
app.use(credentials);
app.use(cors());

// form data and json data
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// middleware for parsing cookies
app.use(cookieParser());

// Static files
app.use("/", express.static(path.join(__dirname, "..", "public")));

// Routes

app.use("/", require("./routes/root"));
app.use("/register", require("./routes/auth/register"));
app.use("/auth", require("./routes/auth/auth"));
app.use("/refresh", require("./routes/auth/refresh"));
app.use("/logout", require("./routes/auth/logout"));

// protected route
app.use(verifyJWT);
app.use("/api/posts", require("./routes/api/post"));
app.use("/api/likes", require("./routes/api/like"));

// Route handlers

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    // res.status(404).send("404 Not found");
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 Not found" });
  } else {
    res.type("txt").send("404 Not found");
  }
});

app.use(errorHandler);

mongoose.connection.once("open", () => {
  console.log("MongoDB connection established successfully");
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
