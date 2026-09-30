import { Navbar } from "@/components/layout/Navbar";
import { getProperty, getSimilarProperties, Property } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { MapPin, ArrowLeft, Share2, Heart, CheckCircle2, Home, Maximize, User } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import PropertyMapWrapper from "@/components/property/PropertyMapWrapper";
import { MortgageCalculator } from "@/components/property/MortgageCalculator";
import UnifiedContactWidget from "@/components/property/UnifiedContactWidget";
import PriceHistory from '@/components/property/PriceHistory';
import Schools from '@/components/property/Schools';
import SimilarHomes from '@/components/property/SimilarHomes';
import PropertyGalleryClient from './PropertyGalleryClient';
import type { Metadata } from "next";
import { cookies } from "next/headers";
import NeighborhoodScores from '@/components/property/NeighborhoodScores';
import { ZestimateWidget } from '@/components/property/ZestimateWidget';
import { TourSchedulerModal } from '@/components/property/TourSchedulerModal';
import { Footer } from "@/components/layout/Footer";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const property = await getProperty(slug);

    if (!property) {
        return {
            title: 'Property Not Found - RentifyAI',
        };
    }

    const title = `${property.title} | RentifyAI`;
    const description = property.description?.slice(0, 160) || `Check out this ${property.type} in ${property.city}.`;
    const image = property.images[0]?.url || '/og-image.jpg';

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            images: [image],
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [image],
        },
    };
}

// Reuse currency formatter
const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
    }).format(amount);
};

// Helper for safe access
const safeAgentName = (agent?: { name: string }) => agent?.name || 'Rentify Agent';
const safeAgentAvatar = (agent?: { avatar?: string }) => agent?.avatar;

export default async function PropertyPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    const rawProperty = await getProperty(slug, token);

    if (!rawProperty) {
        notFound();
    }

    const similarProperties = await getSimilarProperties(rawProperty.id);

    // Cast response to any to handle extra fields from API that are not yet in Interface (like zipCode, description, lat/lng)
    // In a real app, update Interface instead of casting.
    const property: any = rawProperty;

    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            {/* 1. Header Section (Title & Price) */}
            <div className="pt-24 pb-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center mb-6">
                    <Link href="/" className="inline-flex items-center text-gray-400 hover:text-brand-900 font-bold text-xs uppercase tracking-widest transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Listings
                    </Link>
                    <div className="flex gap-3">
                        <Button variant="outline" size="sm" className="gap-2 rounded-xl text-xs font-black border-gray-100">
                            <Share2 className="w-4 h-4" /> Share
                        </Button>
                        <Button variant="outline" size="sm" className="gap-2 rounded-xl text-xs font-black border-gray-100">
                            <Heart className="w-4 h-4" /> Save
                        </Button>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 mb-8">
                    <div className="space-y-2.5">
                        <div className="flex flex-wrap items-center gap-2">
                            <span className="bg-emerald-600 text-white text-[10px] font-black px-2.5 py-0.5 rounded-md uppercase tracking-wider shadow-xs">
                                ⚡ ZERO BROKERAGE
                            </span>
                            <span className="bg-emerald-50 text-emerald-700 text-[10px] font-black px-2.5 py-0.5 rounded-md uppercase tracking-wider border border-emerald-200">
                                MahaRERA: {property.reraId || 'P52100028941'}
                            </span>
                            <span className="bg-blue-50 text-blue-700 text-[10px] font-black px-2 py-0.5 rounded-md uppercase tracking-widest">
                                {property.type}
                            </span>
                            <span className="text-gray-300">•</span>
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                                For {property.listingType === 'SALE' ? 'Sale' : 'Rent'}
                            </span>
                        </div>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">{property.title}</h1>
                        <div className="flex items-center text-slate-500 text-sm font-medium">
                            <MapPin className="w-4 h-4 mr-1.5 text-blue-600 shrink-0" />
                            {property.address}, {property.city}
                        </div>
                    </div>
                    <div className="bg-blue-50/70 p-6 rounded-3xl border border-blue-100 min-w-[220px]">
                        <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] mb-1">Direct Verified Price</p>
                        <div className="text-3xl sm:text-4xl font-black text-blue-900 tracking-tight">
                            {formatCurrency(Number(property.price))}
                            {property.listingType === 'RENT' && <span className="text-base font-bold text-blue-500">/mo</span>}
                        </div>
                        <p className="text-[10px] font-bold text-emerald-700 mt-1 flex items-center gap-1">
                            <span>✓</span> No Middlemen Commission
                        </p>
                    </div>
                </div>

                {/* Interactive Gallery Grid */}
                <PropertyGalleryClient images={property.images} title={property.title} />

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 relative">
                    {/* Details Column */}
                    <div className="lg:col-span-8 space-y-16">
                        {/* 1. Facts & Features - Zillow Style (Strip) */}
                        <div className="flex border-y border-gray-200 py-6">
                            <div className="flex-1 text-center border-r border-gray-200 last:border-0">
                                <div className="text-2xl font-bold text-gray-900">{property.bedrooms}</div>
                                <div className="text-sm text-gray-600">Bedrooms</div>
                            </div>
                            <div className="flex-1 text-center border-r border-gray-200 last:border-0">
                                <div className="text-2xl font-bold text-gray-900">{property.bathrooms}</div>
                                <div className="text-sm text-gray-600">Bathrooms</div>
                            </div>
                            <div className="flex-1 text-center border-r border-gray-200 last:border-0">
                                <div className="text-2xl font-bold text-gray-900">{property.areaSqFt?.toLocaleString()}</div>
                                <div className="text-sm text-gray-600">Square Feet</div>
                            </div>
                        </div>

                        {/* Zillow Signature Valuation Widget */}
                        <ZestimateWidget
                            price={Number(property.price)}
                            listingType={property.listingType}
                            city={property.city}
                        />

                        {/* 2. What's Special (Description) */}
                        <section className="py-2">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">What's special</h2>
                            <div className="prose prose-slate max-w-none text-gray-600 leading-relaxed font-normal text-base">
                                <p>{property.description || 'No description provided.'}</p>
                            </div>
                        </section>

                        {/* 3. Facts and Features (Dense Grid) */}
                        <section className="py-6 border-t border-gray-200">
                            <h2 className="text-xl font-bold text-gray-900 mb-6">Facts and features</h2>
                            <div className="bg-gray-50 rounded-lg p-6">
                                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-4 border-b border-gray-200 pb-2">Interior Details</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-3 gap-x-8 text-sm text-gray-700">
                                    {[
                                        "3 Bedrooms", "3 Bathrooms", "Full Kitchen", "Central AC",
                                        "Hardwood Flooring", "Fireplace", "High Ceilings", "Smart Home Ready"
                                    ].map((feat, i) => (
                                        <div key={i} className="flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-brand-500 flex-shrink-0"></span>
                                            <span>{feat}</span>
                                        </div>
                                    ))}
                                    {/* Dynamic Features if available */}
                                    {property.features && typeof property.features === 'object' && Object.keys(property.features).map((key) => (
                                        <div key={key} className="flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-brand-500 flex-shrink-0"></span>
                                            <span className="capitalize">{key.replace(/_/g, ' ')}</span>
                                        </div>
                                    ))}
                                </div>

                                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mt-8 mb-4 border-b border-gray-200 pb-2">Property Details</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-3 gap-x-8 text-sm text-gray-700">
                                    <div className="flex items-center gap-2">
                                        <span className="font-bold text-gray-900">Type:</span> {property.type}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="font-bold text-gray-900">Year Built:</span> 2024
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="font-bold text-gray-900">Status:</span> Active
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="font-bold text-gray-900">Parking:</span> Garage
                                    </div>
                                </div>
                            </div>
                        </section>

                        // ... inside PropertyPage logic

                        {/* Location Context (Map) */}
                        <section>
                            <h2 className="text-2xl font-black text-gray-900 mb-8 tracking-tight">Location Context</h2>
                            <div className="rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white h-[400px] mb-8">
                                <PropertyMapWrapper
                                    properties={[property]}
                                    center={[Number(property.latitude) || 19.0760, Number(property.longitude) || 72.8777]}
                                />
                            </div>
                            {/* Neighborhood Scores - Zillow Style */}
                            <NeighborhoodScores latitude={Number(property.latitude)} longitude={Number(property.longitude)} />
                        </section>

                        {/* Mortgage Calculator */}
                        {property.price && (
                            <div className="py-8 border-t border-gray-100">
                                <h2 className="text-xl font-bold text-gray-900 mb-6">Monthly Payment</h2>
                                <MortgageCalculator homePrice={Number(property.price)} />
                            </div>
                        )}

                        {/* Price & Tax History (Zillow Parity) */}
                        {(property.priceHistory?.length > 0 || property.taxHistory?.length > 0) && (
                            <div className="py-8 border-t border-gray-100">
                                <PriceHistory
                                    priceHistory={property.priceHistory || []}
                                    taxHistory={property.taxHistory || []}
                                />
                            </div>
                        )}

                        {/* Nearby Schools (Zillow Parity) */}
                        {property.schools?.length > 0 && (
                            <div className="py-8 border-t border-gray-100">
                                <Schools schools={property.schools || []} />
                            </div>
                        )}

                        {/* AI Recommendations (Phase 9) */}
                        <div className="py-8 border-t border-gray-100">
                            <SimilarHomes properties={similarProperties} />
                        </div>
                    </div>

                    {/* Sidebar Column */}
                    <div className="lg:col-span-4 lg:sticky lg:top-24 lg:h-fit space-y-4">
                        {/* Zillow Instant Tour Schedule Action */}
                        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-6 rounded-3xl text-white shadow-xl shadow-blue-500/10">
                            <span className="text-[10px] font-black uppercase tracking-widest text-blue-200 block mb-1">
                                Direct Showing
                            </span>
                            <h3 className="text-xl font-black mb-1">Take a Tour of this Home</h3>
                            <p className="text-xs text-blue-100 mb-4 font-normal">
                                Schedule an in-person walkthrough or live video tour with a verified area specialist.
                            </p>
                            <TourSchedulerModal
                                propertyTitle={property.title}
                                propertyAddress={`${property.address}, ${property.city}`}
                                agentName={property.agent?.name}
                                agentAvatar={property.agent?.avatar}
                            />
                        </div>

                        <UnifiedContactWidget
                            propertyId={property.id}
                            agentId={property.agentId}
                            propertyTitle={property.title}
                            isInitialUnlocked={property.isUnlocked}
                            agent={property.agent}
                            userId={token ? JSON.parse(decodeURIComponent(cookieStore.get('user_info')?.value || '{}')).id : undefined}
                        />
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
}
