import { signUpUser, logInUser, editProfile, fetchUserProfile} from "../controllers/user.js";
import { createDiscovery, getIntangibleDiscoveries, getTangibleDiscoveries, searchBar, deleteDiscovery, getUserDiscoveries} from "../controllers/discoveries.js";
import { Router } from "express";

const userRouter = Router()

userRouter.post('/signup', signUpUser)
userRouter.post('/login', logInUser)
userRouter.post('/edit', editProfile)
userRouter.post('/delete', deleteDiscovery)
userRouter.post('/findUser', fetchUserProfile)

userRouter.post('/search', searchBar)
userRouter.post('/get', getUserDiscoveries)
userRouter.post('/create', createDiscovery)
userRouter.get('/tangible', getTangibleDiscoveries)
userRouter.get('/intangible', getIntangibleDiscoveries)

export default userRouter