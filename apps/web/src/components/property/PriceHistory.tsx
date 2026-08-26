
'use client';

import { PriceHistory as PriceHistoryType, TaxHistory } from '@/lib/api';
import { ArrowDown, ArrowUp, Minus } from 'lucide-react';

interface PriceHistoryProps {
    priceHistory: PriceHistoryType[];
    taxHistory: TaxHistory[];
}

export default function PriceHistory({ priceHistory, taxHistory }: PriceHistoryProps) {
    if (!priceHistory?.length && !taxHistory?.length) return null;

    return (
        <div className="space-y-8" id="price-history">
            {/* Rentify Estimate Section */}
            <div className="bg-gradient-to-br from-brand-50 to-white border border-brand-100 p-6 rounded-xl shadow-sm">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-lg font-black text-gray-900 tracking-tight">Rentify Estimate</h3>
                            <span className="bg-brand-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">AI Valuation</span>
                        </div>
                        <div className="text-3xl font-black text-brand-700 tracking-tight">
                            {priceHistory[0] ? `₹${(Number(priceHistory[0].price) * 1.02).toLocaleString(undefined, { maximumFractionDigits: 0 })}` : 'N/A'}
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Estimated Range</div>
                        <div className="font-bold text-gray-700">
                            {priceHistory[0] ? `₹${(Number(priceHistory[0].price) * 0.95).toLocaleString(undefined, { notation: "compact" })} - ₹${(Number(priceHistory[0].price) * 1.05).toLocaleString(undefined, { notation: "compact" })}` : 'N/A'}
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-4 text-sm font-medium pt-4 border-t border-brand-100">
                    <div className="flex items-center gap-1.5 text-emerald-600">
                        <ArrowUp className="w-4 h-4" />
                        <span>+5.4%</span>
                        <span className="text-gray-500 font-normal">last 30 days</span>
                    </div>
                    <div className="w-px h-4 bg-gray-200"></div>
                    <div className="flex items-center gap-1.5 text-brand-600">
                        <span>1 Year Forecast:</span>
                        <span className="font-bold">₹{(Number(priceHistory[0]?.price || 0) * 1.08).toLocaleString(undefined, { notation: "compact" })}</span>
                    </div>
                </div>
            </div>

            {/* Price History Section */}
            <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Price History</h3>
                <div className="border border-gray-200 rounded-xl overflow-hidden">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-50 text-gray-500 font-semibold border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-3">Date</th>
                                <th className="px-6 py-3">Event</th>
                                <th className="px-6 py-3">Price</th>
                                <th className="px-6 py-3">Source</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {priceHistory?.map((item, i) => {
                                // Calculate change from previous (next in list due to desc sort)
                                const prev = priceHistory[i + 1];
                                const currentPrice = Number(item.price);
                                const prevPrice = prev ? Number(prev.price) : currentPrice;
                                const diff = currentPrice - prevPrice;

                                return (
                                    <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-4 font-medium text-gray-900">
                                            {new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                        </td>
                                        <td className="px-6 py-4 text-gray-700 capitalize">
                                            {item.event}
                                        </td>
                                        <td className="px-6 py-4 font-bold text-gray-900 flex items-center gap-2">
                                            ₹{Number(item.price).toLocaleString()}
                                            {diff > 0 && <span className="text-xs text-red-600 bg-red-50 px-1.5 py-0.5 rounded flex items-center"><ArrowUp className="w-3 h-3" /> {(diff / prevPrice * 100).toFixed(1)}%</span>}
                                            {diff < 0 && <span className="text-xs text-green-600 bg-green-50 px-1.5 py-0.5 rounded flex items-center"><ArrowDown className="w-3 h-3" /> {(Math.abs(diff) / prevPrice * 100).toFixed(1)}%</span>}
                                        </td>
                                        <td className="px-6 py-4 text-gray-500 text-xs uppercase tracking-wider">
                                            {item.source}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Tax History Section */}
            {taxHistory?.length > 0 && (
                <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Tax History</h3>
                    <div className="border border-gray-200 rounded-xl overflow-hidden">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-gray-50 text-gray-500 font-semibold border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-3">Year</th>
                                    <th className="px-6 py-3">Property Taxes</th>
                                    <th className="px-6 py-3">Tax Assessment</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {taxHistory.map((item) => (
                                    <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-4 font-medium text-gray-900">{item.year}</td>
                                        <td className="px-6 py-4 text-gray-700">₹{Number(item.taxPaid).toLocaleString()}</td>
                                        <td className="px-6 py-4 text-gray-500">
                                            {item.assessment ? `₹${Number(item.assessment).toLocaleString()}` : '-'}
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
