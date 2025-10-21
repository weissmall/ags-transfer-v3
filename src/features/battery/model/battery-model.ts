import Battery from "gi://AstalBattery"
import BaseModel from "~/src/core/mvvm/base-model";

export default class BatteryModel extends BaseModel {
  private battery: Battery.Device;

  constructor() {
    super();
    this.battery = Battery.get_default()
  }

  public getIsPresent() {
    return this.battery.isPresent;
  }

  public getPercentage() {
    return this.battery.percentage;
  }

  public getIconName() {
    return this.battery.iconName;
  }

  public onIsPresent(callback: (isPresent: boolean) => void) {
    this.getBindingSubscription(this.battery, "isPresent", callback);
  }

  public onPercentage(callback: (percentage: number) => void) {
    this.getBindingSubscription(this.battery, "percentage", callback);
  }

  public onIconName(callback: (iconName: string) => void) {
    this.getBindingSubscription(this.battery, "iconName", callback);
  }
}
