import { Client, Guild, GuildMember, Message, MessageEmbed } from "discord.js";

module.exports.run = async (client:Client, message:Message) => {
  try {

    const guild = client.guilds.resolve(message.guildId!);

    if(guild) {
      const guildMembers = ( await guild.members.fetch())
        .sort((a:GuildMember, b:GuildMember) => {
          if (a.displayName! > b.displayName!) return 1;
          if (a.displayName! < b.displayName!) return -1;
          return 0;
        })
        .filter((member) => !member.user.bot); // .join('\n');

      const membersData = guildMembers
        .filter((member) => !member.user.bot)
        .map((member) => ({ name: member.displayName + ':', value: `<@!${member.id}>` }));

      const usersEmbed = {
        title: 'Membros no Servidor:',
        fields: [ ...membersData ],
      };

      message.channel.send({ embeds: [usersEmbed/*, botsEmbed*/] });
    }
  } catch (error) {
    console.error(error);
    message.channel.send({ content: 'Erro: Ocorreu um erro ao executar o Comando.'});
  }

};
