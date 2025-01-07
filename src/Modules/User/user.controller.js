import {Router} from 'express'
import { excludeService, findUserService, signupService, updateUserService } from './services/user.service.js'

const userRouter = Router()

userRouter.post('/addUser', signupService)
userRouter.put('/updateUser/:id', updateUserService)
userRouter.get('/findUser', findUserService)
userRouter.get('/exclude/:id', excludeService)

export default userRouter