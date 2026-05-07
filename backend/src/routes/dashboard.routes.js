import { Router } from "express";

import {
  getDashboardData,
} from "../controllers/dashboard.controller.js";

const router = Router();


// full dashboard data
router.route("/:intersectionId").get(
  getDashboardData
);


export default router;