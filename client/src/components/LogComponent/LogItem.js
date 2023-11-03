import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import UpdateIcon from "@mui/icons-material/Update";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";

export default function UpdateAndDeleteLog() {
  const [logId, setLogId] = useState("");
  const [source, setSource] = useState("");
  const [message, setMessage] = useState("");
  const [date, setDate] = useState("");
  const [incidentID, setIncidentID] = useState("");
  const [logType, setLogType] = useState("");

  const [readOnly, setreadOnly] = useState(true);
  const navigate = useNavigate();

  const [input, setInput] = useState("");
  const accessToken = sessionStorage.getItem("userToken");

  const authAxios = axios.create({
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const loadLogDetails = async () => {
    await authAxios
      .get(`/api/log/search?q=${input}`)
      .then((res) => {
        setLogId(res.data.logs.logId);
        setSource(res.data.logs.source);
        setMessage(res.data.logs.message);
        setDate(res.data.logs.date);
        setIncidentID(res.data.logs.incidentID);
        setLogType(res.data.logs.logType);
        console.log(res.data)
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  //set readonly
  const activate = () => {
    setreadOnly(false);
  };

  //update log message function

  const onSubmit = async (e) => {
    e.preventDefault();

    const newMessage = {
      message,
    };
    console.log(newMessage);

    await authAxios
      .put(`/api/log/${logId}`, newMessage)
      .then(() => {
        alert("Message updated Successfully");
        window.location.reload(true);
      })
      .catch((err) => {
        alert(err);
      });
  };

  //delete functions

  const onDelete = async () => {
    await authAxios
      .delete(`/api/log/${logId}`)
      .then(() => {
        window.alert("Do you want to remove the selected log?");
        alert("Log Removed Successfully");
        window.location.reload(true);
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <Container>
      <Wrap>
        <InputComponent>
          <div className="table-head">Update And Delete Logs</div>
          <InputGroup>
            <SearchIcon onClick={loadLogDetails} />
            <input
              type="text"
              id="input"
              value={input}
              placeholder="Search"
              onChange={(e) => {
                setInput(e.target.value);
              }}
            />
          </InputGroup>
          <InputGroup>
            <Link to="/log/display">
              <KeyboardReturnIcon style={{ color: "white" }} />
            </Link>
          </InputGroup>
        </InputComponent>
        <br></br>
        <br></br>
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
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="right">{logId}</TableCell>
                <TableCell align="right">{source}</TableCell>
                <TableCell align="right">
                  <input
                    type="text"
                    name="message"
                    id="message"
                    value={message}
                    readOnly={readOnly}
                    onChange={(e) => {
                      setMessage(e.target.value);
                    }}
                  />

                  <EditIcon className="right" onClick={activate} />
                </TableCell>
                <TableCell align="right">{date}</TableCell>
                <TableCell align="right">{incidentID}</TableCell>
               
                <TableCell align="right">{logType}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <ButtonGroup>
          <Button
            variant="outlined"
            color="success"
            onClick={onSubmit}
            startIcon={<UpdateIcon />}
          >
            Update
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={onDelete}
            startIcon={<DeleteIcon />}
          >
            Delete
          </Button>
        </ButtonGroup>
      </Wrap>
    </Container>
  );
}

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
const InputGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  input {
    border-radius: 5px;
    color: #f5f5f5;
    font-size: 16px;
    padding: 6px;
    outline: none;
    border: none;
    background: #404040;
    transition: all 0.3s ease 0s;

    &:focus {
      box-shadow: 0 0 0 2px #909090;
    }
  }
`;

const ButtonGroup = styled.div`
  padding: 6px 0 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  button {
    cursor: pointer;
    padding: 5px;
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
