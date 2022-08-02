import mongoose from 'mongoose';

export default mongoose.model("Log", new mongoose.Schema({
  commandName: { type: String, default: "unknown" },
  fullCommand: { type: String, default: "unknown" },
  date: { type: Number, default: Date.now() },
  author: { type: Object, default: {
      username: "Unknown",
      discrminator: "0000",
      id: null
  }},
  guild: { type: Object, default: {
      name: "Unknown",
      channel: null,
      id: null
  }}
}));