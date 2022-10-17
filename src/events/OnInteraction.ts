import { Client, Interaction, Message } from "discord.js";
import Schema from '../database/Schema';
import App from "../App";

export default (client:Client) => {
  client.on('interactionCreate', (interaction:any) => {
    if (!interaction.isButton()) return;

    try {
      const soundpad = App.commands.get('soundpad');

      if(!soundpad) return interaction.reply('ERRO: Ocorreu um erro com o SoundPad!');

      soundpad?.execute(client, interaction, [interaction.customId]);
      
      const msg = { 
        author: interaction.user,
      };

      const data = {
        cmd: {
          name: 'soundpad',
        },
        fullCommand:  `soundpad ${interaction.customId}`,
      }

      if (Boolean(process.env.USE_DB)) {
        Schema.createLog(msg, data);
      }

      return interaction.deferUpdate();

    } catch (err) {
      console.error(err);

    }
  });
}