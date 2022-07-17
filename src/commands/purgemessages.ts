import { Client, Interaction, Message, TextChannel } from "discord.js";

module.exports.run = async (client:Client, message:Message, args:Array<string>) => {
  try {
    const userPerms = message.member!.guild.me?.permissions.toArray();
    const hasAdminRole = userPerms?.some((role) => (role == "ADMINISTRATOR"));
    const USER_ID = Number(args[0]);
    const MESSAGES_TO_DELETE = Number(args[1]);

    if (!hasAdminRole) return message.reply('ERRO: Não Autorizado!!!');

  } catch (error) {
    console.error(error);
    message.reply({ content: `${error}` })
  }
};
