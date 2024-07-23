const express = require("express");
const route = express.Router();
const {
  createUser,
  updateUser,
  getUser,
  deleteUser,
  loginUser,
  getAllUser
} = require("../controller/authController");

route.post("/create", createUser);
route.put("/update/:id", updateUser);
route.get("/get/:id", getUser);
route.delete("/delete/:id", deleteUser);
route.post("/login", loginUser);
route.post("/getAll", getAllUser);

module.exports = route;
