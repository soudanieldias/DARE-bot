import { Client, Message, MessageActionRow, MessageButton, TextChannel } from "discord.js";
import { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus } from '@discordjs/voice';
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
    .map((audio) => ( new MessageButton().setCustomId(audio).setLabel(audio.slice(0, -4)).setStyle('PRIMARY')));
  return fileObjects;
}

module.exports.run = async (client:Client, message:Message, args:Array<string>) => {
  const userChannel = message.member?.voice.channelId;
  // const voiceChannel = client.channels.cache.get(userChannel!);
  const messageChannel = client.channels.cache.get(message.channelId);
  const guildId = message.guildId;
  const adapterCreator = message.guild?.voiceAdapterCreator;

  const fileObjects = await generateButtonsData();

  if (!userChannel) {
    message.channel
      .send({ content: 'You must be in a voice Channel first to perform this command.' });
    return;
  }

  if (!args[0] && userChannel) {
    const slicedResult = await sliceArray(fileObjects, 5);
    const allRows:Array<MessageActionRow> = [];

    slicedResult
      .forEach((result:Array<MessageActionRow>) => (allRows
        .push(new MessageActionRow().addComponents(result))));

    return allRows.forEach((rowData:MessageActionRow, index) => {
      (messageChannel as TextChannel).send({ content: `Lista de Áudios: ${index + 1}`, components: [rowData] });
    });
  }

  if (userChannel) {
    const player = createAudioPlayer();
    const resource = createAudioResource(`./src/audios/${args[0]}`);
    player.play(resource);
    const connection = joinVoiceChannel({
      channelId: `${userChannel}`,
      guildId: guildId!,
      adapterCreator: adapterCreator!,
      });
  
    const subscription = connection.subscribe(player);

    player.on(AudioPlayerStatus.Playing, () => {
      console.log(`Playing: ${args[0]}`);
      console.log(args[0]);
    });
  
    player.on('error', (error) => {
      console.error(`Error: ${error.message} with resource`);
    });
  }
};
