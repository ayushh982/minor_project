import {Emergency} from "../models/emergency.model.js";
import {Signal} from "../models/signal.model.js";


// trigger emergency
const triggerEmergency = async (req, res) => {

  try {

    const {
      vehicleType,
      lane,
      intersectionId,
      overrideTime,
    } = req.body;


    const emergency = await Emergency.create({
      vehicleType,
      lane,
      intersectionId,
      overrideTime,
      active: true,
    });


    // create emergency signal
    const signal = await Signal.create({
      intersectionId,
      activeLane: lane,
      timings: [0, 0, 0, overrideTime],
      emergencyMode: true,
    });


    // realtime emit
    global.io.emit("emergency-alert", {
      emergency,
      signal,
    });


    return res.status(201).json({
      success: true,
      message: "Emergency triggered successfully",
      data: emergency,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};



// get emergency status
const getEmergencyStatus = async (req, res) => {

  try {

    const { intersectionId } = req.params;


    const emergency = await Emergency.findOne({
      intersectionId,
      active: true,
    }).sort({ createdAt: -1 });


    return res.status(200).json({
      success: true,
      data: emergency,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};


export {
  triggerEmergency,
  getEmergencyStatus,
};