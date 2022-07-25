import { Client, Message } from "discord.js";
import SoundHandler from '../../handler/SoundHandler';

module.exports = {
	name: 'fileplayer',
	description: 'A command who plays a file in voice channel [Music]',
	category: 'music',
	execute: async (_client:Client, message:Message, args:Array<string>) => {
    try {
      const voiceChannel = message.member?.voice.channelId;
      const guildId = message.guildId;
      const sourceURL = args[0];

      if(!sourceURL) return message.reply('Erro: Forneça um Link para Arquivo MP3!');

      if (!voiceChannel) return message.reply({ content: 'Connect to a voice Channel first.' });

      const connectionParams = {
        channelId: `${voiceChannel}`,
        guildId: `${guildId}`,
        adapterCreator: message.guild?.voiceAdapterCreator,
      };

      SoundHandler.playSound(sourceURL, connectionParams, false);

    } catch (error) {
      console.error(error);
    }
  }
};
