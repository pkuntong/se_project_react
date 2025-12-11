import { useContext } from "react";

import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

function Main({
  weatherData,
  weatherTemp,
  onCardClick,
  clothingItems,
  onCardLike,
}) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const temp = weatherTemp?.[currentTemperatureUnit] || 999;

  // Sort items: recommended (matching weather) first, then others
  const sortedItems = [...clothingItems].sort((a, b) => {
    const aMatches = a.weather === weatherData.type;
    const bMatches = b.weather === weatherData.type;
    if (aMatches && !bMatches) return -1;
    if (!aMatches && bMatches) return 1;
    return 0;
  });

  const recommendedCount = clothingItems.filter(item => item.weather === weatherData.type).length;

  return (
    <main className="main">
      <WeatherCard weatherData={weatherData} weatherTemp={temp} />
      <section className="cards">
        <h1 className="cards__text">
          Today is {temp} &deg; {currentTemperatureUnit} / You may want to wear:
        </h1>
        {clothingItems.length > 0 ? (
          <>
            {recommendedCount > 0 && (
              <p className="cards__recommended-text">
                {recommendedCount} recommended item{recommendedCount > 1 ? 's' : ''} for {weatherData.type} weather
              </p>
            )}
            <ul className="cards__list">
              {sortedItems.map((item) => {
                const isRecommended = item.weather === weatherData.type;
                return (
                  <ItemCard
                    key={item._id}
                    item={item}
                    onCardClick={onCardClick}
                    onCardLike={onCardLike}
                    isRecommended={isRecommended}
                    currentWeatherType={weatherData.type}
                  />
                );
              })}
            </ul>
          </>
        ) : (
          <div className="cards__empty">
            <p>Backend API is currently unavailable. Clothing items cannot be loaded at this time.</p>
          </div>
        )}
      </section>
    </main>
  );
}

export default Main;