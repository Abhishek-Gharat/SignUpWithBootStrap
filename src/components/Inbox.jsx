// Inbox.jsx

import React from "react";

import {
  Container,
  Row,
  Col,
  Form,
  Button,
} from "react-bootstrap";

import {
  BsSearch,
  BsStar,
  BsTrash,
  BsArchive,
  BsThreeDots,
} from "react-icons/bs";

import "./Inbox.css";

function Inbox() {

  const mails = [

    {
      sender: "Wakefit",
      subject:
        "Lowest Price Ever on Mattress",
      desc:
        "Get Up to 45% off on Best Mattresses",
      time: "8:29 am",
    },

    {
      sender: "Twitter",
      subject:
        "Ontario cuts electricity prices",
      desc:
        "What's happening News",
      time: "8:17 am",
    },

    {
      sender: "Freshersworld",
      subject:
        "New Jobs posted on Freshersworld.com",
      desc:
        "Customer Support Executive Jobs",
      time: "7:05 am",
    },

    {
      sender: "Razorpay",
      subject:
        "Daily Transaction Report",
      desc:
        "Daily report for your account",
      time: "12:13 am",
    },

  ];

  return (

    <div className="mail-app">

      {/* Navbar */}

      <div className="topbar">

        <div className="logo">
          yahoo/mail
        </div>

        <div className="search-box">

          <Form.Control
            type="text"
            placeholder="Find messages, documents, photos or people"
            className="search-input"
          />

          <Button className="search-btn">
            <BsSearch />
          </Button>

        </div>

      </div>

      {/* Main Layout */}

      <Container fluid>

        <Row>

          {/* Sidebar */}

          <Col
            md={2}
            className="sidebar"
          >

            <Button className="compose-btn">
              Compose
            </Button>

            <div className="menu active-menu">
              Inbox
              <span>999+</span>
            </div>

            <div className="menu">
              Unread
            </div>

            <div className="menu">
              Starred
            </div>

            <div className="menu">
              Drafts
            </div>

            <div className="menu">
              Sent
            </div>

            <div className="menu">
              Archive
            </div>

            <div className="menu">
              Spam
            </div>

            <div className="menu">
              Deleted Items
            </div>

          </Col>

          {/* Mail Section */}

          <Col
            md={10}
            className="mail-section"
          >

            {/* Toolbar */}

            <div className="toolbar">

              <BsArchive size={20} />
              <BsTrash size={20} />
              <BsThreeDots size={20} />

            </div>

            {/* Mail List */}

            <div className="mail-list">

              {mails.map((mail, index) => (

                <div
                  className="mail-row"
                  key={index}
                >

                  <div className="mail-left">

                    <input type="checkbox" />

                    <BsStar
                      size={16}
                      className="star-icon"
                    />

                    <span className="sender">
                      {mail.sender}
                    </span>

                  </div>

                  <div className="mail-center">

                    <span className="subject">
                      {mail.subject}
                    </span>

                    <span className="desc">
                      {" "}
                      - {mail.desc}
                    </span>

                  </div>

                  <div className="mail-time">
                    {mail.time}
                  </div>

                </div>

              ))}

            </div>

          </Col>

        </Row>

      </Container>

    </div>
  );
}

export default Inbox;