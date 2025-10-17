import { Accessor, createState, State } from "ags";

export default class Store<T> {
  private state: State<T>;

  constructor(initialValue: T) {
    this.state = createState(initialValue);
  }

  public get(): T {
    return this.state[0].get();
  }

  public getAgsState(): Accessor<T> {
    return this.state[0];
  }

  public set(value: T) {
    console.log("Value to set:", value)
    const [_, setState] = this.state;
    setState(value);
  }

  public setPartial(value: Partial<T>, preserveNull: boolean = false) {
    if (typeof value != "object") {
      this.set(value);
      return;
    }

    if (preserveNull) {
      this.set(Object.assign({}, this.get(), value));
      return;
    }

    const entries = [];

    for (let [key, keyVal] of Object.entries(value)) {
      if (keyVal) {
        entries.push([key, keyVal]);
      }
    }

    this.set(Object.assign({}, this.get(), Object.fromEntries(entries)));
  }
}
