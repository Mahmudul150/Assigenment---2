import { Router } from "express";
import { authControler } from "./auth.controller";

const router = Router()

router.post('/signup',authControler.signup)
router.post('/login',authControler.login)

export default router