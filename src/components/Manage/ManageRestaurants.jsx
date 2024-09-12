import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ManageRestaurants.css';

const ManageRestaurants = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [newRestaurant, setNewRestaurant] = useState({ Name: '', Address: '', Phone: '', Email: '', Logo_image: null });
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
        const formData = new FormData();
        formData.append('Name', newRestaurant.Name);
        formData.append('Address', newRestaurant.Address);
        formData.append('Phone', newRestaurant.Phone);
        formData.append('Email', newRestaurant.Email);
        if (newRestaurant.Logo_image) {
            formData.append('Logo_image', newRestaurant.Logo_image);
        }

        try {
            const response = await fetch('http://192.168.3.178:8081/api/add', {
                method: 'POST',
                body: formData,
            });
            if (response.ok) {
                const data = await response.json();
                setRestaurants([...restaurants, data]);
                setNewRestaurant({ Name: '', Address: '', Phone: '', Email: '', Logo_image: null });
            }
        } catch (error) {
            console.error('Failed to add restaurant:', error);
        }
    };

    const handleUpdateRestaurant = async (id) => {
        const formData = new FormData();
        formData.append('Name', editRestaurant.Name);
        formData.append('Address', editRestaurant.Address);
        formData.append('Phone', editRestaurant.Phone);
        formData.append('Email', editRestaurant.Email);
        if (editRestaurant.Logo_image) {
            formData.append('Logo_image', editRestaurant.Logo_image);
        }

        try {
            const response = await fetch(`http://192.168.3.178:8081/api/restaurant/${id}`, {
                method: 'PUT',
                body: formData,
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

    const getImageUrl = (path) => {
        if (!path) return ''; // Return an empty string or a default image URL
        return `http://192.168.3.178:8081/${path.replace(/\\/g, '/')}`;
    };

    const handleCancel = () => {
        setEditRestaurant(null);
    };

    return (
        <div className="manage-restaurants">
            <h2>Manage Restaurants</h2>
            <div className="add-restaurant">
                <h3>Add Restaurant</h3>
                <div className='form-item'>
                    <label htmlFor='Name'>Restaurant Name:</label>
                    <input
                        type="text"
                        placeholder="Name"
                        value={newRestaurant.Name}
                        onChange={(e) => setNewRestaurant({ ...newRestaurant, Name: e.target.value })}
                    />
                </div>
                <div className='form-item'>
                    <label htmlFor='Address'>Address:</label>
                    <input
                        type="text"
                        placeholder="Address"
                        value={newRestaurant.Address}
                        onChange={(e) => setNewRestaurant({ ...newRestaurant, Address: e.target.value })}
                    />
                </div>
                <div className='form-item'>
                    <label htmlFor='Phone'>Phone:</label>
                    <input
                        type="text"
                        placeholder="Phone"
                        value={newRestaurant.Phone}
                        onChange={(e) => setNewRestaurant({ ...newRestaurant, Phone: e.target.value })}
                    />
                </div>
                <div className='form-item'>
                    <label htmlFor='Email'>Email:</label>
                    <input
                        type="email"
                        placeholder="Email"
                        value={newRestaurant.Email}
                        onChange={(e) => setNewRestaurant({ ...newRestaurant, Email: e.target.value })}
                    />
                </div>
                <div className='form-item'>
                    <label htmlFor="Logo_image">Logo Image:</label>
                    <input
                        type="file"
                        onChange={(e) => setNewRestaurant({ ...newRestaurant, Logo_image: e.target.files[0] })}
                    />
                </div>
                <button onClick={handleAddRestaurant}>Add Restaurant</button>
            </div>
            <div className="restaurants-list">
                <h3>Existing Restaurants</h3>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <div className="restaurants-grid">
                        {restaurants.map(restaurant => (
                            <div key={restaurant.id} className="restaurant">
                                <img src={getImageUrl(restaurant.Logo_image)} alt={restaurant.Name} />
                                <h4>{restaurant.Name}</h4>
                                <p>{restaurant.Address}</p>
                                <p>{restaurant.Phone}</p>
                                <p>{restaurant.Email}</p>
                                <div className='control-button'>
                                    <button onClick={() => setEditRestaurant(restaurant)}>Edit</button>
                                    <button onClick={() => handleDeleteRestaurant(restaurant.id)}>Delete</button>
                                    <button onClick={() => navigate(`/admin/menu/${restaurant.id}`)}>Manage Menu</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            {editRestaurant && (
                <div className="edit-restaurant">
                    <h3>Edit Restaurant</h3>
                    <div className='form-item'>
                        <label htmlFor='Name'>Restaurant Name:</label>
                        <input
                            type="text"
                            value={editRestaurant.Name}
                            onChange={(e) => setEditRestaurant({ ...editRestaurant, Name: e.target.value })}
                        />
                    </div>
                    <div className='form-item'>
                        <label htmlFor='Address'>Address:</label>
                        <input
                            type="text"
                            value={editRestaurant.Address}
                            onChange={(e) => setEditRestaurant({ ...editRestaurant, Address: e.target.value })}
                        />
                    </div>
                    <div className='form-item'>
                        <label htmlFor='Phone'>Phone:</label>
                        <input
                            type="text"
                            value={editRestaurant.Phone}
                            onChange={(e) => setEditRestaurant({ ...editRestaurant, Phone: e.target.value })}
                        />
                    </div>
                    <div className='form-item'>
                        <label htmlFor='Email'>Email:</label>
                        <input
                            type="email"
                            value={editRestaurant.Email}
                            onChange={(e) => setEditRestaurant({ ...editRestaurant, Email: e.target.value })}
                        />
                    </div>
                    <div className='form-item'>
                        <label htmlFor="Logo_image">Logo:</label>
                        <input
                            type="file"
                            onChange={(e) => setEditRestaurant({ ...editRestaurant, Logo_image: e.target.files[0] })}
                        />
                    </div>
                    <div>
                        <button onClick={() => handleUpdateRestaurant(editRestaurant.id)}>Save Changes</button>
                        <button onClick={handleCancel}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageRestaurants;
