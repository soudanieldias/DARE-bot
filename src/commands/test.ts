import { Client, Message } from "discord.js";

module.exports.run = async (client:Client, message:Message) => {
  message.channel.send({ content: 'Este é um Comando de EXEMPLO com texto simples' });
};
