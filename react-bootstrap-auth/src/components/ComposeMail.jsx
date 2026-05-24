import React, { useState } from "react";

import {
  Container,
  Card,
  Form,
  Button,
  Row,
  Col,
} from "react-bootstrap";

import { BsArrowLeft } from "react-icons/bs";

import CustomQuill from "./CustomQuill";

import "react-quill/dist/quill.snow.css";

import API from "../api";

import { useNavigate } from "react-router-dom";

function ComposeMail() {

  const navigate = useNavigate();

  const [to, setTo] = useState("");

  const [subject, setSubject] =
    useState("");

  const [message, setMessage] =
    useState("");

  const senderEmail =
    localStorage.getItem("email");

  const handleSend = async () => {

    if (!to || !subject || !message) {
      return alert(
        "All fields are required"
      );
    }

    try {

      await API.post(
        "/mail/send",
        {
          sender: senderEmail,
          receiver: to,
          subject,
          message,
        }
      );

      alert("Mail Sent");

      setTo("");
      setSubject("");
      setMessage("");

      navigate("/inbox");

    } catch (error) {

      alert("Failed to send mail");

    }
  };

  return (

    <Container className="mt-3">

      <Card className="p-4">

        <Row className="mb-4 align-items-center">
          <Col md={6}>
            <h2>
              Compose Mail
            </h2>
          </Col>
          <Col md={6} className="text-end">
            <Button
              variant="light"
              onClick={() => navigate("/inbox")}
              title="Back to Inbox"
            >
              <BsArrowLeft /> Back to Inbox
            </Button>
          </Col>
        </Row>

        {/* Receiver */}

        <Form.Group className="mb-3">

          <Form.Control
            type="email"
            placeholder="To"
            value={to}
            onChange={(e) =>
              setTo(e.target.value)
            }
          />

        </Form.Group>

        {/* Subject */}

        <Form.Group className="mb-3">

          <Form.Control
            type="text"
            placeholder="Subject"
            value={subject}
            onChange={(e) =>
              setSubject(e.target.value)
            }
          />

        </Form.Group>

        {/* Text Editor */}

        <CustomQuill
          theme="snow"
          value={message}
          onChange={setMessage}
        />

        <Row className="mt-4">
          <Col md={6}>
            <Button
              variant="secondary"
              onClick={() => navigate("/inbox")}
              className="w-100"
            >
              Cancel
            </Button>
          </Col>
          <Col md={6}>
            <Button
              variant="primary"
              onClick={handleSend}
              className="w-100"
            >
              Send Mail
            </Button>
          </Col>
        </Row>

      </Card>

    </Container>
  );
}

export default ComposeMail;