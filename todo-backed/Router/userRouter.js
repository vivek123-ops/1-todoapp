const express = require("express");
const user = express.Router();
const userController = require("../Controller/userController");
const checkLogin = require("../middleware/checkLogin");

user.post("/register", userController.registerController);
user.post("/login", userController.userLogin);
user.get("/getData", userController.getData);
user.post("/addpost", checkLogin, userController.addPost);
user.post("/deletePost", userController.deletePost);
user.get("/get-user/:userId", userController.getUser);

module.exports = user;
