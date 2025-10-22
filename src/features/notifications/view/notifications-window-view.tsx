import { Astal, Gdk, Gtk } from "ags/gtk4"
import { For } from "ags";
import NotificationsVM from "../vm/notifications-vm";
import NotificationTileView from "./notification-tile-view";

export default function NotificationsWindowView(gdkmonitor: Gdk.Monitor) {
  const vm = new NotificationsVM();
  return <window
    cssClasses={["NotificationsWindow", "dark-theme"]}
    anchor={Astal.WindowAnchor.TOP | Astal.WindowAnchor.RIGHT}
    gdkmonitor={gdkmonitor}
    exclusivity={Astal.Exclusivity.NORMAL}
    $type="notification"
    layer={Astal.Layer.TOP}
    valign={Gtk.Align.START}
    visible={vm.agsState((l) => l.length != 0)}
  >
    <box
      orientation={Gtk.Orientation.VERTICAL}
      valign={Gtk.Align.START}
      cssClasses={["notification-box"]}
    >
      <For each={vm.agsState}>
        {(item, _id) => (
          <NotificationTileView
            delete={() => vm.delete(item.id)}
            summary={item.summary}
            body={item.body}
            appIcon={item.appIcon}
            image={item.image}
            appName={item.appName}
            time={item.time}
            id={item.id}
          />
        )}
      </For>
    </box>
  </window>
}
