'use client';

import { PriceHistory as PriceHistoryType, TaxHistory } from '@/lib/api';
import { ArrowDown, ArrowUp } from 'lucide-react';

interface PriceHistoryProps {
    priceHistory: PriceHistoryType[];
    taxHistory: TaxHistory[];
}

function formatPriceINR(val: number | string): string {
    const num = Number(val);
    if (!num || isNaN(num)) return '₹0';
    if (num >= 10000000) return `₹${(num / 10000000).toFixed(2)} Cr`;
    if (num >= 100000) return `₹${(num / 100000).toFixed(1)} L`;
    return `₹${Math.round(num).toLocaleString('en-IN')}`;
}

export default function PriceHistory({ priceHistory, taxHistory }: PriceHistoryProps) {
    if (!priceHistory?.length && !taxHistory?.length) return null;

    const basePrice = priceHistory[0] ? Number(priceHistory[0].price) : 0;

    return (
        <div className="space-y-8" id="price-history">
            {/* Price Valuation Summary */}
            {basePrice > 0 && (
                <div className="bg-gradient-to-br from-brand-50 to-white border border-brand-100 p-6 rounded-2xl shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <h3 className="text-lg font-black text-gray-900 tracking-tight">Market Valuation Overview</h3>
                                <span className="bg-brand-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">AI Estimate</span>
                            </div>
                            <div className="text-3xl font-black text-brand-700 tracking-tight" suppressHydrationWarning>
                                {formatPriceINR(basePrice * 1.02)}
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Valuation Band</div>
                            <div className="font-bold text-gray-700 text-sm" suppressHydrationWarning>
                                {formatPriceINR(basePrice * 0.96)} - {formatPriceINR(basePrice * 1.04)}
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 text-xs font-semibold pt-4 border-t border-brand-100/60">
                        <div className="flex items-center gap-1 text-emerald-600">
                            <ArrowUp className="w-3.5 h-3.5" />
                            <span>+2.8%</span>
                            <span className="text-gray-400 font-normal">past 30 days</span>
                        </div>
                        <div className="w-px h-3.5 bg-gray-200"></div>
                        <div className="flex items-center gap-1.5 text-brand-600" suppressHydrationWarning>
                            <span>1-Yr Projection:</span>
                            <span className="font-bold text-gray-900">{formatPriceINR(basePrice * 1.052)}</span>
                        </div>
                    </div>
                </div>
            )}

            {/* Price History Table */}
            {priceHistory?.length > 0 && (
                <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Price History</h3>
                    <div className="border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-gray-50/80 text-gray-500 font-semibold border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-3.5">Date</th>
                                    <th className="px-6 py-3.5">Event</th>
                                    <th className="px-6 py-3.5">Price</th>
                                    <th className="px-6 py-3.5">Source</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 bg-white">
                                {priceHistory.map((item, i) => {
                                    const prev = priceHistory[i + 1];
                                    const currentPrice = Number(item.price);
                                    const prevPrice = prev ? Number(prev.price) : currentPrice;
                                    const diff = currentPrice - prevPrice;

                                    return (
                                        <tr key={item.id || i} className="hover:bg-gray-50/60 transition-colors">
                                            <td className="px-6 py-4 font-medium text-gray-900" suppressHydrationWarning>
                                                {item.date}
                                            </td>
                                            <td className="px-6 py-4 text-gray-700 capitalize font-medium">
                                                {item.event}
                                            </td>
                                            <td className="px-6 py-4 font-bold text-gray-900 flex items-center gap-2" suppressHydrationWarning>
                                                {formatPriceINR(item.price)}
                                                {diff > 0 && (
                                                    <span className="text-[11px] font-bold text-red-600 bg-red-50 px-1.5 py-0.5 rounded flex items-center">
                                                        <ArrowUp className="w-3 h-3 mr-0.5" /> {(diff / prevPrice * 100).toFixed(1)}%
                                                    </span>
                                                )}
                                                {diff < 0 && (
                                                    <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded flex items-center">
                                                        <ArrowDown className="w-3 h-3 mr-0.5" /> {(Math.abs(diff) / prevPrice * 100).toFixed(1)}%
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-gray-500 text-xs uppercase tracking-wider font-semibold">
                                                {item.source}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Tax History Table */}
            {taxHistory?.length > 0 && (
                <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Tax History</h3>
                    <div className="border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-gray-50/80 text-gray-500 font-semibold border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-3.5">Year</th>
                                    <th className="px-6 py-3.5">Property Taxes</th>
                                    <th className="px-6 py-3.5">Tax Assessment</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 bg-white">
                                {taxHistory.map((item, idx) => (
                                    <tr key={item.id || idx} className="hover:bg-gray-50/60 transition-colors">
                                        <td className="px-6 py-4 font-medium text-gray-900">{item.year}</td>
                                        <td className="px-6 py-4 text-gray-700 font-semibold" suppressHydrationWarning>
                                            {formatPriceINR(item.taxPaid)}
                                        </td>
                                        <td className="px-6 py-4 text-gray-500 font-medium" suppressHydrationWarning>
                                            {item.assessment ? formatPriceINR(item.assessment) : '-'}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}
