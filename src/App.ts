import { Client, Collection, Intents } from 'discord.js';
import dotenv from 'dotenv';
import { LoadCommands, OnInteraction, OnMessageCreate, OnReady, SetActivity } from './events';
import { ICommand } from './interfaces';

dotenv.config();

export default class App {
  private client = new Client({
    intents: [
      Intents.FLAGS.GUILDS,
      Intents.FLAGS.GUILD_MESSAGES,
      Intents.FLAGS.GUILD_MEMBERS,
      Intents.FLAGS.GUILD_VOICE_STATES,
      Intents.FLAGS.DIRECT_MESSAGES,
    ],
  });

  private TOKEN = process.env.BOT_TOKEN;

  public static commands = new Collection<String, ICommand>;

  constructor () {
    SetActivity.default(this.client); // Configurações de Atividade/Status do BOT
    OnInteraction(this.client);
    LoadCommands(this.client);
    OnMessageCreate(this.client);
  }

  public start () {
    OnReady(this.client, this.TOKEN); // Configurações de Inicialização & Auth do BOT
  }
}