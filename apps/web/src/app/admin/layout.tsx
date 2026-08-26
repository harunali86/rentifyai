"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { useAuth } from "@/hooks/useAuth"; // Assuming hook exists, or we check token
import { Loader2 } from "lucide-react";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    // Temporary mock for "Is Admin" check until we connect strictly to useAuth
    // effectively we want to block access if token is missing or role != ADMIN

    useEffect(() => {
        // In a real app, verify JWT role here.
        // For now, we allow render but would redirect if API returns 403.
        const token = localStorage.getItem('token');
        if (!token) {
            // router.push('/login');
        }
        setIsLoading(false);
    }, []);

    if (isLoading) {
        return (
            <div className="h-screen w-full flex items-center justify-center bg-slate-50">
                <Loader2 className="w-8 h-8 text-[#006AFF] animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 pl-64 transition-all duration-300">
            <AdminSidebar />
            <div className="flex-1 flex flex-col h-screen overflow-hidden">
                {/* Header */}
                <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-40">
                    <h1 className="text-sm font-semibold text-gray-500 uppercase tracking-widest">
                        Command Center
                    </h1>
                    <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full bg-gray-200 border border-gray-300 overflow-hidden">
                            {/* Avatar */}
                            <img src="https://github.com/shadcn.png" alt="Admin" />
                        </div>
                    </div>
                </header>

                {/* Main Scrollable Content */}
                <main className="flex-1 overflow-auto p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
