import { Client, Intents } from 'discord.js';
import dotenv from 'dotenv';

dotenv.config();

export default class App {
  private client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] })

  private BOT_PREFIX = process.env.BOT_PREFIX || '//';

  private TOKEN = process.env.BOT_TOKEN;

  constructor () {
    this.setActivity();
  }

  public start () { // Configurações de Inicialização & Autenticação do BOT
    this.client.on('ready', () => {
      console.log('Bot Online');
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

  private setActivity () { // Configurações de Atividade/Status do BOT
    this.client.once('ready', () => {
      this.client.user?.setActivity(
        'BOT Online',
        { type: 'STREAMING', url: 'https://www.diasitservices.com.br/dare-bot'}
      );
    });
  }
}