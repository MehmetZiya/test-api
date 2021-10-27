const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// Routes file
const userRoutes = require("./routes/UserRoutes");

const app = express();
app.use(bodyParser.json());

//Routes
app.use("/api/v1/users", userRoutes);

//Middleware
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknow error accured!" });
});

//Variables
const port = 5000;
const uri =
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.7mk7g.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;



app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
        );
        res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
        next();
}); 


//Port Connection
app.listen(port, (err) => {
  if (err) return console.log(err);
  console.log(`Listening on port ${port}`);
});

//MongoDB Setup

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));
