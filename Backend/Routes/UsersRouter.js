// practice/Backend/Routes/UsersRouter.js
import express from 'express'
import { getUsers, getUserByEmail, addUser } from '../Controller/UsersController.js'

const UsersRouter = express.Router()


UsersRouter.get("/", getUsers)
UsersRouter.get("/email/:emailId", getUserByEmail); // Fix parameter case
UsersRouter.post("/", addUser)



export default UsersRouter