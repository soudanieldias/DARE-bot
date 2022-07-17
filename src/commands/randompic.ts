import { Client, Message, MessageEmbed } from "discord.js";
import fs from 'fs';

async function getRandomPic(_client:Client, message:Message) {
  const jsonPath = './src/assets/pictures.json';
  const loadPictures = await fs.readFileSync(jsonPath);
  const picturesList = JSON.parse(loadPictures.toString());

  const choosedPicture = picturesList[Math.floor(Math.random() * picturesList.length)];
 
  if (picturesList.length > 0) {
    const randomEmbed = new MessageEmbed()
    .setColor("RANDOM")
      .setTitle('Random Picture')
      .setImage(choosedPicture);

    message.channel.send({ embeds: [randomEmbed] });
    return;

  } else {
    message.reply('Error: Random picture not Found');
  }
}

module.exports = {
	name: 'randompic',
	description: 'Gets a arandom Pic from List',
	category: 'test',
	run: async (client:Client, message:Message, _args:Array<string>) => {
    try {
      getRandomPic(client, message);
    } catch (error) {
      console.error("error");
    }
  }
};
