import mongoose from "mongoose";

const signalSchema = new mongoose.Schema(
  {
    intersectionId: {
      type: String,
      required: true,
    },

    activeLane: {
      type: String,
      required: true,
    },

    timings: {
      type: [Number], // [45, 15, 20, 10]
      required: true,
    },

    emergencyMode: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);


export const Signal=mongoose.model("Signal",signalSchema);