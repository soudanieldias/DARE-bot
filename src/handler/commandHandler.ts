import { Client } from "discord.js";
import glob from "glob";

export default class CommandHandler {
  public static async  loadCommands(client:Client) {
    const commandFiles = glob.sync("./src/commands/**/*.ts");
    try {
      for await (const file of commandFiles) {
        const command = require(`../../${file}`);
  
        if (!command.name) throw new TypeError(`Erro: Nome do comando não encontrado! Arquivo: ${file}`);
        if (!command.category) return console.warn(`[WARN]: Categoria do comando não encontrada! Arquivo: ${file}`);
        
        const data = {
          name: command.name,
          description: command?.description ?? "Empty description",
          options: command?.options ?? []
        };
        const cmd = client.application?.commands.cache.find((c) => (c.name === command.name));
  
        delete require.cache[require.resolve(`../../${file}`)];
  
        client.application?.commands.set(command.name, command);
      }
    } catch (error) {
      console.error(error);
    }
  }
}
