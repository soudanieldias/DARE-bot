import { EmbedBuilder, SlashCommandBuilder } from "@discordjs/builders";
import { Client, Interaction } from "discord.js";
import App from '../../App';

module.exports = {
	data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Lista os comandos disponíveis no BOT'),
	category: 'help',
	execute: async (client:Client, interaction:Interaction) => {
		if (!client.user) return;
		const commands = App.commands;
		
		const embed = new EmbedBuilder()
		.setColor(0x0099FF)
		.setTitle('Comandos Disponíveis:');

		commands.forEach((cmd) => {
			embed.addFields({
				name: `Name: **${cmd.data.name}**`,
				value: `Description: ***${cmd.data.description}***\n`, // **Aliases: ${cmd.aliases || 'None'}**`
			});
		});

		return interaction.isRepliable() ? interaction.reply({embeds: [embed]}) : '';
  }
};