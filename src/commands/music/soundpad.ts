import { ActionRowBuilder, ButtonBuilder } from '@discordjs/builders';
import { Client, Message, TextChannel} from 'discord.js';
import { SoundHandler } from '../../handlers';
import { sliceArray, generateButtonsData } from '../../helpers';

module.exports = {
  name: 'soundpad',
  description: 'Retorna uma lista de Botões de áudio para usar no canal de voz',
  category: 'Music',
  execute: async (client:Client, message:Message, args:Array<string>) => {
    try {
      const voiceChannel = message.member?.voice.channelId;
      const messageChannel = client.channels.cache.get(message.channelId);
      const guildId = message.guildId;
      const adapterCreator = message.guild?.voiceAdapterCreator;

      // Generates an Array of ButtonBuilder instances
      const fileObjects = await generateButtonsData();

      if (!voiceChannel) {
        message.channel
          .send(`<@${message.member?.id}> Você precisa estar em um canal de voz para executar o Soundpad`);
        return;
      }

      if (!args[0] && voiceChannel) {
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
        })

        return allRows.forEach((rowData, index) => (
          (messageChannel as TextChannel)
            .send({ content: `Lista de Áudios: ${index + 1}`, components: [rowData]})
        ));
      }

      if (voiceChannel) {
        const connectionParams = {
          channelId: `${voiceChannel}`,
          guildId: guildId!,
          adapterCreator: adapterCreator!,
        };

        SoundHandler.playSound(`./src/audios/${args[0]}.mp3`, connectionParams, false);
      }
    } catch (error) {
      console.error(`[Erro]: ${error}`);
    }
  }
}