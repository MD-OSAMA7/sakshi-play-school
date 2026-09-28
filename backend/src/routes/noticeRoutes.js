import express from "express";

import requireClerkAuth from "../middleware/requireClerkAuth.js";

import {
  createNotice,
  deleteNotice,
  getNotices,
  updateNotice,
} from "../controllers/noticeController.js";

const router = express.Router();

// Public: notices can be viewed without login.
router.get("/", getNotices);

// Protected: admin authentication required.
router.post("/", requireClerkAuth, createNotice);

router.put("/:id", requireClerkAuth, updateNotice);

router.delete("/:id", requireClerkAuth, deleteNotice);

export default router;
