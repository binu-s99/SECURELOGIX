import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import 'react-toastify/dist/ReactToastify.css';
import { Link ,useNavigate } from "react-router-dom";

import Stock from "../../assets/addincident.jpg";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";

export default function AddIncident() {



  const [incidentId, setIncidentId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [severity, setSeverity] = useState("");
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");


  const handleReset = () => {
    setIncidentId("");
    setTitle("");
    setDescription("");
    setDate("");
    setSeverity("");
    setType("");
    setStatus("");
  };

  function sendData(e) {
    e.preventDefault();

    const newIncident = {
      incidentId,
      title,
      description,
      date,
      severity,
      type,
      status,
    };

    axios
      .post("/api/incident/", newIncident)
      .then(() => {
        alert("successful");
        setIncidentId("");
        setTitle("");
        setDescription("");
        setDate("");
        setSeverity("");
        setType("");
        setStatus("");
      })
      .catch((err) => {
        alert(err);
      });
  }

  return (
    <Container>
      <Wrap>
        <InputComponent>
          <div className="table-head">Add Incident</div>
          <InputGroup>
            <Link to="/">
              <KeyboardReturnIcon style={{ color: "white" }} />
            </Link>
          </InputGroup>
        </InputComponent>
        <Form onSubmit={sendData}>
          <Input>
            <ImageWrapper src={Stock} />
            <InputWrapper>
            <div>
                <label htmlFor="incidentId">Incident ID</label>
                <input
                  type="text"
                  id="incidentId"
                  placeholder="Enter incident ID"
                  minLength={3}
                  maxLength={20}
                  required
                  value={incidentId}
                  onChange={(e) => {
                    setIncidentId(e.target.value);
                  }}
                />
              </div>
              <div>
                <label htmlFor="title">Incident Title</label>
                <input
                  type="text"
                  id="title"
                  placeholder="Enter incident Title"
                  minLength={5}
                  maxLength={30}
                  required
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />
              </div>
              <div>
                <label htmlFor="description">Incident Description</label>
                <input
                  type="text"
                  id="description"
                  placeholder="Enter incident description"
                  minLength={5}
                  required
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />
              </div>
              <div>
                <label htmlFor="date">Incident Date</label>
                <input
                  type="date"
                  id="date"
                  placeholder="Enter incident date"
                  required
                  value={date}
                  onChange={(e) => {
                    setDate(e.target.value);
                  }}
                />
              </div>

              <div>
                
                <label htmlFor="severity">Incident Severity</label>

                <select
                  id="severity"
                  defaultValue="Select Incident Severity"
                  value={severity}
                  onChange={(e) => setSeverity(e.target.value)}
                >
                  <option value="Add">
                    Choose Severity
                  </option>
                  <option value="critical">Critical</option>
                  <option value="major">Major </option>
                  <option value="moderate">Moderate </option>
                  <option value="minor">Minor </option>
                </select>
              </div>
              <div>
                
                <label htmlFor="type">Incident Type</label>

                <select
                  id="type"
                  defaultValue="Select Incident Type"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  <option value="Add">
                    Choose Type
                  </option>
                  <option value="Unauthorized Access">Unauthorized Access</option>
                  <option value="Malware Detction">Malware Detction </option>
                  <option value="Data Breach">Data Breach </option>
                  <option value="Phishing Attack">Phishing Attack </option>
                  <option value="DDoS attack">DDoS Attack </option>
                  <option value="Insider Threat">Insider Threat </option>
                  <option value="System Intrusion">System Intrusion </option>
                  <option value="Suspicious Logins">Suspicious Logins </option>
                </select>
              </div>

              <div>
                
                <label htmlFor="status">Incident status</label>

                <select
                  id="status"
                  defaultValue="Select Incident status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="Add">
                    Choose status
                  </option>
                  <option value="true">Active</option>
                  <option value="false" disabled>Deactive </option>
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
