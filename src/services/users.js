import api from './api';

export const usersService = {
    getAllUsers: async () => {
        const response = await api.get('/users?limit=100');
        return response.data;
    },

    getUserById: async (id) => {
        const response = await api.get(`/users/${id}`);
        return response.data;
    },

    getUserCart: async (userId) => {
        // Fetch carts for a user
        const response = await api.get(`/carts/user/${userId}`);
        return response.data;
    }
};
