import { Router } from "express";
import { login, refresh, logout, register } from "../controllers/authController";


const router = Router();
router.post("/register", register);
router.post("/login", login);
router.post("/refresh", refresh);
router.post("/logout", logout);

export default router;
