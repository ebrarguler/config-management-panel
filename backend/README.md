# Admin Configuration Panel Backend

This project is a backend service for an Admin Configuration Panel built using Node.js with Google Cloud Firebase (Authentication + Database). It provides API endpoints to authenticate users and manage application configuration settings.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
  - [Running the Server](#running-the-server)
- [API Endpoints](#api-endpoints)
- [License](#license)

## Features

- Authentication with Firebase Authentication
- CRUD operations for configurations stored in Firestore
- Middleware to verify Firebase ID tokens

## Tech Stack

- **Firebase Admin SDK for Firestore**: Managing database interactions.
- **Firebase Authentication**: User authentication services.
- **Node.js**: JavaScript runtime environment used for executing server-side code.
- **Express.js**: Web framework for building APIs, handling routing, and middleware.
- **Axios**: Making HTTP requests to Firebase Identity Toolkit.
- **CORS**: Handling cross-origin requests.
- **dotenv**: Manage environment variables.

## Getting Started

Follow these instructions to set up the project on your local machine.

### Prerequisites

- **Node.js**
- **Firebase**:  Firestore Database + Firebase Authentication services

### Installation

1. **Clone the repository**:

   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Create the Environment File (.env):**

   Create this file in the root directory of your project. It should contain the following configuration variables:

   ```env
   PORT=3003
   FIREBASE_API_KEY=YOUR_FIREBASE_API_KEY
   FIREBASE_IDENTITY_TOOLKIT_URL=https://identitytoolkit.googleapis.com/v1/accounts
   FIREBASE_COLLECTION_NAME=YOUR_FIREBASE_COLLECTION_NAME
   ```

4. **Add the Firebase Service Account Key**:

   Download the Firebase service account key from your Firebase console and save it as `firebase-adminsdk.json` in the root directory of your project.

### Configuration

- **Firebase Setup**:
  - Make sure to enable Firestore and Authentication on your Firebase Console.
  - Enable **Email/Password Sign-in** under Authentication methods.
  - Ensure to set proper Firestore rules to restrict access to authenticated users only, such as:

      ```
      service cloud.firestore {
        match /databases/{database}/documents {
          match /{document=**} {
            allow read, write: if request.auth != null;
          }
        }
      }
      ```

- **Environment Variables**:
  - Update `.env` file with the relevant Firebase project details.

### Running the Server

1. **Start the server**:
   ```bash
   node server.js
   ```
   The server will run by default on the port specified in `.env`. You should see:
   ```
   Server running on port 5048
   ```

## API Endpoints

### Authentication

- **POST /api/auth/signin**: Authenticates a user with email and password, returning a Firebase ID token.
  - **Request Body**: `{ "email": "admin@example.com", "password": "admin-password" }`
  - **Response**: `{ "idToken": "token_value" }`

### Configuration Management

(All endpoints require a valid Firebase token in the `Authorization` header)

- **GET /api/config/**: Get all configuration settings.

  - **Authorization**: `Bearer <Firebase ID Token>`

- **GET /api/config/{configKey}**: Get a specific configuration by Config Key (Document ID).

  - **Authorization**: `Bearer <Firebase ID Token>`

- **POST /api/config/**: Add a new configuration.

  - **Request Body**: `{ "key": "configKey", "value": "configValue", "description": "configDescription" }`
  - **Authorization**: `Bearer <Firebase ID Token>`

- **PUT /api/config/{configKey}**: Update an existing configuration by Config Key (Document ID), having conflict check.

  - **Request Body**: `{ "value": "updatedConfigValue", "updatedAt": "latestUpdatedAtKnown" }`
  - **Authorization**: `Bearer <Firebase ID Token>`

- **DELETE /api/config/{configKey}**: Delete a specific configuration by Config Key (Document ID).

  - **Authorization**: `Bearer <Firebase ID Token>`

## Project Structure
```
.
├── controllers
│   ├── authController.js
│   └── configController.js
├── middlewares
│   └── authMiddleware.js
├── routes
│   ├── authRoutes.js
│   └── configRoutes.js
├── services
│   └── firebaseAuth.js
├── server.js
├── .env
├── firebase-adminsdk.json
└── package.json

```
## License

This project is licensed under the MIT License.