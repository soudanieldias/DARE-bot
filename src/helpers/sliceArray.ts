import { MessageButton } from 'discord.js';

export default function sliceArray(fileObjects:Array<MessageButton>, max:number) {
  return fileObjects.reduce((acc: any, item, index:number) => {
    const group = Math.floor(index / max);
    acc[group] = [...(acc[group] || []), item];
      return acc;
  }, []);
}