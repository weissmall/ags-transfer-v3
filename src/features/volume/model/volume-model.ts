import AstalWp from "gi://AstalWp?version=0.1";
import BaseModel from "~/src/core/mvvm/base-model";

export default class VolumeModel extends BaseModel {
  private speaker: AstalWp.Endpoint;

  constructor() {
    super();
    this.speaker = AstalWp.get_default().audio.get_default_speaker();
  }

  public onIconName(callback: (value: string) => void) {
    this.getBindingSubscription(this.speaker, "volumeIcon", callback);
  }

  public onVolume(callback: (value: number) => void) {
    this.getBindingSubscription(this.speaker, "volume", callback);
  }

  public changeState() {
    this.speaker.set_mute(!this.speaker.get_mute());
  }
}
