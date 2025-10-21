import { exec } from "ags/process";
import { createPoll } from "ags/time";
import { Accessor } from "ags";
import BaseModel from "~/src/core/mvvm/base-model";
import { commandExists } from "~/src/core/system/bin";

const commands = {
  command: "brightnessctl",
  maxBrightness: "brightnessctl max",
  getBrightness: ["bash", "-c", "brightnessctl get"],
}

export default class BrightnessCtlModel extends BaseModel {
  private brightness?: Accessor<number>;

  constructor() {
    super();
    if (this.isPresent()) {
      this.brightness = createPoll(0, 1000, commands.getBrightness, (current) => {
        return parseInt(current) / this.getMaxBrightness();
      });
    }
  }

  private getMaxBrightness() {
    return parseInt(exec(commands.maxBrightness))
  }

  public isPresent() {
    return commandExists(commands.command);
  }

  public onBrightness(callback: (value: number) => void) {
    if (this.brightness) {
      this.getAccessorSubscription(this.brightness, callback);
    }
  }
}
