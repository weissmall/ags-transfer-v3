import { URL } from "ags/fetch";
export default class Endpoints {

  build(base: string, query: Record<string, string>) {
    const queryStr = this.buildQueryObj(query);
    return new URL(`${base}?${queryStr}`);
  }

  buildQueryArg(key: string, value: string): string {
    return `${key}=${value}`
  }

  buildQueryObj(queryObj: Record<string, string>): string {
    const args: string[] = [];
    for (let key of Object.keys(queryObj)) {
      const value = queryObj[key];
      args.push(this.buildQueryArg(key, value));
    }

    return args.join("&");
  }
}
