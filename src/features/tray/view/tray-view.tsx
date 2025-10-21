import { createBinding, For } from "ags"
import Tray from "gi://AstalTray"

export default function TrayView() {
  const tray = Tray.get_default()
  const items = createBinding(tray, "items")

  return <box cssClasses={["SysTray"]}>
    <For each={items}>
      {(item) => (
        <menubutton
          $={(self) => {
            self.insert_action_group("dbusmenu", item.actionGroup)
          }}
          tooltipMarkup={item.tooltipMarkup}
          menuModel={item.menuModel}
          cssClasses={["tray-item"]}
        >
          <image gicon={item.gicon} />
        </menubutton>
      )}
    </For>
  </box>
}
