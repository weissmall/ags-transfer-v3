import { bind } from "astal"
import Wp from "gi://AstalWp"
import { toPercentStr } from "../../utils/utils"

export function VolumeIconButton() {
  const speaker = Wp.get_default()?.audio.default_speaker
  if (!speaker) return null

  const volumeIcon = bind(speaker, "volumeIcon")
  const volume = bind(speaker, "volume")

  return (
    <box cssClasses={["AudioIconButton"]}>
      <button
        onClicked={() => speaker.set_mute(!speaker.get_mute())}
      >
        <image
          iconName={volumeIcon}
          tooltip_text={volume.as(toPercentStr).as((v) => `${v}%`)}
        />
      </button>
    </box>
  )
}
