import React, { useEffect, useState } from 'react';
import MenuModal from '../../components/MenuModal/MenuModal';
import './Restaurants.css';

const Restaurants = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [selectedRestaurant, setSelectedRestaurant] = useState(null);
    const [menu, setMenu] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                const response = await fetch('http://192.168.3.178:8081/api/all/restaurants');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setRestaurants(data);
            } catch (error) {
                console.error('Failed to fetch restaurants:', error);
            }
        };

        fetchRestaurants();
    }, []);

    const fetchMenu = async (restaurantId) => {
        setLoading(true);
        try {
            const response = await fetch(`http://192.168.3.178:8081/api/menu/restaurant/${restaurantId}`);
            if (!response.ok) {
                throw new Error(`Network response was not ok. Status: ${response.status}`);
            }
            const data = await response.json();
            setMenu(data);
        } catch (error) {
            console.error('Failed to fetch menu:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleClick = (restaurant) => {
        console.log('Selected restaurant ID:', restaurant.id);
        setSelectedRestaurant(restaurant);
        fetchMenu(restaurant.id);
        setModalOpen(true);
    };

    const handleOk = () => {
        setModalOpen(false);
        setMenu('');
    };

    const handleCancel = () => {
        setModalOpen(false);
        setMenu('');
    };

    const logoImagePath = (logoImage) =>
        logoImage ? `http://192.168.3.178:8081/${logoImage.replace(/\\/g, '/')}` : 'https://via.placeholder.com/150';

    return (
        <div className="all-restaurants-container">
            {restaurants.length > 0 ? (
                restaurants.map((restaurant) => (
                    <div
                        className="restaurant-card"
                        key={restaurant.id}
                        onClick={() => handleClick(restaurant)}
                    >
                        <div className="restaurant-card-img">
                            <img src={logoImagePath(restaurant.Logo_image)} alt={restaurant.Name || 'Restaurant Image'} />
                        </div>
                        <div className="restaurant-card-info">
                            <h2 className="restaurant-card-name">{restaurant.Name || 'Unknown Restaurant'}</h2>
                            <p className="restaurant-card-address"><span>Address:</span> {restaurant.Address || 'N/A'}</p>
                            <p className='restaurant-card-phone'><span>Phone:</span> {restaurant.Phone || 'N/A'}</p>
                            <p className="restaurant-card-email"><span>Email:</span> {restaurant.Email || 'N/A'}</p>
                        </div>
                    </div>
                ))
            ) : (
                <p>No restaurants available.</p>
            )}

            {selectedRestaurant && (
                <MenuModal
                    open={modalOpen}
                    title={selectedRestaurant.Name}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    loading={loading}
                >
                    {loading ? (
                        <p>Loading menu...</p>
                    ) : menu.length > 0 ? (
                        <div>
                            <h3>Menu</h3>
                            <div className="menu-items-container">
                                {menu.map((item) => {
                                    const imageUrl = item.Image ? `http://192.168.3.178:8081/${item.Image.replace(/\\/g, '/')}` : 'https://via.placeholder.com/100';
                                    return (
                                        <div className="menu-item" key={item.id}>
                                            <div className="menu-item-img">
                                                <img src={imageUrl} alt={item.Item_name || 'Menu Item Image'} />
                                            </div>
                                            <div className="menu-item-info">
                                                <h4>{item.Item_name || 'Unnamed Item'}</h4>
                                                <p>{item.Description || 'No description'}</p>
                                                <p>Price: ${item.Price || 'N/A'}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ) : (
                        <p>No menu available.</p>
                    )}
                </MenuModal>
            )}
        </div>
    );
};

export default Restaurants;


