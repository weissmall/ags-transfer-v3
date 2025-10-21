import { exec } from "ags/process";
import GLib from "gi://GLib";

export function getEnv(env: string, fallback: string): string {
  return GLib.getenv(env) ?? fallback;
}

export function getEnvBool(env: string, fallback: boolean): boolean {
  const temp = getEnv(env, "");
  if (temp == "") {
    return fallback;
  }
  return new Boolean(temp) as boolean;
}

export function getConfig(): Config {
  return config;
}

export type Config = {
  weather: {
    apiSettings: {
      baseUrl: string,
      cityId: string,
      apiKey: string,
      units: string,
      cnt: string,
      language: string,
    },
    refresh: {
      enabled: boolean,
      refreshInterval: number,
    },
  },
  conky: {
    enabled: boolean,
  },
}

const config = {
  appTitle: "ags-transfer-dev",
  notifications: {
    enabled: true,
    dev: false,
    text: {
      maxSummaryLength: 30,
      maxBodyLength: 40,
    },
    defaultTimeoutMs: 3000,
  },
  bar: {
    enabled: true,
  },
  player: {
    enabled: false,
  },
  status: {
    enabled: true,
  },
  brightnessController: {
    pollInterval: 1000,
    // pollCommand: "brightnessctl get",
    pollCommand: "echo 100",
    postPoll: (cmdResult: string) => {
      return parseInt(cmdResult) / parseInt(exec("echo 100")) || 1;
      // return parseInt(cmdResult) / parseInt(exec("brightnessctl max")) || 1;
    }
  },
  weather: {
    apiSettings: {
      baseUrl: "https://api.openweathermap.org/data/2.5/weather",
      cityId: getEnv("WEATHER_CITY_ID", ""),
      apiKey: getEnv("WEATHER_API_KEY", ""),
      units: getEnv("WEATHER_UNITS", ""),
      language: getEnv("WEATHER_LANG", ""),
      cnt: "5",
    },
    refresh: {
      enabled: true,
      refreshInterval: 1000 * 60 * 60,
    },
  },
  conky: {
    enabled: getEnvBool("CONKY_ENABLED", false),
  },
  // const city_id = "498817"
  // const api_key = "2346fa4d5f6c0ab93c816ece6193746a"
  // const unit = "metric"
  // const lang = "en"
};

export default config;
