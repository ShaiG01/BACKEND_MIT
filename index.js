import express from 'express';

const app = express();
const PORT = process.env.PORT || 5500;

// Middleware (optional, for JSON body parsing if you need POST requests later)
app.use(express.json());

// Simple test route
app.get('/', (req, res) => {
  res.send('Hello ShinyShai! 🐼');
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server listening at http://192.168.137.229:${PORT}`);
});
