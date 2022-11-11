import { Client, Interaction, PermissionFlagsBits, SlashCommandBuilder } from "discord.js";
import fs from 'fs/promises';

module.exports = {
  data: new SlashCommandBuilder()
    .setName('generatereport')
    .setDescription('Generate a complete data report of players & Boin into Discord Server [STAFF]'),
  name: 'generatereport',
  description: 'Generate a complete Data report of players & Bots in server [STAFF]',
  category: 'staff',
  execute: async (client:Client, interaction:Interaction) => {
    const hasAdminRole = interaction.memberPermissions?.has([PermissionFlagsBits.Administrator]);

    if (interaction.isRepliable())
    {
      if(!hasAdminRole || !interaction.guildId) {
        return interaction.reply('Erro: Não Autorizado!');
      }

      const guild = client.guilds.resolve(interaction.guildId!);
      const guildMembers = await guild!.members.fetch();
      const [ users, bots ] = [
        guildMembers.filter((member) => !member.user.bot),
        guildMembers.filter((member) => member.user.bot),
      ];

      const timeStamp = new Date().getTime();

      const botinteraction = await interaction.reply({ content: 'Iniciando a criação do Relatório de Membros do servidor' });

      // Cria Diretório
      await fs.mkdir(`./src/reports/${timeStamp}`);

      // Cria LOG de USUÁRIOS
      await fs.writeFile(`./src/reports/${timeStamp}/users.txt`, `REPORT DE USUÁRIOS: ${timeStamp}\n`);
      users.forEach(async (user) => {
        await fs.appendFile(`./src/reports/${timeStamp}/users.txt`, `${JSON.stringify(user)}\n`);
      });
  
      // Cria LOG de BOTS
      await fs.writeFile(`./src/reports/${timeStamp}/bots.txt`, `REPORT DE BOTS: ${timeStamp}\n`);
      bots.forEach(async (bot) => {
        await fs.appendFile(`./src/reports/${timeStamp}/bots.txt`, `${JSON.stringify(bot)}\n`);
      })
  
      await interaction.editReply({ content: `Gerando Relatório ${timeStamp}` });
  
      return interaction.editReply({ content: `Tudo ok! ID do Relatório: ${timeStamp}`});
    }
  }
};