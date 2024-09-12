import React, { useState, useEffect } from 'react';
import './ManageUsers.css';

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({ username: '', email: '', role: '' });
    const [editUser, setEditUser] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            try {
                const response = await fetch('http://192.168.3.178:8081/api/all/users');
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
    }, []);

    const handleAddUser = async () => {
        try {
            const response = await fetch('http://192.168.3.178:8081/api/add/user', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newUser),
            });
            if (response.ok) {
                const data = await response.json();
                setUsers([...users, data]);
                setNewUser({ username: '', email: '', role: '' });
            }
        } catch (error) {
            console.error('Failed to add user:', error);
        }
    };

    const handleUpdateUser = async (id) => {
        try {
            const response = await fetch(`http://192.168.3.178:8081/api/update/user/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editUser),
            });
            if (response.ok) {
                const updatedUser = await response.json();
                setUsers(users.map(user => (user.id === id ? updatedUser : user)));
                setEditUser(null);
            }
        } catch (error) {
            console.error('Failed to update user:', error);
        }
    };

    const handleDeleteUser = async (id) => {
        try {
            await fetch(`http://192.168.3.178:8081/api/delete/user/${id}`, {
                method: 'DELETE',
            });
            setUsers(users.filter(user => user.id !== id));
        } catch (error) {
            console.error('Failed to delete user:', error);
        }
    };

    return (
        <div className="manage-users">
            <h2>Manage Users</h2>
            <div className="add-user">
                <h3>Add User</h3>
                <input
                    type="text"
                    placeholder="Username"
                    value={newUser.username}
                    onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Role"
                    value={newUser.role}
                    onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                />
                <button onClick={handleAddUser}>Add User</button>
            </div>
            <div className="users-list">
                <h3>Existing Users</h3>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    users.map(user => (
                        <div key={user.id} className="user">
                            <h4>{user.username}</h4>
                            <p>{user.email}</p>
                            <p>Role: {user.role}</p>
                            <button onClick={() => setEditUser(user)}>Edit</button>
                            <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
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
                    <button onClick={() => handleUpdateUser(editUser.id)}>Save Changes</button>
                </div>
            )}
        </div>
    );
};

export default ManageUsers;
