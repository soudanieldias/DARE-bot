import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

export default class DatabaseConnection {
  public static async databaseHandler() {
    const MONGO_URI = process.env.MONGO_URI;
    const useDB = process.env.USE_DB;
    try {
      if(useDB === 'True') {
        console.log('[DB] Connectando ao Banco de Dados');
        await mongoose.connect(`${MONGO_URI}`, { keepAlive: true });
        console.log('[DB] Connectado com Sucesso!');
      }
    } catch (error) {
      console.error(error);
    }
  }
}