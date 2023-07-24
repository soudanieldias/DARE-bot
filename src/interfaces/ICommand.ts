export default interface ICommand {
  data: {
    name: string;
    description: string;
    aliases?: string[];
  }
  name?: string;
  description?: string;
  aliases?: string[];
  permissions?: string[];
  cooldown?: number;
  execute(...args: any): any;
}