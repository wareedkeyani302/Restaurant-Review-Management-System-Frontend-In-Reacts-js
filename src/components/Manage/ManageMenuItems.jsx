import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './ManageMenuItems.css';
import EndPoints from '../../shared/DomainUrls';

const ManageMenuItems = () => {
    const { restaurantId } = useParams();
    const [menuItems, setMenuItems] = useState([]);
    const [newMenuItem, setNewMenuItem] = useState({
        Item_name: '',
        Description: '',
        Price: '',
        Image: null,
    });
    const [editMenuItem, setEditMenuItem] = useState(null);
    const [loading, setLoading] = useState(false);
    const [shouldRerender, setShouldRerender] = useState(false);

    useEffect(() => {
        const fetchMenuItems = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${EndPoints.GetMenu}${restaurantId}`);
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
    }, [restaurantId, shouldRerender]);

    const handleAddMenuItem = async () => {
        try {
            const formData = new FormData();
            formData.append('Item_name', newMenuItem.Item_name);
            formData.append('Description', newMenuItem.Description);
            formData.append('Price', newMenuItem.Price);
            if (newMenuItem.Image) {
                formData.append('Image', newMenuItem.Image);
            }
            formData.append('restaurant_id', restaurantId);

            const response = await fetch(EndPoints.AddMenu, {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                setMenuItems([...menuItems, data]);
                setNewMenuItem({ Item_name: '', Description: '', Price: '', Image: null });
                setShouldRerender(prevState => !prevState);
            }
        } catch (error) {
            console.error('Failed to add menu item:', error);
        }
    };

    const handleUpdateMenuItem = async (id) => {
        try {
            const formData = new FormData();
            formData.append('Item_name', editMenuItem.Item_name);
            formData.append('Description', editMenuItem.Description);
            formData.append('Price', editMenuItem.Price);
            if (editMenuItem.Image) {
                formData.append('Image', editMenuItem.Image);
            }
            formData.append('restaurant_id', restaurantId);

            const response = await fetch(`${EndPoints.EditMenu}${id}`, {
                method: 'PUT',
                body: formData,
            });

            if (response.ok) {
                const updatedItem = await response.json();
                setMenuItems(menuItems.map(item => (item.id === id ? updatedItem : item)));
                setShouldRerender(prevState => !prevState);
                setEditMenuItem(null);
            }
        } catch (error) {
            console.error('Failed to update menu item:', error);
        }
    };

    const handleDeleteMenuItem = async (id) => {
        try {
            await fetch(`${EndPoints.DeleteUser}${id}`, {
                method: 'DELETE',
            });
            setMenuItems(menuItems.filter(item => item.id !== id));
        } catch (error) {
            console.error('Failed to delete menu item:', error);
        }
    };

    const handleImageChange = (e, setItem) => {
        const file = e.target.files[0];
        if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
            setItem(prev => ({ ...prev, Image: file }));
        } else {
            alert('Only .jpg and .png formats are allowed!');
        }
    };

    const getImageUrl = (path) => {
        if (!path) {
            return '';
        }
        return `http://192.168.3.178:8081/${path.replace(/\\/g, '/')}`;
    };

    const handleCancel = () => {
        setEditMenuItem(null);
    };

    return (
        <div className="manage-menu-items">
            <h2>Manage Menu Items</h2>
            <div className="add-menu-item">
                <h3>Add Menu Item</h3>
                <div className='form-item'>
                    <label htmlFor='ItemName'>Item Name:</label>
                    <input
                        type="text"
                        placeholder="Item Name"
                        value={newMenuItem.Item_name}
                        onChange={(e) => setNewMenuItem({ ...newMenuItem, Item_name: e.target.value })}
                    />
                </div>
                <div className='form-item'>
                    <label htmlFor='Description'>Description:</label>
                    <input
                        type="text"
                        placeholder="Description"
                        value={newMenuItem.Description}
                        onChange={(e) => setNewMenuItem({ ...newMenuItem, Description: e.target.value })}
                    />
                </div>
                <div className='form-item'>
                    <label htmlFor='Price'>Price:</label>
                    <input
                        type="number"
                        placeholder="Price"
                        value={newMenuItem.Price}
                        onChange={(e) => setNewMenuItem({ ...newMenuItem, Price: e.target.value })}
                    />
                </div>
                <div className='form-item'>
                    <label htmlFor='Image'>Menu Item Image:</label>
                    <input
                        type="file"
                        accept=".jpg, .png"
                        onChange={(e) => handleImageChange(e, setNewMenuItem)}
                    />
                </div>
                <button onClick={handleAddMenuItem} className='add-menu-button'>Add Menu Item</button>
            </div>
            <div className="menu-items-list">
                <h3>Existing Menu Items</h3>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <div className="menu-items-grid">
                        {menuItems.map(item => (
                            <div key={item.id} className="menu-item">
                                <img src={getImageUrl(item.Image)} alt={item.Item_name} />
                                <div className='menu-item-information'>
                                    <h4>{item.Item_name}</h4>
                                    <p>{item.Description}</p>
                                    <p>Price: ${item.Price}</p>
                                </div>
                                <div className='menu-item-action-buttons'>
                                    <button onClick={() => setEditMenuItem(item)} className='menu-action-button'>Edit</button>
                                    <button onClick={() => handleDeleteMenuItem(item.id)} className='menu-action-button'>Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            {editMenuItem && (
                <div className="edit-menu-item">
                    <h3>Edit Menu Item</h3>
                    <div className='form-item'>
                        <label htmlFor='ItemName'>Item Name:</label>
                        <input
                            type="text"
                            value={editMenuItem.Item_name}
                            onChange={(e) => setEditMenuItem({ ...editMenuItem, Item_name: e.target.value })}
                        />
                    </div>
                    <div className='form-item'>
                        <label htmlFor='Description'>Description:</label>
                        <input
                            type="text"
                            value={editMenuItem.Description}
                            onChange={(e) => setEditMenuItem({ ...editMenuItem, Description: e.target.value })}
                        />
                    </div>
                    <div className='form-item'>
                        <label htmlFor='Price'>Price:</label>
                        <input
                            type="number"
                            value={editMenuItem.Price}
                            onChange={(e) => setEditMenuItem({ ...editMenuItem, Price: e.target.value })}
                        />
                    </div>
                    <div className='form-item'>
                        <label htmlFor='Image'>Menu Item Image:</label>
                        <input
                            type="file"
                            accept=".jpg, .png"
                            onChange={(e) => handleImageChange(e, setEditMenuItem)}
                        />
                    </div>
                    <div className='menu-item-action-buttons'>
                        <button onClick={() => handleUpdateMenuItem(editMenuItem.id)} className='menu-action-button'>Save Changes</button>
                        <button onClick={handleCancel} className='menu-action-button'>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageMenuItems;
