import React, { useEffect, useReducer } from "react";
import {
  Container,
  Row,
  Col,
  ListGroup,
  Badge,
  Button,
  Form,
  InputGroup,
  Alert,
} from "react-bootstrap";
import {
  BsSearch,
  BsTrash,
  BsStar,
  BsArrowLeft,
  BsTrashFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import API from "../api";
import { mailReducer, initialState } from "../reducers/mailReducer";
import "./Inbox.css";

function Sent() {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(mailReducer, initialState);
  const userEmail = localStorage.getItem("email");

  const fetchSentMails = async () => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });
      const response = await API.get(`/mail/sent/${userEmail}`);
      dispatch({ type: "SET_MAILS", payload: response.data });
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload: error.response?.data?.message || error.message,
      });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  useEffect(() => {
    fetchSentMails();
    // eslint-disable-next-line
  }, []);

  const markAsRead = async (id) => {
    try {
      await API.put(`/mail/read/${id}`);
      dispatch({ type: "MARK_AS_READ", payload: id });
    } catch (error) {
      console.log("Error marking as read:", error);
    }
  };

  const deleteMail = async (id, event) => {
    event.stopPropagation();
    try {
      await API.put(`/mail/trash/${id}`);
      dispatch({ type: "DELETE_MAIL", payload: id });
    } catch (error) {
      console.log("Error moving mail to trash:", error);
      alert("Failed to move mail to trash.");
    }
  };

  const handleMailClick = (mail) => {
    if (!mail.read) markAsRead(mail.id);
    navigate(`/message/${mail.id}`, { state: { mail, fromSent: true } });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    navigate("/login");
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
              <InputGroup className="search-bar">
                <Form.Control
                  placeholder="Search mail"
                  className="search-input"
                />
                <Button
                  variant="outline-secondary"
                  className="search-btn"
                >
                  <BsSearch />
                </Button>
              </InputGroup>
            </Col>
            <Col md={3} className="text-end">
              <span className="user-email">{userEmail}</span>
              <Button
                variant="link"
                className="logout-btn"
                onClick={handleLogout}
              >
                Logout
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
                {state.unreadCount > 0 && (
                  <Badge bg="primary" className="ms-2">
                    {state.unreadCount}
                  </Badge>
                )}
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
                <BsStar className="me-2" />
                Starred
              </ListGroup.Item>

              <ListGroup.Item
                action
                active
                className="folder-item"
              >
                Sent
              </ListGroup.Item>

              <ListGroup.Item
                action
                className="folder-item"
                onClick={() => navigate("/trash")}
              >
                <BsTrash className="me-2" />
                Trash
              </ListGroup.Item>
            </ListGroup>
          </Col>

          {/* Mail List */}
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
                onClick={fetchSentMails}
                title="Refresh sent folder"
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
                No sent mails found
              </div>
            ) : (
              <ListGroup>
                {state.mails.map((mail) => (
                  <ListGroup.Item
                    key={mail.id}
                    className={`mail-item ${
                      !mail.read ? "unread" : ""
                    }`}
                    onClick={() => handleMailClick(mail)}
                  >
                    <Row className="align-items-center">
                      <Col
                        md={1}
                        className="mail-checkbox"
                      >
                        <Form.Check
                          type="checkbox"
                          onClick={(e) =>
                            e.stopPropagation()
                          }
                        />
                      </Col>

                      <Col
                        md={1}
                        className="mail-star"
                      >
                        <BsStar />
                      </Col>

                      <Col
                        md={2}
                        className="sender-name"
                      >
                        {!mail.read && (
                          <span className="blue-dot"></span>
                        )}
                        {mail.receiver}
                      </Col>

                      <Col
                        md={6}
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
                        md={1}
                        className="mail-date"
                      >
                        {new Date(
                          mail.created_at
                        ).toLocaleDateString()}
                      </Col>

                      <Col
                        md={1}
                        className="mail-delete text-end"
                      >
                        <Button
                          variant="link"
                          className="delete-btn"
                          onClick={(e) =>
                            deleteMail(mail.id, e)
                          }
                          title="Delete mail"
                        >
                          <BsTrashFill />
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

export default Sent;
