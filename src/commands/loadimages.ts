import { Client, Message } from "discord.js";
import fs from 'fs/promises'

module.exports = {
	name: 'loadimages',
	description: 'Load images to list & send all images to channel',
	category: 'test',
	execute: async (_client:Client, message:Message) => {
    const loadedPictures = await fs.readdir('./src/images');
    const imagesList = loadedPictures.map((picName) => (`./src/images/${picName}`));
    imagesList.forEach((image) => {
      message.channel.send({ files: [image]});
    });
  }
};
