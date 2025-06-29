import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, User } from '@/features/auth/types';
import {loginUser, registerUser} from "@/features/auth/api";

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';

const loadFromStorage = () => {
    try {
        const token = localStorage.getItem(TOKEN_KEY);
        const userStr = localStorage.getItem(USER_KEY);
        const user = userStr ? JSON.parse(userStr) : null;

        return {
            token,
            user,
            isAuthenticated: !!(token && user)
        };
    } catch (error) {
        console.error('Error loading auth data from storage:', error);
        return {
            token: null,
            user: null,
            isAuthenticated: false
        };
    }
};

const saveToStorage = (token: string, user: User) => {
    try {
        localStorage.setItem(TOKEN_KEY, token);
        localStorage.setItem(USER_KEY, JSON.stringify(user));
    } catch (error) {
        console.error('Error saving auth data to storage:', error);
    }
};

const clearStorage = () => {
    try {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
    } catch (error) {
        console.error('Error clearing auth data from storage:', error);
    }
};

const storedAuth = loadFromStorage();

const initialState: AuthState = {
    user: storedAuth.user,
    token: storedAuth.token,
    isAuthenticated: storedAuth.isAuthenticated,
    loading: false,
    error: null,
};

// Auth slice
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            state.error = null;
            clearStorage();
        },
        updateUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
            if (state.token) {
                saveToStorage(state.token, action.payload);
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.data;
                state.token = action.payload.token;
                state.isAuthenticated = true;
                state.error = null;
                saveToStorage(action.payload.token, action.payload.data);
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Login failed';
                state.user = null;
                state.token = null;
                state.isAuthenticated = false;
            })
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.data;
                state.token = action.payload.token;
                state.isAuthenticated = true;
                state.error = null;
                saveToStorage(action.payload.token, action.payload.data);
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Registration failed';
                state.user = null;
                state.token = null;
                state.isAuthenticated = false;
            });
    },
});

export const { clearError, logout, updateUser } = authSlice.actions;
export default authSlice.reducer;
