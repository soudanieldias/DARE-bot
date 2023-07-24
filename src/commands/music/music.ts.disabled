import { Client, Message } from "discord.js";
import { app } from "../..";

module.exports = {
  name: 'music',
  description: 'Player de Música',
  category: 'music',
  execute: async (_client:Client, message:Message, args:Array<string>) => {
    const voiceChannel = message.member?.voice.channelId;
    const guildId = message.guildId;
    const guildQueue = app.player.getQueue(`${guildId}`);
    const queue = app.player.createQueue(`${guildId}`, { metadata: { voiceChannel: voiceChannel }});
    const discordArgs = args.slice(1).join('%2f');

    if (!voiceChannel) return message.reply('Conecte a um canal de voz para usar o comando.');
    
    switch (args[0]) {
      case 'play':
        if (!discordArgs) return;
        await queue.connect(voiceChannel);
        const song = await app.player
          .search(args[1], { requestedBy: message.member })
          // .then(x => { console.log(discordArgs, '******\n******\n******', x.tracks[0]); return x })
          .then(x => x.tracks[0])
          .catch((err) => {
            // console.log(err);
            if (!guildQueue) queue.stop();
          });

        if (!song) return await message.reply(`❌ | Track **${args[1]}** not found!`);
        queue.play(song);
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
        // const progressBar = guildQueue!.createProgressBar().prettier;
        // return message.reply(`**Tocando agora:**\n***${guildQueue.nowPlaying}\n${progressBar}***`);
        break;
      case 'queue':
        const queueList = queue.tracks;
        message
          .reply(`**Playlist Atual:**\n${queueList
            .map((music, index) =>
            (`***${index+1}> ${music.author} - ${music.title} | ${music.duration}***\n`)).join('')}`);
        break;
      default:
        message
          .reply(`Comando não identificado! Tente:
          ${process.env.BOT_PREFIX}music <play/stop/volume/queue/np> <args>`);
        break;
    }
  }
}