import { Client } from "discord.js";

export default class SetActivity {
  public static setActivity(client:Client) {
    client.once('ready', () => {
      console.log('[ACTIVITY] Carregando activity do BOT');
      
      client.user!.setActivity(
        'BOT Online',
        { type: 'STREAMING', url: 'https://www.diasitservices.com.br/dare-bot' }
        );

      console.log('[ACTIVITY] Activity Carregada com Sucesso!');
    });
  }
}