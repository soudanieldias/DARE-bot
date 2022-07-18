import { Client, Message } from "discord.js";
import fs from 'fs/promises';

module.exports = {
  name: 'generatereport',
  description: 'Generate a complete Data report of players & Bots in server',
  category: 'staff',
  execute: async (client:Client, message:Message) => {
    const userPerms = message.member!.guild.me?.permissions.toArray();
    const hasAdminRole = userPerms?.some((role) => (role == "ADMINISTRATOR"));

    if(!hasAdminRole) return message.reply('Erro: Não Autorizado!');

    const guild = client.guilds.resolve(message.guildId!);
    const guildMembers = await guild!.members.fetch();
    const [ users, bots ] = [
      guildMembers.filter((member) => !member.user.bot),
      guildMembers.filter((member) => member.user.bot),
    ];

    const timeStamp = new Date().getTime();
    
    const botMessage = await message.channel.send({content: 'Iniciando a criação do Relatório de Membros do servidor'});

    // Cria Diretório
    await fs.mkdir(`./src/reports/${timeStamp}`);

    // Cria LOG de USUÁRIOS
    await fs.writeFile(`./src/reports/${timeStamp}/users.txt`, `REPORT DE USUÁRIOS: ${timeStamp}\n`);  
    users.forEach(async (user) => {
      await fs.appendFile(`./src/reports/${timeStamp}/users.txt`, `${JSON.stringify(user)}\n`);
    });

    // Cria LOG de BOTS
    await fs.writeFile(`./src/reports/${timeStamp}/bots.txt`, `REPORT DE BOTS: ${timeStamp}\n`);
    bots.forEach(async (bot) => {
      await fs.appendFile(`./src/reports/${timeStamp}/bots.txt`, `${JSON.stringify(bot)}\n`);
    })

    await botMessage.edit({ content: `Gerando Relatório ${timeStamp}` });
    botMessage.edit({ content: `Tudo ok! ID do Relatório: ${timeStamp}`});
  }
};
