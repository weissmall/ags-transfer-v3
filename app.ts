import app from "ags/gtk4/app"
import style from "./style.scss"
import config from "~/config";
import OsdWindowView from "~/src/features/osd/view/osd-window-view";
import CommandsHandler from "~/src/core/commands/commands-handler";
import Bar from "~/src/features/bar/view/bar-view";
import volumeCommandHandler from "~/src/features/commands/volume-command-handler";
import NotificationsWindowView from "./src/features/notifications/view/notifications-window-view";
import ConkyView from "./src/features/conky/view/conky-view";

const cHandler = new CommandsHandler();
// cHandler.registerCommand("brightness", brightnessCommandHandler);
cHandler.registerCommand("volume", volumeCommandHandler);

app.start({
  css: style,
  instanceName: config.appTitle,
  requestHandler(request: string[], res: (response: any) => void) {
    const result = cHandler.handleCommandSafe(request, res);
    if (result) {
      res(result);
      return;
    }
    res("unknown command")
  },
  main() {
    app.get_monitors().map((mon) => OsdWindowView(mon))
    if (config.conky.enabled) {
      app.get_monitors().map((mon) => ConkyView(mon))
    }
    app.get_monitors().map((mon) => Bar(mon))
    if (config.notifications.enabled) {
      app.get_monitors().map((mon) => NotificationsWindowView(mon));
    }
  },
})
