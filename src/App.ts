import { Client, Intents } from 'discord.js';
import dotenv from 'dotenv';
import { OnReady, SetActivity } from './events';

dotenv.config();

export default class App {
  private client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] })

  private BOT_PREFIX = process.env.BOT_PREFIX || '//';

  private TOKEN = process.env.BOT_TOKEN;

  constructor () {}

  public start () {
    OnReady(this.client, this.TOKEN); // Configurações de Inicialização & Auth do BOT
    SetActivity.default(this.client); // Configurações de Atividade/Status do BOT
  }
}