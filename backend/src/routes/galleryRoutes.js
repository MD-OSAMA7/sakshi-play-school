import express from "express";

import upload from "../middleware/upload.js";

import {
  deleteGalleryImage,
  getGalleryImages,
  updateGalleryImage,
  uploadGalleryImage,
} from "../controllers/galleryController.js";

const router = express.Router();

router.get("/", getGalleryImages);

router.post("/", upload.single("image"), uploadGalleryImage);

router.put("/:id", updateGalleryImage);

router.delete("/:id", deleteGalleryImage);

export default router;
