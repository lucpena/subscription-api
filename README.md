<div align="center">
  <h1>Subscription API</h1>
  <div>
    <img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white" alt="node.js" />
    <img src="https://img.shields.io/badge/express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="express.js" />
    <img src="https://img.shields.io/badge/-MongoDB-13aa52?style=for-the-badge&logo=mongodb&logoColor=white" alt="mongodb" />
  </div>
</div>

<br>
This application is a Subscription Management System API. It uses JWT Tokens, connect to a database,
create models and schemas and integrate it with ORMS. This API has Rate Limiting and Bot Protection with Arcjet and
automated email reminders about the renewal date with Nodemailer and Upstash.


## Features

### Authentication
- **Token-Based Authentication**: Users can log in and receive a token for subsequent requests.
- **JWT Support**: The API supports JSON Web Tokens for securing endpoints and verifying user identity.

### User Management
- **Create User**: Register new users with required credentials.
- **Update User Info**: Modify user details like email and password.
- **Delete User**: Remove a user from the system permanently.
- **Get User Details**: Fetch user information using their unique identifier.

### Subscriptions
- **Create Subscription**: Allow users to subscribe to different plans with varying features.
- **Update Subscription**: Change an existing user's subscription details.
- **Cancel Subscription**: Users can cancel their subscriptions, and their access will be revoked at the end of the billing cycle.
- **List Subscriptions**: Retrieve a list of current subscriptions and their statuses for a user.

### Workflows
- **Automated Subscription Renewals**: The API manages renewing subscriptions automatically based on user preferences.
- **Webhooks for Real-time Updates**: Set up webhooks to get real-time notifications about subscription events.

## Endpoints

1. **Authentication**
   - `POST /api/auth/login`: Log in a user.
   - `POST /api/auth/logout`: Log out a user.

2. **User Management**
   - `POST /api/users`: Create a new user.
   - `GET /api/users/{id}`: Get user details.
   - `PUT /api/users/{id}`: Update user details.
   - `DELETE /api/users/{id}`: Delete a user.

3. **Subscriptions**
   - `POST /api/subscriptions`: Create a new subscription.
   - `GET /api/subscriptions`: List all subscriptions.
   - `PUT /api/subscriptions/{id}`: Update a subscription.
   - `DELETE /api/subscriptions/{id}`: Cancel a subscription.
  
**Installation**

Install the project dependencies using npm:

```bash
npm install
```

**Set Up Environment Variables**

Create a new file named `.env.local` in the root of your project and add the following content:

```env
# PORT
PORT=5500
SERVER_URL="http://localhost:5500"

# ENVIRONMENT
NODE_ENV=development

# DATABASE
DB_URI=

# JWT AUTH
JWT_SECRET=
JWT_EXPIRES_IN="1d"

# ARCJET
ARCJET_KEY=
ARCJET_ENV="development"

# UPSTASH
QSTASH_URL=http://127.0.0.1:8080
QSTASH_TOKEN=

# NODEMAILER
EMAIL_PASSWORD=
```

**Running the Project**

```bash
npm run dev
```

Open [http://localhost:5500](http://localhost:5500) in your browser or any HTTP client to test the project.
