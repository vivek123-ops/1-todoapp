const express = require("express");
const mongoose = require("mongoose");
const user = require("./Router/userRouter");
const session = require("express-session");
const cors = require("cors");

const app = express();

app.use(express.json());


// cors
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);


// session
app.use(
  session({
    secret: "vivek",
    resave: false,
    saveUninitialized: false,
  })
);


// routes
app.use("/api", user);


const serverStat = async () => {

  try {

    await mongoose.connect(
      "mongodb+srv://vivekshrivastav325_db_user:root@cluster0.zpafw3s.mongodb.net/todoapp"
    );

    console.log("database connected");

    app.listen(3000, () => {
      console.log("server connected");
    });

  } catch (error) {

    console.log(error);

  }
};

serverStat();