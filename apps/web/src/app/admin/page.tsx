"use client";

import { useEffect, useState } from "react";
import { Users, Home, TrendingUp, DollarSign, Search } from "lucide-react";
import { apiFetch } from "@/lib/api";
import { PropertyEditForm } from "@/components/admin/PropertyEditForm";

interface DashboardStats {
    totalUsers: number;
    totalProperties: number;
    activeListings: number;
    totalRevenue: number;
    recentUsers: any[];
}

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [loading, setLoading] = useState(true);

    // Tab Data States
    const [properties, setProperties] = useState<any[]>([]);
    const [users, setUsers] = useState<any[]>([]);
    const [leads, setLeads] = useState<any[]>([]);
    const [savedSearches, setSavedSearches] = useState<any[]>([]);

    useEffect(() => {
        fetchStats();
    }, []);

    useEffect(() => {
        if (activeTab === 'properties') fetchProperties();
        if (activeTab === 'users') fetchUsers();
        if (activeTab === 'leads') fetchLeads();
        if (activeTab === 'saved_searches') fetchSavedSearches();
    }, [activeTab]);

    const fetchStats = async () => {
        try {
            const res = await apiFetch('/admin/stats');
            if (res.ok) setStats(await res.json());
        } finally { setLoading(false); }
    };

    const fetchProperties = async () => {
        const res = await apiFetch('/admin/properties?limit=50');
        if (res.ok) setProperties((await res.json()).data);
    };

    const fetchUsers = async () => {
        const res = await apiFetch('/admin/users?limit=50');
        if (res.ok) setUsers((await res.json()).data);
    };

    const fetchLeads = async () => {
        const res = await apiFetch('/admin/leads?limit=50');
        if (res.ok) setLeads((await res.json()).data);
    };

    const fetchSavedSearches = async () => {
        const res = await apiFetch('/admin/saved-searches?limit=50');
        if (res.ok) setSavedSearches((await res.json()).data);
    };

    const StatCard = ({ title, value, icon: Icon, trend }: any) => (
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-blue-50 rounded-lg text-[#006AFF]">
                    <Icon className="w-6 h-6" />
                </div>
                {trend && <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">{trend}</span>}
            </div>
            <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
            <p className="text-3xl font-black text-gray-900 mt-1">{value}</p>
        </div>
    );

    // ... inside AdminDashboard

    // Edit State
    const [editingProperty, setEditingProperty] = useState<any | null>(null);

    const handleSaveProperty = async (updatedData: any) => {
        const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
        if (!token) return;

        const res = await apiFetch(`/admin/properties/${updatedData.id}/update`, {
            method: 'POST',
            body: JSON.stringify(updatedData)
        });

        if (res.ok) {
            alert("Property Updated Successfully!");
            setEditingProperty(null);
            fetchProperties(); // Refresh list
        } else {
            alert("Failed to update property.");
        }
    };

    // ... (Stats Card and TabButton renderers)

    const TabButton = ({ id, label, icon: Icon }: any) => (
        <button
            onClick={() => setActiveTab(id)}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === id ? 'bg-[#006AFF] text-white shadow-lg shadow-blue-200' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
        >
            <Icon className="w-4 h-4" /> {label}
        </button>
    );

    if (loading) return <div className="p-8 text-center text-gray-500">Loading admin panel...</div>;

    return (
        <div className="min-h-screen bg-gray-50 p-8 pb-32">
            {/* Render Edit Form Modal if active */}
            {editingProperty && (
                <PropertyEditForm
                    property={editingProperty}
                    onClose={() => setEditingProperty(null)}
                    onSave={handleSaveProperty}
                />
            )}

            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header & Tabs ... */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-black text-gray-900 tracking-tight">Admin Console</h1>
                        <p className="text-gray-500 font-medium">Manage properties, users, and platform analytics.</p>
                    </div>
                    <div className="flex items-center gap-2 bg-white p-1.5 rounded-2xl shadow-sm border border-gray-100 overflow-x-auto max-w-full">
                        <TabButton id="dashboard" label="Overview" icon={TrendingUp} />
                        <TabButton id="properties" label="Properties" icon={Home} />
                        <TabButton id="users" label="Users" icon={Users} />
                        <TabButton id="leads" label="Leads" icon={DollarSign} />
                        <TabButton id="saved_searches" label="Searches" icon={Search} />
                    </div>
                </div>

                {/* DASHBOARD VIEW ... */}
                {activeTab === 'dashboard' && (
                    <div className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <StatCard title="Total Revenue" value={`₹${(stats?.totalRevenue || 0).toLocaleString()}`} icon={DollarSign} trend="+12.5%" />
                            <StatCard title="Active Users" value={stats?.totalUsers || 0} icon={Users} trend="+5%" />
                            <StatCard title="Total Properties" value={stats?.totalProperties || 0} icon={Home} />
                            <StatCard title="Active Listings" value={stats?.activeListings || 0} icon={TrendingUp} trend="High Demand" />
                        </div>
                    </div>
                )}

                {/* PROPERTIES VIEW */}
                {activeTab === 'properties' && (
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-gray-50 text-gray-500 font-semibold border-b border-gray-200">
                                    <tr>
                                        <th className="p-4">Property</th>
                                        <th className="p-4">Price</th>
                                        <th className="p-4">Status</th>
                                        <th className="p-4">Agent</th>
                                        <th className="p-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {properties.map((p) => (
                                        <tr key={p.id} className="hover:bg-gray-50">
                                            <td className="p-4 font-bold text-gray-900 max-w-xs truncate">{p.title}</td>
                                            <td className="p-4">₹{Number(p.price).toLocaleString()}</td>
                                            <td className="p-4">
                                                <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${p.status === 'PUBLISHED' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                                                    {p.status}
                                                </span>
                                            </td>
                                            <td className="p-4 text-gray-600">{p.agent?.name}</td>
                                            <td className="p-4 text-right">
                                                <button
                                                    onClick={() => setEditingProperty(p)}
                                                    className="text-brand-600 font-bold hover:underline mr-4"
                                                >
                                                    Edit
                                                </button>
                                                <button className="text-red-500 font-bold hover:underline">Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* USERS VIEW ... */}
                {activeTab === 'users' && (
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-gray-50 text-gray-500 font-semibold border-b border-gray-200">
                                <tr>
                                    <th className="p-4">User</th>
                                    <th className="p-4">Role</th>
                                    <th className="p-4">Verified</th>
                                    <th className="p-4">Joined</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {users.map((u) => (
                                    <tr key={u.id} className="hover:bg-gray-50">
                                        <td className="p-4">
                                            <div className="font-bold text-gray-900">{u.name}</div>
                                            <div className="text-xs text-gray-500">{u.email}</div>
                                        </td>
                                        <td className="p-4 text-xs font-bold uppercase text-gray-600">{u.role}</td>
                                        <td className="p-4">
                                            {u.isVerified ? <span className="text-green-600 font-bold">Yes</span> : <span className="text-gray-400">No</span>}
                                        </td>
                                        <td className="p-4 text-gray-500">{new Date(u.createdAt).toLocaleDateString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* LEADS VIEW ... */}
                {activeTab === 'leads' && (
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-gray-50 text-gray-500 font-semibold border-b border-gray-200">
                                <tr>
                                    <th className="p-4">Lead</th>
                                    <th className="p-4">Interest</th>
                                    <th className="p-4">Message</th>
                                    <th className="p-4">Date</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {leads.map((l) => (
                                    <tr key={l.id} className="hover:bg-gray-50">
                                        <td className="p-4">
                                            <div className="font-bold text-gray-900">{l.guestName || l.user?.name || 'Guest'}</div>
                                            <div className="text-xs text-gray-500">{l.guestEmail || l.user?.email}</div>
                                        </td>
                                        <td className="p-4">
                                            <div className="font-bold text-gray-900 truncate max-w-[150px]">{l.property?.title}</div>
                                            <div className="text-xs text-gray-500">{l.property?.city} • ₹{Number(l.property?.price).toLocaleString()}</div>
                                        </td>
                                        <td className="p-4 text-gray-600 truncate max-w-xs">{l.message}</td>
                                        <td className="p-4 text-gray-500">{new Date(l.created_at || l.createdAt).toLocaleDateString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* SAVED SEARCHES VIEW ... */}
                {activeTab === 'saved_searches' && (
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-gray-50 text-gray-500 font-semibold border-b border-gray-200">
                                <tr>
                                    <th className="p-4">User</th>
                                    <th className="p-4">Search Name</th>
                                    <th className="p-4">Filters</th>
                                    <th className="p-4">Date</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {savedSearches.map((s) => (
                                    <tr key={s.id} className="hover:bg-gray-50">
                                        <td className="p-4">
                                            <div className="font-bold text-gray-900">{s.user?.name}</div>
                                            <div className="text-xs text-gray-500">{s.user?.email}</div>
                                        </td>
                                        <td className="p-4 font-bold text-brand-600">{s.name}</td>
                                        <td className="p-4 text-xs text-gray-500 font-mono max-w-xs truncate">
                                            {JSON.stringify(s.filters)}
                                        </td>
                                        <td className="p-4 text-gray-500">{new Date(s.createdAt).toLocaleDateString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
