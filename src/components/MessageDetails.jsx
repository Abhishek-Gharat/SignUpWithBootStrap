import React from "react";

import {
  Container,
  Row,
  Col,
  Card,
  Button,
} from "react-bootstrap";

import {
  BsArrowLeft,
  BsReply,
  BsTrash,
  BsStar,
} from "react-icons/bs";

import { useLocation, useNavigate } from "react-router-dom";

import "./MessageDetails.css";

// Dummy data for testing
const dummyMail = {
  id: 1,
  sender: "john@example.com",
  receiver: "user@yahoo.com",
  subject: "Meeting Tomorrow - Project Discussion",
  message: `
    <p>Hi there,</p>
    <p>I hope this email finds you well. I wanted to remind you about our meeting scheduled for tomorrow at 2:00 PM in the conference room.</p>
    <p>We'll be discussing:</p>
    <ul>
      <li>Project timeline and milestones</li>
      <li>Budget allocation</li>
      <li>Resource requirements</li>
      <li>Next steps and deliverables</li>
    </ul>
    <p>Please bring your laptop and any relevant documents. Looking forward to seeing you there!</p>
    <p>Best regards,<br><strong>John Smith</strong><br>Project Manager</p>
  `,
  created_at: new Date().toISOString(),
  read: false,
};

function MessageDetails() {
  const navigate = useNavigate();

  const location = useLocation();

  const { mail: locationMail } = location.state || {};

  const mail = locationMail || dummyMail;

  return (
    <div className="message-details-container">
      {/* Header */}
      <div className="message-header">
        <Container fluid>
          <Row className="align-items-center">
            <Col>
              <Button
                variant="light"
                className="back-btn"
                onClick={() => navigate("/inbox")}
              >
                <BsArrowLeft /> Back to Inbox
              </Button>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Message Content */}
      <Container fluid className="message-content">
        <Card className="message-card">
          <Card.Header className="message-header-section">
            <Row className="align-items-center">
              <Col md={8}>
                <h4 className="message-subject">{mail.subject}</h4>
                <div className="sender-info">
                  <strong>From:</strong> {mail.sender}
                </div>
                <div className="receiver-info">
                  <strong>To:</strong> {mail.receiver}
                </div>
                <div className="message-date">
                  {new Date(mail.created_at).toLocaleString()}
                </div>
              </Col>

              <Col md={4} className="text-end">
                <Button
                  variant="light"
                  className="action-btn"
                >
                  <BsReply /> Reply
                </Button>

                <Button
                  variant="light"
                  className="action-btn"
                >
                  <BsStar /> Star
                </Button>

                <Button
                  variant="light"
                  className="action-btn"
                >
                  <BsTrash /> Delete
                </Button>
              </Col>
            </Row>
          </Card.Header>

          <Card.Body className="message-body">
            <div
              className="message-text"
              dangerouslySetInnerHTML={{ __html: mail.message }}
            />
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default MessageDetails;
