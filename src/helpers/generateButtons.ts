import { MessageButton } from 'discord.js';
import fs from 'fs/promises';

export default async function generateButtonsData() {
  const audioFiles = await fs.readdir('./src/audios/');
  const fileObjects = audioFiles
    .map((audio) => ( new MessageButton().setCustomId(audio.slice(0, -4)).setLabel(audio.slice(0, -4)).setStyle('PRIMARY')));
  return fileObjects;
}