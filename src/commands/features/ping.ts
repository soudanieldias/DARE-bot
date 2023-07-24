import { Client, CommandInteraction, Message, SlashCommandBuilder } from "discord.js";

module.exports = {
	data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Ping? Pong!'),
	category: 'features',
	execute: async (client:Client, interaction:CommandInteraction) => {
		if(interaction.isRepliable()) {
			return interaction.reply({ content: `Pong!\n${client.ws.ping}ms!` });
		}
	}
};