import { Client } from "discord.js";

export default class interactions {
  public static buttonInteraction(client:Client) {
    client.on('interaction', (interaction) => {
      if (!interaction.isButton()) return;

      try {
        const commandFile = require(`../commands/soundpad.ts`);
        delete require.cache[require.resolve(`../commands/soundpad.ts`)];
        commandFile.run(client, interaction, [interaction.customId]);
        interaction.reply({ content: `Tocando: ${interaction.customId}`, ephemeral: false });
        interaction.deleteReply();
      } catch (err) {
        console.error(err);
      }
    });
  }
}