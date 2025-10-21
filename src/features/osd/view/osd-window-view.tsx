import { Gdk, Astal } from "ags/gtk4"
import app from "ags/gtk4/app"
import OsdPopupView from "./osd-popup-view"
import OsdPopupVM from "../vm/osd-popup-vm";

export default function OsdWindowView(monitor: Gdk.Monitor) {
  const vm = new OsdPopupVM();
  return (
    <window
      gdkmonitor={monitor}
      cssClasses={["osd"]}
      application={app}
      layer={Astal.Layer.OVERLAY}
      keymode={Astal.Keymode.NONE}
      anchor={Astal.WindowAnchor.BOTTOM}
      visible={vm.getAgsPartState((s) => s.visible)}
    >
      <OsdPopupView />
    </window>
  )
}
