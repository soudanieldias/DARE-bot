import { Client, CommandInteraction, Message, MessageInteraction, PermissionFlagsBits, SlashCommandBuilder, TextChannel } from "discord.js";

module.exports = {
  data: new SlashCommandBuilder()
    .setName('reply')
    .setDescription('Responde a mensagem de um usuário específico em um canal passado.')
    .addChannelOption(channel => (
      channel.setName('channel')
      .setDescription('Canal onde está a mensagem')
      .setRequired(true)
    ))
    .addStringOption(messageId => (
      messageId.setName('messageid')
      .setDescription('ID da mensagem do usuário sendo Respondido')
      .setRequired(true)
    ))
    .addStringOption(message => (
      message
      .setName('message')
      .setDescription('Mensagem a ser Enviada')
      .setRequired(true)
    )),
	category: 'staff',
	execute: async (client:Client, interaction:CommandInteraction, args:Array<string>) => {
    try {
      const hasAdminRole = interaction.memberPermissions?.has([PermissionFlagsBits.Administrator]);

      if (!hasAdminRole) {
        interaction.reply('ERRO: Não Autorizado!!!');
        return;
      }

      const CHANNEL_ID = interaction.options.get('channel')?.value;
      const MESSAGE_ID = interaction.options.get('messageid')?.value;
      const MESSAGE_CONTENT = interaction.options.get('message')?.value;
        
      const channel = client.channels.cache.find((channel) => channel.id === CHANNEL_ID);
      const userMessage = await (channel as TextChannel).messages.fetch(`${MESSAGE_ID}`);

      await interaction.reply('Enviando Mensagem');
      await (userMessage).reply(`${MESSAGE_CONTENT}`);
      return interaction.editReply('Mensagem enviada com Sucesso!');

    } catch (error) {
      console.error("error");
    }
  }
};