import express from "express";
import { getSecurities, createSecurity, deleteSecurity, updateSecurity, getSecurityById } from "../controllers/securityContorller";


const router = express.Router();

router.get("/", getSecurities);
router.post("/", createSecurity);
router.put("/:id", updateSecurity);
router.delete("/:id", deleteSecurity);
router.get("/:id", getSecurityById); 
export default router;
