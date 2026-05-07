import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});

import http from "http";

import { Server } from "socket.io";

import connectDB from "./src/db/index.js";

import { app } from "./src/app.js";


// connect DB
connectDB();


// create HTTP server
const server = http.createServer(app);


// socket io
const io = new Server(server, {
  cors: {
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  },
});


// global socket access
global.io = io;


// socket connection
io.on("connection", (socket) => {

  console.log("Client connected:", socket.id);

  socket.on("disconnect", () => {

    console.log("Client disconnected");

  });

});


// start server
server.listen(process.env.PORT || 8000, () => {

  console.log(
    `Server running on port ${process.env.PORT}`
  );

});