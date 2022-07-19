import { Client, Message } from "discord.js";
import ytdl from 'ytdl-core-discord';''
import App from '../../App';
import SoundHandler from "../../handler/SoundHandler";

module.exports = {
	name: 'music',
	description: 'Music commands',
	category: 'music',
	execute: async (_client:Client, message:Message, args:Array<string>) => {
    try {
      const voiceChannel = message.member?.voice.channelId;
      const guildId = message.guildId;
      const sourceURL = ytdl.validateURL(args[1]);
      
      if (!voiceChannel) return message.reply({ content: 'Connect to a voice Channel first.' });
      
      const connectionParams = {
        channelId: `${voiceChannel}`,
        guildId: guildId!,
        adapterCreator: message.guild?.voiceAdapterCreator,
      };
      
      switch (args[0]) {
        case 'play':
          // const song_info = await ytdl.getInfo(args[1]);
          if(!sourceURL) return message.reply('ERROR: Please provide a valid URL');
          const stream = await ytdl(args[1], { filter: 'audioonly' });
          SoundHandler.playSound(stream, connectionParams, false);
          // message.delete();
          break;
        case 'pause':
          console.log('Pausando algo...');
          message.reply('Pausando algo...');
          break;
        case 'stop':
          console.log('Parando algo...');
          message.reply('Parando algo...');
          SoundHandler.playSound('http://youtube.com', connectionParams, true);
          break;
        case 'skip':
          console.log('Avançando algo...');
          message.reply('Avançando algo...');
          break;
        case 'loop':
          App.loopMusic = !App.loopMusic;
          message.reply(`Loop: ${App.loopMusic}`);
          break;
        default:
          message.reply('Sem argumentos passados. Ignorando comando...');
          break;
      }
    } catch (error) {
      message.reply(`${error}`);
    }
  }
};
