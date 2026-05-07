import {Traffic} from "../models/traffic.model.js";
import {Signal} from "../models/signal.model.js";
import { calculateSignalTimings } from "../services/signal.service.js";


// upload video
const uploadTrafficVideo = async (req, res) => {

  try {

    const videoFile = req.file;

    if (!videoFile) {

      return res.status(400).json({
        success: false,
        message: "Video file is required",
      });

    }

    return res.status(200).json({
      success: true,
      message: "Video uploaded successfully",
      file: videoFile.path,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};



// save ML traffic data
const saveTrafficData = async (req, res) => {

  try {

    const {
      intersectionId,
      lanes,
      emergencyDetected,
      weatherCondition,
    } = req.body;


    // total vehicles
    const totalVehicles = lanes.reduce(
      (acc, curr) => acc + curr,
      0
    );


    // save traffic
    const traffic = await Traffic.create({
      intersectionId,
      lanes,
      totalVehicles,
      emergencyDetected,
      weatherCondition,
    });


    // weather multiplier
    let weatherMultiplier = 1;

    if (weatherCondition === "Rain") {
      weatherMultiplier = 1.2;
    }

    if (weatherCondition === "Fog") {
      weatherMultiplier = 1.3;
    }


    // calculate signal timings
    const signalData = calculateSignalTimings(
      lanes,
      weatherMultiplier
    );


    // lane names
    const laneNames = [
      "North",
      "South",
      "East",
      "West",
    ];


    // save signal
    const signal = await Signal.create({
      intersectionId,
      activeLane:
        laneNames[signalData.activeLane],

      timings: signalData.timings,

      emergencyMode: emergencyDetected,
    });


    // realtime updates
    global.io.emit("traffic-update", traffic);

    global.io.emit("signal-update", signal);


    return res.status(201).json({
      success: true,
      message: "Traffic processed successfully",

      data: {
        traffic,
        signal,
      },
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};



// get latest traffic
const getLiveTraffic = async (req, res) => {

  try {

    const { intersectionId } = req.params;


    const traffic = await Traffic.findOne({
      intersectionId,
    }).sort({ createdAt: -1 });


    return res.status(200).json({
      success: true,
      data: traffic,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};



// get traffic history
const getTrafficHistory = async (req, res) => {

  try {

    const { intersectionId } = req.params;


    const history = await Traffic.find({
      intersectionId,
    }).sort({ createdAt: -1 });


    return res.status(200).json({
      success: true,
      data: history,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};


export {
  uploadTrafficVideo,
  saveTrafficData,
  getLiveTraffic,
  getTrafficHistory,
};