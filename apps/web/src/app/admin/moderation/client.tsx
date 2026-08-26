'use client';

import { useState } from 'react';
import { Property, updatePropertyStatus } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { CheckCircle2, XCircle, Search, ExternalLink, ShieldCheck, ShieldAlert } from 'lucide-react';
import { format } from 'date-fns';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { getCookie } from 'cookies-next';

interface ModerationClientProps {
    initialProperties: Property[];
}

export default function ModerationClient({ initialProperties }: ModerationClientProps) {
    const [properties, setProperties] = useState<Property[]>(initialProperties);
    const [filter, setFilter] = useState<'PENDING' | 'PUBLISHED' | 'REJECTED' | 'ALL'>('PENDING');
    const [search, setSearch] = useState('');
    const [loadingMap, setLoadingMap] = useState<Record<string, boolean>>({});

    const handleStatusUpdate = async (id: string, status: string) => {
        setLoadingMap(prev => ({ ...prev, [id]: true }));

        // Optimistic UI Update
        const previousProperties = [...properties];
        setProperties(prev => prev.map(p => p.id === id ? { ...p, status: status as any } : p));
        toast.message('Updating Status...', { id: 'update-status' });

        const token = getCookie('token') as string;
        if (!token) {
            toast.error('Session expired');
            setLoadingMap(prev => ({ ...prev, [id]: false }));
            return;
        }

        const success = await updatePropertyStatus(id, status, token);

        if (success) {
            toast.success(`Property ${status === 'PUBLISHED' ? 'Approved' : 'Rejected'}`, { id: 'update-status' });
        } else {
            toast.error('Failed to update status', { id: 'update-status' });
            setProperties(previousProperties); // Revert
        }
        setLoadingMap(prev => ({ ...prev, [id]: false }));
    };

    const filteredProperties = properties
        .filter(p => filter === 'ALL' || p.status === filter)
        .filter(p => p.title.toLowerCase().includes(search.toLowerCase()) || p.agent?.name?.toLowerCase().includes(search.toLowerCase()));

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'PUBLISHED': return <Badge className="bg-emerald-500 hover:bg-emerald-600">Active</Badge>;
            case 'PENDING': return <Badge className="bg-yellow-500 hover:bg-yellow-600">Pending Review</Badge>;
            case 'REJECTED': return <Badge className="bg-red-500 hover:bg-red-600">Rejected</Badge>;
            default: return <Badge variant="secondary">{status}</Badge>;
        }
    };

    return (
        <div className="space-y-6">
            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="flex items-center gap-2 p-1 bg-white border border-gray-200 rounded-xl">
                    {['PENDING', 'PUBLISHED', 'REJECTED', 'ALL'].map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f as any)}
                            className={`px-4 py-2 text-sm font-bold rounded-lg transition-all ${filter === f ? 'bg-brand-600 text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}
                        >
                            {f === 'PUBLISHED' ? 'Active' : f === 'ALL' ? 'All Listings' : f.charAt(0) + f.slice(1).toLowerCase()}
                        </button>
                    ))}
                </div>
                <div className="relative w-full md:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                        placeholder="Search listings..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-10 h-10 rounded-xl border-gray-200"
                    />
                </div>
            </div>

            {/* List */}
            <div className="space-y-4">
                {filteredProperties.length === 0 ? (
                    <div className="text-center py-20 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
                        <ShieldCheck className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-gray-500 font-medium">No properties found in this category.</h3>
                        <p className="text-sm text-gray-400">Great job clearing the queue!</p>
                    </div>
                ) : filteredProperties.map((property) => (
                    <Card key={property.id} className="p-4 border-gray-100 shadow-sm hover:shadow-md transition-all rounded-2xl flex flex-col md:flex-row gap-6">
                        {/* Image */}
                        <div className="w-full md:w-48 h-32 rounded-xl bg-gray-100 overflow-hidden relative flex-shrink-0">
                            {property.images?.[0] ? (
                                <img src={property.images[0].url} alt={property.title} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs font-bold uppercase tracking-widest">No Image</div>
                            )}
                            <div className="absolute top-2 left-2">
                                {getStatusBadge(property.status)}
                            </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 space-y-2">
                            <div className="flex items-start justify-between">
                                <div>
                                    <h3 className="font-bold text-lg text-gray-900 line-clamp-1">{property.title}</h3>
                                    <div className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                                        <span className="font-bold text-brand-600">₹{parseFloat(property.price as string).toLocaleString('en-IN')}</span>
                                        <span>•</span>
                                        <span>{property.city}</span>
                                    </div>
                                </div>
                                <Link href={`/properties/${property.slug}`} target="_blank">
                                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0 rounded-full">
                                        <ExternalLink className="w-4 h-4 text-gray-400" />
                                    </Button>
                                </Link>
                            </div>

                            <div className="pt-2 flex items-center gap-2">
                                <div className="h-8 w-8 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-xs font-bold text-gray-500">
                                    {property.agent?.name?.charAt(0) || 'A'}
                                </div>
                                <div className="text-xs">
                                    <p className="font-bold text-gray-700">{property.agent?.name || 'Unknown Agent'}</p>
                                    <p className="text-gray-400">{property.agent?.email}</p>
                                </div>
                                <div className="ml-auto text-xs text-gray-400 font-medium">
                                    {format(new Date(property.createdAt), 'MMM d, yyyy')}
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex md:flex-col gap-2 items-center justify-center border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-6">
                            {property.status !== 'PUBLISHED' && (
                                <Button
                                    size="sm"
                                    className="w-full bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl shadow-emerald-500/20 shadow-lg"
                                    onClick={() => handleStatusUpdate(property.id, 'PUBLISHED')}
                                    disabled={loadingMap[property.id]}
                                >
                                    <CheckCircle2 className="w-4 h-4 mr-2" />
                                    Approve
                                </Button>
                            )}
                            {property.status !== 'REJECTED' && (
                                <Button
                                    size="sm"
                                    variant="outline"
                                    className="w-full text-red-600 border-red-100 hover:bg-red-50 hover:border-red-200 rounded-xl"
                                    onClick={() => handleStatusUpdate(property.id, 'REJECTED')}
                                    disabled={loadingMap[property.id]}
                                >
                                    <XCircle className="w-4 h-4 mr-2" />
                                    Reject
                                </Button>
                            )}
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}

// Extend Property interface to include Agent if it's not fully defined in lib/api.ts
// The interface in lib/api.ts has optional agent. That works.
