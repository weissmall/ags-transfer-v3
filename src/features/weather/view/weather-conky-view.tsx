import { Gtk } from "ags/gtk4";
import { IWeatherVM } from "./i-weather-vm";

export default function WeatherConkyView({ vm }: { vm: IWeatherVM }) {
  return <box
    orientation={Gtk.Orientation.VERTICAL}
    cssClasses={["weather"]}
  >
    <label
      visible={vm.agsState((s) => !!s.temperature)}
      label={vm.agsState((s) => s.temperature ?? "")}
      halign={Gtk.Align.START}
    />
    <label
      visible={vm.agsState((s) => !!s.wind)}
      label={vm.agsState((s) => s.wind ?? "")}
      halign={Gtk.Align.START}
    />
    <label
      visible={vm.agsState((s) => !!s.humidity)}
      label={vm.agsState((s) => s.humidity ?? "")}
      halign={Gtk.Align.START}
    />
  </box>
}
