import { Client, Message } from "discord.js";
import fs from 'fs/promises'

module.exports.run = async (client:Client, message:Message) => {
  const loadedPictures = await fs.readdir('./src/images');
  const imagesArray = loadedPictures.map((picName) => (`./src/images/${picName}`));
  imagesArray.forEach((image) => {
    message.channel.send({ files: [image]});
  })
};
