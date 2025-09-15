// models/Discovery.js
import mongoose from 'mongoose';

const discoverySchema = new mongoose.Schema({
  title: { type: String, default: 'Untitled' },
  location: { type: String },
  description: { type: String, default: 'No description' },
  createdAt: { type: Date, default: Date.now },
  tangibility:{
    type: String,
  },

  user:{
    type: String
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

const Discovery = mongoose.model('Discovery', discoverySchema);
export default Discovery;
