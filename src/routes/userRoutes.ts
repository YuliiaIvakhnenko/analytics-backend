import express from "express";
import { getUsers, createUser, updateUser, deleteUser } from "../controllers/userContoller";

const router = express.Router();

// Ці маршрути потребують авторизації
router.get("/", getUsers);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
