import React, { useState, useEffect } from "react";
import { RingLoader } from "react-spinners";
import axios from "axios";
import { Link } from "react-router-dom";
import styled from "styled-components";
import DeleteIcon from '@mui/icons-material/Delete';
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Button,
  IconButton
} from "@mui/material";

function DisplayIncidents() {
  const accessToken = sessionStorage.getItem("userToken");
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(false);

  const authAxios = axios.create({
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  useEffect(() => {
    setLoading(true);
  authAxios.get("/api/incident/incidents").then((res) => {
    setIncidents(res.data);
    console.log(res.data);
  });
  setTimeout(() => {
    setLoading(false);
  }, 1000);
}, []);

  // Function to update the status of an incident
  const updateIncidentStatus = (incidentId, newStatus) => {
    const updatedIncidents = incidents.map((incident) => {
      if (incident.incidentId === incidentId) {
        // Update the status of the specific incident
        incident.status = newStatus;
      }
      return incident;
    });

    // Send a request to update the status in the backend
    authAxios.put(`/api/incident/${incidentId}`, { status: newStatus })
      .then((res) => {
        // Handle the response if needed
      })
      .catch((error) => {
        // Handle any errors
      });

    // Update the state with the modified incident list
    setIncidents(updatedIncidents);
  };

   // Function to delete an incident
   const deleteIncident = (incidentId) => {
    // Send a request to delete the incident in the backend
    authAxios
      .delete(`/api/incident/${incidentId}`)
      .then((res) => {
        // Handle the response if needed
        // Remove the deleted incident from the state
        const updatedIncidents = incidents.filter(
          (incident) => incident.incidentId !== incidentId
        );
        setIncidents(updatedIncidents);
      })
      .catch((error) => {
        // Handle any errors
      });
  };


  return (
    <Container>
      {loading ? (
        <Wrap>
          <InputComponent>
            <div className="table-head">Incident Details</div>
          </InputComponent>
          <Loader>
            <RingLoader color="#36d7b7" loading={loading} />
          </Loader>
        </Wrap>
      ) : (
      <Wrap>
        <InputComponent>
          <div className="table-head">Incident Details</div>
        </InputComponent>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead sx={{ background: "#36454f" }}>
              <TableRow>
                <TableCell align="right">Incident ID</TableCell>
                <TableCell align="right">Title</TableCell>
                <TableCell align="right">Description</TableCell>
                <TableCell align="right">Date</TableCell>
                <TableCell align="right">Severity</TableCell>
                <TableCell align="right">Type</TableCell>
                <TableCell align="right">Status</TableCell>
                <TableCell align="right">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {incidents.map((row) => (
      <TableRow
        key={row.name}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      >
        <TableCell align="right">{row.incidentId}</TableCell>
        <TableCell align="right">{row.title}</TableCell>
        <TableCell align="right">
      {row.description.length > 12 ? (
        <div>
          <div style={{ display: "none" }} className="long-description">
            {row.description}
          </div>
          <div>
            <span className="short-description">
              {row.description.substring(0, 12)}
            </span>
            <span>
              <button
                onClick={() => {
                  const descriptionElem = document.querySelector(".long-description");
                  const shortDescriptionElem = document.querySelector(".short-description");
                  if (descriptionElem.style.display === "none") {
                    descriptionElem.style.display = "block";
                    shortDescriptionElem.style.display = "none";
                  } else {
                    descriptionElem.style.display = "none";
                    shortDescriptionElem.style.display = "inline";
                  }
                }}
              >
                See More
              </button>
            </span>
          </div>
        </div>
      ) : (
        row.description
      )}
    </TableCell>
        <TableCell align="right">{row.date}</TableCell>
        <TableCell align="right">{row.severity}</TableCell>
        <TableCell align="right">{row.type}</TableCell>
        <TableCell align="right">
          <span
            style={{
              color: row.status ? "green" : "red",
              fontWeight: "bold",
            }}
          >
            {row.status ? "Active" : "Deactivated"}
          </span>
          <Button
            variant="outlined"
            size="small"
            onClick={() => updateIncidentStatus(row.incidentId, !row.status)}
          >
            Status
          </Button>
        </TableCell>
        <TableCell align="right">
                      <IconButton
                      aria-label="delete"
                        color="error"
                        onClick={() => deleteIncident(row.incidentId)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
      </TableRow>
    ))}

            </TableBody>
          </Table>
        </TableContainer>
        <ButtonGroup>
          <Link to="/incident/search">
            <button>Search</button>
          </Link>
          <Link to="/incident/report">
            <button>Incident Report</button>
          </Link>
        </ButtonGroup>
      </Wrap>
      )}
    </Container>
  );
}

export default DisplayIncidents;

const Container = styled.main`
  min-height: calc(100vh);
  padding: 60px calc(3vw) 0px;
  overflow-x: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrap = styled.div`
  padding: 10px calc(0.5vw + 5px);
  background: #151e3d;
  border-radius: 12px;
  width: 100%;
  min-height: 50vh;
`;

const InputComponent = styled.div`
  display: flex;
  padding: 10px 0;
  div.table-head {
    flex: 1;
    text-transform: uppercase;
    font-size: 20px;
    position: relative;

    &:after {
      position: absolute;
      content: "";
      bottom: 0px;
      left: 0;
      width: 40px;
      height: 2px;
      background: #733635;
    }
  }

  @media (max-width: 570px) {
    flex-direction: column;
    div.table-head {
      margin: 0 auto 10px;

      &:after {
        display: none;
      }
    }
  }
`;

const ButtonGroup = styled.div`
  padding: 20px 0 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  button {
    cursor: pointer;
    padding: 10px;
    margin: 0 3px;
    background: #404040;
    border: none;
    border-radius: 5px;
    transition: all 0.3s ease 0s;

    &:hover {
      box-shadow: 0 0 0 2px #909090;
    }
  }
`;

const Loader = styled.div`
  display: flex;
  justify-content: center;
`;
