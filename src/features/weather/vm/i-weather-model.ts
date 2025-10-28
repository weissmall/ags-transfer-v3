import WeatherDTO from "~/src/features/weather/dtos/weather-dto";

export default interface IWeatherModel {
  startRefresh(callback: (weather: WeatherDTO) => void): void;
  stopRefresh(): void;
  fetch(): Promise<WeatherDTO>;
}
