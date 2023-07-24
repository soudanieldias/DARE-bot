import { Client, Message } from "discord.js";

module.exports = {
	name: 'test',
	description: 'A Test Message with a Example Text',
	category: 'developer',
	run: async (_client:Client, message:Message) => {
    message.channel.send({ content: 'Este é um Comando de EXEMPLO com texto simples' });
  }
};
