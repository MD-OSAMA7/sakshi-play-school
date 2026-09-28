import mongoose from "mongoose";

const noticeSchema = new mongoose.Schema(
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

    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500,
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

const Notice = mongoose.model("Notice", noticeSchema);

export default Notice;
