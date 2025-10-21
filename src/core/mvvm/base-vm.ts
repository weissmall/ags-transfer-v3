import Store from "~/src/core/store/store";

export default abstract class BaseVM<T> {
  protected state: Store<T>;

  public get agsState() {
    return this.state.getAgsState();
  }

  public getAgsPartState<R = T>(transform: (value: T) => R) {
    return this.agsState(transform);
  }

  constructor(defaultStoreValue: T) {
    this.state = new Store(defaultStoreValue);
  }
}
