// Backend/Routes/UsersRouter.js
import express from "express";
import { getUsers, getUserByEmail, addUser, loginUser, upload } from "../Controller/UsersController.js";

const UsersRouter = express.Router();

UsersRouter.get("/", getUsers);
UsersRouter.get("/email/:emailId", getUserByEmail);
UsersRouter.post("/register", upload.single("profileImage"), addUser);
UsersRouter.post("/login", loginUser);

export default UsersRouter;
