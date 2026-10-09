# Contact Management API

A robust RESTful API built with **Node.js**, **Express**, and **MongoDB (Mongoose)** for managing personal contacts with user authentication and authorization using **JSON Web Tokens (JWT)** and **bcrypt**.

---

## 🌟 Features

- 🔐 **User Authentication & Authorization**:
  - Secure user registration and login
  - Password hashing with `bcrypt`
  - JWT-based authentication for private route protection
  - Token validation middleware (`validateTokenHandler`)
- 📇 **Contact Management (CRUD)**:
  - Create, Read, Update, and Delete contacts
  - User-specific contact isolation (users can only access and modify their own contacts)
- ⚙️ **Robust Architecture**:
  - Centralized error handling middleware with standard HTTP status codes
  - Async route error handling using `express-async-handler`
  - MongoDB connection via Mongoose with clean connection lifecycle management
  - Environment-based configuration with `dotenv`

---

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js (v5)
- **Database**: MongoDB (via Mongoose ODM)
- **Security & Auth**: JSON Web Tokens (`jsonwebtoken`), `bcrypt`
- **Environment**: `dotenv`
- **Development Tool**: `nodemon`

---

## 📁 Project Structure

```
mycontacts-backend/
├── config/
│   └── dbConnection.js         # MongoDB connection setup
├── controllers/
│   ├── contactController.js    # Contact CRUD operations handler
│   └── userController.js       # Authentication & user operations handler
├── middleware/
│   ├── errorHandler.js         # Centralized error response formatter
│   └── validateTokenHandler.js # JWT authorization middleware
├── models/
│   ├── contactModel.js         # Contact Mongoose schema & model
│   └── userModel.js            # User Mongoose schema & model
├── routes/
│   ├── contactRoutes.js        # Contact API routes
│   └── userRoutes.js           # User Auth API routes
├── constant.js                 # HTTP status code constants
├── server.js                   # Express server entry point
├── .env.example                # Template environment variables
├── .gitignore                  # Git ignore rules
└── package.json                # Project dependencies & scripts
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- MongoDB Atlas cluster or local MongoDB instance

### Installation

1. Navigate to the backend directory:
   ```bash
   cd mycontacts-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   - Create a `.env` file based on `.env.example`:
   ```env
   PORT=5001
   CONNECTION_STRING=your_mongodb_connection_string
   ACCESS_TOKEN_SECRET=your_jwt_secret_key
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

---

## 📡 API Endpoints

### 👤 User Endpoints

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/api/users/register` | Public | Register a new user (`username`, `email`, `password`) |
| `POST` | `/api/users/login` | Public | Authenticate user & get JWT access token |
| `GET` | `/api/users/current` | Private | Retrieve currently authenticated user profile |

### 📇 Contact Endpoints

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/api/contacts` | Private | Retrieve all contacts belonging to the authenticated user |
| `POST` | `/api/contacts` | Private | Create a new contact (`name`, `email`, `phone`) |
| `GET` | `/api/contacts/:id` | Private | Retrieve a single contact by ID |
| `PUT` | `/api/contacts/:id` | Private | Update contact details by ID |
| `DELETE` | `/api/contacts/:id` | Private | Delete a contact by ID |

---

## 🔒 Authentication Flow

For protected endpoints, include the JWT token in the `Authorization` header:

```http
Authorization: Bearer <your_jwt_access_token>
```
