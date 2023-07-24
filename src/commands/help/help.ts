import { Client, Message, MessageEmbed } from "discord.js";
import App from '../../App';

module.exports = {
	name: 'help',
	description: 'Shows the help Command',
	category: 'help',
	execute: async (client:Client, message:Message) => {
		if (!client.user) return;
		const commands = App.commands;

		const embed = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle('Available Commands:');

		commands.forEach((cmd) => {
			embed.addField(`**${cmd.name}**`, `***${cmd.description}***`), `Aliases: ${cmd.aliases}`;
		});
    message.channel.send({embeds: [embed]});
  }
};
