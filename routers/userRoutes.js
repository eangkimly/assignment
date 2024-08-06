const userRoutes = require("express").Router();
const userController = require("../controllers/userControllers")

userRoutes.get("/users", userController.getAllUser)
userRoutes.post("/users", userController.createNewUser)
userRoutes.get("/users/:id", userController.getUserById)
userRoutes.patch("/users/:id", userController.updatePassword)
userRoutes.delete("/users/:id", userController.deleteUserById)

module.exports = userRoutes;