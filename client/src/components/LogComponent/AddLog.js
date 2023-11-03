import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import 'react-toastify/dist/ReactToastify.css';
import { Link ,useNavigate } from "react-router-dom";

import Stock from "../../assets/addLog.jpg";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";

import IncidentList from "./IncidentList";

export default function AddLog() {
  const accessToken = sessionStorage.getItem("userToken");
  const navigate = useNavigate();

  const authAxios = axios.create({
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });


  const [logId, setLogId] = useState("");
  const [source, setSource] = useState("");
  const [message, setMessage] = useState("");
  const [date, setDate] = useState("");
  const [incidentID, setIncidentID] = useState("");
  const [logType, setLogType] = useState("");


  const handleReset = () => {
    setLogId("");
    setSource("");
    setMessage("");
    setDate("");
    setIncidentID("");
    setLogType("");
  };

  function sendData(e) {
    e.preventDefault();

    const newLog = {
      logId,
      source,
      message,
      date,
      incidentID,
      logType,
    };

    authAxios
      .post("/api/log/", newLog)
      .then(() => {
        alert("successful");
        setLogId("");
        setSource("");
        setMessage("");
        setDate("");
        setIncidentID("");
        setLogType("");
        navigate("/log/display");
      })
      .catch((err) => {
        alert(err);
      });
  }

  return (
    <Container>
      <Wrap>
        <InputComponent>
          <div className="table-head">Add Log</div>
          <InputGroup>
            <Link to="/log/display">
              <KeyboardReturnIcon style={{ color: "white" }} />
            </Link>
          </InputGroup>
        </InputComponent>
        <IncidentList />
        <Form onSubmit={sendData}>
          <Input>
            <ImageWrapper src={Stock} />
            <InputWrapper>
            <div>
                <label htmlFor="logId">Log ID</label>
                <input
                  type="text"
                  id="logId"
                  placeholder="Enter Log ID"
                  minLength={3}
                  maxLength={5}
                  required
                  value={logId}
                  onChange={(e) => {
                    setLogId(e.target.value);
                  }}
                />
              </div>
              <div>
                <label htmlFor="source">Log source</label>
                <input
                  type="text"
                  id="source"
                  placeholder="Enter Log source"
                  minLength={5}
                  maxLength={30}
                  required
                  value={source}
                  onChange={(e) => {
                    setSource(e.target.value);
                  }}
                />
              </div>
              <div>
                <label htmlFor="message">Log message</label>
                <input
                  type="text"
                  id="message"
                  placeholder="Enter Log message"
                  minLength={5}
                  required
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                  }}
                />
              </div>
              
              <div>
                <label htmlFor="date">Log Date</label>
                <input
                  type="date"
                  id="date"
                  placeholder="Enter log date"
                  required
                  value={date}
                  onChange={(e) => {
                    setDate(e.target.value);
                  }}
                />
              </div>

              <div>
                <label htmlFor="incidentID">Incident ID</label>
                <input
                  type="text"
                  id="incidentID"
                  placeholder="Enter Log incident ID"
                  minLength={4}
                  required
                  value={incidentID}
                  onChange={(e) => {
                    setIncidentID(e.target.value);
                  }}
                />
              </div>

              <div>
                
                <label htmlFor="logType">Log Type</label>

                <select
                  id="logType"
                  defaultValue="Select Log Type"
                  value={logType}
                  onChange={(e) => setLogType(e.target.value)}
                >
                  <option value="Add">
                    Choose Log Type
                  </option>
                  <option value="Authentication Logs">Authentication Logs</option>
                  <option value="Access Control Logs">Access Control Logs </option>
                  <option value="System Event Logs">System Event Logs </option>
                  <option value="Firewall Logs">Firewall Logs </option>
                  <option value="Network Traffic Logs">Network Traffic Logs </option>
                  <option value="Application Logs">Application Logs </option>
                  <option value="Audit Logs">Audit Logs </option>
                  <option value="Intrusion Detection Logs">Intrusion Detection Logs </option>
                  <option value="Compliance Logs">Compliance Logs </option>
                  <option value="Malware Scan Logs">Malware Scan Logs </option>
                </select>
              </div>

              <ButtonGroup>
                <input type="reset" value="Reset" onClick={handleReset} />
                <input type="submit" value="Submit" />
              </ButtonGroup>
            </InputWrapper>
          </Input>
        </Form>
      </Wrap>
    </Container>
  );
}

const Container = styled.main`
  padding: 0 50px; /* Adjust the top padding to match AddLog */
  overflow-x: hidden;
  display: flex;
  align-items: top; /* Add this line to center vertically */
  justify-content: center; /* Add this line to center horizontally */
`;

const Wrap = styled.div`
  padding: 10px calc(0.5vw + 5px);
  background: #151e3d;
  border-radius: 12px;
  min-height: 50vh;
  width: 100%;
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

const Form = styled.form``;

const Input = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  grid-gap: 20px;
`;

const InputWrapper = styled.div`
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  div {
    display: flex;
    flex-direction: column;

    label {
      margin: 6px 0 6px;
    }

    input,
    select {
      outline: none;
      border: none;
      height: 30px;
      border-radius: 15px;
      padding: 3px 12px;
    }
  }
`;

const ImageWrapper = styled.img`
  width: 100%;
  height: fit-content;
  object-fit: cover;
`;

const ButtonGroup = styled.span`
  margin: 12px 0;
  display: flex;
  justify-content: space-around;

  input {
    width: 100px;
    height: 30px;
    border-radius: 15px;
  }
  input:last-child {
    background: #3cb043;
  }
  input:first-child {
    background: red;
  }
`;
