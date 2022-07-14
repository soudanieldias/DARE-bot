import { Client } from "discord.js";

export default class SetActivity {
  public static setActivity(client:Client) {
    client.once('ready', () => {
      client.user!.setActivity(
        'BOT Online',
        { type: 'STREAMING', url: 'https://www.diasitservices.com.br/dare-bot' }
      );
    });
  }
}