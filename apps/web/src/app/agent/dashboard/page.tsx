'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Home, BarChart2, Users, Loader2, Wallet, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { getAgentStats, Property, getMyProperties } from '@/lib/api';
import { getCookie } from 'cookies-next';
import { format } from 'date-fns';

export default function AgentDashboard() {
    const [stats, setStats] = useState({
        activeListings: 0,
        totalLeads: 0,
        totalViews: 0,
        revenue: 0,
        totalBookings: 0
    });
    const [recentProperties, setRecentProperties] = useState<Property[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const token = getCookie('token') as string;
            if (!token) return;

            try {
                const [statsData, propertiesData] = await Promise.all([
                    getAgentStats(token),
                    getMyProperties(token)
                ]);
                setStats(statsData);
                setRecentProperties(propertiesData.slice(0, 3));
            } catch (error) {
                console.error('Dashboard Error:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="h-[60vh] flex items-center justify-center">
                <Loader2 className="w-10 h-10 text-brand-600 animate-spin" />
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
                    <div className="p-3 bg-blue-50 rounded-2xl text-blue-600">
                        <Home className="w-8 h-8" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 font-bold uppercase tracking-widest text-[10px]">Active Listings</p>
                        <h3 className="text-3xl font-black text-gray-900">{stats.activeListings}</h3>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-2 bg-emerald-500/10 rounded-bl-2xl">
                        <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div className="p-3 bg-emerald-50 rounded-2xl text-emerald-600">
                        <Wallet className="w-8 h-8" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 font-bold uppercase tracking-widest text-[10px]">Escrow Revenue</p>
                        <h3 className="text-3xl font-black text-emerald-600">₹{stats.revenue.toLocaleString('en-IN')}</h3>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
                    <div className="p-3 bg-amber-50 rounded-2xl text-amber-600">
                        <Users className="w-8 h-8" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 font-bold uppercase tracking-widest text-[10px]">Paid Bookings</p>
                        <h3 className="text-3xl font-black text-gray-900">{stats.totalBookings}</h3>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
                    <div className="p-3 bg-brand-50 rounded-2xl text-brand-600">
                        <BarChart2 className="w-8 h-8" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 font-bold uppercase tracking-widest text-[10px]">Total Engagement</p>
                        <h3 className="text-3xl font-black text-gray-900">{(stats.totalLeads + stats.totalViews).toLocaleString()}</h3>
                    </div>
                </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                    <h2 className="text-xl font-black text-gray-900 tracking-tight">Recent <span className="text-brand-600">Listings</span></h2>
                    <Link href="/agent/properties" className="text-brand-600 text-sm font-bold hover:underline">
                        View All
                    </Link>
                </div>

                {recentProperties.length === 0 ? (
                    <div className="p-16 text-center text-gray-500">
                        <div className="mx-auto w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6 text-gray-300">
                            <Home className="w-10 h-10" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">No properties listed yet</h3>
                        <p className="text-sm text-gray-500 mt-2 max-w-sm mx-auto leading-relaxed">
                            Start building your real estate empire by adding your first premium property listing.
                        </p>
                        <div className="mt-8">
                            <Link href="/agent/post">
                                <Button variant="premium" className="px-8 h-12 rounded-2xl text-lg shadow-lg shadow-brand-200">
                                    <Plus className="w-5 h-5 mr-2" />
                                    Add Your First Property
                                </Button>
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="divide-y divide-gray-50">
                        {recentProperties.map(property => (
                            <div key={property.id} className="p-4 hover:bg-gray-50/50 transition-colors flex items-center gap-4">
                                <div className="w-16 h-16 rounded-xl bg-gray-100 overflow-hidden flex-shrink-0">
                                    {property.images?.[0] ? (
                                        <img src={property.images[0].url} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-[10px] font-bold text-gray-400">NO IMG</div>
                                    )}
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-bold text-gray-900 line-clamp-1">{property.title}</h4>
                                    <p className="text-xs text-gray-500 mt-0.5">{property.city} • {format(new Date(property.createdAt), 'MMM d, yyyy')}</p>
                                </div>
                                <div className="text-right">
                                    <div className="text-sm font-black text-brand-600">₹{parseFloat(property.price as string).toLocaleString('en-IN')}</div>
                                    <div className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">{property.status}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
