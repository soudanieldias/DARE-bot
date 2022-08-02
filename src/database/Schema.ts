import { Message } from 'discord.js';
import { Guild, Log, Member, User } from './schemas';

export default class BotSchema {
  // Create/find users Database
  public static async fetchUser(id:string) {
    const userDB = await User.findOne({ id });
  
    if(!userDB) {
      const newUserDB = new User({ id, registeredAt: Date.now() });
  
      await newUserDB.save().catch(err => console.error(err));
  
      return newUserDB;
    }
  
    return userDB;
  };

  // Create/find Guilds Database
  public static async fetchGuild(id:string) {
    const guildDB = await Guild.findOne({ id });
  
    if(!guildDB) {
      const newGuildDB = new Guild({ id, registeredAt: Date.now() });
      
      await newGuildDB.save().catch(err => console.error(err));
      
      return newGuildDB;
    }
  
    return guildDB;
  };

  // Create/find Members Database
  public static async fetchMember(userID:string, guildID:string) {
    const memberDB = await Member.findOne({ id: userID, guildID: guildID });
  
    if(!memberDB) {
      const newMemberDB = new Member({ id: userID, guildID, registeredAt: Date.now() });
  
      await newMemberDB.save().catch(err => console.error(err));
  
      return newMemberDB;
    };
  
    return memberDB;
  };

  // Create/find Log in Database
  public static async createLog (msg:Message, data:any) {
    const logDB = new Log({
        commandName: data.cmd.name,
        author: {
          username: msg.author.username,
          discriminator: msg.author.discriminator,
          id: msg.author.id
        },
        guild: {
          name: msg.guild ? msg.guild.name : "dm",
          id: msg.guild ? msg.guild.id : "dm",
          channel: msg.channel ? msg.channel.id : "unknown"
        },
        date: Date.now()
    });

    return logDB.save().catch(err => console.error(err));
  };
}
