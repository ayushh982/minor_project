import {Signal} from "../models/signal.model.js";


// get current signal
const getCurrentSignal = async (req, res) => {

  try {

    const { intersectionId } = req.params;


    const signal = await Signal.findOne({
      intersectionId,
    }).sort({ createdAt: -1 });


    return res.status(200).json({
      success: true,
      data: signal,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};



// manual signal override
const manualSignalOverride = async (req, res) => {

  try {

    const {
      intersectionId,
      activeLane,
      timings,
    } = req.body;


    const signal = await Signal.create({
      intersectionId,
      activeLane,
      timings,
      emergencyMode: false,
    });


    // realtime emit
    global.io.emit("signal-update", signal);


    return res.status(201).json({
      success: true,
      message: "Signal overridden successfully",
      data: signal,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};


export {
  getCurrentSignal,
  manualSignalOverride,
};