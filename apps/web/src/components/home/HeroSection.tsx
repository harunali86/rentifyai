"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Search, Home, Key, PlusCircle, Sparkles, ArrowRight, Zap } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export function HeroSection() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || "");
    const [listingType, setListingType] = useState(searchParams.get('listingType') || "BUY");

    const handleSearch = (cityQuery?: string) => {
        const query = cityQuery !== undefined ? cityQuery : searchTerm;
        if (listingType === 'SELL') {
            router.push('/agent/post');
            return;
        }
        const params = new URLSearchParams();
        if (query) params.append('search', query);
        params.append('listingType', listingType === 'RENT' ? 'RENT' : 'SALE');
        router.push(listingType === 'RENT' ? `/rent?${params.toString()}` : `/buy?${params.toString()}`);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleSearch();
    };

    const QUICK_CITIES = ['Pune', 'Mumbai', 'Gurgaon', 'Bengaluru', 'Goa'];

    const getPlaceholder = () => {
        if (listingType === 'RENT') {
            return "Search 100% verified zero-brokerage rentals & apartments in Pune, Mumbai...";
        }
        return "Search luxury residences, villas, or flats for sale in Pune, Mumbai...";
    };

    return (
        <section className="relative pt-32 pb-24 min-h-[620px] flex flex-col justify-center items-center">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=2000"
                    alt="Background"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />
            </div>

            <div className="relative z-10 max-w-4xl mx-auto px-4 text-center w-full">
                {/* Hero Title */}
                <h1 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tight drop-shadow-lg">
                    Find it. Tour it. Own it.
                </h1>

                {/* Search / Action Container */}
                <div className="max-w-2xl mx-auto">
                    {/* Tabs: Buy / Rent / Sell (DoPahiyaa Style) */}
                    <div className="flex w-fit mx-auto mb-0">
                        <button
                            type="button"
                            onClick={() => setListingType('BUY')}
                            className={`inline-flex items-center px-6 py-3 text-sm font-black transition-all rounded-t-xl cursor-pointer ${
                                listingType === 'BUY'
                                    ? 'bg-white text-[#006AFF] shadow-lg'
                                    : 'bg-black/50 text-white hover:bg-black/70 backdrop-blur-md'
                            }`}
                        >
                            <Home className="w-4 h-4 mr-1.5" />
                            Buy
                        </button>
                        <button
                            type="button"
                            onClick={() => setListingType('RENT')}
                            className={`inline-flex items-center px-6 py-3 text-sm font-black transition-all rounded-t-xl cursor-pointer ${
                                listingType === 'RENT'
                                    ? 'bg-white text-[#006AFF] shadow-lg'
                                    : 'bg-black/50 text-white hover:bg-black/70 backdrop-blur-md'
                            }`}
                        >
                            <Key className="w-4 h-4 mr-1.5" />
                            Rent
                        </button>
                        <button
                            type="button"
                            onClick={() => setListingType('SELL')}
                            className={`inline-flex items-center px-6 py-3 text-sm font-black transition-all rounded-t-xl cursor-pointer ${
                                listingType === 'SELL'
                                    ? 'bg-white text-[#006AFF] shadow-lg'
                                    : 'bg-black/50 text-white hover:bg-black/70 backdrop-blur-md'
                            }`}
                        >
                            <PlusCircle className="w-4 h-4 mr-1.5 text-amber-400" />
                            Sell / List
                        </button>
                    </div>

                    {/* Dynamic Action Area */}
                    {listingType === 'SELL' ? (
                        /* 🌟 DoPahiyaa-Style Seller / Listing Box */
                        <div className="bg-white rounded-2xl rounded-tl-none shadow-2xl p-6 sm:p-8 text-left transition-all border border-slate-100">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
                                <div>
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black text-emerald-800 bg-emerald-100 uppercase tracking-widest mb-2">
                                        <Zap className="w-3.5 h-3.5 text-emerald-600" /> 100% Zero Brokerage • Free AI Listing
                                    </span>
                                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                                        Sell or Rent Out Your Property in 60s
                                    </h3>
                                    <p className="text-xs sm:text-sm text-slate-600 mt-1">
                                        Reach verified high-net-worth buyers directly on WhatsApp with free Zestimate® valuation.
                                    </p>
                                </div>
                                <Link
                                    href="/agent/post"
                                    className="shrink-0 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#006AFF] to-blue-700 hover:from-blue-700 hover:to-indigo-800 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-blue-500/25 hover:scale-105 active:scale-95 transition-all"
                                >
                                    <PlusCircle className="w-4 h-4" />
                                    Post Property Free
                                </Link>
                            </div>

                            {/* 1-Click Quick Presets for Demo */}
                            <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center gap-2">
                                <span className="text-xs font-bold text-slate-500">1-Click Demo Presets:</span>
                                <Link href="/agent/post" className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-slate-700 text-xs font-semibold transition-colors">
                                    🏰 Koregaon Park Villa
                                </Link>
                                <Link href="/agent/post" className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-slate-700 text-xs font-semibold transition-colors">
                                    🌊 Worli Sea Face Penthouse
                                </Link>
                                <Link href="/agent/post" className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-slate-700 text-xs font-semibold transition-colors">
                                    🏢 Baner Modern High-Rise
                                </Link>
                            </div>
                        </div>
                    ) : (
                        /* 🌟 Buy & Rent Search Bar Form */
                        <div>
                            <form onSubmit={handleSubmit} className="bg-white rounded-xl rounded-tl-none shadow-2xl flex items-center p-2 border border-slate-100">
                                <div className="relative flex-grow">
                                    <input
                                        type="text"
                                        placeholder={getPlaceholder()}
                                        className="w-full px-4 py-3 bg-transparent text-gray-900 focus:outline-none placeholder:text-gray-400 text-sm sm:text-base font-medium"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                                <Button
                                    type="submit"
                                    className="bg-[#006AFF] hover:bg-blue-700 text-white rounded-lg px-6 h-12 flex items-center justify-center shrink-0 cursor-pointer shadow-md font-bold text-xs uppercase tracking-wider active:scale-95 transition-all"
                                    aria-label="Search"
                                >
                                    <Search className="w-5 h-5 mr-1.5" />
                                    <span>Search</span>
                                </Button>
                            </form>

                            {/* Direct Navigation & Popular Cities */}
                            <div className="flex flex-wrap items-center justify-between gap-3 mt-4 px-1">
                                <div className="flex flex-wrap items-center gap-2">
                                    <span className="text-white/90 text-xs font-bold mr-1">Popular:</span>
                                    {QUICK_CITIES.map((city) => (
                                        <button
                                            key={city}
                                            type="button"
                                            onClick={() => handleSearch(city)}
                                            className="px-3 py-1 rounded-full bg-white/20 hover:bg-white/35 backdrop-blur-md text-white text-xs font-semibold border border-white/25 transition-all hover:scale-105 cursor-pointer"
                                        >
                                            {city}
                                        </button>
                                    ))}
                                </div>

                                <Link
                                    href={listingType === 'RENT' ? '/rent' : '/buy'}
                                    className="inline-flex items-center text-xs font-bold text-white hover:text-blue-200 underline underline-offset-4 drop-shadow-sm transition-colors"
                                >
                                    <span>Browse all {listingType === 'RENT' ? 'Rentals' : 'Homes for Sale'}</span>
                                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
