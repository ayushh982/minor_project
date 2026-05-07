import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();


// middlewares
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true,
}));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.use(express.static("public"));

app.use(cookieParser());


// routes import
import trafficRouter from "./routes/traffic.routes.js";
import signalRouter from "./routes/signal.routes.js";
import violationRouter from "./routes/violation.routes.js";
import emergencyRouter from "./routes/emergency.routes.js";
import dashboardRouter from "./routes/dashboard.routes.js";


// routes declaration
app.use("/api/v1/traffic", trafficRouter);

app.use("/api/v1/signals", signalRouter);

app.use("/api/v1/violations", violationRouter);

app.use("/api/v1/emergency", emergencyRouter);

app.use("/api/v1/dashboard", dashboardRouter);


export { app };