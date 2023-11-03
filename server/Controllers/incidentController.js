const asyncHandler = require("express-async-handler");
const Incident = require("../Models/incidentModel");

// Create a new incident
const createIncident = asyncHandler(async (req, res) => {
  const {
    incidentId,
    title,
    description,
    date,
    severity,
    type,
    status
  } = req.body;

  if (!incidentId || !title || !description || !date || !severity || !type || !status) {
    res.status(400);
    throw new Error("Please fill all required fields");
  }

  // Create the incident
  const incident = await Incident.create({
    incidentId,
    title,
    description,
    date,
    severity,
    type,
    status
  });

  if (incident) {
    res.status(201);
    res.json("Incident added successfully!");
  } else {
    res.status(400);
    throw new Error("Invalid incident! Please check again");
  }
});

//fetch by incident id, incident title and incident type

const fetchincident = asyncHandler(async (req, res) => {
  let q = req.query.q;
  let filter = [];

  filter.push(...[{ incidentId: q }, { title: q }]);

  console.log(filter);

  Incident.findOne({ $or: filter })
    .then((incidents) => {
      console.log(incidents);
      res
        .status(200)
        .send({ status: "Incident fetched successfully !", incidents });
    })
    .catch((err) => {
      console.log(err.message);
      res
        .status(500)
        .send({ status: "Error with fetching...", error: err.message });
    });
});


//fetch all incidents
const fetchAllIncidents = asyncHandler(async (req, res) => {
  Incident.find()
    .then((incidents) => {
      res.json(incidents);
    })
    .catch((err) => {
      console.log(err);
    });
});

//update incident

const updateIncident = asyncHandler(async (req, res) => {
  let incidentId = req.params.incidentId;
  const { status } = req.body;

  const updateIncident = {
    status,
  };

  const update = await Incident.findOneAndUpdate({ incidentId }, updateIncident)
    .then(() => {
      res.status(200).send({ status: "Incident status updated !" });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ status: "Error with updating incident status", error: err.message });
    });
});


//delete incident

const deleteIncident = asyncHandler(async (req, res) => {
  let incidentId = req.params.incidentId;

  const Delete = await Incident.findOneAndDelete({ incidentId })
    .then(() => {
      res.status(200).send({ status: "Incident Removed!" });
    })
    .catch((err) => {
      console.log(err.message);
      res
        .status(500)
        .send({ status: "Error with remove incident!", error: err.message });
    });
});

module.exports = {
  createIncident,
  fetchincident,
  fetchAllIncidents,
  updateIncident,
  deleteIncident
};
