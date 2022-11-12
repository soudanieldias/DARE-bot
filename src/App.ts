import { Client, Collection, GatewayIntentBits /*, Routes, REST */ } from 'discord.js';
import { Player } from 'discord-music-player';
import {
  DBConnect,
  LoadCommands,
  // OnError,
  OnInteraction,
  OnMessageCreate,
  OnReady,
  SetActivity
} from './events';
import { ICommand } from './interfaces';
import dotenv from 'dotenv';

dotenv.config();

export default class App {
  private client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
      GatewayIntentBits.GuildMembers,
      GatewayIntentBits.GuildVoiceStates,
      GatewayIntentBits.DirectMessages,
      GatewayIntentBits.GuildIntegrations,
    ],
  });

  private TOKEN = process.env.BOT_TOKEN;

  public static commands = new Collection<String, ICommand>;
  public static slashCommands = new Collection<String, ICommand>;

  public player = new Player(this.client, { leaveOnEmpty: false }); // discord-music-player

  constructor () {
    SetActivity.default(this.client); // Configurações de Atividade/Status do BOT
    OnInteraction(this.client);
    LoadCommands(this.client);
    OnMessageCreate(this.client);
    // OnError(this.client);
    DBConnect.databaseHandler();
  }

  public start () {
    OnReady(this.client, this.TOKEN); // Configurações de Inicialização & Auth do BOT
  }
}