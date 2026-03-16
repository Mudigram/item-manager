'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { User } from '../types';

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (userData: User, token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();

    useEffect(() => {

        const stored = Cookies.get('user');
        if (stored) {
            try {
                setUser(JSON.parse(stored));
            } catch {
                Cookies.remove('user');
            }
        }
        setLoading(false);
    }, []);

    const login = (userData: User, token: string): void => {
        Cookies.set('token', token, { expires: 7 });
        Cookies.set('user', JSON.stringify(userData), { expires: 7 });
        setUser(userData);
    };

    const logout = (): void => {
        Cookies.remove('token');
        Cookies.remove('user');
        setUser(null);
        router.push('/login');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = (): AuthContextType => useContext(AuthContext);