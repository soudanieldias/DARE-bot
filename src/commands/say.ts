import { Client, Message, TextChannel } from "discord.js";

module.exports.run = async (client:Client, message:Message, args:Array<string> ) => {
  try {
    const ADMS_ROLE_PREFIX = 'Diretoria de';
    const userRoles = message.member?.roles.cache.map((role) => role.name );
    const authorizeSay = userRoles?.some((role) => role.startsWith(ADMS_ROLE_PREFIX));
    const CHANNEL_ID = args[0];
    const MESSAGE_TO_SEND = args.slice(1).join(' ');

    const channel = client.channels.cache.find((channel) => channel.id === CHANNEL_ID);

    if (!channel) message.reply('ERRO: Canal não encontrado!');

    if (!authorizeSay) message.reply('ERRO: Não Autorizado!!!');

    if (channel) {
      (channel as TextChannel).send(`${MESSAGE_TO_SEND}`);
      message.reply('Mensagem enviada com Sucesso!');
      return;
    }
  
  } catch (error) {
    console.error("error");
  }
}