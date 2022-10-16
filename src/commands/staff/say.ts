import { Client, Message, PermissionFlagsBits, Role, TextChannel } from "discord.js";

module.exports = {
	name: 'say',
	description: 'Broadcast a message to specified channel [STAFF]',
	category: 'staff',
	execute: async (client:Client, message:Message, args:Array<string>) => {
    try {
      const hasAdminRole = message.member!.permissions.has([PermissionFlagsBits.Administrator]);
      const CHANNEL_ID = args[0];
      const MESSAGE_TO_SEND = args.slice(1).join(' ');
  
      const channel = client.channels.cache.find((channel) => channel.id === CHANNEL_ID);
  
      if (!channel) message.reply('ERRO: Canal não encontrado!');
  
      if (!hasAdminRole) {
        message.reply('ERRO: Não Autorizado!!!');
        return;
      }
  
      if (channel) {
        (channel as TextChannel).send(`${MESSAGE_TO_SEND}`);
        message.reply('Mensagem enviada com Sucesso!');
        return;
      }

    } catch (error) {
      console.error("error");
    }
  }
};