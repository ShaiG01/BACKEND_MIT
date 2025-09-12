import { signUpUser } from "../controllers/user.js";
import { Router } from "express";

const userRouter = Router()

userRouter.post('/signup', signUpUser)

export default userRouter