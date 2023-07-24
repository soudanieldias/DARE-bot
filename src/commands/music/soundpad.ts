import { ActionRowBuilder, ButtonBuilder, SlashCommandBuilder } from '@discordjs/builders';
import { Client, Interaction, TextChannel } from 'discord.js';
import { SoundHandler } from '../../handlers';
import { sliceArray, generateButtonsData } from '../../helpers';

module.exports = {
  data: new SlashCommandBuilder()
    .setName('soundpad')
    .setDescription('Retorna uma lista de botões de áudio para usar no canal de Voz específico')
    .addStringOption(padName => (
      padName
        .setName('padname')
        .setDescription('Nome do Pad a ser Executado')
    )),
  category: 'music',
  execute: async (client:Client, interaction:Interaction) => {
    try {
      if (interaction.isRepliable()) {
        const guild = client.guilds.cache.get(interaction.guildId!);
        const member = guild?.members.cache.get(interaction.member!.user.id);
        const messageChannel = interaction.channel;
        const voiceChannel = member?.voice.channel?.id;

        // const padName = interaction.customId;
        let padName;

        const adapterCreator = interaction.guild?.voiceAdapterCreator;
        
        if(!voiceChannel) {
          return interaction.reply(`<@${interaction.member?.user.id}> Você precisa estar em um canal de voz para executar o Soundpad`);
        }
        
        const connectionParams = {
          channelId: `${voiceChannel}`,
          guildId: interaction.guildId!,
          adapterCreator: adapterCreator!,
        };

        if (interaction.isButton()) { padName = interaction.customId; }
        if (interaction.isCommand()) { padName = interaction.options.get('padname')?.value; }
        
        if (voiceChannel && !padName) {
          const fileObjects = await generateButtonsData();

          const slicedResult:Array<Array<ButtonBuilder>> = await sliceArray(fileObjects, 5);

          const allRows:Array<ActionRowBuilder<any>> = [];

          slicedResult.forEach((subArray:Array<ButtonBuilder>) => {
            const actionRowBuilder = new ActionRowBuilder()
              .addComponents(subArray);
            allRows.push(actionRowBuilder);
          });

          return allRows.forEach((rowData, index) => (
            (messageChannel as TextChannel)
              .send({ content: `Lista de Áudios: ${index + 1}`, components: [rowData]})
          ));
        } else {
          SoundHandler.playSound(`./src/audios/${padName}.mp3`, connectionParams, false);
          await interaction.reply({ content: `Tocando ${padName}`, ephemeral: true });
        }
      }
    } catch (error) {
      console.error(`[Erro]: ${error}`);
    }
  }
}