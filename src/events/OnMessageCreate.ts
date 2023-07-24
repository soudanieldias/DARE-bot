import { Client, Message } from "discord.js";
import App from "../App";

export default async (client: Client) => {
  const BOT_PREFIX = process.env.BOT_PREFIX || '//';
  client.on('messageCreate', async (message: Message) => {
    if ( 
      message.author.bot
      || !message.guild
      || message.channel.type === 'DM'
      || !message.content.startsWith(BOT_PREFIX)
      || message.content.startsWith(`<@!${client.user!.id}`)
      || message.content.startsWith(`<@${client.user!.id}`)
    ) return;

    const args = message.content.slice(BOT_PREFIX.length).trim().split(/ +/g);

    if (!args) await message.reply('Erro: Digite um Comando!');

    
    try {
      const command = args.shift()!.toLowerCase();
      const commandExists = App.commands.get(command);

      if (!commandExists) {
        await message.reply('Erro: Comando não Existe!');
        return
      }

      commandExists.execute(client, message, args);

    } catch (error) {
    console.error(error);
  }
  });
}