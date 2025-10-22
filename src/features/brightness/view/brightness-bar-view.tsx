import BrightnessVM from "../vm/brightness-vm";
import { With } from "ags";

export function BrightnessBarView() {
  const vm = new BrightnessVM();
  return <With value={vm.agsState}>
    {(state) => state.isPresent && (
      <box cssClasses={["BrightnessIconButton"]}>
        <button
        >
          <image
            iconName={state.iconName}
            tooltipText={state.tooltipText}
          />
        </button>
      </box>
    )}
  </With>
}
