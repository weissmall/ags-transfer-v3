import BaseVM from "~/src/core/mvvm/base-vm";
import { commandExists } from "~/src/core/system/bin";
import BrightnessCtlModel from "../model/brightnessctl-model";
import { toPercentStr } from "~/src/core/utils/text";

type BrightnessState = {
  isPresent: boolean;
  iconName: string;
  tooltipText?: string;
};

export default class BrightnessVM extends BaseVM<BrightnessState> {
  private model: BrightnessCtlModel;

  constructor() {
    super({
      isPresent: commandExists("brightnessctl"),
      iconName: "display-brightness-symbolic",
    });

    this.model = new BrightnessCtlModel();
    this.initListeners();
  }

  private initListeners() {
    this.model.onBrightness((value) => this.setBrightness(value));
  }

  private setBrightness(value: number) {
    this.state.setPartial({
      tooltipText: `${toPercentStr(value)}%`
    });
  }
}
