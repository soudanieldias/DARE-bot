import { AudioPlayerStatus, createAudioPlayer, createAudioResource, joinVoiceChannel } from "@discordjs/voice";
import { IConnection } from '../interfaces';

export default class SoundHandler {
  public static async playSound(streamSource:any, connectionParams:IConnection) {
    const player = createAudioPlayer();

    const resource = createAudioResource(streamSource);

    const connection = joinVoiceChannel(connectionParams);

    connection.subscribe(player);

    player.play(resource);
    
    player.on(AudioPlayerStatus.Idle,async () => {
      connection.destroy();
    });
  }
}