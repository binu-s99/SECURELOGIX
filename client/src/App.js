import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styled from "styled-components";

import Navbar from "./components/Navbar";
import LargeFooter from "./components/LargeFooter";
import Home from "./components/Home";

import background from "./assets/background.jpg";

// IT20175498 - N.S. Jayasekara

import Login from "./components/Login/Login";
import AddIncident from "./components/incidentComponents/AddIncident";
import DisplayIncidents from "./components/incidentComponents/DisplayIncidents";




import PageNotFound from "./components/PageNotFound";
import SearchIncident from "./components/incidentComponents/searchIncident";
import IncidentReport from "./components/incidentComponents/IncidentReport";
import AddLog from "./components/LogComponent/AddLog";
import UpdateAndDeleteLog from "./components/LogComponent/LogItem";
import DisplayLogs from "./components/LogComponent/DisplayLogs";
import LogReport from "./components/LogComponent/LogReport";
import UserRegister from "./components/UserRegister/UserRegister";


function App() {
  const accessToken = sessionStorage.getItem("userToken");
  return (
    <Router>
      <Container bgImage={background}>
        <Navbar />
        <Routes>
        <Route path="/" element={<Home />}></Route>
          
              <Route path="/incident/add" element={<AddIncident />}></Route>
           
              <Route path="/incident/all-incident" element={<DisplayIncidents />}></Route>
              <Route path="/incident/search" element={<SearchIncident />}></Route>
              <Route path="/incident/report" element={<IncidentReport />}></Route>
              <Route path="/log/add" element={<AddLog />}></Route>
              <Route path="/log/edit" element={<UpdateAndDeleteLog />}></Route>
              <Route path="/log/display" element={<DisplayLogs />}></Route>
              <Route path="/log/report" element={<LogReport />}></Route>
         
          
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<UserRegister />}></Route>
          <Route path="/*" element={<PageNotFound />} />
        </Routes>
        <LargeFooter />
      </Container>
    </Router>
  );
}

export default App;

const Container = styled.div`
  min-height: 100vh;
  position: relative;
  min-width: 300px;
  &:before {
    background: ${(props) =>
      `url(${props.bgImage}) center center / cover no-repeat fixed`};
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    z-index: -2;
  }
`;
