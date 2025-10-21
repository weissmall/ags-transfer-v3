import BaseVM from "~/src/core/mvvm/base-vm";
import BatteryModel from "../model/battery-model";

type BatteryState = {
  iconName?: string;
  percentage?: string;
  isPresent?: boolean;
}

export default class BatteryVM extends BaseVM<BatteryState> {
  private model: BatteryModel;
  constructor() {
    super({});
    this.model = new BatteryModel();
    this.initState();
    this.initListeners();
  }

  private initListeners() {
    this.model.onIsPresent((isPresent) => {
      this.state.setPartial({
        isPresent,
      })
    })

    this.model.onPercentage((percentage) => {
      this.state.setPartial({
        percentage: this.percentageToString(percentage),
      })
    })

    this.model.onIconName((iconName) => {
      this.state.setPartial({
        iconName,
      })
    })
  }

  private initState() {
    this.state.set({
      iconName: this.model.getIconName(),
      isPresent: this.model.getIsPresent(),
      percentage: this.percentageToString(this.model.getPercentage()),
    })
  }

  private percentageToString(percentage: number): string {
    return `${Math.floor(percentage * 100)} %`;
  }
}
