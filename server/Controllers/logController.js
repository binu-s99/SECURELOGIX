const asyncHandler = require("express-async-handler");
const Log = require("../Models/logModel");

// Create a new log
const createLog = asyncHandler(async (req, res) => {
    const { logId, source, message, date, incidentID, logType } = req.body;

 

  // Create the log
    const log = await Log.create({
        logId,
        source,
        message,
        date,
        incidentID,
        logType
    });


  if (log) {
    res.status(201);
    res.json("Log added successfully!");
  } else {
    res.status(400);
    throw new Error("Invalid Log! Please check again");
  }
});

//fetch by log id

const fetchlog = asyncHandler(async (req, res) => {
    let q = req.query.q;
    let filter = [];

    filter.push(...[{ logId: q }]);
  console.log(filter);

  Log.findOne({ $or: filter })
    .then((logs) => {
      console.log(logs);
      res
        .status(200)
        .send({ status: "Log fetched successfully !", logs });
    })
    .catch((err) => {
      console.log(err.message);
      res
        .status(500)
        .send({ status: "Error with fetching...", error: err.message });
    });
});


//fetch all logs
const fetchAllLogs = asyncHandler(async (req, res) => {
  Log.find()
    .then((logs) => {
      res.json(logs);
    })
    .catch((err) => {
      console.log(err);
    });
});

//update log

const updateLog = asyncHandler(async (req, res) => {
  let logId = req.params.logId;
  const { message } = req.body;

  const updateLog = {
    message,
  };

  const update = await Log.findOneAndUpdate({ logId }, updateLog)
    .then(() => {
      res.status(200).send({ status: "Log message updated !" });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ status: "Error with updating log message", error: err.message });
    });
});


//delete log

const deleteLog = asyncHandler(async (req, res) => {
  let logId = req.params.logId;

  const Delete = await Log.findOneAndDelete({ logId })
    .then(() => {
      res.status(200).send({ status: "Log Removed!" });
    })
    .catch((err) => {
      console.log(err.message);
      res
        .status(500)
        .send({ status: "Error with remove Log!", error: err.message });
    });
});

module.exports = {
    createLog,
    fetchlog,
    fetchAllLogs,
    updateLog,
    deleteLog,
};
