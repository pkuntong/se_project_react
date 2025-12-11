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

  const filteredItems = clothingItems.filter((item) => {
    return item.weather === weatherData.type;
  });

  return (
    <main className="main">
      <WeatherCard weatherData={weatherData} weatherTemp={temp} />
      <section className="cards">
        <h1 className="cards__text">
          Today is {temp} &deg; {currentTemperatureUnit} / You may want to wear:
        </h1>
        {filteredItems.length > 0 ? (
          <ul className="cards__list">
            {filteredItems.map((item) => {
              return (
                <ItemCard
                  key={item._id}
                  item={item}
                  onCardClick={onCardClick}
                  onCardLike={onCardLike}
                />
              );
            })}
          </ul>
        ) : (
          <p className="cards__empty">
            No clothing items found for {weatherData.type} weather. 
            {clothingItems.length > 0 
              ? ` You have ${clothingItems.length} item${clothingItems.length > 1 ? 's' : ''} in your collection, but none match this weather type.`
              : " Add some clothing items to get recommendations!"}
          </p>
        )}
      </section>
    </main>
  );
}

export default Main;