import { Router } from "express"; 
import { Login, Signup } from "../controller/auth";

const authRouter = Router()

authRouter
.post("/signup", Signup)
.post("/login", Login)

export default authRouter