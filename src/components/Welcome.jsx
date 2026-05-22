import React from "react";

import {
  Container,
  Row,
  Col,
  Card,
  Button,
} from "react-bootstrap";

import { useNavigate } from "react-router-dom";

import "./Welcome.css";

function Welcome() {

  const navigate = useNavigate();

  const handleCompose = () => {

    navigate("/compose");

  };

  const handleLogout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("email");

    navigate("/login");

  };

  return (

    <div className="welcome-page">

      <Container fluid>

        <Row className="justify-content-center align-items-center vh-100">

          <Col md={6} lg={5}>

            <Card className="welcome-card p-5 text-center">

              <h1 className="mb-4">
                Welcome to your mail box
              </h1>

              <div className="d-flex justify-content-center gap-3">

                <Button
                  variant="primary"
                  onClick={handleCompose}
                >
                  Compose Mail
                </Button>

                <Button
                  variant="danger"
                  onClick={handleLogout}
                >
                  Logout
                </Button>

              </div>

            </Card>

          </Col>

        </Row>

      </Container>

    </div>
  );
}

export default Welcome;
