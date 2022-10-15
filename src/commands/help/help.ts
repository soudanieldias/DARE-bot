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
		const listCommands = commands.forEach((cmd) => (
			{ name: `**${cmd.name}**`, value: `***${cmd.description}***, Aliases: ${cmd.aliases}` }
		));

		const embed = new EmbedBuilder()
      .setColor(0x0099FF)
      .setTitle('Available Commands:')
			.addFields(
				...listCommands,
			)
    message.channel.send({embeds: [embed]});
  }
};