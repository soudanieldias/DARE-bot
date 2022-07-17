import { Client, Message } from "discord.js";

module.exports.run = async (client:Client, message:Message) => {
  message.channel.send({ content: 'Comando de Ajuda!' });
};
