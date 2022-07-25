export default interface ICommand {
  name: string;
  description: string;
  aliases?: string[];
  permissions?: string[];
  cooldown?: number;
  execute(...args: any): any;
}