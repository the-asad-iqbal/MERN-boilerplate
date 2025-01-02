import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import axios from '@/lib/axios';

interface User {
    name: string;
    email: string;
}

interface AuthContextType {
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (user: User) => void;
    logout: () => void;
    refresh: () => Promise<void>;
    user: User | null;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState<User | null>(null);

    const checkAuth = useCallback(async () => {
        try {
            const response = await axios.get('/user/me');

            if (response.status === 200) {
                const { data } = response.data;
                setIsAuthenticated(true);
                setUser(data);
            }
        } catch (error) {
            setIsAuthenticated(false);
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    const login = useCallback((userData: User) => {
        setUser(userData);
    }, []);

    const logout = useCallback(() => {
        setUser(null);
    }, []);

    const refresh = useCallback(() => checkAuth(), [checkAuth]);

    if (isLoading) {
        return null;
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout, refresh, user }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
