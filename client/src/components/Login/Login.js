import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LoginValidate } from "../Validate";
import { Link, useNavigate } from "react-router-dom";
import picture from "../../assets/login.jpg";

import styled from "styled-components";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  // Used to refer input fields
  const inputUserEmail = useRef();
  const inputPassword = useRef();

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const [errors, setErrors] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    // Make sure there are no spaces trailing and leading
    Object.keys(values).map((k) => (values[k] = values[k].trim()));
    // Validate input fields
    setErrors(LoginValidate(values));
  };

  useEffect(() => {
    if (
      Object.keys(errors).length === 0 &&
      values.email !== "" &&
      values.password !== ""
    ) {
      setLoading(true);
      axios
        .post("api/user/login", values)
        .then((res) => {
          let userToken = res.data.token;
          let userRole = res.data.role;

          if (userToken !== null) {
            sessionStorage.setItem("isAuth", "true");
            sessionStorage.setItem("userToken", userToken);

            if (userRole === "admin") {
              // Redirect to the admin route
              navigate("/incident/all-incident");
            } else if (userRole === "manager") {
              // Redirect to the manager route
              navigate("/log/display");
            }
          }
        })
        .catch((e) => {
          console.log("Error:", e.message);
          toast.error("Incorrect Username or Password", {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
          });
        });
    }
    setLoading(false);
  }, [errors, navigate]);

  return (
    <Container>
      <ToastContainer />
      <Wrap>
        <InputComponent>
          <div className="table-head">Login</div>
        </InputComponent>
        <Form onSubmit={handleSubmit}>
          <Input>
            <ImageWrapper src={picture} />
            <InputWrapper>
              <div>
                <h1>&emsp;&emsp;&emsp;Welcome To Secure Logix !</h1>
              </div>
              <div>
                <label htmlFor="Email">Email</label>
                <input
                  id="email"
                  autoComplete="off"
                  ref={inputUserEmail}
                  type="text"
                  name="email"
                  placeholder="useremail"
                  value={values.email}
                  required
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                  onChange={handleChange}
                />
                {errors.email && <p>{errors.email}</p>}
              </div>
              <div>
                <label htmlFor="Password">Password</label>
                <input
                  id="password"
                  ref={inputPassword}
                  type="password"
                  name="password"
                  required
                  placeholder="Password"
                  value={values.password}
                  onChange={handleChange}
                />
                {errors.password && <p>{errors.password}</p>}
              </div>
              <br></br>
              <ButtonGroup>
                <input type="submit" value="Login" />
                <Link to="/register">Sign Up</Link>
              </ButtonGroup>
            </InputWrapper>
          </Input>
        </Form>
      </Wrap>
    </Container>
  );
};

export default Login;

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

const Form = styled.form`
padding: 0 20px;`;

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
  width: 75%;
  height: fit-content;
  object-fit: cover;
`;

const ButtonGroup = styled.span`
padding: 20px 0 0;
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
