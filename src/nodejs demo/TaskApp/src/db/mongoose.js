const mongoose = require('mongoose');

const connectDB = () => {
  return new Promise((resolve, reject) => {
    mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/task-app', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
      .then(() => {
        console.log('✅ MongoDB Connected Successfully!');
        resolve();
      })
      .catch((err) => {
        console.error('❌ MongoDB Connection Failed:', err.message);
        reject(err);
      });
  });
};

module.exports = connectDB;
