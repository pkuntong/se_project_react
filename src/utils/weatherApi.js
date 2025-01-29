function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  // Improved error message with status text
  return Promise.reject(`Error: ${res.status} ${res.statusText}`);
}

export const getWeather = ({ latitude, longitude }, APIkey) => {
  if (!APIkey) {
    console.error("API key is missing! Please add your OpenWeather API key.");
    return Promise.reject("API key is missing!");
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`;
  console.log("Fetching weather data from URL:", url); // Debugging log

  return fetch(url)
    .then(checkResponse)
    .catch((error) => {
      console.error("Failed to fetch weather data:", error);
      return Promise.reject(error); // Explicit rejection to propagate the error
    });
};

export const filterWeatherData = (data) => {
  try {
    // Extract relevant data with better validation
    const result = {
      city: data?.name || "Unknown Location",
      temp: {
        F: Math.round(data?.main?.temp ?? 0), // Default to 0 if temp is missing
        C: Math.round(((data?.main?.temp ?? 0) - 32) * 5 / 9),
      },
      type: getWeatherType(data?.main?.temp ?? 0),
      condition: data?.weather?.[0]?.main?.toLowerCase() || "unknown",
      isDay: isDay(data?.sys, Date.now()),
    };
    return result;
  } catch (error) {
    console.error("Failed to filter weather data:", error);
    throw new Error("Invalid weather data structure");
  }
};

const isDay = ({ sunrise, sunset } = {}, now) => {
  if (!sunrise || !sunset) {
    console.warn("Sunrise/sunset data is missing.");
    return false; // Default to night if data is invalid
  }
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