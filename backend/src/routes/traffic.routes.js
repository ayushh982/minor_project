import { Router } from "express";

import {
  uploadTrafficVideo,
  saveTrafficData,
  getLiveTraffic,
  getTrafficHistory,
} from "../controllers/traffic.controller.js";

import {upload} from "../middlewares/multer.middleware.js";

const router = Router();


// upload traffic video
router.route("/upload").post(
  upload.single("video"),
  uploadTrafficVideo
);


// ML processed traffic data
router.route("/data").post(
  saveTrafficData
);


// latest traffic
router.route("/live/:intersectionId").get(
  getLiveTraffic
);


// traffic history
router.route("/history/:intersectionId").get(
  getTrafficHistory
);


export default router;