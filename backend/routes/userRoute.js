const express = require("express");
const route = express.Router();
const {
  createUser,
  updateUser,
  getUser,
  deleteUser,
} = require("../controller/authController");

route.post("/create", createUser);
route.put("/update/:id", updateUser);
route.get("/get/:id", getUser);
route.delete("/delete/:id", deleteUser);

module.exports = route;
