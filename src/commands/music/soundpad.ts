import { Client, Message, MessageActionRow, MessageButton, TextChannel } from "discord.js";
import SoundHandler from "../../handler/SoundHandler";
import fs from 'fs/promises';

function sliceArray(fileObjects:Array<MessageButton>, max:number) {
  return fileObjects.reduce((acc:any, item, index:number) => {
    const group = Math.floor(index / max);
    acc[group] = [...(acc[group] || []), item];
    return acc;
  }, []);
}

async function generateButtonsData() {
  const audioFiles = await fs.readdir('./src/audios/');
  const fileObjects = audioFiles
    .map((audio) => ( new MessageButton().setCustomId(audio.slice(0, -4)).setLabel(audio.slice(0, -4)).setStyle('PRIMARY')));
  return fileObjects;
}

module.exports = {
	name: 'soundpad',
	description: 'send a list of available Bot short songs',
	category: 'music',
	execute: async (client:Client, message:Message, args:Array<string>) => {
    try {
      const voiceChannel = message.member?.voice.channelId;
      const messageChannel = client.channels.cache.get(message.channelId);
      const guildId = message.guildId;
      const adapterCreator = message.guild?.voiceAdapterCreator;

      const fileObjects = await generateButtonsData();

      if (!voiceChannel) {
        message.channel
          .send({ content: `<@!${message.member?.id}> You must be in a voice Channel first to perform this command.` });
        return;
      }

      if (!args[0] && voiceChannel) {
        const slicedResult = await sliceArray(fileObjects, 5);
        const allRows:Array<MessageActionRow> = [];

        slicedResult
          .forEach((result:Array<MessageActionRow>) => (allRows
            .push(new MessageActionRow().addComponents(result))));

        return allRows.forEach((rowData:MessageActionRow, index) => {
          (messageChannel as TextChannel).send({ content: `Lista de Áudios: ${index + 1}`, components: [rowData] });
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
      console.error(error);
    }
  }
};
