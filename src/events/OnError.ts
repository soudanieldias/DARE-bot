import { Client } from 'discord.js';

export default (client:Client) => {
  client.on('error', (error:Error) => {
    console.error('**********\n<<< Ocorreu um erro!!! >>>\n**********');
    console.error('**********\nERRO:\n**********');
    console.error(error);
    console.error('**********\n<<< FIM DO ERRO >>>\n**********');
  });
}