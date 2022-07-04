import { Channel, Client, Intents } from 'discord.js';
import dotenv from 'dotenv';

dotenv.config();

export default class App {
  private client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] })

  private BOT_PREFIX = process.env.BOT_PREFIX || '//';

  private TOKEN = process.env.BOT_TOKEN;

  constructor () {
    this.setActivity();
    this.commandHandler();
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
        { type: 'STREAMING', url: 'https://www.diasitservices.com.br/dare-bot' }
      );
    });
  }

  private commandHandler () {
    this.client.on('messageCreate', async (message) => {
      if ( 
        message.author.bot
        || message.channel.type === 'DM'
        || !message.content.startsWith(this.BOT_PREFIX)
        || message.content.startsWith(`<@!${this.client.user!.id}`)
        || message.content.startsWith(`<@${this.client.user!.id}`)
        ) return;

      const args = message.content.slice(this.BOT_PREFIX.length).trim().split(/ +/g);

      if (!args) {
        message.channel.send('Erro: Comando não Identificado!');
        return;
      }

      const command = args.shift()!.toLowerCase();

      try {
        const commandFile = require(`./commands/${command}.ts`);
        delete require.cache[require.resolve(`./commands/${command}.ts`)];
        commandFile.run(this.client, message, args);

      } catch (err) {
        message.channel.send('Erro: Comando Não Encontrado!');
        // console.error(`Erro ao Digitar o Comando: '${command}' \n[DEPURAÇÃO] Erro Retornado: '${err}'`); [DEBUG]
      }
    });
  }
}