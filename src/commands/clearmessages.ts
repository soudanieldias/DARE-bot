import { Client, Message, TextChannel } from "discord.js";

module.exports.run = async (client:Client, message:Message, args:Array<string>) => {
  try {
    const ADMS_ROLE_PREFIX = 'Diretoria de';
    const userRoles = message.member?.roles.cache.map((role) => role.name );
    const authorizeSay = userRoles?.some((role) => role.startsWith(ADMS_ROLE_PREFIX));
    const CHANNEL_ID = args[0];
    // const channel = client.channels.cache.find((channel) => channel.id === CHANNEL_ID);
    const channel = message.channel;

    if (!channel) message.reply('ERRO: Canal não encontrado!');

    if (!authorizeSay) {
      message.reply('ERRO: Não Autorizado!!!');
      return;
    }
    
    if(Number(args[0]) <= 100) {
      await message.channel.send({ content: `Limpando ${args[0]} mensagens do canal`});
      await (message.channel as TextChannel).bulkDelete(Number(args[0]), true);
    }

  } catch (error) {
    console.error(error);
    message.reply({ content: `${error}` })
  }
};
