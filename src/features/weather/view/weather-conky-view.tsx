import { Gtk } from "ags/gtk4";
import { With } from "ags";
import WeatherVM from "~/src/features/weather/vm/weather-vm";

export default function WeatherConkyView() {
  const vm = new WeatherVM();
  return <box
    orientation={Gtk.Orientation.VERTICAL}
    cssClasses={["weather"]}
  >
    <With value={vm.state}>
      {(state) => <>
        <label
          label={state.temperature}
          halign={Gtk.Align.START}
        />
        <label
          label={state.wind}
          halign={Gtk.Align.START}
        />
        <label
          label={state.humidity}
          halign={Gtk.Align.START}
        />
      </>}
    </With>
  </box>
}
