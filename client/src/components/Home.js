import React from "react";
import styled from "styled-components";
import ImageSlider from "./ImageSlider";
import { Link } from "react-router-dom";

function Home() {
  return (
    <Container>
      <AddIncidentButton to="/incident/add">Add Incident</AddIncidentButton>
      <ImageSlider />
    </Container>
  );
}

export default Home;

const Container = styled.main`
  min-height: calc(100vh);
  padding: 60px calc(3.5vw + 5px) 0px;
  overflow-x: hidden;
`;

const AddIncidentButton = styled(Link)`
  display: inline-block;
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #36d7b7;
  color: white;
  border: none;
  border-radius: 5px;
  text-decoration: none;
  cursor: pointer;
  align-items: left;
  justify-content: right;
`;
