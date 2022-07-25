import { Client, Message } from "discord.js";
import fs from 'fs/promises'

module.exports = {
	name: 'loadimages',
	description: 'Load images to list & send all images to channel [Developer]',
	category: 'dev',
	execute: async (_client:Client, message:Message) => {
    const userId = Number(message.author!.id);
    const devId = Number(process.env.DEV_ID);

    if(userId !== devId) {return message.reply('Erro: Não Autorizado!')};

    const loadedPictures = await fs.readdir('./src/images');
    const imagesList = loadedPictures.map((picName) => (`./src/images/${picName}`));
    imagesList.forEach((image) => {
      message.channel.send({ files: [image]});
    });
  }
};
