import AstalNotifd from "gi://AstalNotifd";
import BaseModel from "~/src/core/mvvm/base-model";

export type Notification = {
  id: number;
  summary: string;
  body: string;
  image: string;
  appName: string;
  appIcon: string;
  time: Date;
};

export default class NotificationsModel extends BaseModel {
  private notifd: AstalNotifd.Notifd;
  private notifMap: Map<number, Notification> = new Map();
  private onUpdateCallback?: (notifications: Notification[]) => void;

  constructor() {
    super();
    this.notifd = AstalNotifd.get_default();
    this.listen();
  }

  public getNotifications(): Notification[] {
    return Array.from(this.notifMap.values());
  }

  public onUpdate(callback: (notifications: Notification[]) => void) {
    this.onUpdateCallback = callback;
  }

  private listen() {
    this.notifd.connect("notified", this.onNotified.bind(this));
    this.notifd.connect("resolved", this.onResolved.bind(this));
  }

  private onNotified(_source: AstalNotifd.Notifd, id: number, _replaced: boolean): void {
    const notification = this.notifd.get_notification(id);
    if (notification == null) {
      return;
    }

    this.notifMap.set(id, {
      id: id,
      summary: notification.get_summary(),
      body: notification.get_body(),
      image: notification.get_image(),
      appName: notification.get_app_name(),
      appIcon: notification.get_app_icon(),
      time: new Date(notification.get_time()),
    })

    const expireIn = 3000;
    setTimeout(() => {
      this.delete(id);
    }, expireIn);

    this.notify();
  }

  private onResolved(_source: AstalNotifd.Notifd, id: number, _: AstalNotifd.ClosedReason): void {
    this.delete(id);
  }

  public delete(key: number) {
    this.notifMap.delete(key)
    this.notify();
    console.log(`Notification [${key}] was deleted`);
  }

  private notify() {
    if (this.onUpdateCallback) {
      this.onUpdateCallback(this.getNotifications());
    }
  }
}
