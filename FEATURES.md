# Email Application Features & User Guide

## Overview
This is a full-stack email application built with React, Node.js, and PostgreSQL. It provides essential email functionality with an intuitive user interface.

## Table of Contents
1. [Core Features](#core-features)
2. [User Interface](#user-interface)
3. [Navigation](#navigation)
4. [Mail Operations](#mail-operations)
5. [Technical Implementation](#technical-implementation)

---

## Core Features

### 1. **User Authentication**
- **Sign Up**: Create a new account with email and password
- **Login**: Authenticate with existing credentials
- **Session Management**: Automatic token handling via localStorage
- **Logout**: Securely exit the application

### 2. **Mail Management**
- **Compose Mail**: Write and send emails with rich text editor
- **Inbox**: View received emails
- **Sent**: View emails you've sent
- **Trash**: Manage deleted emails with restore option
- **Mark as Read**: Track read/unread status

### 3. **Email Operations**

#### Send Mail
- **Location**: Compose page
- **Features**:
  - Rich text editor using React-Quill
  - Email validation
  - Subject line and message body
  - Automatic navigation to Inbox after sending
  - Cancel button to discard draft

#### View Inbox
- **Location**: After login, default view
- **Features**:
  - List of received emails
  - Unread count badge
  - Sender information
  - Subject preview
  - Message preview with HTML stripping
  - Date display
  - Click to read full message

#### View Sent
- **Location**: Sidebar "Sent" option
- **Features**:
  - List of sent emails
  - Recipient information
  - Subject and message preview
  - Date of sending
  - Full message viewing capability

#### Trash Management
- **Location**: Sidebar "Trash" option
- **Features**:
  - View all deleted emails
  - Restore emails back to Inbox/Sent
  - Permanently delete emails
  - Empty trash indicator when no items

---

## User Interface

### Layout Components

#### Header Section
- Yahoo Mail-style branding
- Search bar (UI ready)
- User email display
- Logout button

#### Sidebar Navigation
- **Compose Button**: Primary action to write new email
- **Mail Folders**:
  - Inbox (with unread count badge)
  - Unread
  - Starred (UI ready)
  - Sent
  - Trash

#### Toolbar
- **Back Button**: Navigate back to Welcome/Dashboard
- **Refresh Button**: Reload current folder
- Both buttons have helpful tooltips

#### Mail List
- Checkbox selection (UI ready)
- Star/favorite toggle (UI ready)
- Sender/recipient name
- Subject line
- Message preview
- Date
- Delete button

---

## Navigation

### Navigation Flow

```
Welcome (Dashboard)
├── Click "Inbox" → Inbox View
│   ├── Click "Compose" → Compose Mail
│   │   ├── Click "Send" → Back to Inbox
│   │   └── Click "Cancel" → Back to Inbox
│   ├── Click "Sent" → Sent View
│   ├── Click "Trash" → Trash View
│   └── Click "Back" → Back to Welcome
│
├── Click "Compose" → Compose Mail
│   ├── Send email → Navigate to Inbox
│   └── Cancel → Navigate to Inbox
│
└── Additional Features
    ├── Click mail item → View message details
    └── Click delete icon → Move to trash
```

### Back Button Features

#### In Compose Mail
- **Header Back Button**: "← Back to Inbox"
- **Footer Cancel Button**: Navigate to Inbox
- **Auto-redirect**: After sending, automatically goes to Inbox

#### In Inbox/Sent/Trash
- **Back Button**: "← Back" - Navigates to Welcome/Dashboard
- **Refresh Button**: "↻ Refresh" - Reloads current folder
- **Sidebar**: Direct navigation to other folders

---

## Mail Operations

### Compose Mail
1. Click **Compose** button
2. Enter recipient email address
3. Enter subject line
4. Write message in rich text editor
5. Click **Send Mail** to send
6. System confirms and returns to Inbox

**Features**:
- Field validation (All fields required)
- Rich text formatting (bold, italic, lists, etc.)
- Auto-save capability (UI ready)
- Error handling with user feedback

### Send Mail
- From: Currently logged-in user's email
- To: Recipient's email address
- Subject: Email subject
- Message: HTML-formatted content
- Status: Immediately available in Inbox

### Read Mail
1. Click on any email in Inbox/Sent/Trash
2. Navigate to message details page
3. View full message with formatting preserved
4. Message automatically marked as read

### Delete Mail (Move to Trash)
1. Click trash icon on any email
2. Email moved to Trash folder
3. Can restore from Trash later

### Restore from Trash
1. Navigate to Trash folder
2. Click restore button on email
3. Email returned to original folder (Inbox/Sent)

### Permanently Delete
1. Navigate to Trash folder
2. Click permanent delete button
3. Email permanently removed from database

---

## Technical Implementation

### Frontend Technologies
- **React 18.3.1**: UI framework
- **React Router DOM**: Client-side routing
- **React Bootstrap**: UI components
- **Axios**: HTTP client
- **React-Quill**: Rich text editor
- **React Icons**: Icon library

### Backend Technologies
- **Node.js**: Runtime
- **Express.js**: Web framework
- **PostgreSQL**: Database
- **pg**: PostgreSQL client
- **bcryptjs**: Password hashing
- **jsonwebtoken**: JWT authentication

### API Endpoints

#### Authentication Routes
```
POST   /api/auth/signup    - User registration
POST   /api/auth/login     - User login
```

#### Mail Routes
```
POST   /api/mail/send         - Send email
GET    /api/mail/inbox/:email - Get received emails
GET    /api/mail/sent/:email  - Get sent emails
GET    /api/mail/trash/:email - Get trashed emails
PUT    /api/mail/read/:id     - Mark as read
PUT    /api/mail/trash/:id    - Move to trash
PUT    /api/mail/restore/:id  - Restore from trash
DELETE /api/mail/delete/:id   - Permanently delete
DELETE /api/mail/permanent/:id- Alias for permanent delete
```

### Database Schema

#### Users Table
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### Mails Table
```sql
CREATE TABLE mails (
  id SERIAL PRIMARY KEY,
  sender VARCHAR(255) NOT NULL,
  receiver VARCHAR(255) NOT NULL,
  subject VARCHAR(255),
  message TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  read BOOLEAN DEFAULT false,
  trashed BOOLEAN DEFAULT false,
  trashed_at TIMESTAMP DEFAULT NULL
);
```

### State Management
- **React useReducer**: Mail state management
- **localStorage**: Token and email storage
- **React Hooks**: Component state

---

## Future Enhancements

1. **Search functionality**: Full-text search across emails
2. **Star/Favorite**: Mark important emails
3. **Unread filter**: Filter unread emails
4. **Attachments**: Upload and download file attachments
5. **Email threading**: Group conversation replies
6. **Folders**: Create custom folders
7. **Labels**: Organize with labels/tags
8. **Draft saving**: Auto-save drafts
9. **Multi-select**: Bulk operations on emails
10. **Email forwarding**: Forward emails to others

---

## Troubleshooting

### Mail Not Sending
- Verify all fields are filled (To, Subject, Message)
- Check backend server is running on port 5000
- Check database connection
- Review console for error messages

### Cannot Access Inbox
- Verify you're logged in
- Check token in localStorage
- Ensure backend API is running
- Check browser console for errors

### Trash Functionality Not Working
- Verify backend server has been restarted
- Check that database tables have trashed columns
- Run `node updateTable.js` to add missing columns

### Back Button Not Visible
- Clear browser cache
- Hard refresh (Ctrl+F5 or Cmd+Shift+R)
- Check if JavaScript is enabled

---

## Tips & Best Practices

1. **Clear Drafts**: Always clear old drafts when composing
2. **Regular Cleanup**: Empty trash periodically
3. **Mark Read**: Click emails to mark them as read
4. **Navigation**: Use sidebar for folder navigation
5. **Error Handling**: Read error messages for solutions

---

## System Requirements

- **Browser**: Modern browser with ES6 support
- **Node.js**: v14 or higher
- **PostgreSQL**: v12 or higher
- **Internet**: For API communication

---

## Version Information
- **Frontend**: React 18.3.1
- **Backend**: Node.js with Express
- **Database**: PostgreSQL
- **API Version**: v1.0
- **Last Updated**: May 23, 2026
