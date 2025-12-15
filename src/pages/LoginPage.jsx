import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usersService } from '../services/users';
import { useDispatch } from 'react-redux';
import { login } from '../store/authSlice';
import { User, Mail } from 'lucide-react';

const LoginPage = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await usersService.getAllUsers();
                setUsers(data.users);
            } catch (err) {
                console.error('Failed to load users', err);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const handleLogin = (user) => {
        dispatch(login(user));
        navigate('/profile');
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[50vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Sign In</h1>
                <p className="text-gray-500">Select a user account to simulate login (Mock Auth)</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {users.map((user) => (
                    <button
                        key={user.id}
                        onClick={() => handleLogin(user)}
                        className="flex items-center gap-4 p-4 bg-white border border-gray-100 rounded-xl hover:shadow-md hover:border-blue-200 transition-all text-left group"
                    >
                        <img
                            src={user.image}
                            alt={user.firstName}
                            className="w-12 h-12 rounded-full border border-gray-200 group-hover:border-blue-500 transition-colors"
                        />
                        <div className="overflow-hidden">
                            <h3 className="font-semibold text-gray-900 truncate group-hover:text-blue-600">
                                {user.firstName} {user.lastName}
                            </h3>
                            <p className="text-xs text-gray-500 truncate flex items-center gap-1">
                                <Mail className="w-3 h-3" /> {user.email}
                            </p>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default LoginPage;
