import { Client } from "discord.js";
import glob from "glob";
import dotenv from 'dotenv';
import App from "../App";

dotenv.config();

export default class CommandHandler {
  public static async loadCommands(client:Client) {
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
  
        App.commands.set(command.name, command);
        // client.application!.commands.set(command.name, command);
      }
    } catch (error) {
      console.error(error);
    }
  }

  public static async commandWatcher(client:Client) {
    const BOT_PREFIX = process.env.BOT_PREFIX || '//';

    client.on('messageCreate', async (message) => {
      if ( 
        message.author.bot
        || !message.guild
        || message.channel.type === 'DM'
        || !message.content.startsWith(BOT_PREFIX)
        || message.content.startsWith(`<@!${client.user!.id}`)
        || message.content.startsWith(`<@${client.user!.id}`)
        ) return;
    
      const args = message.content.slice(BOT_PREFIX.length).trim().split(/ +/g);
    
      if (!args) {
        message.channel.send('Erro: Comando não Identificado!');
        return;
      }

      try {
        const command = args.shift()!.toLowerCase();

        const validCommand = App.commands.get(command);

        if (validCommand) {
          validCommand.execute(client, message, args);
        }

      } catch (error) {
        console.error(error);
        // message.channel.send('Erro: Comando Não Encontrado!');
        // console.error(`Erro ao Digitar o Comando: '${command}' \n[DEPURAÇÃO] Erro Retornado: '${err}'`); // [DEBUG]
      }
    });
  }
}
