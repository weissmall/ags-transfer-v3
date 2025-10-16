import WeatherModel from "~/src/features/weather/model/weather-model";
import WeatherDTO from "~/src/features/weather/model/weather-dto";
import Store from "~/src/core/store/store";

type WeatherState = {
  temperature?: string;
  wind?: string;
  humidity?: string;
}

export default class WeatherVM {
  private model: WeatherModel;
  private store: Store<WeatherState>;

  get state() {
    return this.store.getAgsState();
  }

  constructor(model?: WeatherModel) {
    this.model = model ?? new WeatherModel();
    this.store = new Store({} as WeatherState);

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
    this.store.set({
      temperature: `Today's in ${w.name} is ${w.weather[0].main} with temperature ${w.main.temp}°C`,
      wind: `Wind speed in your location is ${w.wind.speed}kmh`,
      humidity: `And Humidity is ${w.main.humidity}%`,
    })
  }
}
