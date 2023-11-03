import React, { useState } from "react";
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

import SearchIcon from "@mui/icons-material/Search";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import { Link } from "react-router-dom";


  //creting a function for search students
  export default function SearchIncident() {
    const accessToken = sessionStorage.getItem("userToken");

    const authAxios = axios.create({
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    
  //brand country dealer price

  const [incidentId, setIncidentId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [severity, setSeverity] = useState("");
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");
    
    const [input, setInput] = useState('');
  
    
  
    const  loadIncidentDetails = async () => {
      await authAxios.get(`/api/incident/search?q=${input}`).then((res) => {
        setIncidentId(res.data.incidents.incidentId);
        setTitle(res.data.incidents.title);
        setDescription(res.data.incidents.description);
        setDate(res.data.incidents.date);
        setSeverity(res.data.incidents.severity);
        setType(res.data.incidents.type);
        setStatus(res.data.incidents.status);     
        
      }).catch((err) => {
        alert(err.message)
      })
    };
  

  return (

<Container>
      <Wrap>
        <InputComponent>
          <div className="table-head">Search Incident</div>
          <InputGroup>
            <SearchIcon onClick={loadIncidentDetails} />
            <input type="text" id="input" value={input}   placeholder="Search" 
            onChange={(e)=>{

                setInput(e.target.value);

              }}/>
          </InputGroup>
          <InputGroup>
            <Link to="/incident/all-incident">
              <KeyboardReturnIcon style={{ color: "white" }} />
            </Link>
          </InputGroup>
        </InputComponent>
        <br></br><br></br>
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
              </TableRow>
            </TableHead>
            <TableBody>
              
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="right">{incidentId}</TableCell>
                  <TableCell align="right">{title}</TableCell>
                  <TableCell align="right">
      {description.length > 12 ? (
        <div>
          <div style={{ display: "none" }} className="long-description">
            {description}
          </div>
          <div>
            <span className="short-description">
              {description.substring(0, 12)}
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
        description
      )}
    </TableCell>
                  <TableCell align="right">{date}</TableCell>
                  <TableCell align="right">{severity}</TableCell>
                  <TableCell align="right">{type}</TableCell>
                  <TableCell align="right">
  {status ? "Active" : "Deactive"}
</TableCell>

                </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
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




