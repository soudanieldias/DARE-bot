import { Client, Message, TextChannel } from "discord.js";

module.exports = {
	name: 'teste',
	description: 'Comando de Teste',
	category: 'dev',
	execute: async (_client:Client, message:Message, args:Array<string>) => {
    try {
      const userPerms = message.member!.guild.me?.permissions.toArray();
      const hasAdminRole = userPerms?.some((role) => (role === "ADMINISTRATOR"));

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
