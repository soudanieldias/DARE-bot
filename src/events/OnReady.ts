import { Client } from 'discord.js';

export default (client:Client, token:string | undefined) => {
  client.on('ready', () => {
    console.log(`
      Bot Online!
      Username: ${client.user?.tag}
      ------------------------------
      Pronto para o Trabalho! Online para ${client.users.cache.size} Usuários.
      Operando em ${client.guilds.cache.size} Servidores
      ------------------------------
      Lista de Guilds:
      ${client.guilds.cache.map((guild) => guild.name).join('\n')}
      ------------------------------
    `);
  });

  client.login(token);
}