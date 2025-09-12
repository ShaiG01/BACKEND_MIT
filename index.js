import express from 'express';
import connectDB from './config/config.js';
import userRouter from './routes/userRoutes.js';

const app = express();
const PORT = process.env.PORT || 5500;

// Middleware
app.use(express.json());

// Mount router BEFORE starting server
app.use("/api/users", userRouter);

// Test route
app.get('/', (req, res) => res.send('Hello ShinyShai! 🐼'));

// Connect to MongoDB and start server
(async () => {
  try {
    await connectDB();
    console.log('✅ Database connected successfully');

    app.listen(PORT, () => {
      console.log(`✅ Server listening at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
  }
})();
