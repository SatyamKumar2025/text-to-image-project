import express from 'express';
import {registerUser,loginUser, userCredit} from '../controllers/userController.js'
import userAuth from '../middlewares/auth.js';

const userRouter = express.Router()

userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.get('/credits',userAuth ,userCredit)

export default userRouter;

//http://localhost:4000/api/user/register
//localhost:4000/api/user/login