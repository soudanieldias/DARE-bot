import { Client, Message } from "discord.js";

module.exports = {
	name: 'ping',
	description: 'Ping? Pong!',
	category: 'Utility',
	run: async (client:Client, message:Message) => {
		message.reply({ content: `Pong!\n${client.ws.ping}ms!` });
	}
};