import React, { useState, useEffect } from "react";
import { RingLoader } from "react-spinners";
import axios from "axios";
import styled from "styled-components";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from "@mui/material";


function IncidentList() {
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
          <Table aria-label="simple table">
            <TableHead sx={{ background: "#36454f" }}>
              <TableRow>
              <TableCell align="right">Incident ID</TableCell>
                <TableCell align="right">Title</TableCell>
                <TableCell align="right">Severity</TableCell>
                <TableCell align="right">Type</TableCell>
                <TableCell align="right">Status</TableCell>
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
                <TableCell align="right">{row.severity}</TableCell>
                <TableCell align="right">{row.type}</TableCell>
                <TableCell align="right">
  {row.status ? "Active" : "Deactive"}
</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Wrap>
      )}
    </Container>
  );
}

export default IncidentList;



const Container = styled.main`
  padding: 10px calc(3vw) 0px; /* Adjust the top padding to match AddLog */
  overflow-x: hidden;
  display: flex;
  align-items: top; /* Add this line to center vertically */
  justify-content: center; /* Add this line to center horizontally */
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
