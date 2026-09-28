import Notice from "../models/Notice.js";

export const getNotices = async (req, res) => {
  try {
    const notices = await Notice.find()
      .sort({
        displayOrder: 1,
        createdAt: 1,
      })
      .lean();

    return res.status(200).json({
      success: true,
      data: notices,
    });
  } catch (error) {
    console.error("Get notices error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch notices.",
    });
  }
};

export const createNotice = async (req, res) => {
  try {
    const { day, month, title, description, displayOrder = 0 } = req.body;

    if (
      !day?.trim() ||
      !month?.trim() ||
      !title?.trim() ||
      !description?.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "All notice fields are required.",
      });
    }

    const notice = await Notice.create({
      day: day.trim(),
      month: month.trim().toUpperCase(),
      title: title.trim(),
      description: description.trim(),
      displayOrder: Number(displayOrder) || 0,
    });

    return res.status(201).json({
      success: true,
      message: "Notice created successfully.",
      data: notice,
    });
  } catch (error) {
    console.error("Create notice error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create notice.",
    });
  }
};

export const updateNotice = async (req, res) => {
  try {
    const { id } = req.params;

    const { day, month, title, description, displayOrder } = req.body;

    if (
      !day?.trim() ||
      !month?.trim() ||
      !title?.trim() ||
      !description?.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "All notice fields are required.",
      });
    }

    const notice = await Notice.findByIdAndUpdate(
      id,
      {
        day: day.trim(),
        month: month.trim().toUpperCase(),
        title: title.trim(),
        description: description.trim(),
        displayOrder: Number(displayOrder) || 0,
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!notice) {
      return res.status(404).json({
        success: false,
        message: "Notice not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Notice updated successfully.",
      data: notice,
    });
  } catch (error) {
    console.error("Update notice error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update notice.",
    });
  }
};

export const deleteNotice = async (req, res) => {
  try {
    const { id } = req.params;

    const notice = await Notice.findByIdAndDelete(id);

    if (!notice) {
      return res.status(404).json({
        success: false,
        message: "Notice not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Notice deleted successfully.",
    });
  } catch (error) {
    console.error("Delete notice error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete notice.",
    });
  }
};
