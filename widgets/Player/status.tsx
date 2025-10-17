import { Astal, Gdk, Gtk } from "ags/gtk4"
import WeatherConkyView from "~/src/features/weather/view/weather-conky-view";
import TimeConkyView from "~/src/features/time/view/time-conky-view";

export default function StatusWindow(gdkmonitor: Gdk.Monitor) {
  return <window
    visible
    anchor={Astal.WindowAnchor.BOTTOM | Astal.WindowAnchor.LEFT}
    layer={Astal.Layer.BACKGROUND}
    gdkmonitor={gdkmonitor}
    exclusivity={Astal.Exclusivity.IGNORE}
    keymode={Astal.Keymode.NONE}
    valign={Gtk.Align.START}
    halign={Gtk.Align.START}
    hexpand
    heightRequest={50}
    widthRequest={50}
    cssClasses={["status-desc"]}
  >
    <box
      orientation={Gtk.Orientation.VERTICAL}
      halign={Gtk.Align.START}
      cssClasses={["status"]}
    >
      <TimeConkyView />
      <WeatherConkyView />
    </box>
  </window>
}
