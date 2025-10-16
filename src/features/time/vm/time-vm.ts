import { interval } from "ags/time";
import BaseVM from "~/src/core/mvvm/base-vm";

type TimeState = {
  time?: string;
  dayDate?: string;
  weekDay?: number;
  weekDots?: string;
};

export default class TimeVM extends BaseVM<TimeState> {

  constructor() {
    super({});
    this.timeRefresh();
  }

  private timeRefresh() {
    this.setTime()
    this.setDayDate();
    interval(1000, () => {
      this.setTimeVars();
    })
  }

  private setTimeVars() {
    const date = new Date()

    if (date.getSeconds() == 0) {
      this.setTime();
    }

    if (date.getHours() == 0) {
      this.setDayDate();
    }
  }

  private setTime() {
    const date = new Date()
    const time = date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })

    this.state.setPartial({
      time,
    })
  }

  private setDayDate() {
    const date = new Date();
    const [dayDate, _] = date.toLocaleTimeString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    }).split(" at");

    this.state.setPartial({
      dayDate,
      weekDay: date.getDay(),
      weekDots:
        [...new Array(date.getDay()).fill(""), ...new Array(7 - date.getDay()).fill("")].join(' '),
    })
  }
}
