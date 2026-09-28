import mongoose from "mongoose";

const utilityItemSchema = new mongoose.Schema(
  {
    label: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
      maxlength: 30,
    },

    message: {
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

const UtilityItem = mongoose.model("UtilityItem", utilityItemSchema);

export default UtilityItem;
