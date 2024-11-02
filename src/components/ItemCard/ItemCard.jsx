import "./ItemCard.css"; 

function ItemCard({ item, onCardClick }) {

    const handleCardClick = () => {
        onCardClick(item);
    };

    return (
        <div className="card">
            <h2 className="card__title">
                <span className="card__title_type_background">{item.name}</span>
            </h2>
            <img 
              onClick={handleCardClick}
              className="card__image" 
              src={item.link} 
              alt={item.name} 
            />
           </div> 
        );
}

export default ItemCard;