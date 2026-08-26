'use client';

import { useEffect, useState } from 'react';
import { Property, getPersonalizedRecommendations } from '@/lib/api';
import { PropertyCard } from './PropertyCard';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function RecommendedGrid() {
    const [recommendations, setRecommendations] = useState<Property[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecs = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setLoading(false);
                return;
            }

            const data = await getPersonalizedRecommendations(token);
            setRecommendations(data);
            setLoading(false);
        };

        fetchRecs();
    }, []);

    if (loading) {
        return (
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div className="h-8 w-64 bg-gray-100 animate-pulse rounded-lg"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="h-[350px] bg-gray-100 rounded-2xl animate-pulse"></div>
                    ))}
                </div>
            </div>
        );
    }

    if (recommendations.length === 0) return null;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-brand-50 rounded-xl">
                        <Sparkles className="w-5 h-5 text-brand-600" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-black text-gray-900 tracking-tight">Recommended for You</h2>
                        <p className="text-sm text-gray-500 font-medium">Personalized AI suggestions based on your interests.</p>
                    </div>
                </div>
                <Link href="/search">
                    <Button variant="ghost" className="text-brand-600 font-bold hover:bg-brand-50">
                        View More
                        <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {recommendations.map((property) => (
                    <PropertyCard key={property.id} property={property} />
                ))}
            </div>
        </div>
    );
}
