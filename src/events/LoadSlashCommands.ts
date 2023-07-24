// import { Client, REST, Routes } from 'discord.js';
// import glob from 'glob';
// import App from '../App';

// export default async (client:Client) => {
  // try {
    // console.log('[Comandos-API] Carregando e registrando comandos Slash na API do Discord');

    // const slashCommandFiles = glob.sync('./src/commands-slash/**/*.ts');
    // const slashCommandsList = [];
    // const rest = new REST({ version: '10' }).setToken(process.env.BOT_TOKEN!);
    
    // for await (const file of slashCommandFiles) {
      // const command = require(`../../${file}`);
      // delete require.cache[require.resolve(`../../${file}`)];
      // slashCommandsList.push(JSON.stringify(command.data));
      // App.slashCommands.set(command.name, JSON.stringify(command.data));
    // }

    // await rest.put(Routes.applicationCommands(process.env.CLIENT_ID!),
      // {
        // body: JSON.stringify(App.commands),
        // body: App.commands, // Old commands LOADER
        // body: [ ...slashCommandsList ],
      // }
    // );
    // console.log('[Comandos-API] Comandos Slash registrados com Sucesso!');
  // } catch (error) {
    // console.error(error);
    // console.log('[Commands-Slash] [Erro] Ocorreu um Erro ao Carregar os Comandos');
  // }
// }
