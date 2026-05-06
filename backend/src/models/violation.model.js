import mongoose from "mongoose";

const violationSchema = new mongoose.Schema(
  {
    plateNumber: {
      type: String,
      required: true,
    },

    violationType: {
      type: String,
      required: true,
    },

    speed: {
      type: Number,
      default: 0,
    },

    imageUrl: {
      type: String,
    },

    intersectionId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Violation = mongoose.model("Violation",violationSchema);