import { Client, CommandInteraction, PermissionFlagsBits, SlashCommandBuilder } from "discord.js";

module.exports = {
  data: new SlashCommandBuilder()
    .setName('teste')
    .setDescription('Comando de Teste [DEV]')
    .addStringOption(option => (
      option.setName('args')
      .setDescription('Argumentos a serem passados para o Teste')
      .setRequired(false)
    )),
	category: 'dev',
	execute: async (_client:Client, interaction:CommandInteraction) => {
    try {
      if(interaction.isRepliable()) {
        const hasAdminRole = interaction.memberPermissions?.has([PermissionFlagsBits.Administrator])
        const messageArgs = interaction.options.get('args')?.value;

        if (!hasAdminRole) {
          return interaction.reply('Erro: Não Autorizado!!!');
        }

        if(!messageArgs) {
          return interaction.reply('Ok: Comando de Testes funcionando Corretamente! [SEM ARGUMENTOS PASSADOS]');
        }

        return interaction.reply(`Ok: Comando de Testes funcionando Corretamente! [ARGUMENTOS PASSADOS: '${messageArgs}' ]`);
      }
    } catch (error) {
      console.error(`Erro: ${error}`);
    }
  }
};
