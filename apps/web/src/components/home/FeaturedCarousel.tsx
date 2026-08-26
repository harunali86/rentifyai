"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";
import Link from "next/link";
import type { Property } from "@/lib/api";

interface FeaturedCarouselProps {
    properties: Property[];
}

export function FeaturedCarousel({ properties }: FeaturedCarouselProps) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const checkScroll = () => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
        }
    };

    useEffect(() => {
        checkScroll();
        const ref = scrollRef.current;
        ref?.addEventListener('scroll', checkScroll);
        return () => ref?.removeEventListener('scroll', checkScroll);
    }, [properties]);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const scrollAmount = 350;
            scrollRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    const formatPrice = (price: string | number) => {
        const num = typeof price === 'string' ? parseFloat(price) : price;
        if (num >= 10000000) return `₹${(num / 10000000).toFixed(2)} Cr`;
        if (num >= 100000) return `₹${(num / 100000).toFixed(2)} L`;
        return `₹${num.toLocaleString('en-IN')}`;
    };

    if (!properties || properties.length === 0) {
        return (
            <section className="bg-white py-16 text-center" data-testid="featured-empty">
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Featured Properties</h2>
                    <p className="text-gray-500">No properties found at the moment. Check back soon!</p>
                </div>
            </section>
        );
    }

    return (
        <section className="bg-white py-16">
            <div className="max-w-7xl mx-auto px-4">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">
                            Featured Properties
                        </h2>
                        <p className="text-gray-600 mt-1">
                            Handpicked listings from top-rated agents
                        </p>
                    </div>

                    {/* Navigation Arrows */}
                    <div className="flex gap-2">
                        <button
                            onClick={() => scroll('left')}
                            disabled={!canScrollLeft}
                            className={`p-2 rounded-full border ${canScrollLeft
                                ? 'border-gray-300 hover:border-gray-400 text-gray-700'
                                : 'border-gray-100 text-gray-300 cursor-not-allowed'
                                } transition-colors`}
                            aria-label="Scroll left"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => scroll('right')}
                            disabled={!canScrollRight}
                            className={`p-2 rounded-full border ${canScrollRight
                                ? 'border-gray-300 hover:border-gray-400 text-gray-700'
                                : 'border-gray-100 text-gray-300 cursor-not-allowed'
                                } transition-colors`}
                            aria-label="Scroll right"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Carousel Container */}
                <div
                    ref={scrollRef}
                    className="flex gap-5 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {properties.map((property) => (
                        <Link
                            key={property.id}
                            href={`/properties/${property.slug}`}
                            className="flex-shrink-0 w-[320px] group"
                        >
                            <div
                                className="relative rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-lg transition-shadow"
                                data-testid="property-card"
                            >
                                {/* Image Container */}
                                <div className="relative h-48 overflow-hidden">
                                    <img
                                        src={property.images?.[0]?.url || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600'}
                                        alt={property.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />

                                    {/* Badge */}
                                    <div className="absolute top-3 left-3 bg-[#006AFF] text-white text-xs font-bold px-3 py-1 rounded-full">
                                        Featured
                                    </div>

                                    {/* Heart Icon */}
                                    <button
                                        className="absolute top-3 right-3 p-2 bg-white/80 hover:bg-white rounded-full transition-colors"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            // TODO: Save to favorites
                                        }}
                                    >
                                        <Heart className="w-4 h-4 text-gray-700" />
                                    </button>
                                </div>

                                {/* Content */}
                                <div className="p-4">
                                    {/* Price */}
                                    <div className="text-xl font-bold text-gray-900">
                                        {formatPrice(property.price)}
                                    </div>

                                    {/* Details */}
                                    <div className="text-sm text-gray-600 mt-1">
                                        {property.bedrooms} bed • {property.bathrooms} bath • {property.areaSqFt?.toLocaleString()} sqft
                                    </div>

                                    {/* Address */}
                                    <div className="text-sm text-gray-500 mt-1 truncate">
                                        {property.address}, {property.city}
                                    </div>

                                    {/* Agent */}
                                    {property.agent && (
                                        <div className="text-xs text-gray-400 mt-2">
                                            by {property.agent.name}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
