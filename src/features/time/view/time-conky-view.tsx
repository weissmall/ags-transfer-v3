import TimeVM from "../vm/time-vm"
import { Gtk } from "ags/gtk4";

export default function TimeConkyView() {
  const vm = new TimeVM();
  return <>
    <label
      visible={vm.agsState((s) => !!s.time)}
      label={vm.agsState((s) => s.time!)}
      cssClasses={["time"]}
      halign={Gtk.Align.START}
    />
    <label
      visible={vm.agsState((s) => !!s.dayDate)}
      label={vm.agsState((s) => s.dayDate!)}
      cssClasses={["date"]}
      halign={Gtk.Align.START}
    />
    <label
      visible={vm.agsState((s) => !!s.weekDots)}
      label={vm.agsState((s) => s.weekDots!)}
      cssClasses={["week-day"]}
      halign={Gtk.Align.START}
    />
  </>
}
