import { signUpUser, logInUser } from "../controllers/user.js";
import { createDiscovery, getIntangibleDiscoveries, getTangibleDiscoveries} from "../controllers/discoveries.js";
import { Router } from "express";

const userRouter = Router()

userRouter.post('/signup', signUpUser)
userRouter.post('/login', logInUser)
userRouter.post('/create', createDiscovery)
userRouter.get('/tangible', getTangibleDiscoveries)
userRouter.get('/intangible', getIntangibleDiscoveries)

export default userRouter