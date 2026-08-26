"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import { Search, MoreVertical, Shield, UserCheck, UserX } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

export default function AdminUsersPage() {
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams({
                page: page.toString(),
                limit: "10",
                ...(search && { search }),
            });

            const res = await apiFetch(`/admin/users?${params.toString()}`);
            if (res.ok) {
                const data = await res.json();
                setUsers(data.data);
                setTotalPages(data.meta.totalPages);
            }
        } catch (error) {
            console.error("Failed to fetch users", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [page, search]);

    const handleRoleUpdate = async (id: string, newRole: string) => {
        if (!confirm(`Promote user to ${newRole}?`)) return;
        try {
            const res = await apiFetch(`/admin/users/${id}/role`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ role: newRole })
            });
            if (res.ok) fetchUsers();
        } catch (error) {
            console.error("Failed to update role", error);
        }
    };

    const handleVerificationToggle = async (id: string) => {
        try {
            const res = await apiFetch(`/admin/users/${id}/verify`, { method: 'POST' });
            if (res.ok) fetchUsers();
        } catch (error) {
            console.error("Failed to toggle verification", error);
        }
    };

    return (
        <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
                <Button className="bg-[#006AFF] text-white">Create User</Button>
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm mb-6 flex gap-4 items-center">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search by name, email..."
                        className="w-full pl-10 h-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>

            {/* Data Table */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-200 text-xs uppercase text-gray-500 font-semibold">
                            <th className="p-4">User</th>
                            <th className="p-4">Role</th>
                            <th className="p-4">Status</th>
                            <th className="p-4">Activity</th>
                            <th className="p-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan={5} className="p-8 text-center text-gray-500">Loading users...</td></tr>
                        ) : users.length === 0 ? (
                            <tr><td colSpan={5} className="p-8 text-center text-gray-500">No users found.</td></tr>
                        ) : (
                            users.map((user) => (
                                <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-[#006AFF] font-bold text-sm">
                                                {user.name.charAt(0)}
                                            </div>
                                            <div>
                                                <div className="font-bold text-gray-900">{user.name}</div>
                                                <div className="text-xs text-gray-500">{user.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase 
                                            ${user.role === 'ADMIN' ? 'bg-purple-100 text-purple-700' :
                                                user.role === 'AGENT' ? 'bg-orange-100 text-orange-700' :
                                                    'bg-gray-100 text-gray-600'}`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        {user.isVerified ? (
                                            <span className="inline-flex items-center gap-1 text-xs font-semibold text-green-700">
                                                <Shield className="w-3 h-3" /> Verified
                                            </span>
                                        ) : (
                                            <span className="text-xs text-gray-400">Unverified</span>
                                        )}
                                    </td>
                                    <td className="p-4">
                                        <div className="text-xs text-gray-500">
                                            {user._count?.listings || 0} Listings, {user._count?.bookings || 0} Bookings
                                        </div>
                                    </td>
                                    <td className="p-4 text-right">
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <button className="p-2 hover:bg-gray-100 rounded-full text-gray-500">
                                                    <MoreVertical className="w-4 h-4" />
                                                </button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-48 p-1" align="end">
                                                <button
                                                    onClick={() => handleVerificationToggle(user.id)}
                                                    className="w-full text-left flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md"
                                                >
                                                    {user.isVerified ? <UserX className="w-4 h-4 text-red-500" /> : <UserCheck className="w-4 h-4 text-green-500" />}
                                                    {user.isVerified ? "Revoke Verification" : "Verify User"}
                                                </button>
                                                <div className="h-px bg-gray-100 my-1"></div>
                                                <button
                                                    onClick={() => handleRoleUpdate(user.id, 'AGENT')}
                                                    className="w-full text-left flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md"
                                                >
                                                    Set as Agent
                                                </button>
                                                <button
                                                    onClick={() => handleRoleUpdate(user.id, 'ADMIN')}
                                                    className="w-full text-left flex items-center gap-2 px-3 py-2 text-sm text-purple-700 hover:bg-purple-50 rounded-md font-medium"
                                                >
                                                    Set as Admin
                                                </button>
                                            </PopoverContent>
                                        </Popover>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>

                {/* Pagination */}
                <div className="p-4 border-t border-gray-200 flex justify-between items-center bg-gray-50">
                    <span className="text-sm text-gray-500">Page {page} of {totalPages}</span>
                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            disabled={page === 1}
                            onClick={() => setPage(p => Math.max(1, p - 1))}
                            className="h-8"
                        >
                            Previous
                        </Button>
                        <Button
                            variant="outline"
                            disabled={page >= totalPages}
                            onClick={() => setPage(p => p + 1)}
                            className="h-8"
                        >
                            Next
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
