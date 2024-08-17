import express from "express";
import { getTeamMembers } from "../Controllers/TeamMemberController.js";
const router = express.Router();

router.get("/", getTeamMembers);

export default router;
