import { Gtk } from "ags/gtk4";
import OsdPopupVM from "~/src/features/osd/vm/osd-popup-vm";

export default function OsdPopupView() {
  const vm = new OsdPopupVM();
  return <box
    $={() => vm.initListen()}
    cssClasses={["osd-popup-view"]}
    visible={vm.getAgsPartState((s) => s.visible)}
  >
    <image
      visible={vm.getAgsPartState((s) => !!s.icon)}
      iconName={vm.getAgsPartState((s) => s.icon ?? "")}
    />
    <levelbar
      valign={Gtk.Align.CENTER}
      widthRequest={100}
      visible={vm.getAgsPartState((s) => !!s.value)}
      value={vm.getAgsPartState((s) => s.value ?? 0)}
    />
  </box>
}
