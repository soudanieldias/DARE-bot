import { Client, Message, PermissionFlagsBits, TextChannel } from "discord.js";

module.exports = {
	name: 'clearmessages',
	description: 'Clear a \'n\' quantity of messages in specified channel [STAFF]',
	category: 'staff',
	execute: async (_client:Client, message:Message, args:Array<string>) => {
    try {
      const hasAdminRole = message.member!.permissions.has([PermissionFlagsBits.Administrator]);
      const MESSAGES_TO_DELETE = Number(args[0]);

      if (!hasAdminRole) return message.reply('ERRO: Não Autorizado!!!');

      if(!MESSAGES_TO_DELETE || MESSAGES_TO_DELETE > 100 || MESSAGES_TO_DELETE < 1 ) {
        return message.reply({ content: 'Quantidade de mensagens à apagar Inválida!' });
      }

      await (message.channel as TextChannel).bulkDelete(MESSAGES_TO_DELETE, true);
      await message.channel.send({ content: `Foram limpas ${MESSAGES_TO_DELETE} mensagens do canal`});

    } catch (error) {
      console.error(error);
      message.reply({ content: `${error}` });

    }
  }
};