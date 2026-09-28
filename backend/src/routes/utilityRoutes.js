import express from "express";

import {
  createUtilityItem,
  deleteUtilityItem,
  getUtilityItems,
  updateUtilityItem,
} from "../controllers/utilityController.js";

const router = express.Router();

router.get("/", getUtilityItems);

router.post("/", createUtilityItem);

router.put("/:id", updateUtilityItem);

router.delete("/:id", deleteUtilityItem);

export default router;
