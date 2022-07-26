import { Client, Message } from "discord.js";

module.exports = {
	name: 'sendpm',
	description: 'Send a private message to specified Discord User [STAFF]',
	category: 'staff',
	execute: async (_client:Client, message:Message, args:Array<string>) => {
    const userPerms = message.member!.guild.me?.permissions.toArray();
    const hasAdminRole = userPerms?.some((role) => (role == "ADMINISTRATOR"));

    if(!hasAdminRole) return message.reply('Erro: Não Autorizado!');

    try {
      const mentionedUser = message.mentions.users.first();
      const messageToSend = args.join(" ").slice(22);

      if(!mentionedUser) return message.channel.send("No mentioned user.");

      if(!messageToSend) return message.channel.send("Not having a name is not a good nickname.");

      const messageReply = await message.reply('Enviando Mensagem!');

      await mentionedUser.send(`${messageToSend}`);

      messageReply.edit('Mensagem enviada com Sucesso!');

    } catch (error) {
      console.error(error);
    }
  }
};