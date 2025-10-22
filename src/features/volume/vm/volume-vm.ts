import BaseVM from "~/src/core/mvvm/base-vm";
import VolumeModel from "../model/volume-model";
import { toPercentStr } from "~/src/core/utils/text";

type VolumeState = {
  iconName?: string;
  tooltipText?: string;

}

export default class VolumeVM extends BaseVM<VolumeState> {
  private model: VolumeModel;
  constructor() {
    super({});
    this.model = new VolumeModel();
    this.initListeners();
  }

  private initListeners() {
    this.model.onIconName((iconName) => {
      this.state.setPartial({
        iconName,
      })
    })

    this.model.onVolume((volume) => {
      this.state.setPartial({
        tooltipText: `${toPercentStr(volume)}%`,
      })
    })
  }

  public changeState() {
    this.model.changeState();
  }
}
