import Endpoints from "~/src/core/endpoints/endpoints";
import { URL } from "ags/fetch";
import { Config, getConfig } from "~/config";

export default class WeatherEndpoints extends Endpoints {
  private readonly config: Config

  constructor() {
    super();
    this.config = getConfig();
  }

  public getWeather(): URL {
    return this.build(
      this.config.weather.apiSettings.baseUrl,
      {
        id: this.config.weather.apiSettings.cityId,
        appid: this.config.weather.apiSettings.apiKey,
        units: this.config.weather.apiSettings.units,
        cnt: this.config.weather.apiSettings.cnt,
        lang: this.config.weather.apiSettings.language,
      }
    )
  }
}
