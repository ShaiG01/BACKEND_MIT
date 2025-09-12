import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  username: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  contactNo: { type: String, default: 'add contact information' },
  avatar: { type: String, default: 'default' },


  discoveries: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Discovery', 
    }
  ],
});

const User = mongoose.model('User', userSchema);
export default User;
