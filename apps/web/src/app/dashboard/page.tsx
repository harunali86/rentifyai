"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";
import { PropertyCard } from "@/components/property/PropertyCard";
import { RecommendedGrid } from "@/components/property/RecommendedGrid";
import { EmptyState } from "@/components/common/EmptyState";
import { Heart, Search, Settings, Home, LogOut } from "lucide-react";

export default function UserDashboard() {
    const [activeTab, setActiveTab] = useState("saved-homes");
    const [favorites, setFavorites] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchFavorites = async () => {
            const token = localStorage.getItem('token');
            if (!token) return router.push('/login');

            try {
                const res = await apiFetch('/users/favorites/my', {
                    headers: { Authorization: `Bearer ${token}` }
                });

                // Critical: Check if response is OK before parsing JSON
                if (res.ok) {
                    const data = await res.json();
                    setFavorites(data);
                } else {
                    console.warn(`Failed to fetch favorites: ${res.status} ${res.statusText}`);
                    setFavorites([]);
                }
            } catch (error) {
                console.error("Failed to fetch favorites", error);
                setFavorites([]);
            } finally {
                setLoading(false);
            }
        };

        if (activeTab === 'saved-homes') {
            fetchFavorites();
        }
    }, [activeTab]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        router.push('/');
    };

    return (
        <div className="min-h-screen bg-gray-50 pt-20 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Sidebar / Tabs */}
                    <div className="w-full md:w-64 shrink-0">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden sticky top-24">
                            <div className="p-6 border-b border-gray-100">
                                <h2 className="text-xl font-bold text-gray-900">My Zillow</h2>
                            </div>
                            <nav className="p-2">
                                <button
                                    onClick={() => setActiveTab('saved-homes')}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'saved-homes' ? 'bg-blue-50 text-[#006AFF]' : 'text-gray-600 hover:bg-gray-50'}`}
                                >
                                    <Heart className="w-4 h-4" /> Saved Homes
                                </button>
                                <button
                                    onClick={() => setActiveTab('saved-searches')}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'saved-searches' ? 'bg-blue-50 text-[#006AFF]' : 'text-gray-600 hover:bg-gray-50'}`}
                                >
                                    <Search className="w-4 h-4" /> Saved Searches
                                </button>
                                <button
                                    onClick={() => setActiveTab('settings')}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'settings' ? 'bg-blue-50 text-[#006AFF]' : 'text-gray-600 hover:bg-gray-50'}`}
                                >
                                    <Settings className="w-4 h-4" /> Account Settings
                                </button>
                            </nav>
                            <div className="p-2 border-t border-gray-100 mt-2">
                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                                >
                                    <LogOut className="w-4 h-4" /> Sign Out
                                </button>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Content Area */}
                <div className="flex-1 space-y-12">
                    <RecommendedGrid />

                    {activeTab === 'saved-homes' && (
                        <div className="animate-fade-in">
                            <h1 className="text-2xl font-bold text-gray-900 mb-6">Saved Homes</h1>
                            {loading ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="h-[350px] bg-gray-100 rounded-xl animate-pulse"></div>
                                    ))}
                                </div>
                            ) : favorites.length === 0 ? (
                                <EmptyState
                                    title="No saved homes yet"
                                    description="Start browsing properties and click the heart icon to save your favorites here."
                                    icon={Home}
                                    actionLabel="Start Searching"
                                    actionLink="/search"
                                />
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                                    {favorites.map((property) => (
                                        <PropertyCard key={property.id} property={property} />
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'saved-searches' && (
                        <div className="animate-fade-in">
                            <h1 className="text-2xl font-bold text-gray-900 mb-6">Saved Searches</h1>
                            <EmptyState
                                title="No saved searches"
                                description="Save your common searches to get notified when new properties hit the market."
                                icon={Search}
                                actionLabel="Find Homes"
                                actionLink="/search"
                            />
                        </div>
                    )}

                    {activeTab === 'settings' && (
                        <div className="animate-fade-in">
                            <h1 className="text-2xl font-bold text-gray-900 mb-6">Account Settings</h1>
                            <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
                                <div className="max-w-md space-y-4">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-900 mb-1">Email Address</label>
                                        <input type="email" disabled value="user@rentify.com" className="w-full h-10 px-3 rounded-lg border border-gray-200 bg-gray-50 text-gray-500 font-medium" />
                                    </div>
                                    <p className="text-xs text-gray-400">To secure your account, email changes require support verification.</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
