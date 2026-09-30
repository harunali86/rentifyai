'use client';

import React, { useState, useEffect } from 'react';
import { X, ShieldCheck, CheckCircle2, Phone, Zap, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

interface LeadQuotaModalProps {
    isOpen: boolean;
    onClose: () => void;
    property: any;
    agent?: any;
}

export function LeadQuotaModal({ isOpen, onClose, property, agent }: LeadQuotaModalProps) {
    const [buyerName, setBuyerName] = useState('');
    const [buyerPhone, setBuyerPhone] = useState('');
    const [remainingQuota, setRemainingQuota] = useState(18);

    useEffect(() => {
        try {
            const cachedLead = JSON.parse(localStorage.getItem('rentify_buyer_lead') || '{}');
            if (cachedLead.name) setBuyerName(cachedLead.name);
            if (cachedLead.phone) setBuyerPhone(cachedLead.phone);
            const savedQuota = localStorage.getItem('rentify_broker_quota');
            if (savedQuota) setRemainingQuota(Number(savedQuota));
        } catch (e) {
            // ignore
        }
    }, [isOpen]);

    if (!isOpen || !property) return null;

    const assignedAgent = agent || property.agent || {
        name: "Rajesh Godbole",
        phone: "+91 98220 41890",
        agency: "Pune Prime Estates (Baner & KP)",
        reraId: "A52100018942",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80"
    };

    const handleConnectWhatsApp = (e: React.FormEvent) => {
        e.preventDefault();
        const cleanPhone = buyerPhone.replace(/[^0-9]/g, '');
        if (cleanPhone.length < 10) {
            toast.error('Please enter a valid 10-digit mobile number');
            return;
        }

        // Cache lead for future 1-click inquiries
        try {
            localStorage.setItem('rentify_buyer_lead', JSON.stringify({ name: buyerName, phone: cleanPhone }));
            const nextQuota = Math.max(0, remainingQuota - 1);
            setRemainingQuota(nextQuota);
            localStorage.setItem('rentify_broker_quota', nextQuota.toString());
        } catch (e) {}

        toast.success(`✓ Lead assigned to ${assignedAgent.name} (Quota remaining: ${remainingQuota - 1})`);

        // Format direct WhatsApp URL
        const brokerRaw = assignedAgent.phone?.replace(/[^0-9]/g, '') || '919822041890';
        const brokerPhone = brokerRaw.startsWith('91') ? brokerRaw : '91' + brokerRaw;
        const msg = `Hi ${assignedAgent.name}, my name is ${buyerName || 'Buyer'} (${cleanPhone}). I am interested in viewing "${property.title}" (${property.city}) listed with Zero Brokerage on RentifyAI. Please share walkthrough schedule and brochure.`;
        const waUrl = `https://wa.me/${brokerPhone}?text=${encodeURIComponent(msg)}`;

        onClose();
        window.open(waUrl, '_blank', 'noopener,noreferrer');
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
            <div className="relative w-full max-w-lg rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-slate-200">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-5 right-5 rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors cursor-pointer"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Top Badge: Hybrid B2B Lead Model */}
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-blue-900 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200/60">
                        <Zap className="w-3.5 h-3.5 text-blue-600" />
                        <span>MahaRERA Partner Lead Routing</span>
                    </div>
                    <div className="text-[11px] font-black text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                        Quota: {remainingQuota}/25 Active
                    </div>
                </div>

                {/* Property Summary */}
                <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-slate-50 border border-slate-200/80 mb-5">
                    {property.images?.[0]?.url && (
                        <img
                            src={property.images[0].url}
                            alt={property.title}
                            className="w-16 h-16 rounded-xl object-cover shrink-0 border border-slate-200"
                        />
                    )}
                    <div className="min-w-0 flex-1">
                        <span className="text-[9px] font-black uppercase text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
                            ⚡ Zero Brokerage Direct
                        </span>
                        <h4 className="text-xs font-bold text-slate-900 truncate mt-0.5">{property.title}</h4>
                        <p className="text-[11px] text-slate-500 truncate">{property.address}, {property.city}</p>
                    </div>
                </div>

                {/* Assigned Broker Card (DoPahiyaa B2B Dealer Parity) */}
                <div className="mb-5 p-3.5 rounded-2xl border border-blue-100 bg-blue-50/50 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-blue-500 shrink-0">
                            <img src={assignedAgent.avatar} alt={assignedAgent.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                            <div className="flex items-center gap-1.5">
                                <h5 className="text-xs font-black text-slate-900">{assignedAgent.name}</h5>
                                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                            </div>
                            <p className="text-[10px] text-slate-500 font-semibold">{assignedAgent.agency}</p>
                            <p className="text-[10px] text-emerald-700 font-bold">MahaRERA: {assignedAgent.reraId}</p>
                        </div>
                    </div>
                </div>

                {/* Buyer Input Form */}
                <form onSubmit={handleConnectWhatsApp} className="space-y-3.5">
                    <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Your Full Name</label>
                        <input
                            type="text"
                            required
                            value={buyerName}
                            onChange={(e) => setBuyerName(e.target.value)}
                            placeholder="e.g. Rahul Sharma"
                            className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs text-slate-900 focus:border-[#006AFF] focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">WhatsApp Phone Number</label>
                        <div className="relative flex items-center">
                            <span className="absolute left-3.5 text-xs font-bold text-slate-500">+91</span>
                            <input
                                type="tel"
                                required
                                value={buyerPhone}
                                onChange={(e) => setBuyerPhone(e.target.value)}
                                placeholder="98220 XXXXX"
                                maxLength={10}
                                className="w-full rounded-xl border border-slate-200 pl-12 pr-3.5 py-2.5 text-xs text-slate-900 focus:border-[#006AFF] focus:outline-none font-bold"
                            />
                        </div>
                        <p className="text-[10px] text-slate-400 mt-1">
                            🔒 100% Privacy Protected. Verified zero-spam guarantee.
                        </p>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3.5 bg-[#25D366] hover:bg-[#20ba59] text-white font-black text-xs rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 active:scale-98 transition-all cursor-pointer mt-2"
                    >
                        <span>💬</span> Confirm & Open WhatsApp Chat (Zero Brokerage)
                    </button>
                </form>
            </div>
        </div>
    );
}
