import BaseVM from "~/src/core/mvvm/base-vm";

export type WeatherStateVM = {
  temperature?: string;
  wind?: string;
  humidity?: string;
}

export type IWeatherVM = BaseVM<WeatherStateVM>;
