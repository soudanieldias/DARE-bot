import { Client } from 'discord.js';

export default class setActivity {
  public static default(client:Client) {
    client.once('ready', () => {
      console.log('[Activity] Inicializando Activity do BOT.');

      client.user?.setActivity(
        'BOT Online',
        {
          type: 'STREAMING',
          url: 'https://diasitservices.com.br/'
        });

        client.user?.setPresence({ status: 'online' });

      console.log('[Activity] Activity Carregada com Sucesso.');
    });
  }
}
