import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '@/store';
import { logout, clearError } from '@/store/slices/auth-slice';
import { loginUser, registerUser } from '@/features/auth/api';
import type { CreateUserInput, LoginUserInput } from '@/features/auth/types';

export const useAuth = () => {
    const dispatch = useDispatch<AppDispatch>();
    const auth = useSelector((state: RootState) => state.auth);

    const login = async (credentials: LoginUserInput) => {
        return dispatch(loginUser(credentials));
    };

    const register = async (userData: CreateUserInput) => {
        return dispatch(registerUser(userData));
    };

    const logoutUser = () => {
        dispatch(logout());
    };

    const clearAuthError = () => {
        dispatch(clearError());
    };

    return {
        ...auth,
        login,
        register,
        logout: logoutUser,
        clearError: clearAuthError,
    };
};
