import mongoose from 'mongoose';

export default mongoose.model("Guild", new mongoose.Schema({
  id: { type: String }, //ID of the guild
  registeredAt: { type: Number, default: Date.now() },
  prefix: { type: String, default: process.env.BOT_PREFIX },
  addons: { type: Object, default: { // Extra features data
    welcome: {
        enabled: false, // Welcome features are enabled
        channel:  null, // ID for the channel to send messages to
        message: null, // Custom message
        image: false, // Check if image is enabled
        embed: false // Check if embed is enabled
    },
    goodbye: {
        enabled: false, // Goodbye features are enabled
        channel:  null, // ID for channel to send messages to
        message: null, // Custom message
        image: false, // Check if image is enabled
        embed: false // Check if embed is enabled
    }
  }}
}));