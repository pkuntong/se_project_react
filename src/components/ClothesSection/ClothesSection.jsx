import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";

function ClothesSection({
  onCardClick,
  clothingItems,
  handleAddClick,
  onCardLike,
}) {
  const currentUser = useContext(CurrentUserContext);

  // Ensure currentUser exists before filtering
  const userItems = clothingItems.filter((item) => {
    return item.owner?._id === currentUser?._id; // Safe check for owner and currentUser
  });

  // Check if currentUser is null and prevent rendering if needed
  if (!currentUser) {
    return (
      <div className="clothes-section">
        <p>You need to be logged in to view your items.</p>
      </div>
    );
  }

  return (
    <div className="clothes-section">
      <div className="clothes-section__text">
        <p>Your Items</p>
        <button
          onClick={handleAddClick}
          type="button"
          className="clothes-section__btn"
        >
          + Add New
        </button>
      </div>
      <ul className="clothes-section__list">
        {userItems.length > 0 ? (
          userItems.map((item) => {
            return (
              <ItemCard
                key={item._id}
                item={item}
                onCardClick={onCardClick}
                onCardLike={onCardLike}
              />
            );
          })
        ) : (
          <p>No clothing items found</p> // Message when no user items
        )}
      </ul>
    </div>
  );
}

export default ClothesSection;
