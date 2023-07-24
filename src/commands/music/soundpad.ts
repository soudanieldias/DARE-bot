import { Client, Message, MessageActionRow, TextChannel } from 'discord.js';
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

      const fileObjects = await generateButtonsData();

      if (!voiceChannel) {
        message.channel
          .send(`<@${message.member?.id}> Você precisa estar em um canal de voz para executar o comando`);
        return;
      }

      if (!args[0] && voiceChannel) {
        const slicedResult = await sliceArray(fileObjects, 5);
        const allRows:Array<MessageActionRow> = [];

        slicedResult
          .forEach((result:Array<MessageActionRow>) => ( allRows
            .push(new MessageActionRow().addComponents(result))));

        return allRows.forEach((rowData:MessageActionRow, index) => {
          (messageChannel as TextChannel)
            .send({ content: `Lista de Áudios: ${index + 1}`, components: [rowData] });
        });
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
