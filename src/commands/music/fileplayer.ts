import { Client, Message } from "discord.js";
import { createAudioPlayer, createAudioResource, joinVoiceChannel, AudioPlayerStatus } from "@discordjs/voice";
// import { createReadStream } from 'node:fs';
import { join } from 'node:path';

module.exports = {
	name: 'fileplayer',
	description: 'A Test Message with a Example Text',
	category: 'debug',
	execute: async (client:Client, message:Message, args:Array<string>) => {
    const voiceChannel = message.member?.voice.channelId;
    const guildId = message.guildId;
    try {
      const adapterCreator = message.guild?.voiceAdapterCreator;
      const player = createAudioPlayer();

      const sourceURL = args[0];
  
      if(!sourceURL) return message.reply('Erro: Forneça um Link para Arquivo MP3!');
      
      if (!voiceChannel) return message.reply({ content: 'Connect to a voice Channel first.' });

      const connection = joinVoiceChannel({
        channelId: `${voiceChannel}`,
        guildId: guildId!,
        adapterCreator: adapterCreator!,
      });

      connection.subscribe(player);

      const resource = createAudioResource(`${sourceURL}`);
      
      player.play(resource);

    } catch (error) {
      console.error(error);
    }
  }
};
