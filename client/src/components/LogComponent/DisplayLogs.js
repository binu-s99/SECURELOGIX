import React, { useState, useEffect } from "react";
import { RingLoader } from "react-spinners";
import axios from "axios";
import styled from "styled-components";
import { Link } from "react-router-dom";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from "@mui/material";


function DisplayLogs() {
  const accessToken = sessionStorage.getItem("userToken");
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);

  const authAxios = axios.create({
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  useEffect(() => {
    setLoading(true);
  authAxios.get("/api/log/logs").then((res) => {
    setLogs(res.data);
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
            <div className="table-head">Log Details</div>
          </InputComponent>
          <Loader>
            <RingLoader color="#36d7b7" loading={loading} />
          </Loader>
        </Wrap>
      ) : (
      <Wrap>
        <InputComponent>
          <div className="table-head">Log Details</div>
        </InputComponent>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead sx={{ background: "#36454f" }}>
              <TableRow>
                <TableCell align="right">Log ID</TableCell>
                <TableCell align="right">source</TableCell>
                <TableCell align="right">Message</TableCell>
                <TableCell align="right">Date</TableCell>
                <TableCell align="right">Incident ID</TableCell>
                <TableCell align="right">Log Type</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {logs.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="right">{row.logId}</TableCell>
                <TableCell align="right">{row.source}</TableCell>
                <TableCell align="right">{row.message}</TableCell>
                <TableCell align="right">{row.date}</TableCell>
                <TableCell align="right">{row.incidentID}</TableCell>         
                <TableCell align="right">{row.logType}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <ButtonGroup>
          <Link to="/log/add">
            <button>Add Log</button>
          </Link>
          <Link to="/log/edit">
            <button>Edit Log</button>
          </Link>
          <Link to="/log/report">
            <button>Log Report</button>
          </Link>
        </ButtonGroup>
      </Wrap>
      )}
    </Container>
  );
}

export default DisplayLogs;

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
