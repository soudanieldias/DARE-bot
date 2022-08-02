import mongoose from 'mongoose';

export default class DatabaseConnection {
  public static async databaseHandler() {
    try {
      const MONGO_URI = process.env.MONGO_URI;
      const USE_DB = process.env.USE_DB;

      if(!MONGO_URI || !Boolean(USE_DB)) return;

      console.log('[DataBase] Inicializando o Mongo')

      mongoose.connect(`${MONGO_URI}`, { keepAlive: true })
        .then(() => {
          console.log('[DataBase] Mongo Inicializado com Sucesso!');
        });

    } catch (error) {
      console.error(error);
    }
  }
}