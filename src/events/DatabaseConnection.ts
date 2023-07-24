import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

export default class DatabaseConnection {
  public static databaseHandler() {
    const MONGO_URI = process.env.MONGO_URI;
    try {
      mongoose.connect(`${MONGO_URI}`, { keepAlive: true });
    } catch (error) {
      console.error(error);
    }
  }
}