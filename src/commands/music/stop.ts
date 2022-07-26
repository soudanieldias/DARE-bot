import { Client } from "discord.js";
import { Message } from "reconlx";
import { SoundHandler } from "../../handlers";

module.exports = {
  name: 'stop',
  description: 'Para a execução do Player de Música',
  category: 'music',
  execute: async (client:Client, message:Message, _args:Array<string>) => {
    const connectionParams = {
      channelId: '',
      guildId: message.guildId!,
      adapterCreator: message.guild?.voiceAdapterCreator,
    };

    await SoundHandler.playSound('', connectionParams, true);
  }
}