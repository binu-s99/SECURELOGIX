require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

const connection = require("./Database");

//import routers by creating constant variables

const userRouter = require("./Routes/userRoutes");
const incidentRouter = require("./Routes/incidentRoutes");
const logRouter = require("./Routes/logRoutes");

// database connection
connection();

// middlewares
// app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


// routes
app.use("/api/user", userRouter);
app.use("/api/incident", incidentRouter);
app.use("/api/log", logRouter);

const port = process.env.PORT || 3001;

app.listen(port, (err) => {
  if (err) console.log("Error ocuured in starting the server:", err);
  console.log(`SecureLogix Server is listening on port ${port}...`);
});
