'use client';

import { Button } from "@/components/ui/button";
import { useAuthModal } from "@/lib/store/useAuthModal";
import Link from "next/link";
import { useEffect, useState } from "react";
import { User, LogOut } from "lucide-react";
import { getCookie } from "cookies-next";

export function AuthButtons() {
    const { open } = useAuthModal();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        // Check both cookie and localStorage for robustness
        const token = getCookie('token') || localStorage.getItem('token');
        setIsLoggedIn(!!token);
    }, []);

    if (!mounted) {
        return (
            <div className="flex items-center gap-4">
                <div className="w-16 h-9 bg-gray-100 rounded-lg animate-pulse"></div>
            </div>
        );
    }

    if (isLoggedIn) {
        return (
            <div className="flex items-center gap-4">
                <Link href="/dashboard">
                    <Button variant="ghost" size="sm" className="gap-2 font-medium">
                        <User className="w-4 h-4" />
                        Dashboard
                    </Button>
                </Link>
                {/* Optional: Add Sign Out here or keep it in Dashboard */}
            </div>
        );
    }

    return (
        <Button
            variant="ghost"
            size="sm"
            onClick={() => open('login')}
            className="font-bold text-gray-700 hover:text-brand-600 hover:bg-brand-50"
        >
            Log In
        </Button>
    );
}
