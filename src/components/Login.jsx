import React, { useState } from "react";

import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
} from "react-bootstrap";

import { FaEyeSlash } from "react-icons/fa";

import "./Login.css";

import { useNavigate } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");
  
  // Custom hook for auth operations
  const { login, loading, error, setUserEmail } = useAuth();

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!email || !password) {

      return alert("Please fill all fields");

    }

    try {

      const response = await login(email, password);

      setUserEmail(email);

      alert(response.message);

      navigate("/welcome");

    } catch (err) {

      alert(
        error ||
        "Login failed"
      );

    }
  };

  return (

    <div className="login-page">

      {/* Blue Shape */}

      <div className="blue-shape"></div>

      <Container fluid>

        <Row className="justify-content-center align-items-center vh-100">

          <Col md={4} lg={3}>

            <Card className="login-card p-4">

              <h1 className="text-center mb-5">
                Login
              </h1>

              <Form onSubmit={handleSubmit}>

                {/* Email */}

                <Form.Group className="mb-4">

                  <Form.Control
                    type="email"
                    placeholder="Email"
                    className="custom-input"
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                  />

                </Form.Group>

                {/* Password */}

                <div className="password-wrapper mb-4">

                  <Form.Control
                    type="password"
                    placeholder="password"
                    className="custom-input"
                    value={password}
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
                  />

                  <FaEyeSlash className="eye-icon" />

                </div>

                {/* Button */}

                <Button
                  type="submit"
                  className="login-btn w-100"
                  disabled={loading}
                >
                  {loading ? "Logging in..." : "Login"}
                </Button>

                <div className="forgot-password">

                  <a href="/">
                    Forgot password
                  </a>

                </div>

              </Form>

            </Card>

            {/* Signup Box */}

            <div className="signup-box">

              Don't have an account?
              <a href="/">
                {" "}Sign up
              </a>

            </div>

          </Col>

        </Row>

      </Container>

    </div>
  );
}

export default Login;