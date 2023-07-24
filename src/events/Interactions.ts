import { Client, Message } from "discord.js";
import App from "../App";

export default class interactions {
  public static buttonInteraction(client:Client) {
    client.on('interaction', (interaction) => {
      if (!interaction.isButton()) return;
      try {
        const soundpad = App.commands.get('soundpad');
        if(!soundpad) return interaction.reply('ERRO: Ocorreu um erro com o SoundPad!');

        soundpad?.execute(client, interaction, [interaction.customId] )
        interaction.reply({ content: `Tocando: ${interaction.customId}`, ephemeral: false });
        interaction.deleteReply();
      } catch (err) {
        console.error(err);
      }
    });
  }
}