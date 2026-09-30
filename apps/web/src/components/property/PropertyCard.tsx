'use client';

import { useAuthModal } from "@/lib/store/useAuthModal";
import { MapPin, Heart, MoreHorizontal, Video, Phone, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Property } from "@/lib/api";
import { useState } from "react";
import { LeadQuotaModal } from "./LeadQuotaModal";

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
    const [isSaved, setIsSaved] = useState(false);
    const [isQuotaModalOpen, setIsQuotaModalOpen] = useState(false);

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

    const toggleFavorite = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsSaved(prev => !prev);
    };

    const agentPhone = property.agent?.phone || '919822019482';
    const cleanPhone = agentPhone.replace(/[^0-9]/g, '');
    const waUrl = `https://wa.me/${cleanPhone.startsWith('91') ? cleanPhone : '91' + cleanPhone}?text=${encodeURIComponent(`Hi, I am interested in "${property.title}" in ${property.city} listed on RentifyAI.`)}`;

    return (
        <div data-testid="property-card" className="group bg-white rounded-xl shadow-[0_1px_4px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] border border-slate-200/80 overflow-hidden h-auto relative transition-all duration-300">
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

                {/* Navigation Arrows (Zillow Style) */}
                {hasMultipleImages && (
                    <>
                        <button
                            onClick={prevImage}
                            className="absolute left-1 top-1/2 -translate-y-1/2 z-30 opacity-0 group-hover:opacity-100 transition-opacity p-1"
                        >
                            <div className="bg-black/30 hover:bg-black/60 rounded-full p-1.5 transition-colors backdrop-blur-xs">
                                <ChevronLeft className="w-4 h-4 text-white drop-shadow-md" />
                            </div>
                        </button>
                        <button
                            onClick={nextImage}
                            className="absolute right-1 top-1/2 -translate-y-1/2 z-30 opacity-0 group-hover:opacity-100 transition-opacity p-1"
                        >
                            <div className="bg-black/30 hover:bg-black/60 rounded-full p-1.5 transition-colors backdrop-blur-xs">
                                <ChevronRight className="w-4 h-4 text-white drop-shadow-md" />
                            </div>
                        </button>
                    </>
                )}

                {/* Top Tags (NoBroker Zero Brokerage + Zillow Status) */}
                <div className="absolute top-2 left-2 z-20 flex flex-wrap gap-1.5 pointer-events-none">
                    <span className="bg-emerald-600 text-white px-2 py-0.5 rounded-[4px] text-[9px] font-black uppercase tracking-wider shadow-sm flex items-center gap-1">
                        <span>⚡</span> ZERO BROKERAGE
                    </span>
                    <span className="bg-white/95 text-slate-800 px-2 py-0.5 rounded-[4px] text-[9px] font-bold uppercase tracking-wider shadow-sm border border-slate-200">
                        {isRental ? 'For Rent' : 'For Sale'}
                    </span>
                </div>

                {/* Favorite Button (Heart) */}
                <div className="absolute top-2 right-2 z-20">
                    <button
                        onClick={toggleFavorite}
                        title={isSaved ? "Saved to Favorites" : "Save Property"}
                        className="text-white hover:scale-110 active:scale-90 transition-transform z-30 relative p-1 rounded-full bg-black/20 backdrop-blur-xs"
                    >
                        <Heart className={`w-5 h-5 transition-colors ${
                            isSaved 
                                ? 'fill-[#FF385C] stroke-[#FF385C]' 
                                : 'fill-white/80 stroke-slate-800 hover:fill-[#FF385C] hover:stroke-[#FF385C]'
                        }`} />
                    </button>
                </div>
            </div>

            {/* Content Section - Strict Zillow Typography */}
            <div className="p-3.5 flex flex-col gap-1 relative z-20 bg-white min-h-[145px]">
                {/* 1. Price row */}
                <div className="flex items-baseline justify-between">
                    <span className="text-[24px] font-black text-[#1A1A24] tracking-[-0.5px] leading-tight">
                        {formatPrice(property.price)}
                        {isRental && <span className="text-sm font-medium text-slate-500 ml-1">/mo</span>}
                    </span>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
                        RERA VERIFIED
                    </span>
                </div>

                {/* 2. Stats Row (Beds | Bath | Sqft) */}
                <div className="flex items-center gap-2 text-slate-800 text-[14px] mt-0.5 font-medium">
                    <div className="flex items-baseline gap-1">
                        <span className="font-bold text-slate-900">{property.bedrooms}</span> <span className="text-slate-500 text-xs">BHK</span>
                    </div>
                    <span className="text-slate-300">|</span>
                    <div className="flex items-baseline gap-1">
                        <span className="font-bold text-slate-900">{property.bathrooms}</span> <span className="text-slate-500 text-xs">ba</span>
                    </div>
                    <span className="text-slate-300">|</span>
                    <div className="flex items-baseline gap-1">
                        <span className="font-bold text-slate-900">{property.areaSqFt?.toLocaleString()}</span> <span className="text-slate-500 text-xs">sqft</span>
                    </div>
                </div>

                {/* 3. Address Row */}
                <div className="text-[13px] text-slate-600 truncate leading-snug font-medium">
                    {property.address}, {property.city}
                </div>

                {/* 4. Action Button Footer: Check Availability + WhatsApp Quick Connect */}
                <div className="mt-3 pt-2 border-t border-slate-100 flex items-center gap-2 relative z-30">
                    <Link
                        href={`/properties/${property.slug}`}
                        className="flex-1 py-1.5 rounded-lg border border-blue-600 text-blue-600 hover:bg-blue-50 font-bold text-xs text-center uppercase tracking-wider transition-colors"
                    >
                        View Details
                    </Link>
                    <a
                        href={waUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setIsQuotaModalOpen(true);
                        }}
                        title="Chat directly on WhatsApp (Zero Brokerage)"
                        className="px-3 py-1.5 rounded-lg bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs flex items-center gap-1 shadow-xs hover:shadow-sm active:scale-95 transition-all whitespace-nowrap cursor-pointer"
                    >
                        <span>💬</span> WhatsApp
                    </a>
                </div>
            </div>

            <LeadQuotaModal
                isOpen={isQuotaModalOpen}
                onClose={() => setIsQuotaModalOpen(false)}
                property={property}
            />
        </div>
    );
}
