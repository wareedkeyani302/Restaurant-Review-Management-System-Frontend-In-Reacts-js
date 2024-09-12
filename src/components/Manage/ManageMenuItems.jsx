// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import './ManageMenuItems.css';

// const ManageMenuItems = () => {
//     const { restaurantId } = useParams();
//     const [menuItems, setMenuItems] = useState([]);
//     const [newMenuItem, setNewMenuItem] = useState({ name: '', description: '', price: '', image: '' });
//     const [editMenuItem, setEditMenuItem] = useState(null);
//     const [loading, setLoading] = useState(false);

//     useEffect(() => {
//         const fetchMenuItems = async () => {
//             setLoading(true);
//             try {
//                 const response = await fetch(`http://192.168.3.178:8081/api/menu/restaurant/${restaurantId}`);
//                 if (response.ok) {
//                     const data = await response.json();
//                     setMenuItems(data);
//                 }
//             } catch (error) {
//                 console.error('Failed to fetch menu items:', error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchMenuItems();
//     }, [restaurantId]);

//     const handleAddMenuItem = async () => {
//         try {
//             const response = await fetch(`http://192.168.3.178:8081/api/add/menu`, {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ ...newMenuItem, restaurantId }),
//             });
//             if (response.ok) {
//                 const data = await response.json();
//                 setMenuItems([...menuItems, data]);
//                 setNewMenuItem({ name: '', description: '', price: '', image: '' });
//             }
//         } catch (error) {
//             console.error('Failed to add menu item:', error);
//         }
//     };

//     const handleUpdateMenuItem = async (id) => {
//         try {
//             const response = await fetch(`http://192.168.3.178:8081/api/menu/${id}`, {
//                 method: 'PUT',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify(editMenuItem),
//             });
//             if (response.ok) {
//                 const updatedItem = await response.json();
//                 setMenuItems(menuItems.map(item => (item.id === id ? updatedItem : item)));
//                 setEditMenuItem(null);
//             }
//         } catch (error) {
//             console.error('Failed to update menu item:', error);
//         }
//     };

//     const handleDeleteMenuItem = async (id) => {
//         try {
//             await fetch(`http://192.168.3.178:8081/api/menu/${id}`, {
//                 method: 'DELETE',
//             });
//             setMenuItems(menuItems.filter(item => item.id !== id));
//         } catch (error) {
//             console.error('Failed to delete menu item:', error);
//         }
//     };

//     return (
//         <div className="manage-menu-items">
//             <h2>Manage Menu Items</h2>
//             <div className="add-menu-item">
//                 <h3>Add Menu Item</h3>
//                 <div className='form-item'>
//                     <label htmlFor='ItemName'>Item Name:</label>
//                     <input
//                         type="text"
//                         placeholder="Item Name"
//                         value={newMenuItem.name}
//                         onChange={(e) => setNewMenuItem({ ...newMenuItem, name: e.target.value })}
//                     />
//                 </div>
//                 <div className='form-item'>
//                     <label htmlFor='Description'>Description:</label>
//                     <input
//                         type="text"
//                         placeholder="Description"
//                         value={newMenuItem.description}
//                         onChange={(e) => setNewMenuItem({ ...newMenuItem, description: e.target.value })}
//                     />
//                 </div>
//                 <div className='form-item'>
//                     <label htmlFor='Price'>Price:</label>
//                     <input
//                         type="number"
//                         placeholder="Price"
//                         value={newMenuItem.price}
//                         onChange={(e) => setNewMenuItem({ ...newMenuItem, price: e.target.value })}
//                     />
//                 </div>
//                 <div className='form-item'>
//                     <label htmlFor='Image'>Menu Item Image:</label>
//                     <input
//                         type="file"
//                         placeholder="Image URL"
//                         value={newMenuItem.image}
//                         onChange={(e) => setNewMenuItem({ ...newMenuItem, image: e.target.value })}
//                     />
//                 </div>
//                 <button onClick={handleAddMenuItem}>Add Menu Item</button>
//             </div>
//             <div className="menu-items-list">
//                 <h3>Existing Menu Items</h3>
//                 {loading ? (
//                     <p>Loading...</p>
//                 ) : (
//                     menuItems.map(item => (
//                         <div key={item.id} className="menu-item">
//                             <h4>{item.Item_name}</h4>
//                             <p>{item.Description}</p>
//                             <p>Price: ${item.Price}</p>
//                             <img src={item.Image} alt={item.name} />
//                             <button onClick={() => setEditMenuItem(item)}>Edit</button>
//                             <button onClick={() => handleDeleteMenuItem(item.id)}>Delete</button>
//                         </div>
//                     ))
//                 )}
//             </div>
//             {editMenuItem && (
//                 <div className="edit-menu-item">
//                     <h3>Edit Menu Item</h3>
//                     <div className='form-item'>
//                         <label htmlFor='Item Name'>Item_Name:</label>
//                         <input
//                             type="text"
//                             value={editMenuItem.name}
//                             onChange={(e) => setEditMenuItem({ ...editMenuItem, name: e.target.value })}
//                         />
//                     </div>
//                     <div className='form-item'>
//                         <label htmlFor='Description'>Description:</label>
//                         <input
//                             type="text"
//                             value={editMenuItem.description}
//                             onChange={(e) => setEditMenuItem({ ...editMenuItem, description: e.target.value })}
//                         />
//                     </div>
//                     <div className='form-item'>
//                         <label htmlFor='Price'>Price:</label>
//                         <input
//                             type="number"
//                             value={editMenuItem.price}
//                             onChange={(e) => setEditMenuItem({ ...editMenuItem, price: e.target.value })}
//                         />
//                     </div>
//                     <div className='form-item'>
//                         <label htmlFor='Menu Item Image'>Menu Item Image:</label>
//                         <input
//                             type="file"
//                             value={editMenuItem.image}
//                             onChange={(e) => setEditMenuItem({ ...editMenuItem, image: e.target.value })}
//                         />
//                     </div>
//                     <button onClick={() => handleUpdateMenuItem(editMenuItem.id)}>Save Changes</button>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default ManageMenuItems;

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './ManageMenuItems.css';

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
            const formData = new FormData();
            formData.append('Item_name', newMenuItem.Item_name);
            formData.append('Description', newMenuItem.Description);
            formData.append('Price', newMenuItem.Price);
            if (newMenuItem.Image) {
                formData.append('Image', newMenuItem.Image);
            }
            formData.append('restaurant_id', restaurantId);

            const response = await fetch('http://192.168.3.178:8081/api/add/menu', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                setMenuItems([...menuItems, data]);
                setNewMenuItem({ Item_name: '', Description: '', Price: '', Image: null });
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

            const response = await fetch(`http://192.168.3.178:8081/api/menu/${id}`, {
                method: 'PUT',
                body: formData,
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
                <button onClick={handleAddMenuItem}>Add Menu Item</button>
            </div>
            <div className="menu-items-list">
                <h3>Existing Menu Items</h3>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <div className="menu-items-grid">
                        {menuItems.map(item => (
                            <div key={item.id} className="menu-item">
                                <h4>{item.Item_name}</h4>
                                <p>{item.Description}</p>
                                <p>Price: ${item.Price}</p>
                                <img src={getImageUrl(item.Image)} alt={item.Item_name} />
                                <div style={{marginTop: '5px'}}>
                                <button onClick={() => setEditMenuItem(item)}>Edit</button>
                                <button onClick={() => handleDeleteMenuItem(item.id)}>Delete</button>
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
                    <div>
                        <button onClick={() => handleUpdateMenuItem(editMenuItem.id)}>Save Changes</button>
                        <button onClick={handleCancel}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageMenuItems;



