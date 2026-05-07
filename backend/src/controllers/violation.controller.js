import {Violation} from "../models/violation.model.js";


// create violation
const createViolation = async (req, res) => {

  try {

    const {
      plateNumber,
      violationType,
      speed,
      imageUrl,
      intersectionId,
    } = req.body;


    const violation = await Violation.create({
      plateNumber,
      violationType,
      speed,
      imageUrl,
      intersectionId,
    });


    // realtime emit
    global.io.emit("violation-update", violation);


    return res.status(201).json({
      success: true,
      message: "Violation added successfully",
      data: violation,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};



// get all violations
const getViolations = async (req, res) => {

  try {

    const { intersectionId } = req.params;


    const violations = await Violation.find({
      intersectionId,
    }).sort({ createdAt: -1 });


    return res.status(200).json({
      success: true,
      data: violations,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};



// get single violation
const getViolationDetails = async (req, res) => {

  try {

    const { id } = req.params;


    const violation = await Violation.findById(id);


    if (!violation) {

      return res.status(404).json({
        success: false,
        message: "Violation not found",
      });

    }


    return res.status(200).json({
      success: true,
      data: violation,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};


export {
  createViolation,
  getViolations,
  getViolationDetails,
};