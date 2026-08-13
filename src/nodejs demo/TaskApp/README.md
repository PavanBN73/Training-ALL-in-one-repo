# Task App - Node.js API Documentation

A full-featured Task Management API built with Express, MongoDB, and JWT authentication.

## Project Structure

```
TaskApp/
├── src/
│   ├── db/
│   │   └── mongoose.js         # MongoDB connection setup
│   ├── models/
│   │   ├── user.js             # User schema with password hashing & JWT
│   │   └── task.js             # Task model with validation
│   ├── middleware/
│   │   └── auth.js             # Authentication middleware
│   ├── routers/
│   │   ├── user.js             # User endpoints
│   │   └── task.js             # Task endpoints (CRUD + filtering)
│   ├── tests/
│   │   └── user.test.js        # Jest & Supertest test suite
│   └── index.js                # Main server entry point
├── package.json
├── jest.config.js
├── TaskApp.postman_collection.json
└── README.md
```

## Installation

### 1. Install Dependencies
```bash
npm install express mongoose bcryptjs jsonwebtoken jest supertest
```

Or using the included package.json:
```bash
npm install
```

### 2. MongoDB Setup
Make sure MongoDB is running locally on `mongodb://localhost:27017` or set the `MONGODB_URI` environment variable.

**For MongoDB Community Edition:**
```bash
mongod
```

### 3. Start the Server
```bash
# Development (with nodemon)
npm run dev

# Production
npm start
```

Server will run on `http://localhost:3000`

### 4. Run Tests
```bash
npm test
```

## API Endpoints

### User Endpoints

**POST /users** - User Signup
```json
{
  "name": "Test User",
  "email": "test@example.com",
  "password": "MyPass777"
}
```

**POST /users/login** - User Login
```json
{
  "email": "test@example.com",
  "password": "MyPass777"
}
```

**GET /users/me** - Get Current User Profile
- Requires: `Authorization: Bearer {token}`

**POST /users/logout** - Logout
- Requires: `Authorization: Bearer {token}`

**DELETE /users/me** - Delete User & All Associated Tasks
- Requires: `Authorization: Bearer {token}`

### Task Endpoints

**POST /tasks** - Create Task
- Requires: `Authorization: Bearer {token}`
```json
{
  "description": "Finish Node.js project"
}
```

**GET /tasks** - Get Tasks with Filtering, Sorting, Pagination
- Requires: `Authorization: Bearer {token}`
- Query Parameters:
  - `completed`: true/false (filter by completion status)
  - `limit`: number (default: 10)
  - `skip`: number (default: 0)
  - `sortBy`: field:order (e.g., createdAt:desc, createdAt:asc)

Example:
```
GET /tasks?completed=false&limit=5&skip=0&sortBy=createdAt:desc
```

**GET /tasks/:id** - Get Single Task
- Requires: `Authorization: Bearer {token}`

**PATCH /tasks/:id** - Update Task
- Requires: `Authorization: Bearer {token}`
```json
{
  "description": "Updated description",
  "completed": true
}
```

**DELETE /tasks/:id** - Delete Task
- Requires: `Authorization: Bearer {token}`

## Key Features

✅ **User Authentication**
- Password hashing with bcryptjs
- JWT token generation and validation
- Secure token storage

✅ **Task Management**
- Create, read, update, delete tasks
- Filter by completion status
- Sort by any field (createdAt, completed, etc.)
- Pagination support

✅ **Data Validation**
- Email format validation
- Password minimum length (6 characters)
- Task description minimum length (3 characters)
- Mongoose schema validation

✅ **Security**
- JWT token-based authentication
- Password hashing before storage
- Authorization middleware for protected routes

✅ **Testing**
- Comprehensive Jest test suite
- Supertest for HTTP endpoint testing
- 40+ test cases covering all API endpoints
- Test database isolation

## Environment Variables

```
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/task-app
JWT_SECRET=your_secret_key_here
PORT=3000
```

## Using Postman Collection

1. Import `TaskApp.postman_collection.json` into Postman
2. After signup/login, copy the token from the response
3. In Postman, set the environment variable `{{token}}` with the copied token
4. Use other requests with the token automatically included

## Test Coverage

The test suite includes:
- User signup and validation
- User login with correct/incorrect credentials
- JWT token generation and validation
- Task creation with validation
- Task filtering by completion status
- Task sorting and pagination
- Task updates and deletions
- User logout
- User and associated tasks deletion
- Error handling for all endpoints

Run tests with:
```bash
npm test
```

## Response Format

Success Response:
```json
{
  "user": {
    "_id": "user_id",
    "name": "User Name",
    "email": "user@example.com"
  },
  "token": "jwt_token_here"
}
```

Task List Response:
```json
{
  "tasks": [
    {
      "_id": "task_id",
      "description": "Task description",
      "completed": false,
      "owner": {
        "_id": "user_id",
        "name": "User Name",
        "email": "user@example.com"
      },
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "pagination": {
    "total": 10,
    "limit": 5,
    "skip": 0,
    "pages": 2
  }
}
```

## Error Handling

All errors return appropriate HTTP status codes with error messages:
- 400: Bad Request (validation errors)
- 401: Unauthorized (missing/invalid token)
- 404: Not Found (resource doesn't exist)
- 500: Server Error

## License

ISC
