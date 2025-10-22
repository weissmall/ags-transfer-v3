import { Gtk } from "ags/gtk4";
import { timeout } from "ags/time";

export type NotificationProps = {
  delete: () => void;
  summary: string;
  body?: string | undefined;
  appIcon?: string | undefined;
  image?: string | undefined;
  appName: string;
  time: string;
  id: number;
};

export default function NotificationTileView(props: NotificationProps | undefined) {
  if (!props) {
    return <box />
  }

  return <revealer
    $={(self) => timeout(100, () => self.revealChild = true)}
    transitionType={Gtk.RevealerTransitionType.SLIDE_UP}
    onDestroy={(self) => self.revealChild = false}
  >
    <box
      cssClasses={["Notification"]}
      hexpand
    >
      <box
        orientation={Gtk.Orientation.VERTICAL}
        hexpand
      >
        <box cssClasses={["header"]} hexpand>
          {props.appIcon && (
            <image
              cssClasses={["app-icon"]}
              file={props.image}
            />
          )}
          <box
            halign={Gtk.Align.FILL}
            hexpand
          >
            <label
              cssClasses={["app-name"]}
              label={props.appName}
            />
          </box>
          <label
            cssClasses={["time"]}
            label={props.time}
          />
          <button
            cssClasses={["close"]}
            iconName={"cancel"}
            onClicked={props.delete}
          />
        </box>
        <box>
          {props.image && (
            <box
              cssClasses={["image-container"]}
              overflow={Gtk.Overflow.HIDDEN}
              vexpand={false}
              hexpand={false}
              widthRequest={50}
              heightRequest={50}
            >
              <image
                cssClasses={["image"]}
                file={props.image}
                pixelSize={-1}
              />
            </box>
          )}
          <box orientation={Gtk.Orientation.VERTICAL}>
            <box>
              <label
                cssClasses={["summary"]}
                label={props.summary}
              />
            </box>
            {props.body && (
              <box cssClasses={["separator"]} />
            )}
            {props.body && (
              <box>
                <label
                  cssClasses={["body"]}
                  label={props.body}
                  maxWidthChars={20}
                />
              </box>
            )}
          </box>
        </box>
      </box>
    </box>
  </revealer>
}
