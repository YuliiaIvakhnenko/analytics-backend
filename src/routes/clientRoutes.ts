import express from "express";
import { getClients, createClient, deleteClient, updateClient } from "../controllers/clientContoller";
import { requireAuth, requireRole } from "../middlewares/auth";


const router = express.Router();


router.get("/", getClients);


router.post("/", requireAuth, requireRole("admin", "manager"), createClient);

router.put("/:id", requireAuth, requireRole("admin", "manager"), updateClient);
router.delete("/:id", requireAuth, requireRole("admin", "manager"), deleteClient);

export default router;
