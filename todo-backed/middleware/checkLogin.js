const express = require("express");

const checkLogin = async (req, res, next) => {
  if (req.session.userId) {
    return res.status(401).json({
      success: false,
      message: "Please Login First",
    });
  }
  next();
};

module.exports = checkLogin;
