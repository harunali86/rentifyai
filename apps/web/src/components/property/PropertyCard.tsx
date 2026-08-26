'use client';

import { useAuthModal } from "@/lib/store/useAuthModal";
import { MapPin, Heart, MoreHorizontal, Video, Phone, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Property } from "@/lib/api";
import { useState } from "react";

// Helper for Indian Currency Formatting
const formatPrice = (amount: number | string) => {
    const value = typeof amount === 'string' ? parseFloat(amount) : amount;
    if (!value) return '₹0';

    // >= 1 Crore
    if (value >= 10000000) {
        return `₹${(value / 10000000).toFixed(2)} Cr`;
    }
    // >= 1 Lakh
    if (value >= 100000) {
        return `₹${(value / 100000).toFixed(2)} L`;
    }

    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
    }).format(value);
};

export function PropertyCard({ property }: { property: Property | any }) {
    const isRental = property.listingType === 'RENT';
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const images = property.images?.length > 0 ? property.images : [{ url: '' }];
    const hasMultipleImages = images.length > 1;

    const nextImage = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
        <div data-testid="property-card" className="group bg-white rounded-lg shadow-[0_1px_4px_rgba(0,0,0,0.16)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.12)] border border-transparent overflow-hidden h-auto relative transition-all duration-300">
            <Link href={`/properties/${property.slug}`} className="absolute inset-0 z-10" />

            {/* Image Section */}
            <div className="relative aspect-[16/9] bg-gray-100 shrink-0 overflow-hidden">
                {images[currentImageIndex]?.url ? (
                    <img
                        src={images[currentImageIndex].url}
                        alt={property.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400">No Photo</div>
                )}

                {/* Navigation Arrows (Zillow: Clean white arrows) */}
                {hasMultipleImages && (
                    <>
                        <button
                            onClick={prevImage}
                            className="absolute left-1 top-1/2 -translate-y-1/2 z-30 opacity-0 group-hover:opacity-100 transition-opacity p-1"
                        >
                            <div className="bg-transparent hover:bg-black/20 rounded-full p-1 transition-colors">
                                <ChevronLeft className="w-8 h-8 text-white drop-shadow-md" />
                            </div>
                        </button>
                        <button
                            onClick={nextImage}
                            className="absolute right-1 top-1/2 -translate-y-1/2 z-30 opacity-0 group-hover:opacity-100 transition-opacity p-1"
                        >
                            <div className="bg-transparent hover:bg-black/20 rounded-full p-1 transition-colors">
                                <ChevronRight className="w-8 h-8 text-white drop-shadow-md" />
                            </div>
                        </button>
                    </>
                )}

                {/* Top Tags (Status) */}
                <div className="absolute top-2 left-2 z-20 flex flex-wrap gap-1 pointer-events-none">
                    <span className="bg-white/95 text-[#595959] px-2 py-[2px] rounded-[3px] text-[10px] font-bold uppercase tracking-wider shadow-sm border border-gray-200">
                        {isRental ? 'For Rent' : 'For Sale'}
                    </span>
                    {/* Mock "Time on Market" Tag for Zillow feel */}
                    <span className="bg-white/95 text-brand-700 px-2 py-[2px] rounded-[3px] text-[10px] font-bold uppercase tracking-wider shadow-sm border border-gray-200">
                        Updated Today
                    </span>
                </div>

                {/* Favorite Button (Heart) */}
                <div className="absolute top-2 right-2 z-20">
                    <button
                        onClick={async (e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            // Check if logged in
                            const token = localStorage.getItem('token');
                            if (token) {
                                // TODO: Implement save logic
                            } else {
                                useAuthModal.getState().open('login');
                            }
                        }}
                        className="text-white hover:scale-110 transition-transform z-30 relative"
                    >
                        {/* Zillow Style Heart: White Fill with Stroke when inactive, Red when active (Mock inactive for now) */}
                        <Heart className="w-7 h-7 fill-[rgba(0,0,0,0.5)] stroke-white stroke-[2px] hover:fill-[#FF5A5F] hover:stroke-[#FF5A5F] transition-colors" />
                    </button>
                </div>
            </div>

            {/* Content Section - Strict Zillow Typography */}
            <div className="p-3 pt-3 flex flex-col gap-0.5 relative z-20 bg-white min-h-[140px]">
                {/* 1. Price row */}
                <div className="flex items-baseline justify-between">
                    <span className="text-[26px] font-black text-[#2A2A33] tracking-[-0.5px] leading-tight">
                        {formatPrice(property.price)}
                        {isRental && <span className="text-base font-medium text-gray-500 ml-1">/mo</span>}
                    </span>
                </div>

                {/* 2. Stats Row (Beds | Bath | Sqft) - Very compact */}
                <div className="flex items-center gap-3 text-[#2A2A33] text-[15px] mt-0.5">
                    <div className="flex items-baseline gap-1">
                        <span className="font-bold">{property.bedrooms}</span> <span className="text-gray-600 font-normal">bds</span>
                    </div>
                    <span className="text-gray-300">|</span>
                    <div className="flex items-baseline gap-1">
                        <span className="font-bold">{property.bathrooms}</span> <span className="text-gray-600 font-normal">ba</span>
                    </div>
                    <span className="text-gray-300">|</span>
                    <div className="flex items-baseline gap-1">
                        <span className="font-bold">{property.areaSqFt?.toLocaleString()}</span> <span className="text-gray-600 font-normal">sqft</span>
                    </div>
                    <span className="text-[11px] text-gray-400 ml-auto uppercase tracking-wide font-bold hidden sm:block">Active</span>
                </div>

                {/* 3. Address Row */}
                <div className="text-[14px] text-gray-600 truncate leading-snug mt-1 font-medium">
                    {property.address}, {property.city}
                </div>

                {/* 4. Action Button Footer (Appears on Hover sort of effect) */}
                <div className="mt-auto pt-3 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-200">
                    <button className="w-full py-2 rounded-[4px] border border-brand-600 text-brand-600 font-bold text-sm bg-white hover:bg-brand-50 transition-colors uppercase tracking-wide">
                        Check Availability
                    </button>
                </div>
            </div>
        </div>
    );
}
