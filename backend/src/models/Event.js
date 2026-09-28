import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    day: {
      type: String,
      required: true,
      trim: true,
      maxlength: 2,
    },

    month: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
      maxlength: 3,
    },

    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },

    subtitle: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },

    displayOrder: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
  },
);

const Event = mongoose.model("Event", eventSchema);

export default Event;
