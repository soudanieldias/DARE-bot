import { createAudioPlayer, createAudioResource, joinVoiceChannel } from "@discordjs/voice";
import { IConnection } from '../interfaces';

export default class SoundHandler {
  public static player = createAudioPlayer();

  public static async playSound(streamSource:any, connectionParams:IConnection, stopSound:boolean) {

    const connection = joinVoiceChannel(connectionParams);

    if(stopSound) return connection.destroy();

    const resource = createAudioResource(streamSource);

    connection.subscribe(this.player);

    resource.volume?.setVolume(100);

    this.player.play(resource);
  }
}