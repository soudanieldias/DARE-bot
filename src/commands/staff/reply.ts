import { Client, Message, TextChannel } from "discord.js";

module.exports = {
	name: 'reply',
	description: 'Reply a message into specified channel [STAFF]',
	category: 'staff',
	execute: async (client:Client, message:Message, args:Array<string>) => {
    try {
      const userPerms = message.member!.guild.me?.permissions.toArray();
      const hasAdminRole = userPerms?.some((role) => (role == "ADMINISTRATOR"));
      const [CHANNEL_ID, MESSAGE_ID] = [args[0], args[1]];
      const MESSAGE_TO_SEND = args.slice(2).join(' ');
  
      if(!CHANNEL_ID || !MESSAGE_ID) return message.reply('ID da MENSAGEM ou do CANAL incorretos');

      const channel = client.channels.cache.find((channel) => channel.id === CHANNEL_ID);
      const userMessage = await (channel as TextChannel).messages.fetch(MESSAGE_ID);

      if (!channel || !userMessage) message.reply('ERRO: Canal ou Mensagem não Encontrada!');
  
      if (!hasAdminRole) {
        message.reply('ERRO: Não Autorizado!!!');
        return;
      }
  
      if (channel && userMessage) {
        const messageStatus = await message.reply('Enviando Mensagem');
        await (userMessage).reply(MESSAGE_TO_SEND);
        messageStatus.edit('Mensagem enviada com Sucesso!');
        return;
      }

    } catch (error) {
      console.error("error");
    }
  }
};
