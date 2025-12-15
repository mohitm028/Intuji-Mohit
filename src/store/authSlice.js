import { createSlice } from '@reduxjs/toolkit';

// Helper to load from localStorage
const loadAuthState = () => {
    try {
        const serializedState = localStorage.getItem('redux-auth');
        if (serializedState === null) {
            return { user: null, isAuthenticated: false };
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return { user: null, isAuthenticated: false };
    }
};

const initialState = loadAuthState();

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
        },
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
        },
    },
});

export const { login, logout } = authSlice.actions;
export const selectUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export default authSlice.reducer;
