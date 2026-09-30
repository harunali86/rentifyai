'use client';

import { useState } from 'react';
import BookingForm from './BookingForm';
import LeadInquiryForm from './LeadInquiryForm';
import { Calendar, MessageSquare, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { LeadQuotaModal } from './LeadQuotaModal';

interface UnifiedContactWidgetProps {
    propertyId: string;
    agentId: string;
    propertyTitle: string;
    isInitialUnlocked: boolean;
    agent: any;
    userId?: string;
}

export default function UnifiedContactWidget(props: UnifiedContactWidgetProps) {
    const [activeTab, setActiveTab] = useState<'tour' | 'message'>('tour');
    const [isQuotaModalOpen, setIsQuotaModalOpen] = useState(false);

    const agentPhone = props.agent?.phone || '919822019482';
    const cleanPhone = agentPhone.replace(/[^0-9]/g, '');
    const waUrl = `https://wa.me/${cleanPhone.startsWith('91') ? cleanPhone : '91' + cleanPhone}?text=${encodeURIComponent(`Hi ${props.agent?.name || 'Advisor'}, I am interested in scheduling a walkthrough for "${props.propertyTitle}" on RentifyAI.`)}`;

    return (
        <div className="bg-white rounded-[2rem] p-6 sm:p-7 shadow-xl border border-slate-200/80 flex flex-col gap-5">
            {/* Agent Header */}
            <div className="flex items-center gap-4 pb-4 border-b border-slate-100">
                <div className="w-14 h-14 rounded-full bg-blue-50 overflow-hidden border-2 border-blue-500 shadow-md shrink-0">
                    {props.agent?.avatar ? (
                        <img src={props.agent.avatar} alt={props.agent.name} className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center font-bold text-blue-600">RA</div>
                    )}
                </div>
                <div className="space-y-0.5 min-w-0">
                    <h3 className="text-base font-black text-slate-900 truncate">{props.agent?.name || 'Rajesh Godbole'}</h3>
                    <p className="text-[11px] text-blue-600 font-bold uppercase tracking-wider truncate">
                        {props.agent?.agency || 'Verified Principal Partner'}
                    </p>
                    <div className="flex items-center gap-1 text-[10px] text-emerald-700 font-medium">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                        <span>MahaRERA: {props.agent?.reraId || 'A52100018942'}</span>
                    </div>
                </div>
            </div>

            {/* 🌟 1-Click WhatsApp Quick Connect (NoBroker Parity) */}
            <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                    e.preventDefault();
                    setIsQuotaModalOpen(true);
                }}
                className="w-full py-3 px-4 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-sm hover:shadow-md transition-all active:scale-98 cursor-pointer"
            >
                <span className="text-base">💬</span> Instant WhatsApp Chat (Zero Brokerage)
            </a>

            <div className="relative flex py-1 items-center">
                <div className="flex-grow border-t border-slate-200"></div>
                <span className="flex-shrink mx-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">or schedule showing</span>
                <div className="flex-grow border-t border-slate-200"></div>
            </div>

            {/* Tabs */}
            <div className="flex p-1 bg-slate-100 rounded-xl">
                <button
                    onClick={() => setActiveTab('tour')}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
                        activeTab === 'tour' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-500 hover:text-slate-900'
                    }`}
                >
                    <Calendar className="w-3.5 h-3.5" /> Book Tour
                </button>
                <button
                    onClick={() => setActiveTab('message')}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
                        activeTab === 'message' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-500 hover:text-slate-900'
                    }`}
                >
                    <MessageSquare className="w-3.5 h-3.5" /> Send Inquiry
                </button>
            </div>

            {/* Content Body */}
            <div className="min-h-[260px]">
                {activeTab === 'tour' ? (
                    <BookingForm {...props} />
                ) : (
                    <LeadInquiryForm
                        propertyId={props.propertyId}
                        agentId={props.agentId}
                        userId={props.userId}
                    />
                )}
            </div>

            {/* Bottom Security Assurance */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-center gap-1.5 text-[10px] text-slate-400 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                <span>Zero Brokerage • Strict Client Privacy</span>
            </div>

            <LeadQuotaModal
                isOpen={isQuotaModalOpen}
                onClose={() => setIsQuotaModalOpen(false)}
                property={{ title: props.propertyTitle, id: props.propertyId }}
                agent={props.agent}
            />
        </div>
    );
}
