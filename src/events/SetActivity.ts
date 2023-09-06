import { ActivityType, Client } from 'discord.js';

export default class SetActivity {
  public static default(client:Client) {
    client.once('ready', () => {
      console.log('[Activity] Inicializando Activity do BOT.');

      client.user?.setActivity(
        'BOT Online',
        {
          type: ActivityType.Streaming,
          url: 'https://diasitservices.com.br/'
        });

        client.user?.setPresence({ status: 'online' });

      console.log('[Activity] Activity Carregada com Sucesso.');
    });
  }
}