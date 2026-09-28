import UtilityItem from "../models/UtilityItem.js";

export const getUtilityItems = async (req, res) => {
  try {
    const items = await UtilityItem.find()
      .sort({
        displayOrder: 1,
        createdAt: 1,
      })
      .lean();

    return res.status(200).json({
      success: true,
      data: items,
    });
  } catch (error) {
    console.error("Get utility items error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch top bar items.",
    });
  }
};

export const createUtilityItem = async (req, res) => {
  try {
    const { label, message, displayOrder = 0 } = req.body;

    if (!label?.trim() || !message?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Label and message are required.",
      });
    }

    const item = await UtilityItem.create({
      label: label.trim().toUpperCase(),
      message: message.trim(),
      displayOrder: Number(displayOrder) || 0,
    });

    return res.status(201).json({
      success: true,
      message: "Top bar item created successfully.",
      data: item,
    });
  } catch (error) {
    console.error("Create utility item error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create top bar item.",
    });
  }
};

export const updateUtilityItem = async (req, res) => {
  try {
    const { id } = req.params;

    const { label, message, displayOrder } = req.body;

    if (!label?.trim() || !message?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Label and message are required.",
      });
    }

    const item = await UtilityItem.findByIdAndUpdate(
      id,
      {
        label: label.trim().toUpperCase(),
        message: message.trim(),
        displayOrder: Number(displayOrder) || 0,
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Top bar item not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Top bar item updated successfully.",
      data: item,
    });
  } catch (error) {
    console.error("Update utility item error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update top bar item.",
    });
  }
};

export const deleteUtilityItem = async (req, res) => {
  try {
    const { id } = req.params;

    const item = await UtilityItem.findByIdAndDelete(id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Top bar item not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Top bar item deleted successfully.",
    });
  } catch (error) {
    console.error("Delete utility item error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete top bar item.",
    });
  }
};
