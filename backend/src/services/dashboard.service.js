import {Traffic} from "../models/traffic.model.js";
import {Signal} from "../models/signal.model.js";
import {Violation} from "../models/violation.model.js";
import {Emergency} from "../models/emergency.model.js";


const buildDashboardResponse = async (
  intersectionId
) => {

  const traffic = await Traffic.findOne({
    intersectionId,
  }).sort({ createdAt: -1 });


  const signal = await Signal.findOne({
    intersectionId,
  }).sort({ createdAt: -1 });


  const violations = await Violation.find({
    intersectionId,
  })
    .sort({ createdAt: -1 })
    .limit(5);


  const emergency = await Emergency.findOne({
    intersectionId,
    active: true,
  });


  return {
    traffic,
    signal,
    violations,
    emergency,
  };

};


export {
  buildDashboardResponse,
};