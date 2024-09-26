import React, { useState, useEffect } from 'react';
import './ManageUsers.css';
import EndPoints from '../../shared/DomainUrls';

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({ username: '', email: '', role: '', password: '' });
    const [editUser, setEditUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [shouldRerender, setShouldRerender] = useState(false);

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            try {
                const response = await fetch(EndPoints.AllUser);
                if (response.ok) {
                    const data = await response.json();
                    setUsers(data);
                }
            } catch (error) {
                console.error('Failed to fetch users:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [shouldRerender]);

    const handleAddUser = async () => {
        try {
            const response = await fetch(EndPoints.SignUp, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newUser),
            });
            if (response.ok) {
                const data = await response.json();
                setUsers([...users, data]);
                setNewUser({ username: '', email: '', role: '', password: '' });
                setShouldRerender(prevState => !prevState);
            }
        } catch (error) {
            console.error('Failed to add user:', error);
        }
    };

    const handleUpdateUser = async () => {
        if (editUser) {
            try {
                const response = await fetch(`${EndPoints.EditUser}${editUser.user_id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(editUser),
                });
                if (response.ok) {
                    const updatedUser = await response.json();
                    setUsers(users.map(user => (user.user_id === updatedUser.user_id ? updatedUser : user)));
                    setEditUser(null);
                    setShouldRerender(prevState => !prevState);
                }
            } catch (error) {
                console.error('Failed to update user:', error);
            }
        }
    };

    const handleDeleteUser = async (userId) => {
        try {
            const response = await fetch(`${EndPoints.DeleteUser}${userId}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                setUsers(users.filter(user => user.user_id !== userId));
            }
        } catch (error) {
            console.error('Failed to delete user:', error);
        }
    };
    const handlCancel = () => {
        setEditUser(null);
    }

    return (
        <div className="manage-users">
            <h2>Manage Users</h2>
            <div className="add-user">
                <h3>Add User</h3>
                <div className='form_item'>
                    <label htmlFor='Username'>Username:</label>
                    <input
                        type="text"
                        placeholder="Username"
                        value={newUser.username}
                        onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                    />
                </div>
                <div className='form_item'>
                    <label htmlFor='email'>Email:</label>
                    <input
                        type="email"
                        placeholder="Email"
                        value={newUser.email}
                        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    />
                </div>
                <div className='form_item'>
                    <label htmlFor='userRole'>Role:</label>
                    <input
                        type="text"
                        placeholder="Role"
                        value={newUser.role}
                        onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                    />
                </div>
                <div className='form_item'>
                    <label htmlFor='Password'>Password:</label>
                    <input
                        type='password'
                        placeholder='Enter Password'
                        value={newUser.password}
                        onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                    />
                </div>
                <button onClick={handleAddUser} className='add-user-button'>Add User</button>
            </div>
            <div className="users-list">
                <h3>Existing Users</h3>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    users.map(user => (
                        <div key={user.user_id} className="user">
                            <h4>{user.username}</h4>
                            <p>{user.email}</p>
                            <p>Role: {user.role}</p>
                            <div className='user-action'>
                                <button onClick={() => setEditUser(user)} className='user-action-buttons'>Edit</button>
                                <button onClick={() => handleDeleteUser(user.user_id)} className='user-action-buttons'>Delete</button>
                            </div>
                        </div>
                    ))
                )}
            </div>
            {editUser && (
                <div className="edit-user">
                    <h3>Edit User</h3>
                    <input
                        type="text"
                        value={editUser.username}
                        onChange={(e) => setEditUser({ ...editUser, username: e.target.value })}
                    />
                    <input
                        type="email"
                        value={editUser.email}
                        onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
                    />
                    <input
                        type="text"
                        value={editUser.role}
                        onChange={(e) => setEditUser({ ...editUser, role: e.target.value })}
                    />
                    <div className='user-action'>
                        <button onClick={handleUpdateUser} className='user-action-buttons'>Save Changes</button>
                        <button onClick={handlCancel} className='user-action-buttons'>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageUsers;

