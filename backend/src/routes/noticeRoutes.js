import express from "express";

import {
  createNotice,
  deleteNotice,
  getNotices,
  updateNotice,
} from "../controllers/noticeController.js";

const router = express.Router();

router.get("/", getNotices);

router.post("/", createNotice);

router.put("/:id", updateNotice);

router.delete("/:id", deleteNotice);

export default router;
