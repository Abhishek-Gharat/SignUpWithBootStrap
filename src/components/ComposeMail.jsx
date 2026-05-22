import React, { useState } from "react";

import {
  Container,
  Card,
  Form,
  Button,
} from "react-bootstrap";

import ReactQuill from "react-quill";

import "react-quill/dist/quill.snow.css";

import API from "../api";

function ComposeMail() {

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

    } catch (error) {

      alert("Failed to send mail");

    }
  };

  return (

    <Container className="mt-5">

      <Card className="p-4">

        <h2 className="mb-4">
          Compose Mail
        </h2>

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

        <ReactQuill
          theme="snow"
          value={message}
          onChange={setMessage}
        />

        <Button
          className="mt-4"
          onClick={handleSend}
        >
          Send
        </Button>

      </Card>

    </Container>
  );
}

export default ComposeMail;