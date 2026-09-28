import Event from "../models/Event.js";

export const getEvents = async (req, res) => {
  try {
    const events = await Event.find()
      .sort({
        displayOrder: 1,
        createdAt: 1,
      })
      .lean();

    return res.status(200).json({
      success: true,
      data: events,
    });
  } catch (error) {
    console.error("Get events error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch events.",
    });
  }
};

export const createEvent = async (req, res) => {
  try {
    const { day, month, title, subtitle, displayOrder = 0 } = req.body;

    if (!day?.trim() || !month?.trim() || !title?.trim() || !subtitle?.trim()) {
      return res.status(400).json({
        success: false,
        message: "All event fields are required.",
      });
    }

    const event = await Event.create({
      day: day.trim(),
      month: month.trim().toUpperCase(),
      title: title.trim(),
      subtitle: subtitle.trim(),
      displayOrder: Number(displayOrder) || 0,
    });

    return res.status(201).json({
      success: true,
      message: "Event created successfully.",
      data: event,
    });
  } catch (error) {
    console.error("Create event error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create event.",
    });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;

    const { day, month, title, subtitle, displayOrder } = req.body;

    if (!day?.trim() || !month?.trim() || !title?.trim() || !subtitle?.trim()) {
      return res.status(400).json({
        success: false,
        message: "All event fields are required.",
      });
    }

    const event = await Event.findByIdAndUpdate(
      id,
      {
        day: day.trim(),
        month: month.trim().toUpperCase(),
        title: title.trim(),
        subtitle: subtitle.trim(),
        displayOrder: Number(displayOrder) || 0,
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Event updated successfully.",
      data: event,
    });
  } catch (error) {
    console.error("Update event error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update event.",
    });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;

    const event = await Event.findByIdAndDelete(id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Event deleted successfully.",
    });
  } catch (error) {
    console.error("Delete event error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete event.",
    });
  }
};
