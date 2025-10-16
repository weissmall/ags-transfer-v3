import { With } from "ags";
import TimeVM from "../vm/time-vm"
import { Gtk } from "ags/gtk4";

export default function TimeConkyView() {
  const vm = new TimeVM();
  return <With value={vm.agsState}>
    {(state) =>
      <>
        <label
          label={state.time}
          cssClasses={["time"]}
          halign={Gtk.Align.START}
        />
        <label
          label={state.dayDate}
          cssClasses={["date"]}
          halign={Gtk.Align.START}
        />
        <label
          cssClasses={["week-day"]}
          label={state.weekDots}
          halign={Gtk.Align.START}
        />
      </>
    }
  </With>
}
