import { Client, Interaction } from "discord.js";
import Schema from '../database/Schema';
import App from "../App";
import { SoundHandler } from "../handlers";

export default (client:Client) => {
  client.on('interactionCreate', (interaction:Interaction) => {
    try {
      if (interaction.isButton()) {
        if (interaction.isRepliable()) {
          const soundpad = App.commands.get('soundpad');
  
          if(!soundpad) return interaction.reply('ERRO: Ocorreu um erro com o SoundPad!');

          soundpad.execute(client, interaction);
          
          const msg = { 
            author: interaction.user,
          };
  
          const data = {
            cmd: {
              name: 'soundpad',
            },
            fullCommand: `soundpad ${interaction.customId}`,
          }
  
          if (Boolean(process.env.USE_DB) === true) {
            Schema.createLog(msg, data);
          }
  
          return interaction.deferUpdate();
        }
      }
      if (interaction.isChatInputCommand()) {
        const command = App.commands.get(interaction.commandName);

        if (!command) {
          return interaction.reply(`Ocorreu um erro ao executar o comando! Tente mais Tarde!`);
        }

        return command.execute(client, interaction);
      }
    } catch (err) {
      console.error(err);
    }
  });
}