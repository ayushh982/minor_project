import mongoose from 'mongoose' ;

const trafficSchema = new mongoose.Schema(
  {
    intersectionId: {
      type: String,
      required: true,
    },

    lanes: {
      type: [Number], // [24, 8, 12, 5]
      required: true,
    },

    totalVehicles: {
      type: Number,
      default: 0,
    },

    emergencyDetected: {
      type: Boolean,
      default: false,
    },

    weatherCondition: {
      type: String,
      default: "Clear",
    },
  },
  {
    timestamps: true,
  }
);

export const Traffic = mongoose.model("Traffic", trafficSchema);