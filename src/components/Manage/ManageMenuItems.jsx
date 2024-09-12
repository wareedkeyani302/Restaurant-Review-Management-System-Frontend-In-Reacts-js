import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './ManageMenuItems.css';

const ManageMenuItems = () => {
    const { restaurantId } = useParams();
    const [menuItems, setMenuItems] = useState([]);
    const [newMenuItem, setNewMenuItem] = useState({ name: '', description: '', price: '', image: '' });
    const [editMenuItem, setEditMenuItem] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchMenuItems = async () => {
            setLoading(true);
            try {
                const response = await fetch(`http://192.168.3.178:8081/api/menu/restaurant/${restaurantId}`);
                if (response.ok) {
                    const data = await response.json();
                    setMenuItems(data);
                }
            } catch (error) {
                console.error('Failed to fetch menu items:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchMenuItems();
    }, [restaurantId]);

    const handleAddMenuItem = async () => {
        try {
            const response = await fetch(`http://192.168.3.178:8081/api/add/menu`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...newMenuItem, restaurantId }),
            });
            if (response.ok) {
                const data = await response.json();
                setMenuItems([...menuItems, data]);
                setNewMenuItem({ name: '', description: '', price: '', image: '' });
            }
        } catch (error) {
            console.error('Failed to add menu item:', error);
        }
    };

    const handleUpdateMenuItem = async (id) => {
        try {
            const response = await fetch(`http://192.168.3.178:8081/api/menu/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editMenuItem),
            });
            if (response.ok) {
                const updatedItem = await response.json();
                setMenuItems(menuItems.map(item => (item.id === id ? updatedItem : item)));
                setEditMenuItem(null);
            }
        } catch (error) {
            console.error('Failed to update menu item:', error);
        }
    };

    const handleDeleteMenuItem = async (id) => {
        try {
            await fetch(`http://192.168.3.178:8081/api/menu/${id}`, {
                method: 'DELETE',
            });
            setMenuItems(menuItems.filter(item => item.id !== id));
        } catch (error) {
            console.error('Failed to delete menu item:', error);
        }
    };

    return (
        <div className="manage-menu-items">
            <h2>Manage Menu Items</h2>
            <div className="add-menu-item">
                <h3>Add Menu Item</h3>
                <input
                    type="text"
                    placeholder="Name"
                    value={newMenuItem.name}
                    onChange={(e) => setNewMenuItem({ ...newMenuItem, name: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={newMenuItem.description}
                    onChange={(e) => setNewMenuItem({ ...newMenuItem, description: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Price"
                    value={newMenuItem.price}
                    onChange={(e) => setNewMenuItem({ ...newMenuItem, price: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Image URL"
                    value={newMenuItem.image}
                    onChange={(e) => setNewMenuItem({ ...newMenuItem, image: e.target.value })}
                />
                <button onClick={handleAddMenuItem}>Add Menu Item</button>
            </div>
            <div className="menu-items-list">
                <h3>Existing Menu Items</h3>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    menuItems.map(item => (
                        <div key={item.id} className="menu-item">
                            <h4>{item.name}</h4>
                            <p>{item.description}</p>
                            <p>Price: ${item.price}</p>
                            <img src={item.image} alt={item.name} />
                            <button onClick={() => setEditMenuItem(item)}>Edit</button>
                            <button onClick={() => handleDeleteMenuItem(item.id)}>Delete</button>
                        </div>
                    ))
                )}
            </div>
            {editMenuItem && (
                <div className="edit-menu-item">
                    <h3>Edit Menu Item</h3>
                    <input
                        type="text"
                        value={editMenuItem.name}
                        onChange={(e) => setEditMenuItem({ ...editMenuItem, name: e.target.value })}
                    />
                    <input
                        type="text"
                        value={editMenuItem.description}
                        onChange={(e) => setEditMenuItem({ ...editMenuItem, description: e.target.value })}
                    />
                    <input
                        type="number"
                        value={editMenuItem.price}
                        onChange={(e) => setEditMenuItem({ ...editMenuItem, price: e.target.value })}
                    />
                    <input
                        type="text"
                        value={editMenuItem.image}
                        onChange={(e) => setEditMenuItem({ ...editMenuItem, image: e.target.value })}
                    />
                    <button onClick={() => handleUpdateMenuItem(editMenuItem.id)}>Save Changes</button>
                </div>
            )}
        </div>
    );
};

export default ManageMenuItems;
