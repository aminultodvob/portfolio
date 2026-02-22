import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { api } from "@/lib/api";

interface AuthCtx {
    isAuthenticated: boolean;
    email: string | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    loading: boolean;
}

const AuthContext = createContext<AuthCtx>({
    isAuthenticated: false,
    email: null,
    login: async () => { },
    logout: () => { },
    loading: true,
});

export function AuthProvider({ children }: { children: ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [email, setEmail] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("admin_token");
        if (!token) {
            setLoading(false);
            return;
        }
        api.verify()
            .then((res) => {
                setIsAuthenticated(true);
                setEmail(res.email);
            })
            .catch(() => {
                localStorage.removeItem("admin_token");
            })
            .finally(() => setLoading(false));
    }, []);

    const login = async (emailInput: string, password: string) => {
        const res = await api.login(emailInput, password);
        localStorage.setItem("admin_token", res.token);
        setIsAuthenticated(true);
        setEmail(res.email);
    };

    const logout = () => {
        localStorage.removeItem("admin_token");
        setIsAuthenticated(false);
        setEmail(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, email, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
