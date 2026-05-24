import React, { useEffect, useReducer } from "react";
import {
  Container,
  Row,
  Col,
  ListGroup,
  Button,
  Alert,
} from "react-bootstrap";
import {
  BsArrowLeft,
  BsTrash,
  BsArrowCounterclockwise,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { mailReducer, initialState } from "../reducers/mailReducer";
import { useMails } from "../hooks/useMails";
import "./Inbox.css";

function Trash() {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(mailReducer, initialState);
  const userEmail = localStorage.getItem("email");
  
  // Custom hook for mail operations
  const { fetchTrash, restoreMail, permanentDelete } = useMails(dispatch);

  useEffect(() => {
    fetchTrash(userEmail);
    // eslint-disable-next-line
  }, []);

  const handleRestoreMail = async (id) => {
    await restoreMail(id);
  };

  const handlePermanentDelete = async (id) => {
    if (!window.confirm("Permanently delete this mail? This cannot be undone."))
      return;
    await permanentDelete(id);
  };

  const handleMailClick = (mail) => {
    navigate(`/message/${mail.id}`, { state: { mail, fromTrash: true } });
  };

  return (
    <div className="inbox-container">
      {/* Header */}
      <div className="inbox-header">
        <Container fluid>
          <Row className="align-items-center">
            <Col md={3}>
              <div className="logo-section">
                <img
                  src="https://www.yahoo.com/favicon.ico"
                  alt="Yahoo"
                  className="yahoo-logo"
                />
                <span className="brand-text">Mail</span>
              </div>
            </Col>
            <Col md={6}>
              <h5 className="m-0 text-muted">Trash Folder</h5>
            </Col>
            <Col md={3} className="text-end">
              <span className="user-email">{userEmail}</span>
              <Button
                variant="link"
                className="logout-btn"
                onClick={() => navigate("/inbox")}
              >
                Back to Inbox
              </Button>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Main Content */}
      <Container fluid className="main-content">
        <Row>
          {/* Sidebar */}
          <Col md={2} className="sidebar">
            <Button
              variant="primary"
              className="compose-btn"
              onClick={() => navigate("/compose")}
            >
              Compose
            </Button>

            <ListGroup className="mail-folders">
              <ListGroup.Item
                action
                className="folder-item"
                onClick={() => navigate("/inbox")}
              >
                Inbox
              </ListGroup.Item>

              <ListGroup.Item
                action
                className="folder-item"
              >
                Unread
              </ListGroup.Item>

              <ListGroup.Item
                action
                className="folder-item"
              >
                Sent
              </ListGroup.Item>

              <ListGroup.Item
                action
                active
                className="folder-item"
              >
                <BsTrash className="me-2" />
                Trash
              </ListGroup.Item>
            </ListGroup>
          </Col>

          {/* Trash List */}
          <Col md={10} className="mail-list">
            {/* Toolbar */}
            <div className="toolbar">
              <Button
                variant="light"
                className="toolbar-btn"
                onClick={() => navigate("/welcome")}
                title="Back to Dashboard"
              >
                <BsArrowLeft /> Back
              </Button>
              <Button
                variant="light"
                className="toolbar-btn"
                onClick={() => fetchTrash(userEmail)}
                title="Refresh trash folder"
              >
                ↻ Refresh
              </Button>
            </div>

            {/* ERROR DISPLAY */}
            {state.error && (
              <Alert variant="danger" className="m-3">
                <strong>Error:</strong> {state.error}
              </Alert>
            )}

            {state.loading ? (
              <div className="text-center p-5">Loading...</div>
            ) : state.mails.length === 0 ? (
              <div className="text-center p-5 text-muted">
                Trash is empty
              </div>
            ) : (
              <ListGroup>
                {state.mails.map((mail) => (
                  <ListGroup.Item
                    key={mail.id}
                    className="mail-item"
                    onClick={() => handleMailClick(mail)}
                  >
                    <Row className="align-items-center">
                      <Col
                        md={3}
                        className="sender-name"
                      >
                        {mail.sender}
                      </Col>

                      <Col
                        md={5}
                        className="mail-preview"
                      >
                        <span className="subject">
                          {mail.subject}
                        </span>
                        <span className="message-preview">
                          {" "} -{" "}
                          {mail.message
                            ? mail.message.replace(
                                /<[^>]*>/g,
                                ""
                              )
                            : ""}
                        </span>
                      </Col>

                      <Col
                        md={2}
                        className="mail-date"
                      >
                        {new Date(
                          mail.trashed_at || mail.created_at
                        ).toLocaleDateString()}
                      </Col>

                      <Col
                        md={2}
                        className="text-end"
                      >
                        <Button
                          variant="light"
                          size="sm"
                          className="me-2"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRestoreMail(mail.id);
                          }}
                        >
                          <BsArrowCounterclockwise />{" "}
                          Restore
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePermanentDelete(mail.id);
                          }}
                        >
                          <BsTrash /> Delete
                        </Button>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Trash;
