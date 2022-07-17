import { Client, Collection, Intents, TextChannel } from 'discord.js';
import { DatabaseConnection, SetActivity, Interactions } from './events';
import { ICommand } from './interfaces';
import { CommandHandler } from './handler';
import dotenv from 'dotenv';

dotenv.config();

export default class App {
  private client = new Client({ intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_VOICE_STATES,
  ] });

  private BOT_PREFIX = process.env.BOT_PREFIX || '//';

  private TOKEN = process.env.BOT_TOKEN;

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

    this.client.login(this.TOKEN);
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
}