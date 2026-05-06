import mongoose from "mongoose";

const emergencySchema = new mongoose.Schema(
  {
    vehicleType: {
      type: String, // ambulance, firetruck
      required: true,
    },

    lane: {
      type: String,
      required: true,
    },

    intersectionId: {
      type: String,
      required: true,
    },

    overrideTime: {
      type: Number,
      default: 60,
    },

    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Emergency=mongoose.model("Emergency",emergencySchema);