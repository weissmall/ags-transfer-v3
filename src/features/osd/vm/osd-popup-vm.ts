import { timeout, Timer } from "ags/time";
import BaseVM from "~/src/core/mvvm/base-vm";
import OsdVolumeModel from "~/src/features/osd/model/osd-volume-model";
import OsdBrightnessModel from "~/src/features/osd/model/osd-brightness-model";

type OsdPopupState = {
  value?: number;
  icon?: string;
  visible: boolean;
};

export default class OsdPopupVM extends BaseVM<OsdPopupState> {
  private timer?: Timer;
  private volumeModel: OsdVolumeModel;
  private brightnessModel: OsdBrightnessModel;

  constructor(
    volumeModel?: OsdVolumeModel,
    brightnessModel?: OsdBrightnessModel,
  ) {
    super({ visible: false });
    this.volumeModel = volumeModel ?? new OsdVolumeModel();
    this.brightnessModel = brightnessModel ?? new OsdBrightnessModel();
  }

  public initListen() {
    this.volumeModel.onSpeakerVolume((value, icon) => {
      this.setIcon(icon);
      this.setValue(value);
      this.activateFor(1000);
    })

    this.brightnessModel.onBrightness((value, icon) => {
      this.setIcon(icon);
      this.setValue(value);
      this.activateFor(1000);
    })
  }

  private setIcon(icon: string) {
    this.state.setPartial({
      icon,
    })
  }

  private setValue(value: number) {
    this.state.setPartial({
      value,
    })
  }

  private activateFor(timeoutMs: number) {
    if (this.timer) {
      this.timer.cancel();
      this.timer = undefined;
    }

    this.state.setPartial({
      visible: true,
    })

    this.timer = timeout(timeoutMs, () => {
      this.state.setPartial({
        visible: false,
      })

      this.timer = undefined;
    })
  }
}
