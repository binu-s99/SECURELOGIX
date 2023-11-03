import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import 'react-toastify/dist/ReactToastify.css';
import { Link ,useNavigate } from "react-router-dom";

import Stock from "../../assets/register.jpg";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";


export default function UserRegister() {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [emailError, setEmailError] = useState("");


  const handleReset = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setConfirmedPassword("");
    setRole("");
    setEmailError("");
  };

  function validateEmail(email) {
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return regex.test(email);
  }

  function sendData(e) {
    e.preventDefault();

    if (!validateEmail(email)) { 
      setEmailError("Invalid email address");
      return;
    }

    if (password !== confirmedPassword) {
      alert("Password and Confirm Password must match.");
      return;
    }

    const newuser = {
      firstName,
      lastName,
      email,
      password,
      role,
    };
    

    axios
      .post("/api/user/", newuser)
      .then(() => {
        alert("successful");
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setRole("");
        setConfirmedPassword("");
        navigate("/login");
      })
      .catch((err) => {
        alert(err);
      });
    };

  return (
    <Container>
      <Wrap>
        <InputComponent>
          <div className="table-head">User Registration</div>
          <InputGroup>
            <Link to="/login">
              <KeyboardReturnIcon style={{ color: "white" }} />
            </Link>
          </InputGroup>
        </InputComponent>
        <Form onSubmit={sendData}>
          <Input>
            <ImageWrapper src={Stock} />
            <InputWrapper>
            <div>
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  placeholder="Enter First Name"
                  minLength={1}
                  maxLength={10}
                  required
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                />
              </div>
              <div>
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  placeholder="Enter Last Name"
                  minLength={1}
                  maxLength={30}
                  required
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                />
              </div>
              <div>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter Email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailError("");
                  }}
                />
                {emailError && <p style={{ color: "red" }}>{emailError}</p>}
              </div>
              
              <div>
                <label htmlFor="passowrd">Password</label>
                <input
                  type="password"
                  id="password"
                  placeholder="Enter Password"
                  required
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
              <div>
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  placeholder="Confirm Password"
                  required
                  value={confirmedPassword}
                  onChange={(e) => {
                    setConfirmedPassword(e.target.value);
                  }}
                />
              </div>
              <div>
                
                <label htmlFor="role">User Role</label>

                <select
                  id="role"
                  defaultValue="Select User Role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="Add">
                    Choose User Role
                  </option>
                  <option value="admin">Admin</option>
                  <option value="manager">Manager</option>
                </select>
              </div>

              <ButtonGroup>
                <input type="reset" value="Reset" onClick={handleReset} />
                <input type="submit" value="Register" />
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
