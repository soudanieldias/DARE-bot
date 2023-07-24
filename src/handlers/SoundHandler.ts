import { createAudioPlayer, createAudioResource, joinVoiceChannel } from "@discordjs/voice";
import { IConnection } from '../interfaces';

export default class SoundHandler {
  public static player = createAudioPlayer();

  public static async playSound(streamSource:any, connectionParams:IConnection, stopSound:boolean) {
    
    const connection = joinVoiceChannel(connectionParams);

    if (stopSound) {
      this.player.stop();
      connection.destroy();
      return;
    }

    const resource = createAudioResource(streamSource);

    connection.subscribe(this.player);

    resource.volume?.setVolume(100);

    return this.player.play(resource);
  }
}