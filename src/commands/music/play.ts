import { Client, Message } from "discord.js";
import ytdl from 'ytdl-core-discord';
import { SoundHandler } from '../../handlers';

module.exports = {
  name: 'play',
  description: 'Toca uma música Ex: (//play youtube https://youtu.be/...)',
  category: 'music',
  execute: async (_client:Client, message:Message, args:Array<string>) => {
    const voiceChannel = message.member?.voice.channelId;
    const guildId = message.guildId;

    if (!voiceChannel) return message.reply('Conecte a um canal de voz para usar o comando.');

    let stream:any;
  
    const connectionParams = {
      channelId: `${voiceChannel}`,
      guildId: guildId!,
      adapterCreator: message.guild?.voiceAdapterCreator,
    };

    switch (args[0]) {
      case 'youtube':
        stream = await ytdl(args[1], { filter: 'audioonly' });
        SoundHandler.playSound(stream, connectionParams, false);
        break;
      case 'file':
        stream = args[1];
        SoundHandler.playSound(stream, connectionParams, false);
        break;
      default:
        message
          .reply(`Comando não identificado! Tente:
          ${process.env.BOT_PREFIX}play (youtube / spotify / file`);
        break;
    }
  }
}