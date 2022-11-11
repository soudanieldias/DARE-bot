import { ActionRowBuilder, ButtonBuilder, SlashCommandBuilder } from '@discordjs/builders';
import { ButtonInteraction, Client, CommandInteraction, Interaction, MessageInteraction, TextChannel } from 'discord.js';
import { SoundHandler } from '../../handlers';
import { sliceArray, generateButtonsData } from '../../helpers';

module.exports = {
  data: new SlashCommandBuilder()
    .setName('soundpad')
    .setDescription('Retorna uma lista de botões de áudio para usar no canal de Voz específico'),
  category: 'music',
  execute: async (client:Client, interaction:ButtonInteraction) => {
    try {
      if (interaction.isRepliable()) {
        const guild = client.guilds.cache.get(interaction.guildId!);
        const member = guild?.members.cache.get(interaction.member!.user.id);
        const messageChannel = interaction.channel;
        const voiceChannel = member?.voice.channel?.id;
        const padName = interaction.customId;
        const adapterCreator = interaction.guild?.voiceAdapterCreator;
        
        if(!voiceChannel) {
          return interaction.reply(`<@${interaction.member?.user.id}> Você precisa estar em um canal de voz para executar o Soundpad`);
        }
        
        const connectionParams = {
          channelId: `${voiceChannel}`,
          guildId: interaction.guildId!,
          adapterCreator: adapterCreator!,
        };

        if (voiceChannel && !padName) {
          // Generates an Array of ButtonBuilder instances
          const fileObjects = await generateButtonsData();
          // Logica para interaction.isButton
          // Lógica para interaction.isChatInputCommand
          // Slices buttons array in sub-arrays of max of 5 elements
          const slicedResult:Array<Array<ButtonBuilder>> = await sliceArray(fileObjects, 5);

          // Set the array who stores all instances of ActionRowBuilder with 5 buttons each
          const allRows:Array<ActionRowBuilder<any>> = [];

          // Iteract over all sub-array in slicedResult, and push each ActionRowBuilder instance
          // with 5 buttons into allRows array
          slicedResult.forEach((subArray:Array<ButtonBuilder>) => {
            const actionRowBuilder = new ActionRowBuilder()
              .addComponents(subArray);
            allRows.push(actionRowBuilder);
          });

          return allRows.forEach((rowData, index) => (
            (messageChannel as TextChannel)
              .send({ content: `Lista de Áudios: ${index + 1}`, components: [rowData]})
          ));
        }

        return SoundHandler.playSound(`./src/audios/${padName}.mp3`, connectionParams, false);
      }
    } catch (error) {
      console.error(`[Erro]: ${error}`);
    }
  }
}