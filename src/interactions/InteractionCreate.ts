import { Client, Interaction } from "discord.js";
import App from "../App";

module.exports = {
  name: "interactionCreate",
  async execute(client:Client, interaction:Interaction, args:Array<string>) {
    if (!interaction.isCommand()) return;
    if (!interaction.inGuild()) return;

    await client.application?.commands.fetch(interaction.commandId).catch((e) => console.log(e));

    try {
      // const command = client.commands.get(interaction.command?.name ?? "")
      const command = App.commands.get(interaction.command?.name ?? "")

      if (!command) return;
      if (!interaction.commandId) return;

      await command.execute(client, interaction, args);
    } catch (error) {
      if (interaction.replied) return;
      console.error(error);
    }
  }
};