import mongoose from 'mongoose';

export default mongoose.model("User", new mongoose.Schema({
  id: { type: String },
  registeredAt: { type: Number, default: Date.now() },
}));