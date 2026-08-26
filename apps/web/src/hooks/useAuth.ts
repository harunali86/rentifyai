"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface User {
    id: string;
    email: string;
    role: 'USER' | 'ADMIN' | 'AGENT';
    name: string;
}

export function useAuth(requireAdmin = false) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            setLoading(false);
            if (requireAdmin) router.push('/login');
            return;
        }

        // Basic mock decode since we don't have jwt-decode installed yet
        // In prod, use jwt-decode library
        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));

            const decoded = JSON.parse(jsonPayload);
            setUser(decoded);

            if (requireAdmin && decoded.role !== 'ADMIN') {
                router.push('/'); // Unauthorized
            }
        } catch (e) {
            console.error("Failed to decode token", e);
            localStorage.removeItem('token');
        } finally {
            setLoading(false);
        }
    }, [requireAdmin, router]);

    return { user, loading, isAuthenticated: !!user };
}
