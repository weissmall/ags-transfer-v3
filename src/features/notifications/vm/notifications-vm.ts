import BaseVM from "~/src/core/mvvm/base-vm"
import NotificationsModel, { Notification } from "../model/notifications-model";
import Chain from "~/src/core/utils/chain";
import { ellipsis } from "~/src/core/utils/text";
import config from "~/config";

type NotificationState = {
  summary: string;
  body: string;
  appIcon: string;
  image: string;
  appName: string;
  time: string;
  id: number;
}

export default class NotificationsVM extends BaseVM<NotificationState[]> {
  private model: NotificationsModel;

  constructor() {
    super([]);

    this.model = new NotificationsModel();
    this.initListeners();
  }

  private initListeners() {
    this.model.onUpdate((notifications) => this.onUpdate(notifications));

  }

  private onUpdate(notifications: Notification[]) {
    this.state.set(notifications.map((n) => this.mapToState(n)));
  }

  private mapToState(n: Notification): NotificationState {
    console.log("qweqweqwe")
    console.log(n);
    console.log("qweqweqwe")
    const summary = new Chain(n.summary)
      .then((s) => ellipsis(s, config.notifications.text.maxSummaryLength))
      .get()

    const body = new Chain(n.body)
      .then((s) => !!s ? ellipsis(s, config.notifications.text.maxBodyLength) : s)
      .get()

    const time = n.time.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })

    const part = {
      summary: summary,
      body: body,
      time: time,
    }
    return Object.assign({}, n, part);
  }

  public delete(id: number) {
    this.model.delete(id);
  }
}
