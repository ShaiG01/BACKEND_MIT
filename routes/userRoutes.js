import { signUpUser, logInUser } from "../controllers/user.js";
import { createDiscovery } from "../controllers/discoveries.js";
import { Router } from "express";

const userRouter = Router()

userRouter.post('/signup', signUpUser)
userRouter.post('/login', logInUser)
userRouter.post('/create', createDiscovery)

export default userRouter