import { checkResponse } from "./api";

export const getWeather = ({ latitude, longitude }, APIkey) => {
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`;
  return fetch(weatherUrl).then(checkResponse);
};

export const filterWeatherData = (data) => {
  const result = {};
  result.city = data.name || "";
  result.temp = {
    F: Math.round(data.main?.temp || 0),
    C: Math.round(((data.main?.temp || 0) - 32) * 5 / 9),
  };
  result.type = getWeatherType(result.temp.F);
  result.condition = data.weather?.[0]?.main?.toLowerCase() || "clear";
  result.isDay = data.sys ? isDay(data.sys, Date.now()) : true;
  return result;
};

const isDay = ({ sunrise, sunset }, now) => {
  return sunrise * 1000 < now && now < sunset * 1000;
};

const getWeatherType = (temperature) => {
  if (temperature >= 86) {
    return "hot";
  } else if (temperature >= 66) {
    return "warm";
  } else {
    return "cold";
  }
};