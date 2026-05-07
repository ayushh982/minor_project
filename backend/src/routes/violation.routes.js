import { Router } from "express";

import {
  createViolation,
  getViolations,
  getViolationDetails,
} from "../controllers/violation.controller.js";

const router = Router();


// add violation
router.route("/").post(
  createViolation
);


// get all violations
router.route("/:intersectionId").get(
  getViolations
);


// single violation details
router.route("/details/:id").get(
  getViolationDetails
);


export default router;