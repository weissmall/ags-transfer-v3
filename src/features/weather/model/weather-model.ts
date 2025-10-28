import { interval, Timer } from "ags/time";
import { fetch } from "ags/fetch"
import { Config, getConfig } from "~/config";
import WeatherEndpoints from "~/src/features/weather/model/weather-endpoints";
import WeatherDTO from "~/src/features/weather/dtos/weather-dto";
import IWeatherModel from "~/src/features/weather/vm/i-weather-model";


export default class WeatherModel implements IWeatherModel {
  private endpoints: WeatherEndpoints
  private config: Config;

  private timer?: Timer | undefined;

  constructor(endpoints?: WeatherEndpoints, config?: Config) {
    this.endpoints = endpoints ?? new WeatherEndpoints();
    this.config = config ?? getConfig();
  }

  public startRefresh(callback: (weather: WeatherDTO) => void) {
    this.timer = interval(
      this.config.weather.refresh.refreshInterval,
      async () => {
        const weather = await this.fetch();
        callback(weather);
      });
  }

  public stopRefresh() {
    this.timer?.cancel();
  }

  public async fetch(): Promise<WeatherDTO> {
    const url = this.endpoints.getWeather()
    const res = await fetch(url)
    const json = await res.json() as WeatherDTO
    return json;
  }
}
