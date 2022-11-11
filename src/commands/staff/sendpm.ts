import { Client, CommandInteraction, Interaction, PermissionFlagsBits, SlashCommandBuilder } from "discord.js";

module.exports = {
  data: new SlashCommandBuilder()
    .setName('sendpm')
    .setDescription('Envia uma mensagem Privada para um usuário específico [STAFF]')
    .addUserOption(user => (
      user.setName('user')
      .setDescription('Menção do Usuário a ser Contactado via PM')
      .setRequired(true)
    ))
    .addStringOption(message => (
      message.setName('message')
      .setDescription('Mensagem a ser Encaminhada para o usuário')
      .setRequired(true)
    )),
	category: 'staff',
	execute: async (_client:Client, interaction:CommandInteraction, args:Array<string>) => {
    try {
      if(interaction.isRepliable()) {
        const hasAdminRole = interaction.memberPermissions!.has([PermissionFlagsBits.Administrator]);
        if(!hasAdminRole) return interaction.reply('Erro: Não Autorizado!');

        const USER_ID = interaction.options.get('user')?.value;
        const MESSAGE_CONTENT = interaction.options.get('message')?.value;

        const userToSendMessage = interaction.guild?.members.fetch(`${USER_ID}`);
        await interaction.reply('Enviando Mensagem!');

        await (await userToSendMessage)?.send(`${MESSAGE_CONTENT}`);
  
        return interaction.editReply('Mensagem enviada com Sucesso!');
      }
    } catch (error) {
      console.error(error);
    }
  }
};