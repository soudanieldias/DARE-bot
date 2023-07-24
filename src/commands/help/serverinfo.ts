import { Client, Message, MessageEmbed } from "discord.js";

module.exports = {
	name: 'serverinfo',
	description: 'Mostra um Embed com informações sobre a Guild',
	category: 'help',
	execute: async (client:Client, message:Message, _args:Array<string>) => {
    const guildMembers = await message.guild?.members.fetch();
    const membersCount = guildMembers!.filter((m) => !m.user.bot ).size;
    try {
      if (message.guild && client.user) {
        const embed = new MessageEmbed()
          .setColor("RANDOM")
          .setTitle('Informações do Servidor:')
          .addField('Nome do Servidor: ', `${message.guild.name}` )
          .addField('Dono do Servidor: ', `<@!${message.guild.ownerId}>` )
          .addField('Membros no Servidor', `${membersCount}` )
          .addField('Bots no Servidor', `${(guildMembers!.size - membersCount)}`)
          .addField('Location', `${message!.guild?.preferredLocale}`, true)
          .addField('Created', `${message!.guild.createdAt.toLocaleString()}`, true)
          .setTimestamp()
          .setFooter({ text: `${client!.user.username}`, iconURL: `${client!.user.avatarURL()}`});
  
        message.channel.send({embeds: [embed]});
      }
    } catch (error) {
      console.error(error);
    }
  }
};
