import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser"; 
// import {
//   globalErrorHandler,
//   CatchNotFound,
// } from "./src/middlewares/errorHandler.js";
import morgan from "morgan";
import cors from "cors";
// import { Timestamp } from "bson";
import userRoutes from "./routes/userRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";



//initialize our express app
const app = express();


app.use(
  cors({
    origin: ["http://localhost:5173", "https://task-duty-frontend-rosy.vercel.app"], //allow request from client adress
    credentials: true, //allow cookie to be sent
    method: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"], //PERMITTED http methods
    optionsSuccessStatus: 200, //default status
  })
);

// //anytime we want sent something to the client side convert it to a json format, that is what the middleware is doing, that before you send your file convert it first, and the limit is saying that our response must not be greater than 25mb in size
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev")); //morgan is a middleware, it logs http request to the terminal in dev mode
}
app.use(cookieParser()); // intialize cookie in our app
app.use(express.json({ limit: "25mb" })); //parses request gotten from client side in a body not greater than 25mb

app.use(express.urlencoded({ extended: true, limit: "25mb" })); //useful for getting the large form submission in encoded formats such as base64 url strings where we set the content type of request body
app.disable("x-powered-by"); //disable the tech stack used when sending response to the client. we dont want them to know because of hackers

//get request time
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//test api route
app.get("/", (req, res) => {
  res.status(200).json({
    status: "Success",
    message: "Server is running",
    enviroment: process.env.NODE_ENV,
    timestamp: req.requestTime,
  });
});
//assemble our api routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/task", taskRoutes);

//assemble our api routes
// app.use("/api/v1/auth", userRoutes); // we want to look into the user routes folder for the user routes file
// app.use("/api/v1/patients", patientRoutes);
// app.use("/api/v1/rooms", roomRoutes);
// app.use("/api/v1/doctors", doctorRoutes);
// app.use("/api/v1/appointments", appointmentRoutes);
// app.use("/api/v1/payments", paymentRoutes);
// app.use("/api/v1/inpatients", inpatientRoutes);
// app.use("/api/v1/dashboard", dashboardRoutes);



//handle routes error

// app.use(CatchNotFound);

//global error handler
// app.use(globalErrorHandler);

//database connection
const connectDb = async () => {
  const connectionOptions = {
    //env file in node when reading must begin with process.env
    dbName: process.env.MANGODB_DB_NAME, //read env file
    serverSelectionTimeoutMs: 45000, //max time to wait for a server to be selected (45secs in ours), if no server selection a timeout error is thrown
    SocketTimeoutMs: 5000, // time before socket timeouts due to inactivity, useful to aviod hanging connections  meaning no inactivity
    retryWrites: true, //enables automatic retry of some writes operations like insert or update a document like patches
    retryReads: true, //enables automatic retry of read operations
    maxPoolSize: 50, //maximum number of connections in the mongodb conn pool. help manage concurrent request
    minPoolSize: 1, //minimum number of connections maintained in mongodb pool
  };
  // this one is mongodb connection

  try {
    const conn = await mongoose.connect(
      process.env.MANGODB_URI,
      connectionOptions
    );
    console.log(`✅  Mongodb Connected: ${conn.connection.host} `);
    //connection event handlers
    mongoose.connection.on(
      "error",
      (err) => console.error("❌ Mongodb connection error", err) //(err) error object, we want to see the error
    );
    mongoose.connection.on("disconnected", () =>
      console.log("ℹ️ Mongodb disconnected")
    );
    //handle graceful shutdown
    const gracefulShutdown = async () => {
      await mongoose.Connection.close();
      console.log("ℹ️ Mongodb connection closed through app termination");
      process.exit(0);
    };
    process.on("SIGINT", gracefulShutdown); //ctrl+c
    process.on("SIGTERM", gracefulShutdown); // a signal to terminate a process
    return conn;
  } catch (error) {
    console.error("❌ Mongodb connection failed", error.message);
    process.exit(1); //exist the process, 1 usually indicates error/failure
  }
};
//server configuration
const PORT = process.env.PORT || 5400;
//handle uncaught expressions
process.on("uncaughtException", (err) => {
  console.error("UNCAUGHT EXCEPTION! ⛔️ Shutting down...  ");
  console.error(err.name, err.message);
  process.exit(1);
});

const startServer = async () => {
  try {
    //INVOKE OUR DB CONNECTION
    await connectDb(); //invoke our function unless it wont work
    //server need to run on port number 5400
    const server = app.listen(PORT, () => {
      console.log(
        `✅  Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
      );
      console.log(`🌎 http://localhost:${PORT} `);
    });
    //handle unhandled promise rejections
    process.on("unhandledRejection", (err) => {
      console.error("❌UNHANDLED REJECTION shutting down...");
      console.error(err.name, err.message);
      //close server gracefully
      server.close(() => {
        console.log("🧨 process terminated due to unhandled rejection ");
        process.exit(1);
      });
    });

    //handle graceful shutdown
    const shutdown = async () => {
      console.log("⚠️ Received shutdown signal. Closing server...");
      server.close(() => {
        console.log("✅ Server closed");
        process.exit(0);
      });

      // force close if server doesn't close in time
      setTimeout(() => {
        console.error("⚠️ Forcing server shutdown");
        process.exit(0);
      }, 10000);
    };

    //handle termination signals
    process.on("SIGINT", shutdown);
    process.on("SIGTERM", shutdown);
  } catch (error) {
    console.error(`❌ Failed to start server: ${error.message}`);
    process.exit(1);
  }
};
// start server
startServer();
