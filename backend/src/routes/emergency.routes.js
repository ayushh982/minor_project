import { Router } from "express";

import {
  triggerEmergency,
  getEmergencyStatus,
} from "../controllers/emergency.controller.js";

const router = Router();


// trigger emergency
router.route("/trigger").post(
  triggerEmergency
);


// emergency status
router.route("/status/:intersectionId").get(
  getEmergencyStatus
);


export default router;