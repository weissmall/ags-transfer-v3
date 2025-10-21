import Wp from "gi://AstalWp";

export default class OsdVolumeModel {

  private speaker: Wp.Endpoint;

  constructor() {
    this.speaker = Wp.get_default().get_default_speaker();
  }

  public onSpeakerVolume(callback: (value: number, icon: string) => void) {
    this.speaker.connect("notify::volume", (src, pspec) => {
      if (pspec.get_name() == "volume") {
        callback(src.get_volume(), src.get_volume_icon())
      }
    })
  }
}
