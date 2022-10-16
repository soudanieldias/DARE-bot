import { Client, Message, PermissionFlagsBits } from "discord.js";

module.exports = {
	name: 'teste',
	description: 'Comando de Teste',
	category: 'dev',
	execute: async (_client:Client, message:Message, args:Array<string>) => {
    try {
      const hasAdminRole = message.member!.permissions.has([PermissionFlagsBits.Administrator]);

      if (!hasAdminRole) {
        message.reply('Erro: Não Autorizado!!!');
        return;
      }

      message.reply(`${args}`);

    } catch (error) {
      console.error(`Erro: ${error}`);
    }
  }
};
