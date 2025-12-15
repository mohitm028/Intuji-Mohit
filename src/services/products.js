import api from './api';

export const productsService = {
    getAllProducts: async (limit = 30, skip = 0) => {
        const response = await api.get(`/products?limit=${limit}&skip=${skip}`);
        return response.data;
    },

    getProductById: async (id) => {
        const response = await api.get(`/products/${id}`);
        return response.data;
    },

    searchProducts: async (query) => {
        const response = await api.get(`/products/search?q=${query}`);
        return response.data;
    },

    getCategories: async () => {
        const response = await api.get('/products/categories');
        return response.data;
    },

    getProductsByCategory: async (category) => {
        const response = await api.get(`/products/category/${category}`);
        return response.data;
    }
};
