import { Astal, Gdk, Gtk } from "ags/gtk4"
import StatusController from "../core/status-controller"
import { createBinding } from "ags";
import WeatherConkyView from "~/src/features/weather/view/weather-conky-view";

export default function StatusWindow(gdkmonitor: Gdk.Monitor) {
  const sc = new StatusController();
  return <window
    visible
    type="status"
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
    child={(
      <box
        vertical
        halign={Gtk.Align.START}
        cssClasses={["status"]}
      >
        <label
          label={createBinding(sc.time)}
          cssClasses={["time"]}
          halign={Gtk.Align.START}
        />
        <label
          label={bind(sc.dayDate)}
          cssClasses={["date"]}
          halign={Gtk.Align.START}
        />
        <label
          cssClasses={["week-day"]}
          label={bind(sc.weekDots)}
          halign={Gtk.Align.START}
        />
        <WeatherConkyView />
      </box>
    )}
  />
}
