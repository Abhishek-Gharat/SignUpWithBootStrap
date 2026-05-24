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
import { useApi } from "../hooks/useApi";
import "./MessageDetails.css";

function MessageDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const { mail, fromSent } = location.state || {};
  
  // Custom hook for API operations
  const deleteApi = useApi({
    onSuccess: () => {
      // Navigate back to the appropriate folder based on where user came from
      navigate(fromSent ? "/sent" : "/inbox");
    },
    onError: (error) => {
      console.log("Error deleting mail:", error);
      alert("Failed to delete mail.");
    }
  });

  if (!mail) {
    return (
      <Container className="mt-5 text-center">
        <h4>No mail selected</h4>
        <Button
          variant="primary"
          onClick={() => navigate("/inbox")}
        >
          Go to Inbox
        </Button>
      </Container>
    );
  }

  const handleDeleteMail = async () => {
    if (!window.confirm("Are you sure you want to delete this mail?")) return;
    await deleteApi.execute("delete", `/mail/delete/${mail.id}`);
  };

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
                onClick={() => navigate(fromSent ? "/sent" : "/inbox")}
              >
                <BsArrowLeft /> Back to {fromSent ? "Sent" : "Inbox"}
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
                <h4 className="message-subject">
                  {mail.subject}
                </h4>
                <div className="sender-info">
                  <strong>From:</strong> {mail.sender}
                </div>
                <div className="receiver-info">
                  <strong>To:</strong> {mail.receiver}
                </div>
                <div className="message-date">
                  {new Date(
                    mail.created_at
                  ).toLocaleString()}
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
                  onClick={handleDeleteMail}
                >
                  <BsTrash /> Delete
                </Button>
              </Col>
            </Row>
          </Card.Header>

          <Card.Body className="message-body">
            <div
              className="message-text"
              dangerouslySetInnerHTML={{
                __html: mail.message,
              }}
            />
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default MessageDetails;
