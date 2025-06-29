import {createAsyncThunk} from "@reduxjs/toolkit";
import {AuthResponse, CreateUserInput, LoginUserInput} from "@/features/auth/types";
import {toast} from "sonner";

const API_BASE_URL = 'http://localhost:8080/api/auth';

export const loginUser = createAsyncThunk<
    AuthResponse,
    LoginUserInput,
    { rejectValue: string }
>(
    'auth/login',
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await fetch(`${API_BASE_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials),
            });

            const data: AuthResponse = await response.json();

            if (!response.ok) {
                toast.error("Login failed")
                return rejectWithValue(data.message || 'Login failed');
            }

            toast.success("Login successful!")

            return data;
        } catch (error) {
            toast.error("Login failed")
            return rejectWithValue(
                error instanceof Error ? error.message : 'Network error occurred'
            );
        }
    }
);


export const registerUser = createAsyncThunk<
    AuthResponse,
    CreateUserInput,
    { rejectValue: string }
>(
    'auth/register',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await fetch(`${API_BASE_URL}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            const data: AuthResponse = await response.json();

            if (!response.ok) {
                return rejectWithValue(data.message || 'Registration failed');
            }

            toast.success("Registration successful!")

            return data;
        } catch (error) {
            return rejectWithValue(
                error instanceof Error ? error.message : 'Network error occurred'
            );
        }
    }
);
