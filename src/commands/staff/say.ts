import { Client, CommandInteraction, Message, PermissionFlagsBits, Role, SlashCommandBuilder, TextChannel } from "discord.js";

module.exports = {
  data: new SlashCommandBuilder()
    .setName('say')
    .setDescription('Broadcast a message to specified channel [STAFF]')
    .addChannelOption(channel => (
      channel.setName("channel")
      .setDescription("Canal onde deseja enviar a Mensagem")
      .setRequired(true)
    ))
    .addStringOption(message => (
      message.setName('message')
      .setDescription('Mensagem que será enviada no canal Selecionado')
      .setRequired(true)
    )),
  category: 'staff',
	execute: async (client:Client, interaction:CommandInteraction) => {
    try {
      const hasAdminRole = interaction.memberPermissions?.has([PermissionFlagsBits.Administrator]);
      const CHANNEL_ID = interaction.options.get('channel')?.value;
      const MESSAGE_CONTENT = interaction.options.get('message')?.value;

      if (!hasAdminRole) {
        return interaction.reply('Erro: Não Autorizado!!!');
      }

      const channel = await interaction.guild?.channels.fetch(`${CHANNEL_ID}`);

      await (channel as TextChannel).send(`${MESSAGE_CONTENT}`);
      
      return interaction.reply('Mensagem enviada com Sucesso!');

    } catch (error) {
      console.error("[SAY] Error: ", error);
    }
  }
};