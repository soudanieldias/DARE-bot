import { EmbedBuilder } from "@discordjs/builders";
import { Client, Message } from "discord.js";
import App from '../../App';

module.exports = {
	name: 'help',
	description: 'Comando de ajuda com a Lista de comandos [Esta Lista]',
	category: 'help',
	execute: async (client:Client, message:Message) => {
		if (!client.user) return;
		const commands = App.commands;
		
		const embed = new EmbedBuilder()
		.setColor(0x0099FF)
		.setTitle('Available Commands:')
		
		commands.forEach((cmd) => {
			embed.addFields({
				name: `Name: **${cmd.name}**`,
				value: `Description: ***${cmd.description}***\n**Aliases: ${cmd.aliases || 'None'}**`
			});
		});

		// return message.channel.send({embeds: [embed]});
		return message.reply({embeds: [embed]});
  }
};