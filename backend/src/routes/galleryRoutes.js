import express from "express";

import upload from "../middleware/upload.js";
import requireClerkAuth from "../middleware/requireClerkAuth.js";

import {
  deleteGalleryImage,
  getGalleryImages,
  updateGalleryImage,
  uploadGalleryImage,
} from "../controllers/galleryController.js";

const router = express.Router();

// Public: website gallery can be viewed without login.
router.get("/", getGalleryImages);

// Protected: admin authentication required.
router.post("/", requireClerkAuth, upload.single("image"), uploadGalleryImage);

router.put("/:id", requireClerkAuth, updateGalleryImage);

router.delete("/:id", requireClerkAuth, deleteGalleryImage);

export default router;
