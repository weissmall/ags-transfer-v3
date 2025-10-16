import Store from "~/src/core/store/store";

export default abstract class BaseVM<T> {
  protected state: Store<T>;

  public get agsState() {
    return this.state.getAgsState();
  }

  constructor(defaultStoreValue: T) {
    this.state = new Store(defaultStoreValue);
  }
}
