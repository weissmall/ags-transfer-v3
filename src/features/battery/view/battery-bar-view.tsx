import { With } from "ags"
import BatteryVM from "../vm/battery-vm"

export default function BatteryBarView() {
  const vm = new BatteryVM();
  return <box>
    <With value={vm.agsState}>
      {(state) => state.isPresent && (
        <box cssClasses={["Battery"]}>
          <image iconName={state.iconName} tooltipText={state.percentage} />
          <label label={state.percentage} />
        </box>
      )}
    </With>
  </box>
} 
