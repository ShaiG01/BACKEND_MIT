import { signUpUser, logInUser } from "../controllers/user.js";
import { Router } from "express";

const userRouter = Router()

userRouter.post('/signup', signUpUser)
userRouter.post('/login', logInUser)

export default userRouter