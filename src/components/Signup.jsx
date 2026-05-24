import React, { useState } from "react";

import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
} from "react-bootstrap";

import { Link, useNavigate } from "react-router-dom";

import "./Signup.css";

import { useAuth } from "../hooks/useAuth";

function Signup() {

  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [confirmPassword,
    setConfirmPassword] =
    useState("");
  
  // Custom hook for auth operations
  const { signup, loading, error } = useAuth();

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (
      !email ||
      !password ||
      !confirmPassword
    ) {
      return alert(
        "All fields are mandatory"
      );
    }

    if (password !== confirmPassword) {
      return alert(
        "Passwords do not match"
      );
    }

    try {

      const response = await signup(email, password);

      alert(response.message);

      navigate("/login");

    } catch (err) {

      alert(
        error ||
        "Signup failed"
      );

    }
  };

  return (

    <div className="signup-page">

      {/* Blue Shape */}

      <div className="blue-shape"></div>

      <Container fluid>

        <Row className="justify-content-center align-items-center vh-100">

          <Col md={4} lg={3}>

            <Card className="signup-card p-4">

              <h1 className="text-center mb-5">
                SignUp
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

                <Form.Group className="mb-4">

                  <Form.Control
                    type="password"
                    placeholder="Password"
                    className="custom-input"
                    value={password}
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
                  />

                </Form.Group>

                {/* Confirm Password */}

                <Form.Group className="mb-4">

                  <Form.Control
                    type="password"
                    placeholder="Confirm Password"
                    className="custom-input"
                    value={confirmPassword}
                    onChange={(e) =>
                      setConfirmPassword(
                        e.target.value
                      )
                    }
                  />

                </Form.Group>

                {/* Button */}

                <Button
                  type="submit"
                  className="signup-btn w-100"
                  disabled={loading}
                >
                  {loading ? "Signing up..." : "Sign up"}
                </Button>

              </Form>

            </Card>

            {/* Login Box */}

            <div className="login-box">

              Have an account?
              <Link to="/login">
                {" "}Login
              </Link>

            </div>

          </Col>

        </Row>

      </Container>

    </div>
  );
}

export default Signup;