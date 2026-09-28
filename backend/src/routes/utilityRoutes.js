import express from "express";

import requireClerkAuth from "../middleware/requireClerkAuth.js";

import {
  createUtilityItem,
  deleteUtilityItem,
  getUtilityItems,
  updateUtilityItem,
} from "../controllers/utilityController.js";

const router = express.Router();

// Public: top bar items can be viewed without login.
router.get("/", getUtilityItems);

// Protected: admin authentication required.
router.post("/", requireClerkAuth, createUtilityItem);

router.put("/:id", requireClerkAuth, updateUtilityItem);

router.delete("/:id", requireClerkAuth, deleteUtilityItem);

export default router;
