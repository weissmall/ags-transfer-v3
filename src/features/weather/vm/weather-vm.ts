import WeatherModel from "~/src/features/weather/model/weather-model";
import WeatherDTO from "~/src/features/weather/model/weather-dto";
import BaseVM from "~/src/core/mvvm/base-vm";

type WeatherState = {
  temperature?: string;
  wind?: string;
  humidity?: string;
}

export default class WeatherVM extends BaseVM<WeatherState> {
  private model: WeatherModel;

  constructor(model?: WeatherModel) {
    super({})
    this.model = model ?? new WeatherModel();

    this.initWeather().then(() => {
      console.log("Initialized weather");
    }).catch((err) => {
      console.error(`Failed to initialize error: ${JSON.stringify(err)}`)
    });

    this.initRefresh();
  }

  private async initWeather() {
    const weather = await this.model.fetch();
    this.setWeather(weather);
  }

  private initRefresh() {
    this.model.startRefresh((weather) => this.setWeather(weather));
  }

  private setWeather(w: WeatherDTO) {
    this.state.set({
      temperature: `Today's in ${w.name} is ${w.weather[0].main} with temperature ${w.main.temp}°C`,
      wind: `Wind speed in your location is ${w.wind.speed}kmh`,
      humidity: `And Humidity is ${w.main.humidity}%`,
    })
  }
}
