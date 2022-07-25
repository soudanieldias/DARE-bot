import { Client, Collection, Intents } from 'discord.js';
import dotenv from 'dotenv';
import { LoadCommands, OnMessageCreate, OnReady, SetActivity } from './events';
import { ICommand } from './interfaces';

dotenv.config();

export default class App {
  private client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] })

  private BOT_PREFIX = process.env.BOT_PREFIX || '//';

  private TOKEN = process.env.BOT_TOKEN;

  public static commands = new Collection<String, ICommand>;

  constructor () {
    LoadCommands(this.client);
  }

  public start () {
    OnReady(this.client, this.TOKEN); // Configurações de Inicialização & Auth do BOT
    OnMessageCreate(this.client);
    SetActivity.default(this.client); // Configurações de Atividade/Status do BOT
  }
}