import { Astal, Gtk, Gdk } from "ags/gtk4"
import app from "ags/gtk4/app"
import TimeBarView from "../../time/view/time-bar-view"
import TrayView from "../../tray/view/tray-view"
import BatteryBarView from "../../battery/view/battery-bar-view"
import { BrightnessBarView } from "../../brightness/view/brightness-bar-view" // import Time from "./Time/Time"
import { VolumeBarView } from "../../volume/view/volume-bar-view"

// Main Bar component
export default function Bar(gdkmonitor: Gdk.Monitor) {
  const { TOP, LEFT, RIGHT } = Astal.WindowAnchor

  return <window
    visible
    cssClasses={["Bar"]}
    gdkmonitor={gdkmonitor}
    exclusivity={Astal.Exclusivity.EXCLUSIVE}
    anchor={TOP | LEFT | RIGHT}
    application={app}
  >
    <centerbox orientation={Gtk.Orientation.HORIZONTAL}>
      <box $type="center">
        <TimeBarView />
      </box>
      <box $type="end">
        <VolumeBarView />
        <BrightnessBarView />
        <BatteryBarView />
        <TrayView />
      </box>
    </centerbox>
  </window>
}
//
// function VerticalSeparator() {
//   return <box
//     cssClasses={['vertical-separator-box']}
//     hexpand={false}
//     vexpand={false}
//   >
//     <box
//       cssClasses={['vertical-separator']}
//     />
//   </box>
// }
