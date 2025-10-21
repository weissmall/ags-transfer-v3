import { App, Astal, Gtk, Gdk } from "astal/gtk4"
import Time from "./Time/Time"
import BatteryLevel from "./Battery/Battery"
import { VolumeIconButton, VolumeSlider } from "./Audio/Audio"
import SysTray from "./Tray/Tray"
import { BrightnessIconButton, BrightnessSlider } from "./Brightness/Brightness"
import { PlayerButton } from "../Player/PlayerWindow"
import Network from "./network/network"

// Main Bar component
export default function Bar(gdkmonitor: Gdk.Monitor) {
  const { TOP, LEFT, RIGHT } = Astal.WindowAnchor

  return <window
    visible
    cssClasses={["Bar"]}
    gdkmonitor={gdkmonitor}
    exclusivity={Astal.Exclusivity.EXCLUSIVE}
    anchor={TOP | LEFT | RIGHT}
    application={App}
  >
    <centerbox
      cssClasses={["bar-box"]}
    >
      <box
        hexpand
        halign={Gtk.Align.FILL}
        cssClasses={["right"]}
      >
        <VolumeIconButton />
        {PlayerButton(gdkmonitor)}
      </box>
    </centerbox>
  </window>
}
