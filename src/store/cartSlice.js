import { createSlice } from '@reduxjs/toolkit';

const TAX_RATE = 0.10;

// Helper to load from localStorage
const loadCartState = () => {
    try {
        const serializedState = localStorage.getItem('redux-cart');
        if (serializedState === null) {
            return { items: [] };
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return { items: [] };
    }
};

const initialState = loadCartState();

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const product = action.payload;
            const existingItem = state.items.find((item) => item.id === product.id);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push({ ...product, quantity: 1 });
            }
        },
        removeFromCart: (state, action) => {
            const productId = action.payload;
            state.items = state.items.filter((item) => item.id !== productId);
        },
        updateQuantity: (state, action) => {
            const { id, quantity } = action.payload;
            const item = state.items.find((item) => item.id === id);
            if (item && quantity > 0) {
                item.quantity = quantity;
            }
        },
        clearCart: (state) => {
            state.items = [];
        }
    },
});

// Selectors
export const selectCartItems = (state) => state.cart.items;
export const selectCartTotals = (state) => {
    const items = state.cart.items;
    const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);
    const tax = subtotal * TAX_RATE;
    const total = subtotal + tax;
    return { subtotal, tax, total };
};

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
