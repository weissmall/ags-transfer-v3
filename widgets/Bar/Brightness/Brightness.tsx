import { bind, Variable } from "astal"
import { exec } from "astal/process"
import { toPercentStr } from "../../utils/utils"


function getMaxBrightness() {
  return 100
  // return parseInt(exec("brightnessctl max"));
}

export const brightness = bind(new Variable(0)
  .poll(
    1000,
    // ["bash", "-c", "brightnessctl get"],
    ["echo", "100"],
    (current) => {
      return parseInt(current) / getMaxBrightness();
    }
  ),
);

export function BrightnessIconButton() {
  return (
    <box cssClasses={["BrightnessIconButton"]}>
      <button
      >
        <image
          iconName="display-brightness-symbolic"
          tooltipText={brightness.as(toPercentStr).as((b) => `${b}%`)}
        />
      </button>
    </box>
  );
}

export function BrightnessSlider() {
  const setBrightness = (value: number) => {
    const percentage = Math.round(value * 100)
    // exec(`brightnessctl set ${percentage}%`)
    exec(`echo 1`)
  }

  return <slider
    cssClasses={["Slider"]}
    hexpand={true}
    value={brightness}
    onLegacy={(self) => {
      setBrightness(self.value)
    }}
  />;
}
