import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ManageRestaurants.css';

const ManageRestaurants = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [newRestaurant, setNewRestaurant] = useState({ name: '', address: '', phone: '', email: '', logo: '' });
    const [editRestaurant, setEditRestaurant] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRestaurants = async () => {
            setLoading(true);
            try {
                const response = await fetch('http://192.168.3.178:8081/api/all/restaurants');
                if (response.ok) {
                    const data = await response.json();
                    setRestaurants(data);
                }
            } catch (error) {
                console.error('Failed to fetch restaurants:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchRestaurants();
    }, []);

    const handleAddRestaurant = async () => {
        try {
            const response = await fetch('http://192.168.3.178:8081/api/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newRestaurant),
            });
            if (response.ok) {
                const data = await response.json();
                setRestaurants([...restaurants, data]);
                setNewRestaurant({ name: '', address: '', phone: '', email: '', logo: '' });
            }
        } catch (error) {
            console.error('Failed to add restaurant:', error);
        }
    };

    const handleUpdateRestaurant = async (id) => {
        try {
            const response = await fetch(`http://192.168.3.178:8081/api/restaurant/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editRestaurant),
            });
            if (response.ok) {
                const updatedRestaurant = await response.json();
                setRestaurants(restaurants.map(r => (r.id === id ? updatedRestaurant : r)));
                setEditRestaurant(null);
            }
        } catch (error) {
            console.error('Failed to update restaurant:', error);
        }
    };

    const handleDeleteRestaurant = async (id) => {
        try {
            await fetch(`http://192.168.3.178:8081/api/restaurant/${id}`, {
                method: 'DELETE',
            });
            setRestaurants(restaurants.filter(r => r.id !== id));
        } catch (error) {
            console.error('Failed to delete restaurant:', error);
        }
    };

    return (
        <div className="manage-restaurants">
            <h2>Manage Restaurants</h2>
            <div className="add-restaurant">
                <h3>Add Restaurant</h3>
                <div className='form-item'>
                    <label htmlFor='Restaurant Name'>Restaurant Name:</label>
                    <input
                        type="text"
                        placeholder="Name"
                        value={newRestaurant.name}
                        onChange={(e) => setNewRestaurant({ ...newRestaurant, name: e.target.value })}
                    />
                </div>
                <div className='form-item'>
                    <label htmlFor='Address' >Address:</label>
                    <input
                        type="text"
                        placeholder="Address"
                        value={newRestaurant.address}
                        onChange={(e) => setNewRestaurant({ ...newRestaurant, address: e.target.value })}
                    />
                </div>
                <div className='form-item'>
                    <label htmlFor='Phone'>Phone:</label>
                    <input
                        type="number"
                        placeholder="Phone"
                        value={newRestaurant.phone}
                        onChange={(e) => setNewRestaurant({ ...newRestaurant, phone: e.target.value })}
                    />
                </div>
                <div className='form-item'>
                    <label htmlFor='Email'>Email:</label>
                    <input
                        type="email"
                        placeholder="Email"
                        value={newRestaurant.email}
                        onChange={(e) => setNewRestaurant({ ...newRestaurant, email: e.target.value })}
                    />
                </div>
                <div className='form-item'>
                    <label htmlFor="Logo">Logo:</label>
                    <input
                        type="file"
                        placeholder="Upload Restaurant Logo Image"
                        value={newRestaurant.logo}
                        onChange={(e) => setNewRestaurant({ ...newRestaurant, logo: e.target.value })}
                    />
                </div>
                <button onClick={handleAddRestaurant}>Add Restaurant</button>
            </div>
            <div className="restaurants-list">
                <h3>Existing Restaurants</h3>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    restaurants.map(restaurant => (
                        <div key={restaurant.id} className="restaurant">
                            <h4>{restaurant.name}</h4>
                            <p>{restaurant.address}</p>
                            <p>{restaurant.phone}</p>
                            <p>{restaurant.email}</p>
                            <img src={restaurant.logo} alt={restaurant.name} />
                            <button onClick={() => setEditRestaurant(restaurant)}>Edit</button>
                            <button onClick={() => handleDeleteRestaurant(restaurant.id)}>Delete</button>
                            <button onClick={() => navigate(`/admin/menu/${restaurant.id}`)}>Manage Menu</button>
                        </div>
                    ))
                )}
            </div>
            {editRestaurant && (
                <div className="edit-restaurant">
                    <h3>Edit Restaurant</h3>
                    <div className='form-item'>
                        <label htmlFor='Restaurant Name'>Restaurant Name:</label>
                        <input
                            type="text"
                            value={editRestaurant.name}
                            onChange={(e) => setEditRestaurant({ ...editRestaurant, name: e.target.value })}
                        />
                    </div>
                    <div className='form-item'>
                        <label htmlFor='Address' >Address:</label>
                        <input
                            type="text"
                            value={editRestaurant.address}
                            onChange={(e) => setEditRestaurant({ ...editRestaurant, address: e.target.value })}
                        />
                    </div>
                    <div className='form-item'>
                        <label htmlFor='Phone'>Phone:</label>
                        <input
                            type="number"
                            value={editRestaurant.phone}
                            onChange={(e) => setEditRestaurant({ ...editRestaurant, phone: e.target.value })}
                        />
                    </div>
                    <div className='form-item'>
                        <label htmlFor='Email'>Email:</label>
                        <input
                            type="email"
                            value={editRestaurant.email}
                            onChange={(e) => setEditRestaurant({ ...editRestaurant, email: e.target.value })}
                        />
                    </div>
                    <div className='form-item'>
                        <label htmlFor="Logo">Logo:</label>
                        <input
                            type="file"
                            value={editRestaurant.logo}
                            onChange={(e) => setEditRestaurant({ ...editRestaurant, logo: e.target.value })}
                        />
                    </div>
                    <button onClick={() => handleUpdateRestaurant(editRestaurant.id)}>Save Changes</button>
                </div>
            )}
        </div>
    );
};

export default ManageRestaurants;
