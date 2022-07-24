import { Client, Message } from "discord.js";

module.exports = {
	name: 'help',
	description: 'Help command',
	category: 'help',
	execute: async (_client:Client, message:Message) => {
    message.channel.send({ content: 'Comando de Ajuda!' });
  }
};
