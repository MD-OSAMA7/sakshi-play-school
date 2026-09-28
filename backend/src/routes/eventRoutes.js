import express from "express";

import requireClerkAuth from "../middleware/requireClerkAuth.js";

import {
  createEvent,
  deleteEvent,
  getEvents,
  updateEvent,
} from "../controllers/eventController.js";

const router = express.Router();

// Public: events can be viewed without login.
router.get("/", getEvents);

// Protected: admin authentication required.
router.post("/", requireClerkAuth, createEvent);

router.put("/:id", requireClerkAuth, updateEvent);

router.delete("/:id", requireClerkAuth, deleteEvent);

export default router;
