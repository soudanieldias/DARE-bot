import { ButtonBuilder } from '@discordjs/builders';
import { ButtonStyle } from 'discord.js';
import fs from 'fs/promises';

export default async function generateButtonsData() {
  const audioFiles = await fs.readdir('./src/audios/');
  const fileObjects = audioFiles
    .map((audio) => ( new ButtonBuilder().setCustomId(audio.slice(0, -4)).setLabel(audio.slice(0, -4)).setStyle(ButtonStyle.Primary)));
  return fileObjects;
}