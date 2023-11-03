import React from "react";
import styled from "styled-components";

function SmallFooter() {
  return <Container>&copy;  2023 Copyright: SecureLogix</Container>;
}

export default SmallFooter;

const Container = styled.div`
  position: fixed;
  padding: 12px 0;
  bottom: 0;
  right: 0;
  left: 0;
  text-align: center;
  z-index: -1;
`;
