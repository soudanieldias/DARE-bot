import { PlayerSubscription } from '@discordjs/voice';
import { Client, Collection, Intents } from 'discord.js';
import { Player } from 'discord-music-player';
import { LoadCommands, OnInteraction, OnMessageCreate, OnReady, SetActivity } from './events';
import { ICommand } from './interfaces';
import dotenv from 'dotenv';

dotenv.config();

export default class App {
  private client = new Client({
    partials: ["CHANNEL"],
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

  public player = new Player(this.client, { leaveOnEmpty: false });

  private WELCOME_CHANNEL = process.env.WELCOME_CHANNEL;

  private WELCOME_MESSAGE = process.env.WELCOME_MESSAGE;

  public static loopMusic:Boolean = false;
  
  public static commands = new Collection<string, ICommand>();

  constructor () {
    SetActivity.setActivity(this.client);
    DatabaseConnection.databaseHandler();
    Interactions.buttonInteraction(this.client);
    CommandHandler.loadCommands(this.client);
    CommandHandler.commandWatcher(this.client);
    this.joinHandler();
    this.voiceHandler();
    this.errorWarnHandler();
  }

  public start () { // Configurações de Inicialização & Autenticação do BOT
    this.client.on('ready', () => {
      console.log('Bot Online');
      console.log('Username: ', this.client.user?.tag);
      console.log('------------------------------');
      console.log(`Pronto para o Trabalho! Online para ${this.client.users.cache.size} Usuários.`);
      console.log(`Operando em ${this.client.guilds.cache.size} Servidores`);
      console.log('------------------------------');
      console.log('Lista de Guilds:');
      console.log(this.client.guilds.cache.map((guild) => guild.name).join('\n'));
      console.log('------------------------------');
    });

  constructor () {
    SetActivity.default(this.client); // Configurações de Atividade/Status do BOT
    OnInteraction(this.client);
    LoadCommands(this.client);
    OnMessageCreate(this.client);
  }


  private joinHandler () {
    this.client.on('guildMemberAdd', async (user) => {
      if (this.WELCOME_CHANNEL && this.WELCOME_MESSAGE) {
        try {
          const channel = this.client.channels.cache.get(this.WELCOME_CHANNEL);
          (channel as TextChannel).send(`${this.WELCOME_MESSAGE}, <@${user.id}>`);
        } catch (err) {
          console.error(err);
        }
      }
    });
  }

  private voiceHandler() {
    this.client.on('voiceStateUpdate', async (oldMember, newMember) => {
      const newUserChannel = newMember.channel
      const oldUserChannel = oldMember.channel

      if(oldUserChannel === undefined && newUserChannel !== undefined) {
        console.log('User Joined a Channel');

      } else if(newUserChannel === undefined) {
        console.log('User Left Channel');
      }
    });
  }

  private errorWarnHandler() {
    this.client.on('error', (error) => {
      console.error(error);
    });

    this.client.on('warn', (warn) => {
      console.warn(warn);
    })

  }
}