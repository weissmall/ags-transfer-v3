import { interval } from "ags/time";
import BaseVM from "~/src/core/mvvm/base-vm";

type TimeState = {
  time?: string;
  time12?: string;
  dayDate?: string;
  weekDay?: number;
  weekDots?: string;
  date: Date;
};

export default class TimeVM extends BaseVM<TimeState> {

  constructor() {
    super({ date: new Date() });
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

    if (date.getHours() != this.state.get().date.getHours()) {
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

    const time12 = date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });


    this.state.setPartial({
      time,
      time12,
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
        [...new Array(date.getDay() + 1).fill("●"), ...new Array(6 - date.getDay()).fill("○")].join(' '),
    })
  }
}
