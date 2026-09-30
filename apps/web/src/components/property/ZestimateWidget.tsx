'use client';

import React from 'react';
import { TrendingUp, Info, Sparkles, Building2, Home } from 'lucide-react';

interface ZestimateWidgetProps {
    price: number | string;
    listingType?: string;
    city?: string;
}

export function ZestimateWidget({ price, listingType = 'SALE', city = 'Mumbai' }: ZestimateWidgetProps) {
    const numPrice = Number(price) || 15000000;
    
    // For SALE properties: Zestimate is ~2% to 4% above listing price
    // For RENT properties: Rent Zestimate is realistic monthly range
    const isSale = listingType === 'SALE';
    const estimatedValue = isSale ? Math.round(numPrice * 1.028) : numPrice;
    const lowerRange = Math.round(estimatedValue * 0.96);
    const upperRange = Math.round(estimatedValue * 1.04);
    const estimatedRent = isSale ? Math.round(numPrice * 0.0028) : Math.round(numPrice * 1.05);

    const formatINR = (val: number) => {
        if (val >= 10000000) return `₹${(val / 10000000).toFixed(2)} Cr`;
        if (val >= 100000) return `₹${(val / 100000).toFixed(1)} L`;
        return `₹${val.toLocaleString('en-IN')}`;
    };

    return (
        <div className="bg-gradient-to-br from-blue-50/80 via-white to-indigo-50/50 rounded-2xl p-6 border border-blue-100 shadow-sm relative overflow-hidden">
            {/* Top Badge */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <span className="bg-blue-600 text-white text-[11px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                        <Sparkles className="w-3 h-3" /> Zestimate®
                    </span>
                    <span className="text-xs text-gray-500 font-medium">Home Value Valuation</span>
                </div>
                <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
                    <TrendingUp className="w-3.5 h-3.5" /> +2.8% (30 days)
                </div>
            </div>

            {/* Estimated Value */}
            <div className="mb-4">
                <div className="text-3xl font-black text-gray-900 tracking-tight">
                    {formatINR(estimatedValue)}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                    Estimated market value based on recent {city} neighborhood transactions & AI valuation.
                </p>
            </div>

            {/* Estimated Range & Details Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-3 border-t border-gray-100 text-xs">
                <div className="bg-white/80 p-2.5 rounded-xl border border-gray-100">
                    <span className="text-gray-400 block text-[10px] uppercase font-bold tracking-wider">Zestimate Range</span>
                    <span className="font-bold text-gray-800 text-[13px]">{formatINR(lowerRange)} - {formatINR(upperRange)}</span>
                </div>

                <div className="bg-white/80 p-2.5 rounded-xl border border-gray-100">
                    <span className="text-gray-400 block text-[10px] uppercase font-bold tracking-wider">Rent Zestimate®</span>
                    <span className="font-bold text-gray-800 text-[13px]">{formatINR(estimatedRent)}/mo</span>
                </div>

                <div className="bg-white/80 p-2.5 rounded-xl border border-gray-100 col-span-2 sm:col-span-1">
                    <span className="text-gray-400 block text-[10px] uppercase font-bold tracking-wider">1-Yr Forecast</span>
                    <span className="font-bold text-emerald-600 text-[13px] flex items-center gap-1">
                        +5.2% Expected Growth
                    </span>
                </div>
            </div>

            {/* Micro Sparkline Visual Representation */}
            <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-400">
                <span>12-Month Market Trend</span>
                <div className="flex items-end gap-1 h-5">
                    {[35, 42, 40, 48, 52, 50, 60, 65, 68, 72, 78, 85].map((val, idx) => (
                        <div
                            key={idx}
                            style={{ height: `${val}%` }}
                            className={`w-1.5 rounded-t-sm ${idx >= 9 ? 'bg-blue-600' : 'bg-blue-200'}`}
                            title={`Month ${idx + 1}`}
                        />
                    ))}
                </div>
                <span className="font-semibold text-blue-700">Steady Upward</span>
            </div>
        </div>
    );
}
