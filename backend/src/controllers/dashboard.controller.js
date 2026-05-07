import {Traffic} from "../models/traffic.model.js";
import {Signal} from "../models/signal.model.js";
import {Violation} from "../models/violation.model.js";
import {Emergency} from "../models/emergency.model.js";
import {
  buildDashboardResponse,
} from "../services/dashboard.service.js";

const getDashboardData = async (req, res) => {

  try {

    const { intersectionId } = req.params;


    const dashboardData =
      await buildDashboardResponse(
        intersectionId
      );


    return res.status(200).json({
      success: true,
      data: dashboardData,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};


export {
  getDashboardData,
};