import { Client, Interaction, Message } from "discord.js";
import Schema from '../database/Schema';
import App from "../App";

export default (client:Client) => {
  client.on('interactionCreate', (interaction:any) => {
    try {
      if (interaction.isButton()) {
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
          fullCommand: `soundpad ${interaction.customId}`,
        }

        if (Boolean(process.env.USE_DB)) {
          Schema.createLog(msg, data);
        }

        return interaction.deferUpdate();
      }
      if (interaction.isChatInputCommand()) {
        // console.log(interaction);
        const command = App.commands.get(interaction.commandName);

        if (!command) {
          return interaction.reply(`Ocorreu um erro ao executar o comando! Tente mais Tarde!`);
        }

        command.execute(client, interaction);
      }
    } catch (err) {
      console.error(err);
    }
  });
}