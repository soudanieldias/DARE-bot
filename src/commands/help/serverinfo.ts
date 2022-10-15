import { EmbedBuilder } from "@discordjs/builders";
import { Client, Message } from "discord.js";

module.exports = {
	name: 'serverinfo',
	description: 'Mostra um Embed com informações sobre a Guild',
	category: 'help',
	execute: async (client:Client, message:Message, _args:Array<string>) => {
    const guildMembers = await message.guild?.members.fetch();
    const membersCount = guildMembers!.filter((m) => !m.user.bot ).size;
    try {
      if (message.guild && client.user) {
        const embed = new EmbedBuilder()
          .setColor(0x0099FF)
          .setTitle('Informações do Servidor:')
          .addFields(
            { name: 'Nome do Servidor: ', value: `${message.guild.name}` },
            { name: 'Dono do Servidor: ', value: `<@!${message.guild.ownerId}>` },
            { name: 'Membros no Servidor: ', value: `${membersCount}` },
            { name: 'Bots no Servidor: ', value: `${(guildMembers!.size - membersCount)}` },
            { name: 'Location: ', value: `${message!.guild?.preferredLocale}`, inline: true },
            { name: 'Created', value: `${message!.guild.createdAt.toLocaleString()}`, inline: true },
            { name: '', value: ''},
            { name: '', value: ''},
            { name: '', value: ''},
            { name: '', value: ''}
          )
          .setTimestamp()
          .setFooter({ text: `${client!.user.username}`, iconURL: `${client!.user.avatarURL()}`});
  
        message.channel.send({embeds: [embed]});
      }
    } catch (error) {
      console.error(error);
    }
  }
};