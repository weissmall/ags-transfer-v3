import { With } from "ags";
import VolumeVM from "../vm/volume-vm";

export function VolumeBarView() {
  const vm = new VolumeVM();

  return <box>
    <With value={vm.agsState}>
      {(state) => (
        <button
          onClicked={() => vm.changeState()}
          cssClasses={["AudioIconButton"]}
        >
          <image
            iconName={state.iconName}
            tooltipText={state.tooltipText}
          />
        </button>
      )}
    </With>
  </box>
}
