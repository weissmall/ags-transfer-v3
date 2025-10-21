import { Gtk } from "ags/gtk4"
import TimeVM from "~/src/features/time/vm/time-vm"

export default function TimeBarView() {
  const vm = new TimeVM();
  return <menubutton
    hexpand
    halign={Gtk.Align.CENTER}
  >
    <label
      label={vm.getAgsPartState((s) => s.time12 ?? "")}
      cssClasses={["Time"]}
    />
    <popover>
      <Gtk.Calendar />
    </popover>
  </menubutton>
}
