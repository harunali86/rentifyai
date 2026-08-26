"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import { Search, MoreVertical, CheckCircle, XCircle, Trash2, Edit } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

export default function AdminPropertiesPage() {
    const [properties, setProperties] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("ALL");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchProperties = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams({
                page: page.toString(),
                limit: "10",
                ...(search && { search }),
                ...(statusFilter !== "ALL" && { status: statusFilter }),
            });

            const res = await apiFetch(`/admin/properties?${params.toString()}`);
            if (res.ok) {
                const data = await res.json();
                setProperties(data.data);
                setTotalPages(data.meta.totalPages);
            }
        } catch (error) {
            console.error("Failed to fetch properties", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProperties();
    }, [page, search, statusFilter]);

    const handleStatusUpdate = async (id: string, newStatus: string) => {
        try {
            const res = await apiFetch(`/admin/properties/${id}/status`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus })
            });
            if (res.ok) fetchProperties();
        } catch (error) {
            console.error("Failed to update status", error);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this property?")) return;
        try {
            const res = await apiFetch(`/admin/properties/${id}/delete`, { method: 'POST' });
            if (res.ok) fetchProperties();
        } catch (error) {
            console.error("Failed to delete property", error);
        }
    };

    return (
        <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Property Management</h1>
                <Button className="bg-[#006AFF] text-white">Add New Property</Button>
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm mb-6 flex gap-4 items-center">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search by title, address..."
                        className="w-full pl-10 h-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <select
                    className="h-10 border border-gray-300 rounded-md px-3 bg-white"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                >
                    <option value="ALL">All Status</option>
                    <option value="PUBLISHED">Published</option>
                    <option value="DRAFT">Draft</option>
                    <option value="PENDING">Pending Approval</option>
                    <option value="SOLD">Sold</option>
                </select>
            </div>

            {/* Data Table */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-200 text-xs uppercase text-gray-500 font-semibold">
                            <th className="p-4">Property</th>
                            <th className="p-4">Price</th>
                            <th className="p-4">Status</th>
                            <th className="p-4">Agent</th>
                            <th className="p-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan={5} className="p-8 text-center text-gray-500">Loading properties...</td></tr>
                        ) : properties.length === 0 ? (
                            <tr><td colSpan={5} className="p-8 text-center text-gray-500">No properties found.</td></tr>
                        ) : (
                            properties.map((property) => (
                                <tr key={property.id} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden shrink-0 border border-gray-200">
                                                {property.images?.[0]?.url && <img src={property.images[0].url} className="w-full h-full object-cover" />}
                                            </div>
                                            <div>
                                                <div className="font-bold text-gray-900 line-clamp-1 max-w-[200px]">{property.title}</div>
                                                <div className="text-xs text-gray-500 line-clamp-1 max-w-[200px]">{property.address}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4 font-semibold text-gray-700">
                                        ₹{Number(property.price).toLocaleString('en-IN')}
                                    </td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase 
                                            ${property.status === 'PUBLISHED' ? 'bg-green-100 text-green-700' :
                                                property.status === 'PENDING' ? 'bg-yellow-100 text-yellow-700' :
                                                    'bg-gray-100 text-gray-600'}`}>
                                            {property.status}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <div className="text-sm text-gray-900">{property.agent?.name}</div>
                                        <div className="text-xs text-gray-500">{property.agent?.email}</div>
                                    </td>
                                    <td className="p-4 text-right">
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <button className="p-2 hover:bg-gray-100 rounded-full text-gray-500">
                                                    <MoreVertical className="w-4 h-4" />
                                                </button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-40 p-1" align="end">
                                                <button className="w-full text-left flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md">
                                                    <Edit className="w-4 h-4" /> Edit
                                                </button>
                                                {property.status === 'PENDING' && (
                                                    <button
                                                        onClick={() => handleStatusUpdate(property.id, 'PUBLISHED')}
                                                        className="w-full text-left flex items-center gap-2 px-3 py-2 text-sm text-green-600 hover:bg-green-50 rounded-md font-medium"
                                                    >
                                                        <CheckCircle className="w-4 h-4" /> Approve
                                                    </button>
                                                )}
                                                {property.status === 'PUBLISHED' && (
                                                    <button
                                                        onClick={() => handleStatusUpdate(property.id, 'DRAFT')}
                                                        className="w-full text-left flex items-center gap-2 px-3 py-2 text-sm text-yellow-600 hover:bg-yellow-50 rounded-md"
                                                    >
                                                        <XCircle className="w-4 h-4" /> Unpublish
                                                    </button>
                                                )}
                                                <div className="h-px bg-gray-100 my-1"></div>
                                                <button
                                                    onClick={() => handleDelete(property.id)}
                                                    className="w-full text-left flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md font-medium"
                                                >
                                                    <Trash2 className="w-4 h-4" /> Delete
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
