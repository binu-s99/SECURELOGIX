import React, { useState } from "react";
import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";
import LoginIcon from "@mui/icons-material/Login";

function Navbar() {
  const accessToken = sessionStorage.getItem("userToken");
  const [burgerStatus, setBurgerStatus] = useState(false);

  const handleLogout = () => {
    sessionStorage.clear();
    window.location.pathname = "/login";
  };
  return (
    <Nav>        
      <Button onClick={handleLogout}>
        {accessToken === null ? <span></span> : <span></span>}
        <LoginIcon />
      </Button>

      <BurgerNav show={burgerStatus}>
        <BurgerNavButton>
          <Button onClick={handleLogout}>
            {accessToken === null ? <span></span> : <span></span>}
            <LoginIcon />
          </Button>
        </BurgerNavButton>
      </BurgerNav>
    </Nav>
  );
}

export default Navbar;

const Nav = styled.nav`
  position: fixed;
  overflow: hidden;
  height: 60px;
  width: 100%;
  background: #090b13;
  display: flex;
  align-items: center;
  padding: 0 16px;
  overflow-x: hidden;
  z-index: 5;
`;

const Logo = styled.img`
  cursor: pointer;
  height: 40px;
`;

const NavMenu = styled.div`
  display: flex;
  padding: 0 32px;
  flex: 1;

  a {
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    text-transform: uppercase;

    span {
      position: relative;
      font-size: 16px;
      margin: 0 5px;
      letter-spacing: 1.42px;

      &:after {
        position: absolute;
        background: white;
        content: "";
        height: 2px;
        bottom: -6px;
        right: 0px;
        left: 0px;
        transform-origin: center;
        transform: scaleX(0);
        transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
      }
    }

    &:hover {
      span:after {
        transform: scaleX(1);
      }
    }

    @media (max-width: 900px) {
      display: none;
    }
  }
`;

const BurgerNav = styled.div`
  position: relative;
  display: none;
  position: fixed;
  top: 60px;
  bottom: 0;
  right: 0;
  width: 200px;
  background: orange;
  transform-origin: right;
  transition: transform 0.2s ease-in;
  transform: ${(props) => (props.show ? "translateX(0)" : "translateX(100%)")};
  z-index: 10;

  li {
    list-style: none;
    padding: 8px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);

    a {
      cursor: pointer;
      display: flex;
      align-items: center;
      flex: 1;

      span {
        padding: 12px;
      }
    }
  }

  @media (max-width: 900px) {
    display: block;
  }
`;

const RightMenu = styled.div`
  display: none;
  @media (max-width: 900px) {
    display: block;
  }
`;

const Button = styled.div`
  background: transparent;
  border-radius: 24px;
  border: 2px solid #50c878;
  width: 110px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease 0s;
  span {
    font-size: 20px;
    padding-bottom: 2px;
  }

  @media (max-width: 900px) {
    display: none;
  }
  &:hover {
    border: none;
    box-shadow: 0 0 0 2px #909090;
    background: linear-gradient(
      246deg,
      rgba(2, 0, 36, 1) 0%,
      rgba(80, 200, 120, 0.969625350140056) 35%,
      rgba(0, 212, 255, 1) 100%
    );
  }
`;

const BurgerNavButton = styled.div`
  margin: 0 10px;
  height: 50px;
  position: absolute;
  bottom: 24px;
  right: 0;
  left: 0;
  display: flex;
  border: 2px solid #50c878;
  border-radius: 24px;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease 0s;

  span {
    font-size: 20px;
  }

  &:hover {
    border: none;
    box-shadow: 0 0 0 2px #909090;
    background: linear-gradient(
      246deg,
      rgba(2, 0, 36, 1) 0%,
      rgba(80, 200, 120, 0.969625350140056) 35%,
      rgba(0, 212, 255, 1) 100%
    );
  }
`;

const NavContainer = styled(Link)`
  padding: 10px;
  margin: 10px 10px 0px;
  height: 50px;
  position: relative;
  transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;

  &.active {
    border-top: 1px solid white;
    border-radius: 10px 10px 0 0;
    color: orange;
    // background: linear-gradient(to top left, #7c9e62, #400e33);

    &:after,
    &:before {
      content: "";
      height: 41px;
      width: 40px;
      border: 1px solid white;
      border-top: 0;
      position: absolute;
      bottom: 0;
    }
    &:after {
      right: -41px;
      border-right: 0;
      border-bottom-left-radius: 18px;
    }
    &:before {
      left: -41px;
      border-left: 0;
      border-bottom-right-radius: 18px;
    }
  }
`;
