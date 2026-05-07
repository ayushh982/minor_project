import { Router } from "express";

import {
  getCurrentSignal,
  manualSignalOverride,
} from "../controllers/signal.controller.js";

const router = Router();


// current signal
router.route("/current/:intersectionId").get(
  getCurrentSignal
);


// manual override
router.route("/override").post(
  manualSignalOverride
);


export default router;