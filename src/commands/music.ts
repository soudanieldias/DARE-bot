import { Client, Message } from "discord.js";
import { createAudioPlayer, createAudioResource, joinVoiceChannel, AudioPlayerStatus } from "@discordjs/voice";
import ytdl from 'ytdl-core-discord';''
import App from '../App';

module.exports = {
	name: 'music',
	description: 'Music commands',
	category: 'music',
	execute: async (_client:Client, message:Message, args:Array<string>) => {
    try {
      const voiceChannel = message.member?.voice.channelId;
      const guildId = message.guildId;
  
      let stream = await ytdl('https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley', { filter: 'audioonly' });
  
      const adapterCreator = message.guild?.voiceAdapterCreator;
      const player = createAudioPlayer();
      
      const validUrl = ytdl.validateURL(args[1]);
  
      if(validUrl) {
        stream = await ytdl(args[1], { filter: 'audioonly' });
      }
      
      if (!voiceChannel) {
        message.reply({ content: 'Connect to a voice Channel first.' });
        return;
      }
      
      const connection = joinVoiceChannel({
        channelId: `${voiceChannel}`,
        guildId: guildId!,
        adapterCreator: adapterCreator!,
      });
      
      player.on(AudioPlayerStatus.Idle, async () => {
        if (App.loopMusic === true) {
          stream = await ytdl(args[1], {filter: 'audioonly'});
          player.play(createAudioResource(stream));
        }
      });
      
      switch (args[0]) {
        case 'play':
          const song_info = await ytdl.getInfo(args[1]);
            
          connection.subscribe(player);
  
          player.play(createAudioResource(stream));
  
          message.delete();
          break;
        case 'pause':
          console.log('Pausando algo...');
          message.reply('Pausando algo...');
          player.pause();
          break;
        case 'stop':
          console.log('Parando algo...');
          message.reply('Parando algo...');
          connection.destroy();
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
