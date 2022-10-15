import { Client, Message } from "discord.js";
import { app } from "../..";

module.exports = {
  name: 'music',
  description: 'Player de Música',
  category: 'music',
  execute: async (client:Client, message:Message, args:Array<string>) => {
    const voiceChannel = message.member?.voice.channelId;
    const guildId = message.guildId;
    const guildQueue = app.player.getQueue(`${guildId}`);
    const queue = app.player.createQueue(`${guildId}`);
    
    if (!voiceChannel) return message.reply('Conecte a um canal de voz para usar o comando.');

    switch (args[0]) {
      case 'play':
        await queue.join(voiceChannel);
        if (!args[1]) return;
        const song = await queue.play(args[1]).catch((err) => {
          console.log(err);
          if (!guildQueue) queue.stop();
        });
        break;
      case 'skip':
        if (!queue || !guildQueue) return;
        queue.skip();
        break;
      case 'stop':
        queue.stop();
        break;
      case 'volume':
        if (!args[1] || !guildQueue) return;
        if(0 > Number(args[1]) || Number(args[1]) > 100) return;
        queue.setVolume(Number(args[1]));
        break;
      case 'np':
        if(!guildQueue) return;
        const progressBar = guildQueue!.createProgressBar().prettier;
        return message.reply(`**Tocando agora:**\n***${guildQueue.nowPlaying}\n${progressBar}***`);
      case 'queue':
        const queueList = queue.songs;
        message
          .reply(`**Playlist Atual:**\n${queueList
            .map((music, index) =>
            (`***${index+1}> ${music.author} - ${music.name} | ${music.duration}***\n`)).join('')}`);
        break;
      default:
        message
          .reply(`Comando não identificado! Tente:
          ${process.env.BOT_PREFIX}play <NOME/LINK>`);
        break;
    }
  }
}