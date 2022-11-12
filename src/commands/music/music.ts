import { Client, CommandInteraction, SlashCommandBuilder } from "discord.js";
import { app } from "../..";

module.exports = {
  data: new SlashCommandBuilder()
    .setName('music')
    .setDescription('Digite o tipo de Operação que deseja realizar com o Player de Música')
    .addStringOption(event => (
      event.setName('event')
      .setDescription('Tipo de evento que você irá rodar no /music')
      .addChoices({ name: 'play', value: 'play' })
      .addChoices({ name: 'stop', value: 'stop' })
      .addChoices({ name: 'skip', value: 'skip' })
      .addChoices({ name: 'np', value: 'np' })
      .addChoices({ name: 'queue', value: 'queue' })
      .addChoices({ name: 'volume', value: 'volume' })
      .setRequired(true)
    ))
    .addStringOption(url => (
      url.setName('url')
      .setDescription('Url do Stream a ser Tocado!')
      .setRequired(false)
    ))
    .addIntegerOption(quantity => (
      quantity.setName("volume")
      .setDescription("Digite o Volume da Música (Um número entre 1-100).")
      .setMinValue(1)
      .setMaxValue(100)
      .setRequired(false)
    )),
  category: 'music',
  execute: async (_client:Client, interaction:CommandInteraction) => {
    try {
      if (interaction.isRepliable()) {
        const member = interaction.guild?.members.cache.get(interaction.member!.user.id);
        const voiceChannel = member?.voice.channelId!;
        const guildId = interaction.guildId;

        // Queue Configs
        const guildQueue = app.player.getQueue(`${guildId}`);
        const queue = app.player.createQueue(`${guildId}`);

        const eventType = interaction.options.get('event')?.value;
        const paramUrl = interaction.options.get('url')?.value;
        const sourceVolume = interaction.options.get('volume')?.value;

        const adapterCreator = interaction.guild?.voiceAdapterCreator;

        const connectionParams = {
          channelId: `${voiceChannel}`,
          guildId: interaction.guildId!,
          adapterCreator: adapterCreator!,
        };

        switch (eventType) {
          case 'play':
            await queue.join(voiceChannel);
            await queue.play(`${paramUrl}`)
              .catch((err) => {
                console.log(err);
                if (!guildQueue) queue.stop();
              });
            await interaction.reply(`Adicionando música a fila...`)
            break;
          case 'stop':
            queue.stop();
            break;

          case 'skip':
            if (!queue || !guildQueue) return;
            queue.skip();
            await interaction.reply('Pulando Música');
            break;

          case 'volume':
            queue.setVolume(Number(sourceVolume));
            await interaction.reply('Alterando o volume para ' + sourceVolume);
            break;

          case 'np':
            if (!guildQueue || !queue.isPlaying) return interaction.reply('Nada tocando...');

            const progressBar = guildQueue!.createProgressBar().prettier;
            await interaction.reply(`**Tocando agora:**\n***${guildQueue.nowPlaying}\n${progressBar}***`);
            break;

          case 'queue':
            const queueList = queue.songs;
            await interaction
              .reply(`**Playlist Atual:**\n${queueList
                .map((music, index) =>
                (`***${index+1}> ${music.author} - ${music.name} | ${music.duration}***\n`)).join('')}`);
            break;
          default:
            await interaction.reply('Nenhum argumento válido foi passado para o Comando Jukebox');
            break;
        }
      }
    } catch (error) {
      console.error('[Erro] Ocorreu um erro com o /music: ', error);
    }
  }
}