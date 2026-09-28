import Gallery from "../models/Gallery.js";
import cloudinary from "../config/cloudinary.js";

const uploadImageToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "sakshi-play-school/gallery",
        resource_type: "image",
      },
      (error, result) => {
        if (error) {
          reject(error);
          return;
        }

        resolve(result);
      },
    );

    uploadStream.end(buffer);
  });
};

const getNextDisplayOrder = async () => {
  const lastImage = await Gallery.findOne()
    .sort({ displayOrder: -1 })
    .select("displayOrder")
    .lean();

  return lastImage ? lastImage.displayOrder + 1 : 1;
};

export const uploadGalleryImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please select an image.",
      });
    }

    const title = req.body.title?.trim() || "";
    const requestedOrder = Number(req.body.displayOrder);

    const displayOrder =
      Number.isFinite(requestedOrder) && requestedOrder >= 1
        ? requestedOrder
        : await getNextDisplayOrder();

    const result = await uploadImageToCloudinary(req.file.buffer);

    const galleryImage = await Gallery.create({
      title,
      imageUrl: result.secure_url,
      publicId: result.public_id,
      displayOrder,
    });

    return res.status(201).json({
      success: true,
      message: "Image uploaded successfully.",
      data: galleryImage,
    });
  } catch (error) {
    console.error("Gallery upload error:", error);

    return res.status(500).json({
      success: false,
      message: "Image upload failed.",
    });
  }
};

export const getGalleryImages = async (req, res) => {
  try {
    const page = Math.max(Number(req.query.page) || 1, 1);

    // Default: 12 images per page
    // Maximum allowed: 50 images per request
    const limit = Math.min(Number(req.query.limit) || 12, 50);

    const skip = (page - 1) * limit;

    const [images, totalImages] = await Promise.all([
      Gallery.find()
        .sort({ displayOrder: 1, createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),

      Gallery.countDocuments(),
    ]);

    const totalPages = Math.ceil(totalImages / limit);

    return res.status(200).json({
      success: true,
      data: images,
      pagination: {
        page,
        limit,
        totalImages,
        totalPages,
        hasNextPage: page < totalPages,
      },
    });
  } catch (error) {
    console.error("Gallery fetch error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch gallery images.",
    });
  }
};

export const updateGalleryImage = async (req, res) => {
  try {
    const { id } = req.params;

    const image = await Gallery.findById(id);

    if (!image) {
      return res.status(404).json({
        success: false,
        message: "Gallery image not found.",
      });
    }

    const title = req.body.title?.trim();
    const requestedOrder = Number(req.body.displayOrder);

    if (title !== undefined) {
      image.title = title;
    }

    if (Number.isFinite(requestedOrder) && requestedOrder >= 1) {
      image.displayOrder = requestedOrder;
    }

    await image.save();

    return res.status(200).json({
      success: true,
      message: "Gallery image updated successfully.",
      data: image,
    });
  } catch (error) {
    console.error("Gallery update error:", error);

    return res.status(500).json({
      success: false,
      message: "Gallery image update failed.",
    });
  }
};

export const deleteGalleryImage = async (req, res) => {
  try {
    const { id } = req.params;

    const image = await Gallery.findById(id);

    if (!image) {
      return res.status(404).json({
        success: false,
        message: "Gallery image not found.",
      });
    }

    await cloudinary.uploader.destroy(image.publicId, {
      resource_type: "image",
    });

    await Gallery.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Image deleted successfully.",
    });
  } catch (error) {
    console.error("Gallery delete error:", error);

    return res.status(500).json({
      success: false,
      message: "Image deletion failed.",
    });
  }
};
