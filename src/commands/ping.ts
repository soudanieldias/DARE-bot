import { Client, Message } from "discord.js";

module.exports = {
	run: async (client:Client, message:Message) => {
		message.reply({ content: `${client.ws.ping}ms!` });
	}
};