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

  const fileObjects = await generateButtonsData()
  // console.log(fileObjects);

  // const slicedResult = await sliceArray(fileObjects, 5);
  // console.log(slicedResult);

  if (!userChannel) {
    message.reply('You must be in a voice Channel first to perform this command.')
  }

  if (!args[0]) {
    const slicedResult = await sliceArray(fileObjects, 5);
  
    const row = new MessageActionRow().addComponents(...slicedResult[0]);
    const row2 = new MessageActionRow().addComponents(...slicedResult[1]);
    const row3 = new MessageActionRow().addComponents(...slicedResult[2]);
    const row4 = new MessageActionRow().addComponents(...slicedResult[3]);

    const allRows = [row, row2, row3, row4];

    return allRows.forEach((rowData:MessageActionRow) => {
      (messageChannel as TextChannel).send({ content: 'Lista de Áudios:', components: [rowData] });
    });
  }

  const player = createAudioPlayer();

  // player.on(AudioPlayerStatus.Playing, () => {
  //   console.log('The audio file is being Played');
  //   console.log(args[0]);
  // });

  // player.on('error', (error) => {
  //   console.error(`Error: ${error.message} with resource`);
  // });

  const resource = createAudioResource(`./src/audios/${args[0]}`);

  player.play(resource);

  const connection = joinVoiceChannel({
    channelId: `${userChannel}`,
    guildId: guildId!,
    adapterCreator: adapterCreator!,
    });

  const subscription = connection.subscribe(player);

};
