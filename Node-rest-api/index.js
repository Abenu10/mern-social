//import express module
const express = require("express");

//create an express application
const app = express();

//import mongoose module
const mongoose = require("mongoose");

//import dotenv module
const dotenv = require("dotenv");

//import helmet module  The helmet module helps the server stay safe from bad things.
const helmet = require("helmet");

//import morgan module
const morgan = require("morgan");

const cors = require("cors");
app.use(cors());

const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");

const multer = require("multer");

const path = require("path");

//configure dotenv to access environment variables from .env file
dotenv.config();

mongoose.set("strictQuery", true);
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true }, () => {
  console.log("connected to MongoDB");
});

app.use("/images", express.static(path.join(__dirname, "public/images")));
//Todo middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    // cb(null, file.originalname);
    // cb(null, req.body.name);
    // console.log(req.body);
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
 
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploded successfully");
  } catch (error) {
    console.error(error);
  }
});


app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);

app.get("/", (req, res) => {
  res.send("Welcome to homepage");
});
app.get("/users", (req, res) => {
  res.send("Welcome to Users page");
});
// app.get("/posts" ,(req,res)=>{
//     res.json({
//         message:"hello"
//     })
// })

//listen to port 8800 and log a message when the server is running
app.listen(8800, () => {
  //listen to port 8800

  console.log("Backend Server is running"); //log a message when the server is running
});
