import { Client, Interaction, InteractionButtonComponentData, InteractionType } from "discord.js";
import App from "../App";

export default (client:Client) => {
  client.on('interactionCreate', (interaction:any) => {
    if (!interaction.isButton()) return;

    try {
      const soundpad = App.commands.get('soundpad');

      if(!soundpad) return interaction.reply('ERRO: Ocorreu um erro com o SoundPad!');

      soundpad?.execute(client, interaction, [interaction.customId]);

      return interaction.deferUpdate();

    } catch (err) {
      console.error(err);

    }
  });
}