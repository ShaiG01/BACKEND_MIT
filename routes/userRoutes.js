import { signUpUser, logInUser, editProfile} from "../controllers/user.js";
import { createDiscovery, getIntangibleDiscoveries, getTangibleDiscoveries, getUserDiscoveries} from "../controllers/discoveries.js";
import { Router } from "express";

const userRouter = Router()

userRouter.post('/signup', signUpUser)
userRouter.post('/login', logInUser)
userRouter.post('/edit', editProfile)

userRouter.post('/get', getUserDiscoveries)
userRouter.post('/create', createDiscovery)
userRouter.get('/tangible', getTangibleDiscoveries)
userRouter.get('/intangible', getIntangibleDiscoveries)

export default userRouter