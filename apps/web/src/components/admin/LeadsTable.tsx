
'use client';

import { useState } from 'react';
import { Check, X, AlertTriangle, ExternalLink, Loader2, MessageCircle, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const API_URL = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000') + '/api/v1';

interface LeadsTableProps {
    initialLeads: any[];
    token: string;
}

export default function LeadsTable({ initialLeads, token }: LeadsTableProps) {
    const [leads, setLeads] = useState(initialLeads);
    const [processingId, setProcessingId] = useState<string | null>(null);
    const router = useRouter();

    const handleAction = async (id: string, status: string) => {
        setProcessingId(id);
        try {
            const res = await fetch(`${API_URL}/leads/admin/${id}/status`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ status })
            });

            if (res.ok) {
                const updatedLead = await res.json();
                setLeads(leads.map(l => l.id === id ? updatedLead : l));
                toast.success(`Lead successfully ${status.toLowerCase()}`);
                router.refresh();
            } else {
                toast.error('Failed to update lead status');
            }
        } catch (error) {
            toast.error('Network error occurred');
        } finally {
            setProcessingId(null);
        }
    };

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left">
                <thead>
                    <tr className="bg-slate-50/50 border-b border-slate-100">
                        <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Asset & Status</th>
                        <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Buyer Inquiry</th>
                        <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Target Agent</th>
                        <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Deal Audit</th>
                        <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                    {leads.map((lead) => (
                        <tr key={lead.id} className={`group hover:bg-slate-50/30 transition-colors ${lead.isFlagged ? 'bg-red-50/20' : ''}`}>
                            <td className="px-8 py-6">
                                <div className="space-y-1">
                                    <p className="text-sm font-black text-slate-900 line-clamp-1">{lead.property.title}</p>
                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{lead.property.city}</p>
                                    <div className={`mt-2 inline-flex px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-widest border
                                        ${lead.status === 'PENDING' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                                            lead.status === 'APPROVED' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                                                'bg-red-50 text-red-600 border-red-100'}`}>
                                        {lead.status}
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-6">
                                <div className="max-w-xs space-y-2">
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-black text-slate-500">
                                            {lead.guestName?.[0] || lead.user?.name?.[0] || '?'}
                                        </div>
                                        <p className="text-xs font-black text-slate-700">{lead.guestName || lead.user?.name || 'Anonymous'}</p>
                                    </div>
                                    <p className="text-xs text-slate-600 font-medium italic leading-relaxed line-clamp-2">"{lead.message}"</p>
                                </div>
                            </td>
                            <td className="px-6 py-6">
                                <div className="space-y-1">
                                    <p className="text-xs font-black text-slate-900">{lead.agent.name}</p>
                                    <p className="text-[10px] text-slate-400 font-bold">{lead.agent.email}</p>
                                </div>
                            </td>
                            <td className="px-6 py-6 font-mono">
                                {lead.isFlagged ? (
                                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-100 text-red-700 rounded-full text-[10px] font-black border border-red-200">
                                        <AlertTriangle className="w-3 h-3" /> LEAKAGE DETECTED
                                    </div>
                                ) : (
                                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-[10px] font-black border border-emerald-200">
                                        <CheckCircle className="w-3 h-3" /> SAFE PATTERN
                                    </div>
                                )}
                            </td>
                            <td className="px-8 py-6 text-right">
                                <div className="flex justify-end gap-2">
                                    {lead.status === 'PENDING' && (
                                        <>
                                            <Button
                                                size="sm"
                                                onClick={() => handleAction(lead.id, 'APPROVED')}
                                                disabled={processingId === lead.id}
                                                className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl h-9 px-4 font-black text-[10px] uppercase shadow-lg shadow-emerald-200"
                                            >
                                                {processingId === lead.id ? <Loader2 className="w-3 h-3 animate-spin" /> : <Check className="w-3.5 h-3.5 mr-1" />}
                                                Approve
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={() => handleAction(lead.id, 'REJECTED')}
                                                disabled={processingId === lead.id}
                                                className="border-slate-200 text-slate-600 rounded-xl h-9 px-4 font-black text-[10px] uppercase hover:bg-red-50 hover:text-red-600 hover:border-red-100"
                                            >
                                                <X className="w-3.5 h-3.5 mr-1" />
                                                Spam
                                            </Button>
                                        </>
                                    )}
                                    <Button variant="ghost" size="icon" className="rounded-xl h-9 w-9 text-slate-400 hover:text-brand-600">
                                        <ExternalLink className="w-4 h-4" />
                                    </Button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {leads.length === 0 && (
                <div className="py-20 text-center space-y-4">
                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto">
                        <MessageCircle className="w-8 h-8 text-slate-200" />
                    </div>
                    <p className="text-slate-400 font-black text-xs uppercase tracking-widest">No Active Inquiries Found</p>
                </div>
            )}
        </div>
    );
}
