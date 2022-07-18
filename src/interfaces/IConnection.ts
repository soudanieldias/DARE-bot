import { Message } from "discord.js";

export default interface Connection {
  channelId: string;
  guildId: string;
  adapterCreator: any;
}