const express = require("express");
const mongoose = require("mongoose");
const User = require("../module/userModule");
const user = require("../Router/userRouter");

const registerController = async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    if (!userName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "all feild is required",
      });
    }
    // check email
    const checkemail = await User.findOne({ email });
    if (checkemail) {
      return res.status(400).json({
        success: false,
        message: "User already exit",
      });
    }

    // now after not exit new user
    const newUser = await User.create({
      userName,
      email,
      password,
    });
    res.status(201).json({
      success: true,
      message: "user is created",
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "internal error register Router",
    });
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check email
    const checkemail = await User.findOne({ email });

    if (!checkemail) {
      return res.status(400).json({
        success: false,
        message: "Email does not exist",
      });
    }

    // password check
    if (checkemail.password !== password) {
      return res.status(400).json({
        success: false,
        message: "Password is incorrect",
      });
    }

    // session save
    req.session.userId = checkemail._id;

    // login true
    checkemail.isLogin = true;

    await checkemail.save();
    console.log(checkemail._id);

    res.status(200).json({
      success: true,
      message: "Login successful",
      userId: checkemail._id,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Problem in user login",
    });
  }
};

const addPost = async (req, res) => {
  try {
    const { userId, title } = req.body;
    const findUser = await User.findById(userId);
    const data = findUser.Data.filter((data) => data === title);
    if (data.length > 0) {
      return res.status(400).json({
        success: false,
        message: "dublicate data not allowed",
      });
    }
    await findUser.Data.push(title);
    await findUser.save();
    res.status(201).json({
      success: true,
      message: "data is added",
    });
  } catch (error) {
    res.status(400).json({
      success: true,
      message: "error fond addpost",
    });
  }
};

const deletePost = async (req, res) => {
  try {
    const { userId, title } = req.body;
    const findUser = await User.findById(userId);
    findUser.Data = findUser.Data.filter((data) => data !== title);
    await findUser.save();
    res.status(201).json({
      success: true,
      message: "data is added",
    });
  } catch (error) {
    res.status(400).json({
      success: true,
      message: "error fond deletepost",
    });
  }
};
const getData = async (req, res) => {
  try {
    const { userId } = req.query;

    const user = await User.findById(userId);

    res.status(200).json({
      success: true,
      message: "All data retrieved successfully",
      Data: user.Data,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "Problem arrived",
    });
  }
};

const getUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      userName: user.userName,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  registerController,
  userLogin,
  addPost,
  deletePost,
  getData,
  getUser,
};
