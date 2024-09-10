import React from 'react';
import './RestaurantsCard.css';
import { Link } from 'react-router-dom';

const RestaurantsCard = ({ restaurants }) => {
  const displayedRestaurants = restaurants.slice(0, 6);

  if (!Array.isArray(displayedRestaurants)) {
    return <p>Error: Restaurants data is not available.</p>;
  }
  
  return (
    <div className="restaurants-container">
      {displayedRestaurants.length > 0 ? (
        displayedRestaurants.map((restaurant) => {
          const logoImagePath = restaurant?.Logo_image
            ? `http://192.168.3.178:8081/${restaurant.Logo_image.replace(/\\/g, '/')}`
            : 'https://via.placeholder.com/150'; 

          return (
            <div className="restaurant-card" key={restaurant.id}>
              <div className="restaurant-card-img">
                <img src={logoImagePath} alt={restaurant.Name || 'Restaurant Image'} />
              </div>
              <div className="restaurant-card-info">
                <h2 className="restaurant-card-name">{restaurant.Name || 'Unknown Restaurant'}</h2>
                <p className="restaurant-card-address"><span>Address:</span> {restaurant.Address || 'N/A'}</p>
                <p className='restaurant-card-phone'><span>Phone:</span> {restaurant.Phone || 'N/A'}</p>
                <p className="restaurant-card-email"><span>Email:</span> {restaurant.Email || 'N/A'}</p>
              </div>
            </div>
          );
        })
      ) : (
        <p>No restaurants available.</p>
      )}
      <div className="view-all-container">
        <Link to="/restaurants" className="view-all-button">View All Restaurants</Link>
      </div>
    </div>
  );
};

export default RestaurantsCard;


