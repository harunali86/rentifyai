'use client';

import { useState } from 'react';
import BookingForm from './BookingForm';
import LeadInquiryForm from './LeadInquiryForm';
import { Calendar, MessageSquare } from 'lucide-react';

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

    return (
        <div className="bg-white rounded-[2.5rem] p-8 shadow-2xl border border-gray-50 flex flex-col gap-6">
            {/* Agent Header */}
            <div className="flex items-center gap-5 pb-6 border-b border-gray-100">
                <div className="w-16 h-16 rounded-full bg-brand-50 overflow-hidden border-2 border-brand-100 shadow-md ring-4 ring-brand-50/50">
                    {props.agent?.avatar && (
                        <img src={props.agent.avatar} alt={props.agent.name} className="w-full h-full object-cover" />
                    )}
                </div>
                <div className="space-y-0.5">
                    <h3 className="text-lg font-black text-gray-900 tracking-tight">{props.agent?.name || 'Rentify Agent'}</h3>
                    <p className="text-xs text-brand-600 font-black uppercase tracking-widest">Verified Partner Agent</p>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex p-1 bg-gray-100 rounded-xl">
                <button
                    onClick={() => setActiveTab('tour')}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-xs font-black uppercase tracking-wider rounded-lg transition-all ${activeTab === 'tour' ? 'bg-white text-brand-600 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
                >
                    <Calendar className="w-4 h-4" /> Tour
                </button>
                <button
                    onClick={() => setActiveTab('message')}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-xs font-black uppercase tracking-wider rounded-lg transition-all ${activeTab === 'message' ? 'bg-white text-brand-600 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
                >
                    <MessageSquare className="w-4 h-4" /> Message
                </button>
            </div>

            {/* Content Body */}
            <div className="min-h-[300px]">
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

        </div>
    );
}
