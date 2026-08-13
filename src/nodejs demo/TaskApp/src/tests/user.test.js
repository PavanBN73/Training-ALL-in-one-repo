const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../index');
const User = require('../models/user');
const Task = require('../models/task');
const connectDB = require('../db/mongoose');

let token;
let userId;
let taskId;

beforeAll(async () => {
  process.env.NODE_ENV = 'test';
  process.env.MONGODB_URI = 'mongodb://localhost:27017/task-app-test';
  
  try {
    await connectDB();
    // Clear existing test data
    await User.deleteMany({});
    await Task.deleteMany({});
  } catch (error) {
    console.log('Database connection error:', error.message);
  }
});

afterAll(async () => {
  await User.deleteMany({});
  await Task.deleteMany({});
  await mongoose.connection.close();
});

describe('User API Tests', () => {
  
  describe('POST /users - User Signup', () => {
    test('Should create a new user with valid credentials', async () => {
      const res = await request(app)
        .post('/users')
        .send({
          name: 'Test User',
          email: 'test@example.com',
          password: 'MyPass777'
        });

      expect(res.status).toBe(201);
      expect(res.body.user.email).toBe('test@example.com');
      expect(res.body.token).toBeDefined();
      
      token = res.body.token;
      userId = res.body.user._id;
    });

    test('Should fail with missing email', async () => {
      const res = await request(app)
        .post('/users')
        .send({
          name: 'Test User 2',
          password: 'MyPass777'
        });

      expect(res.status).toBe(400);
      expect(res.body.error).toBeDefined();
    });

    test('Should fail with short password', async () => {
      const res = await request(app)
        .post('/users')
        .send({
          name: 'Test User 3',
          email: 'test3@example.com',
          password: '123'
        });

      expect(res.status).toBe(400);
    });

    test('Should fail with duplicate email', async () => {
      const res = await request(app)
        .post('/users')
        .send({
          name: 'Duplicate User',
          email: 'test@example.com',
          password: 'MyPass777'
        });

      expect(res.status).toBe(400);
    });
  });

  describe('POST /users/login - User Login', () => {
    test('Should login with valid credentials', async () => {
      const res = await request(app)
        .post('/users/login')
        .send({
          email: 'test@example.com',
          password: 'MyPass777'
        });

      expect(res.status).toBe(200);
      expect(res.body.token).toBeDefined();
      expect(res.body.user.email).toBe('test@example.com');
    });

    test('Should fail with wrong password', async () => {
      const res = await request(app)
        .post('/users/login')
        .send({
          email: 'test@example.com',
          password: 'WrongPassword'
        });

      expect(res.status).toBe(400);
      expect(res.body.error).toBeDefined();
    });

    test('Should fail with non-existent email', async () => {
      const res = await request(app)
        .post('/users/login')
        .send({
          email: 'nonexistent@example.com',
          password: 'MyPass777'
        });

      expect(res.status).toBe(400);
    });
  });

  describe('GET /users/me - Get User Profile', () => {
    test('Should get user profile with valid token', async () => {
      const res = await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body.name).toBe('Test User');
      expect(res.body.email).toBe('test@example.com');
    });

    test('Should fail without token', async () => {
      const res = await request(app)
        .get('/users/me');

      expect(res.status).toBe(401);
      expect(res.body.error).toBeDefined();
    });

    test('Should fail with invalid token', async () => {
      const res = await request(app)
        .get('/users/me')
        .set('Authorization', 'Bearer invalid_token');

      expect(res.status).toBe(401);
    });
  });

  describe('POST /users/logout - User Logout', () => {
    test('Should logout successfully with valid token', async () => {
      const res = await request(app)
        .post('/users/logout')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body.message).toBeDefined();
    });

    test('Should fail without token', async () => {
      const res = await request(app)
        .post('/users/logout');

      expect(res.status).toBe(401);
    });
  });
});

describe('Task API Tests', () => {
  let newToken;

  beforeAll(async () => {
    // Create a fresh user for task tests
    const res = await request(app)
      .post('/users')
      .send({
        name: 'Task Test User',
        email: 'taskuser@example.com',
        password: 'TaskPass777'
      });
    
    newToken = res.body.token;
    userId = res.body.user._id;
  });

  describe('POST /tasks - Create Task', () => {
    test('Should create a new task with valid data', async () => {
      const res = await request(app)
        .post('/tasks')
        .set('Authorization', `Bearer ${newToken}`)
        .send({
          description: 'Finish Node.js project'
        });

      expect(res.status).toBe(201);
      expect(res.body.description).toBe('Finish Node.js project');
      expect(res.body.completed).toBe(false);
      expect(res.body.owner).toBe(userId);
      
      taskId = res.body._id;
    });

    test('Should fail without token', async () => {
      const res = await request(app)
        .post('/tasks')
        .send({
          description: 'Another task'
        });

      expect(res.status).toBe(401);
    });

    test('Should fail with short description', async () => {
      const res = await request(app)
        .post('/tasks')
        .set('Authorization', `Bearer ${newToken}`)
        .send({
          description: 'ab'
        });

      expect(res.status).toBe(400);
    });

    test('Should fail without description', async () => {
      const res = await request(app)
        .post('/tasks')
        .set('Authorization', `Bearer ${newToken}`)
        .send({});

      expect(res.status).toBe(400);
    });
  });

  describe('GET /tasks - Get Tasks with Filtering, Sorting, Pagination', () => {
    beforeAll(async () => {
      // Create multiple tasks
      for (let i = 0; i < 5; i++) {
        await request(app)
          .post('/tasks')
          .set('Authorization', `Bearer ${newToken}`)
          .send({
            description: `Task ${i + 1}`,
            completed: i % 2 === 0
          });
      }
    });

    test('Should get all tasks with pagination', async () => {
      const res = await request(app)
        .get('/tasks?limit=5&skip=0')
        .set('Authorization', `Bearer ${newToken}`);

      expect(res.status).toBe(200);
      expect(res.body.tasks).toBeDefined();
      expect(res.body.pagination).toBeDefined();
      expect(res.body.pagination.total).toBeGreaterThan(0);
    });

    test('Should filter tasks by completed status', async () => {
      const res = await request(app)
        .get('/tasks?completed=true')
        .set('Authorization', `Bearer ${newToken}`);

      expect(res.status).toBe(200);
      res.body.tasks.forEach(task => {
        expect(task.completed).toBe(true);
      });
    });

    test('Should sort tasks by createdAt descending', async () => {
      const res = await request(app)
        .get('/tasks?sortBy=createdAt:desc')
        .set('Authorization', `Bearer ${newToken}`);

      expect(res.status).toBe(200);
      expect(res.body.tasks.length).toBeGreaterThan(0);
    });

    test('Should paginate results', async () => {
      const res = await request(app)
        .get('/tasks?limit=2&skip=0')
        .set('Authorization', `Bearer ${newToken}`);

      expect(res.status).toBe(200);
      expect(res.body.tasks.length).toBeLessThanOrEqual(2);
      expect(res.body.pagination.limit).toBe(2);
    });

    test('Should fail without token', async () => {
      const res = await request(app)
        .get('/tasks');

      expect(res.status).toBe(401);
    });
  });

  describe('GET /tasks/:id - Get Single Task', () => {
    test('Should get a specific task', async () => {
      const res = await request(app)
        .get(`/tasks/${taskId}`)
        .set('Authorization', `Bearer ${newToken}`);

      expect(res.status).toBe(200);
      expect(res.body._id).toBe(taskId);
    });

    test('Should fail with invalid task ID', async () => {
      const res = await request(app)
        .get('/tasks/invalid_id')
        .set('Authorization', `Bearer ${newToken}`);

      expect(res.status).toBe(500);
    });
  });

  describe('PATCH /tasks/:id - Update Task', () => {
    test('Should update task description', async () => {
      const res = await request(app)
        .patch(`/tasks/${taskId}`)
        .set('Authorization', `Bearer ${newToken}`)
        .send({
          description: 'Updated description'
        });

      expect(res.status).toBe(200);
      expect(res.body.description).toBe('Updated description');
    });

    test('Should update task completed status', async () => {
      const res = await request(app)
        .patch(`/tasks/${taskId}`)
        .set('Authorization', `Bearer ${newToken}`)
        .send({
          completed: true
        });

      expect(res.status).toBe(200);
      expect(res.body.completed).toBe(true);
    });

    test('Should fail with invalid fields', async () => {
      const res = await request(app)
        .patch(`/tasks/${taskId}`)
        .set('Authorization', `Bearer ${newToken}`)
        .send({
          invalidField: 'value'
        });

      expect(res.status).toBe(400);
    });
  });

  describe('DELETE /tasks/:id - Delete Task', () => {
    test('Should delete a task', async () => {
      const res = await request(app)
        .delete(`/tasks/${taskId}`)
        .set('Authorization', `Bearer ${newToken}`);

      expect(res.status).toBe(200);
      expect(res.body._id).toBe(taskId);
    });

    test('Should fail with non-existent task', async () => {
      const res = await request(app)
        .delete(`/tasks/${taskId}`)
        .set('Authorization', `Bearer ${newToken}`);

      expect(res.status).toBe(404);
    });
  });

  describe('DELETE /users/me - Delete User and Tasks', () => {
    test('Should delete user and associated tasks', async () => {
      const res = await request(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${newToken}`);

      expect(res.status).toBe(200);
      expect(res.body.message).toBeDefined();
    });
  });
});
