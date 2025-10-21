import { Accessor, createBinding } from "ags";
import GObject from "gi://GObject";

type DisposeFunction = () => void;

export default class BaseModel {
  private subscriptions: DisposeFunction[] = [];

  public dispose() {
    this.subscriptions.forEach((fn) => fn());
  }

  protected getBindingSubscription<T extends GObject.Object, P extends keyof T>(
    object: T,
    key: Extract<P, string>,
    callback: (property: T[P]) => void,
  ) {
    const binding = createBinding(object, key);
    const subscription = binding.subscribe(() => callback(binding.get()))
    this.subscriptions.push(subscription);
  }

  protected getAccessorSubscription<T>(accessor: Accessor<T>, callback: (value: T) => void) {
    const subscription = accessor.subscribe(() => callback(accessor.get()))
    this.subscriptions.push(subscription);
  }
}
