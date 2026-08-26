
import Link from 'next/link';
import { Home, Plus, Settings, LogOut, LayoutDashboard, User, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function AgentLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // Simple server-side auth check
    const cookieStore = await cookies();
    const token = cookieStore.get('access_token');
    const userCookie = cookieStore.get('user_info');
    const user = userCookie ? JSON.parse(userCookie.value) : null;

    if (!token) {
        redirect('/login');
    }

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 fixed inset-y-0 z-30 hidden md:flex flex-col">
                <div className="h-16 flex items-center px-6 border-b border-gray-100">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center">
                            <Home className="text-white w-5 h-5" />
                        </div>
                        <span className="font-bold text-xl text-brand-900 tracking-tight">RentifyAI</span>
                    </Link>
                </div>

                <nav className="p-4 space-y-1 flex-grow">
                    <Link href="/agent/dashboard" className="flex items-center gap-3 px-4 py-3 text-brand-700 bg-brand-50 rounded-xl font-medium">
                        <LayoutDashboard className="w-5 h-5" />
                        Dashboard
                    </Link>
                    <Link href="/agent/leads" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-xl font-medium transition-colors">
                        <MessageSquare className="w-5 h-5" />
                        Inquiries
                    </Link>
                    <Link href="/agent/post" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-xl font-medium transition-colors">
                        <Plus className="w-5 h-5" />
                        Add Property
                    </Link>
                    <Link href="/agent/properties" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-xl font-medium transition-colors">
                        <Home className="w-5 h-5" />
                        My Properties
                    </Link>
                    <Link href="/agent/profile" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-xl font-medium transition-colors">
                        <User className="w-5 h-5" />
                        Profile
                    </Link>
                </nav>

                <div className="p-4 border-t border-gray-100">
                    <div className="flex items-center gap-3 px-4 py-3 mb-2">
                        <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                            {user?.avatar && <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">{user?.name || 'Agent'}</p>
                            <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                        </div>
                    </div>

                    <form action={async () => {
                        'use server';
                        const { cookies } = require('next/headers');
                        const cookieStore = await cookies();
                        cookieStore.delete('access_token');
                        cookieStore.delete('user_info');
                        const { redirect } = require('next/navigation');
                        redirect('/login');
                    }}>
                        <Button variant="outline" size="sm" className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 border-red-100">
                            <LogOut className="w-4 h-4 mr-2" /> Sign Out
                        </Button>
                    </form>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 md:ml-64">
                <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 md:px-12 sticky top-0 z-20">
                    <h1 className="text-xl font-bold text-gray-900">Agent Area</h1>
                    <div className="flex items-center gap-4">
                        <Link href="/agent/post">
                            <Button variant="premium" size="sm" className="gap-2">
                                <Plus className="w-4 h-4" /> Add Property
                            </Button>
                        </Link>
                    </div>
                </header>

                <main className="p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
