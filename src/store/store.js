import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import authReducer from './authSlice';

// Middleware to save to localStorage
const localStorageMiddleware = (store) => (next) => (action) => {
    const result = next(action);
    const state = store.getState();

    if (action.type.startsWith('cart/')) {
        localStorage.setItem('redux-cart', JSON.stringify(state.cart));
    }

    if (action.type.startsWith('auth/')) {
        localStorage.setItem('redux-auth', JSON.stringify(state.auth));
    }

    return result;
};

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(localStorageMiddleware),
});
